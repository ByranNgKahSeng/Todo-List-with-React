from django.db import models
from django.utils import timezone

class Todo(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    deadline = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title

class CompletedTodo(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    completed_time = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title
