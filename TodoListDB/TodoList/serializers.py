from rest_framework import serializers
from .models import Todo, CompletedTodo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'title', 'description', 'deadline']

class CompletedTodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompletedTodo
        fields = ['id', 'title', 'description', 'completed_time']