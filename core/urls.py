from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('projects/', views.projects, name='projects'),
    path('projects/<str:category>/', views.project_list_by_country, name='project_list_by_country'),
    path('work/<int:pk>/', views.artwork_detail, name='artwork_detail'),
    path('activities/', views.activity_list, name='activity_list'),
    path('activities/<slug:slug>/', views.activity_detail, name='activity_detail'),
    path('about/', views.about, name='about'),
    path('artist/<int:pk>/', views.artist_detail, name='artist_detail'),
]
