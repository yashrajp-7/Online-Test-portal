from django.urls import path
from .views import login,home,tempLogin,showpass,ChangePassword

urlpatterns = [
   
    path('', tempLogin, name='login'),
    path('admin/', login, name='adminlogin'),
    path('showpass/',showpass,name="showpass"),
    path('home/', home, name='home'),
    path('changepass/', ChangePassword, name='changepass'),
    
]