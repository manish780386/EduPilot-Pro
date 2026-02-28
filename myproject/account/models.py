from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    mobile = models.CharField(max_length=15)
    role = models.CharField(max_length=10, default="teacher")

    def save(self, *args, **kwargs):
        self.role = "teacher"  # Force teacher only
        super().save(*args, **kwargs)