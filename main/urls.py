from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/terminal/', views.terminal_api, name='terminal_api'),
]
