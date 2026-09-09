from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.shortcuts import render


def signup(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")

        if User.objects.filter(username__iexact=username).exists():
            messages.error(request, "Username already exists.")
            return redirect("signup")

        User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        messages.success(
            request,
            "Account created successfully!"
        )

        return redirect("login")

    return render(request, "accounts/signup.html")


def login_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(
            request,
            username=username,
            password=password
        )

        if user is not None:
            login(request, user)
            return redirect("dashboard")

        messages.error(
            request,
            "Invalid username or password."
        )

        return redirect("login")

    return render(request, "accounts/login.html")


def logout_view(request):
    logout(request)
    return redirect("login")

@login_required
def settings_view(request):
    return render(request, "accounts/settings.html")