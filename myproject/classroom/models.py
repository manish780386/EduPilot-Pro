from django.db import models

class Classroom(models.Model):
    class_name = models.CharField(max_length=100)
    section = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.class_name} - {self.section}"


class Subject(models.Model):
    subject_name = models.CharField(max_length=100)
    classroom = models.ForeignKey(
        Classroom,
        on_delete=models.CASCADE,
        related_name="subjects"
    )

    def __str__(self):
        return self.subject_name