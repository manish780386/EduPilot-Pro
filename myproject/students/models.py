from django.db import models
from classroom.models import Classroom

class Student(models.Model):

    roll_no = models.CharField(max_length=20)
    name = models.CharField(max_length=100)
    father_name = models.CharField(max_length=100)
    mother_name = models.CharField(max_length=100)

    phone = models.CharField(max_length=15)
    email = models.EmailField(blank=True, null=True)

    age = models.IntegerField()
    gender = models.CharField(max_length=10)

    city = models.CharField(max_length=100)
    address = models.TextField()

    image = models.ImageField(upload_to="students/", blank=True, null=True)

    classroom = models.ForeignKey(
        Classroom,
        on_delete=models.SET_NULL,
        null=True,
        related_name="students"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name