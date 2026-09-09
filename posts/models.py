from django.db import models
from django.contrib.auth.models import User


class Post(models.Model):
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='posts'
    )

    content = models.TextField(blank=True)

    image = models.ImageField(
        upload_to='posts/images/',
        blank=True,
        null=True
    )

    video = models.FileField(
        upload_to='posts/videos/',
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.author.username} - {self.created_at}"

class PostLike(models.Model):
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name='likes'
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='post_likes'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['post', 'user'],
                name='unique_post_like'
            )
        ]

    def __str__(self):
        return f"{self.user.username} liked Post {self.post.id}"    

class Comment(models.Model):
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name='comments'
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='comments'
    )

    text = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}: {self.text[:30]}"    