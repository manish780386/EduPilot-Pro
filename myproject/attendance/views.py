from rest_framework.viewsets import ModelViewSet
from .models import Attendance
from .serializers import AttendanceSerializer

class AttendanceViewSet(ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer