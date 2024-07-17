from django.urls import path
from account import views
from rest_framework_simplejwt.views import TokenObtainPairView


urlpatterns = [

    # user
    path('register/', views.UserRegisterView.as_view(), name="register-page"),
    path('login/', views.MyTokenObtainPairView.as_view(), name="login-page"),
    path('user/<int:pk>/', views.UserAccountDetailsView.as_view(), name="user-details"),
    path('user_update/<int:pk>/', views.UserAccountUpdateView.as_view(), name="user-update"),
    path('user_delete/<int:pk>/', views.UserAccountDeleteView.as_view(), name="user-delete"),
]
    