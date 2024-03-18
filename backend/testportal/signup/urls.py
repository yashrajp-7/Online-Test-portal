from django.urls import path
from .views import signup,submit

urlpatterns = [
   
    path('', signup, name='signup'),
    path('answer/', submit, name='submit'),
    
]