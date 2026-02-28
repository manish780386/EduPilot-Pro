from django.urls import path
from .views import TeacherRegisterView, TeacherLoginView

urlpatterns = [
    path("teacher/register/",TeacherRegisterView.as_view()),
    path("teacher/login/",TeacherLoginView.as_view()),
]