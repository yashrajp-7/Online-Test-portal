from django.urls import path
from .views import ques,home,questionset

urlpatterns = [
   
    path('', ques, name='ques'),
    path('home/', home, name='home'),
    path('questionset/',questionset,name='set'),
]