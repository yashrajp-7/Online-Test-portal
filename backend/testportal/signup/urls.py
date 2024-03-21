from django.urls import path
from .views import signup,submit,resultfile

urlpatterns = [
   
    path('', signup, name='signup'),
    path('answer/', submit, name='submit'),
    path('result/', resultfile, name='result'),
    
]