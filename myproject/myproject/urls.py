from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from classroom.views import ClassroomViewSet, SubjectViewSet
from students.views import StudentViewSet
from attendance.views import AttendanceViewSet

router = DefaultRouter()
router.register("classrooms", ClassroomViewSet)
router.register("subjects", SubjectViewSet)
router.register("students", StudentViewSet)
router.register("attendance", AttendanceViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("account.urls")),  # ✅ sab API endpoints
    path("api/", include(router.urls)),  # ✅ sab API endpoints
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)