from django.urls import path
from . import views
from django.contrib.auth import views as auth_views


urlpatterns = [
    path("signup/", views.signup, name="signup"),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path(
    "settings/",
    views.settings_view,
    name="settings"
),
path(
    "change-password/",
    auth_views.PasswordChangeView.as_view(
        template_name="accounts/change_password.html",
        success_url="/accounts/settings/"
    ),
    name="password_change",
),
]