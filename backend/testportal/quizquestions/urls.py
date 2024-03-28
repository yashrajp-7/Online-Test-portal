from django.urls import path
from .views import ques,home

urlpatterns = [
   
    path('', ques, name='ques'),
    path('home/', home, name='home'),
]