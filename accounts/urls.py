from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='accounts_home'),
    path('signup/', views.signup, name='signup'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('profile/', views.profile, name='profile'),
    path('profile/edit/', views.edit_profile, name='edit_profile'),
    path('follow/<int:user_id>/', views.follow_user, name='follow_user'),
    path('edit-profile/', views.edit_profile, name='edit_profile'),
    path('user/<str:username>/', views.user_profile, name='user_profile'),
    path('search/', views.search_users, name='search_users'),
    path('notifications/', views.notifications, name='notifications'),
]
