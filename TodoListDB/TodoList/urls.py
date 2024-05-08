from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoViewSet, CompletedTodoViewSet

router = DefaultRouter()
router.register(r'todos', TodoViewSet)
router.register(r'completed_todos', CompletedTodoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]