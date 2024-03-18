from django.urls import path
from .views import admin,client,home

urlpatterns = [
   
    path('admin/', admin, name='admin'),
    path('client/', client, name='client'),
    path('home/', home, name='home'),
    
]