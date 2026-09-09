from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import render, redirect, get_object_or_404
from django.db.models import Q

from .models import Project, Task , Comment , Notification


@login_required
def dashboard(request):
    projects = request.user.projects.all()

    my_tasks_count = Task.objects.filter(
        assigned_to=request.user
    ).count()

    team_members_count = User.objects.filter(
        projects__in=projects
    ).distinct().count()

    return render(request, "projects/dashboard.html", {
        "projects": projects,
        "my_tasks_count": my_tasks_count,
        "team_members_count": team_members_count,
    })

@login_required
def create_project(request):

    if request.method == "POST":

        name = request.POST.get("name")
        description = request.POST.get("description")

        if not name:
            return render(request, "projects/create_project.html", {
                "error": "Project name is required."
            })

        project = Project.objects.create(
            name=name,
            description=description,
            owner=request.user
        )

        project.members.add(request.user)

        return redirect("dashboard")

    return render(request, "projects/create_project.html")


@login_required
def project_board(request, project_id):
    project = get_object_or_404(Project, id=project_id)

    if (
        request.user != project.owner
        and not project.members.filter(id=request.user.id).exists()
    ):
        return redirect("dashboard")

    tasks = project.tasks.all().order_by("status", "-created_at")

    users = User.objects.exclude(
        id__in=project.members.values_list("id", flat=True)
    )

    print("ALL USERS:", list(User.objects.values_list("username", flat=True)))
    print(
        "MEMBERS:",
        list(project.members.values_list("username", flat=True))
    )

    return render(request, "projects/project_board.html", {
        "project": project,
        "tasks": tasks,
        "users": users,
    })

@login_required
def create_task(request, project_id):

    project = get_object_or_404(
        Project,
        id=project_id
    )

    if (
        request.user != project.owner
        and not project.members.filter(id=request.user.id).exists()
    ):
        return redirect("dashboard")

    if request.method == "POST":

        title = request.POST.get("title")
        description = request.POST.get("description")
        assigned_to_id = request.POST.get("assigned_to")
        priority = request.POST.get("priority")
        due_date = request.POST.get("due_date")

        if not title:
            return render(
                request,
                "projects/create_task.html",
                {
                    "project": project,
                    "members": project.members.all(),
                    "error": "Task title is required.",
                }
            )

        assigned_to = None

        if assigned_to_id:
            assigned_to = get_object_or_404(
                User,
                id=assigned_to_id
            )

        Task.objects.create(
            project=project,
            title=title,
            description=description,
            assigned_to=assigned_to,
            created_by=request.user,
            priority=priority or "medium",
            due_date=due_date or None,
        )

        return redirect(
            "project_board",
            project_id=project.id
        )

    return render(
        request,
        "projects/create_task.html",
        {
            "project": project,
            "members": project.members.all(),
        }
    )

@login_required
def update_task_status(request, task_id):

    task = get_object_or_404(Task, id=task_id)

    if (
        request.user != task.project.owner
        and not task.project.members.filter(id=request.user.id).exists()
    ):
        return redirect("dashboard")

    if request.method == "POST":

        status = request.POST.get("status")

        valid_statuses = ["todo", "in_progress", "done"]

        if status in valid_statuses:
            task.status = status
            task.save()

    return redirect(
        "project_board",
        project_id=task.project.id
    )

@login_required
def add_task_comment(request, task_id):

    task = get_object_or_404(
        Task,
        id=task_id
    )

    # Sirf project owner ya project member comment kar sakta hai
    if (
        request.user != task.project.owner
        and not task.project.members.filter(id=request.user.id).exists()
    ):
        return redirect("dashboard")

    if request.method == "POST":

        text = request.POST.get("text", "").strip()

        if text:
            Comment.objects.create(
                task=task,
                user=request.user,
                text=text
            )

    return redirect(
        "project_board",
        project_id=task.project.id
    )

@login_required
def add_project_member(request, project_id):

    project = get_object_or_404(
        Project,
        id=project_id
    )

    # Sirf project owner members add kar sakta hai
    if request.user != project.owner:
        return redirect(
            "project_board",
            project_id=project.id
        )

    if request.method == "POST":

        user_id = request.POST.get("user_id")

        user = get_object_or_404(
            User,
            id=user_id
        )

        project.members.add(user)

        Notification.objects.create(
    user=user,
    message=f"{request.user.username} added you to project '{project.name}'."
)

    return redirect(
        "project_board",
        project_id=project.id
    )

@login_required
def projects_list(request):
    projects = request.user.projects.all()

    return render(request, "projects/projects_list.html", {
        "projects": projects,
    })


@login_required
def my_tasks(request):
    tasks = Task.objects.filter(
        assigned_to=request.user
    ).select_related(
        "project"
    ).order_by(
        "status",
        "-created_at"
    )

    return render(request, "projects/my_tasks.html", {
        "tasks": tasks,
    })

@login_required
def add_project_member_from_team(request):

    if request.method == "POST":

        project_id = request.POST.get("project_id")
        user_id = request.POST.get("user_id")

        project = get_object_or_404(
            Project,
            id=project_id
        )

        # Sirf project owner member add kar sakta hai
        if request.user != project.owner:
            return redirect("team")

        user = get_object_or_404(
            User,
            id=user_id
        )

        # User ko project me add karo
        project.members.add(user)

    return redirect("team")



@login_required
def team(request):

    projects = (
        Project.objects.filter(
            Q(owner=request.user) |
            Q(members=request.user)
        )
        .distinct()
    )

    members = User.objects.filter(
        projects__in=projects
    ).distinct()

    available_users = User.objects.exclude(
        id=request.user.id
    )

    return render(
        request,
        "projects/team.html",
        {
            "members": members,
            "projects": projects,
            "available_users": available_users,
        }
    )



@login_required
def search_projects(request):

    query = request.GET.get("q", "").strip()

    projects = request.user.projects.all()

    if query:
        projects = projects.filter(
            Q(name__icontains=query) |
            Q(description__icontains=query)
        )

    return render(request, "projects/search_results.html", {
        "projects": projects,
        "query": query,
    })

@login_required
def notifications(request):

    notifications = request.user.notifications.all().order_by(
        "-created_at"
    )

    return render(
        request,
        "projects/notifications.html",
        {
            "notifications": notifications,
        }
    )


@login_required
def remove_team_member(request, user_id):

    user = get_object_or_404(
        User,
        id=user_id
    )

    # Apne aap ko remove nahi kar sakte
    if user == request.user:
        return redirect("team")

    # Current user ke owned projects se is member ko remove karo
    projects = Project.objects.filter(
        owner=request.user,
        members=user
    )

    for project in projects:
        project.members.remove(user)

    return redirect("team")


@login_required
def remove_project_member(request, project_id, user_id):

    project = get_object_or_404(
        Project,
        id=project_id
    )

    # Sirf project owner member remove kar sakta hai
    if request.user != project.owner:
        return redirect(
            "project_board",
            project_id=project.id
        )

    user = get_object_or_404(
        User,
        id=user_id
    )

    # Owner ko remove nahi kar sakte
    if user == project.owner:
        return redirect(
            "project_board",
            project_id=project.id
        )

    project.members.remove(user)

    return redirect(
        "project_board",
        project_id=project.id
    )