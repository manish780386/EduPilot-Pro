from rest_framework.viewsets import ModelViewSet
from .models import Classroom, Subject
from .serializers import ClassroomSerializer, SubjectSerializer

class ClassroomViewSet(ModelViewSet):
    queryset = Classroom.objects.all()
    serializer_class = ClassroomSerializer


class SubjectViewSet(ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer