from django.urls import path
from . import views

urlpatterns = [
    path(
        "dashboard/",
        views.dashboard,
        name="dashboard"
    ),

    path(
        "create/",
        views.create_project,
        name="create_project"
    ),

    path(
        "project/<int:project_id>/",
        views.project_board,
        name="project_board"
    ),

    path(
        "project/<int:project_id>/create-task/",
        views.create_task,
        name="create_task"
    ),

    path(
    "task/<int:task_id>/status/",
    views.update_task_status,
    name="update_task_status"
),

path(
    "task/<int:task_id>/comment/",
    views.add_task_comment,
    name="add_task_comment"
),

path(
    "project/<int:project_id>/add-member/",
    views.add_project_member,
    name="add_project_member"
),

path(
    "projects/",
    views.projects_list,
    name="projects_list"
),

path(
    "my-tasks/",
    views.my_tasks,
    name="my_tasks"
),


path(
    "search/",
    views.search_projects,
    name="search_projects"
),

path(
    "notifications/",
    views.notifications,
    name="notifications"
),

path(
    "team/",
    views.team,
    name="team"
),

path(
    "team/add-member/",
    views.add_project_member_from_team,
    name="add_project_member_from_team"
),

path(
    "team/remove-member/<int:user_id>/",
    views.remove_team_member,
    name="remove_team_member"
),

path(
    "project/<int:project_id>/remove-member/<int:user_id>/",
    views.remove_project_member,
    name="remove_project_member"
),
]