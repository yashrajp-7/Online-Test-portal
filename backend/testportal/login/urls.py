from django.urls import path
from .views import login,tempLogin,showpass,ChangePassword

urlpatterns = [
   
    path('', tempLogin, name='login'),
    path('admin/', login, name='adminlogin'),
    path('showpass/',showpass,name="showpass"),
    path('changepass/', ChangePassword, name='changepass'),
    
]