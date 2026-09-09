from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from posts.models import Post
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import Follow ,  Notification
from django.shortcuts import render, redirect, get_object_or_404



def home(request):
    return HttpResponse("Loopup Accounts Working!")
def signup(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        if User.objects.filter(username__iexact=username).exists():
         messages.error(request, 'Username already exists.')
         return redirect('signup')

        User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        messages.success(request, 'Account created successfully!')
        return redirect('accounts_home')

    return render(request, 'accounts/signup.html')

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('feed')

        messages.error(request, 'Invalid username or password.')
        return redirect('login')

    return render(request, 'accounts/login.html')

def logout_view(request):
    logout(request)
    messages.success(request, 'You have been logged out successfully.')
    return redirect('login')

@login_required
def profile(request):
    profile = request.user.profile

    followers = request.user.followers.all()
    following = request.user.following.all()

    post_count = Post.objects.filter(
        author=request.user
    ).count()

    user_posts = Post.objects.filter(
        author=request.user
    ).order_by('-created_at')

    return render(request, 'accounts/profile.html', {
        'profile': profile,
        'post_count': post_count,
        'user_posts': user_posts,
        'followers': followers,
        'following': following,
    })

@login_required
def user_profile(request, username):
    user = get_object_or_404(User, username=username)
    profile = user.profile

    post_count = Post.objects.filter(
        author=user
    ).count()

    user_posts = Post.objects.filter(
        author=user
    ).order_by('-created_at')

    is_following = Follow.objects.filter(
        follower=request.user,
        following=user
    ).exists()

    followers = user.followers.all()
    following = user.following.all()

    return render(request, 'accounts/user_profile.html', {
        'profile': profile,
        'post_count': post_count,
        'user_posts': user_posts,
        'is_following': is_following,
        'followers': followers,
        'following': following,
    })

@login_required
def edit_profile(request):
    profile = request.user.profile

    if request.method == 'POST':
        bio = request.POST.get('bio')
        profile.bio = bio
        profile.save()

        messages.success(request, 'Profile updated successfully!')
        return redirect('profile')

    return render(request, 'accounts/edit_profile.html', {
        'profile': profile
    })

@login_required
def follow_user(request, user_id):
    user_to_follow = get_object_or_404(User, id=user_id)

    if user_to_follow != request.user:
        follow, created = Follow.objects.get_or_create(
            follower=request.user,
            following=user_to_follow
        )

        if not created:
            follow.delete()

    return redirect('user_profile', username=user_to_follow.username)

@login_required
def edit_profile(request):
    profile = request.user.profile
    

    if request.method == 'POST':
        bio = request.POST.get('bio')
        profile_image = request.FILES.get('profile_image')

        profile.bio = bio

        if profile_image:
            profile.profile_image = profile_image

        profile.save()

        return redirect('profile')

    return render(request, 'accounts/edit_profile.html', {
        'profile': profile
    })

@login_required
def search_users(request):
    query = request.GET.get('q', '')

    users = User.objects.filter(
        username__icontains=query
    )

    return render(request, 'accounts/search_users.html', {
        'users': users,
        'query': query
    })

@login_required
def follow_user(request, user_id):
    user_to_follow = get_object_or_404(User, id=user_id)

    if user_to_follow != request.user:
        follow, created = Follow.objects.get_or_create(
            follower=request.user,
            following=user_to_follow
        )

        if created:
            Notification.objects.create(
                recipient=user_to_follow,
                sender=request.user,
                message=f"{request.user.username} started following you"
            )
        else:
            follow.delete()

    return redirect(
        'user_profile',
        username=user_to_follow.username
    )

@login_required
def notifications(request):
    notifications = Notification.objects.filter(
        recipient=request.user
    ).order_by('-created_at')

    Notification.objects.filter(
        recipient=request.user,
        is_read=False
    ).update(is_read=True)

    return render(request, 'accounts/notifications.html', {
        'notifications': notifications
    })