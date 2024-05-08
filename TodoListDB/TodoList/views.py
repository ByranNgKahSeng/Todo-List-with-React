from rest_framework import viewsets
from .models import Todo, CompletedTodo
from .serializers import TodoSerializer, CompletedTodoSerializer

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class CompletedTodoViewSet(viewsets.ModelViewSet):
    queryset = CompletedTodo.objects.all()
    serializer_class = CompletedTodoSerializer