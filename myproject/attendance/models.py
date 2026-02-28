from django.db import models
from students.models import Student
from classroom.models import Classroom, Subject

class Attendance(models.Model):

    STATUS = (
        ("Present", "Present"),
        ("Absent", "Absent"),
    )

    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name="attendance"
    )

    classroom = models.ForeignKey(
        Classroom,
        on_delete=models.CASCADE
    )

    subject = models.ForeignKey(
        Subject,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS)

    def __str__(self):
        return f"{self.student.name} - {self.date}"