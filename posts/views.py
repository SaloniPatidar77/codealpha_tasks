from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from .models import Post
from django.shortcuts import render, redirect, get_object_or_404
from .models import Post, PostLike
from .models import Post, PostLike, Comment


@login_required
def create_post(request):
    if request.method == 'POST':
        content = request.POST.get('content')
        image = request.FILES.get('image')
        video = request.FILES.get('video')

        Post.objects.create(
            author=request.user,
            content=content,
            image=image,
            video=video
        )

        return redirect('feed')

    return render(request, 'posts/create_post.html')

@login_required
def feed(request):
    posts = Post.objects.all().order_by('-created_at')

    for post in posts:
        post.user_liked = post.likes.filter(user=request.user).exists()

    return render(request, 'posts/feed.html', {
        'posts': posts
    })

@login_required
def delete_post(request, post_id):
    post = get_object_or_404(Post, id=post_id)

    # Sirf post ka owner delete kar sakta hai
    if post.author == request.user:
        post.delete()

    return redirect('feed')

@login_required
def like_post(request, post_id):
    post = get_object_or_404(Post, id=post_id)

    like, created = PostLike.objects.get_or_create(
        post=post,
        user=request.user
    )

    if not created:
        like.delete()

    return redirect('feed')

@login_required
def add_comment(request, post_id):
    post = get_object_or_404(Post, id=post_id)

    if request.method == 'POST':
        text = request.POST.get('text')

        if text:
            Comment.objects.create(
                post=post,
                user=request.user,
                text=text
            )

    return redirect('feed')

@login_required
def delete_comment(request, comment_id):
    comment = get_object_or_404(Comment, id=comment_id)

    # Sirf comment ka owner delete kar sakta hai
    if comment.user == request.user:
        comment.delete()

    return redirect('feed')