from django.contrib import admin

from .models import Profile, Follow, Notification


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'bio',
        'profile_image',
    )

    search_fields = (
        'user__username',
        'user__email',
    )


@admin.register(Follow)
class FollowAdmin(admin.ModelAdmin):
    list_display = (
        'follower',
        'following',
        'created_at',
    )

    search_fields = (
        'follower__username',
        'following__username',
    )


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = (
        'recipient',
        'sender',
        'message',
        'created_at',
        'is_read',
    )

    search_fields = (
        'recipient__username',
        'sender__username',
        'message',
    )