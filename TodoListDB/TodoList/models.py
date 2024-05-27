from django.db import models

class Task(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed'),
    ]

    PRIORITY_CHOICES = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
    ]

    RISK_CHOICES = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    start_time = models.DateTimeField()
    duration_value = models.PositiveIntegerField(default='0')  # Store the value part of duration
    duration_unit = models.CharField(max_length=20, default='Minutes')  # Store the unit part of duration
    due_time = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='Medium')
    risk = models.CharField(max_length=20, choices=RISK_CHOICES, default='Medium')
    effort = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title
