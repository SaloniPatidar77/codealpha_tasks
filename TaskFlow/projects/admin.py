from django.contrib import admin
from .models import Project, Task, Comment


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "owner",
        "created_at",
    )

    search_fields = (
        "name",
        "owner__username",
    )


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "project",
        "assigned_to",
        "status",
        "priority",
        "due_date",
        "created_at",
    )

    list_filter = (
        "status",
        "priority",
    )

    search_fields = (
        "title",
        "project__name",
        "assigned_to__username",
    )


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = (
        "task",
        "user",
        "created_at",
    )

    search_fields = (
        "task__title",
        "user__username",
        "text",
    )