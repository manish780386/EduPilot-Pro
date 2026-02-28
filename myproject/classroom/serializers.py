from rest_framework import serializers
from .models import Classroom, Subject

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'subject_name', 'classroom']

class ClassroomSerializer(serializers.ModelSerializer):
    # ✅ Nested subjects
    subjects = SubjectSerializer(many=True, read_only=True)

    class Meta:
        model = Classroom
        fields = ['id', 'class_name', 'section', 'subjects']