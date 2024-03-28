from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from .models import Login
from .models import TempLogin
from django.http import JsonResponse


# Create your views here.
@api_view(['GET', 'POST'])
@csrf_exempt 
def login(request):
   if(request.method == 'GET'):
      res=Login.objects.filter(email=request.GET.get("email")).count()
      if(res==0):
         return JsonResponse({'error': 'User not found.'},status=400)
      else:
         res=Login.objects.filter(email=request.GET.get("email")).values()
         data=res[0]
         if(data['password']==request.GET.get("password")):
            if(data['admin']):
               return JsonResponse({'message':"valid admin!!!"})
            else:
               return JsonResponse({'error': 'Your not admin!!!'},status=400)
         else:
            return JsonResponse({'error': 'Invalid Username or Password!!!'},status=400)
   else:
      return JsonResponse({'error': 'Need GET request.'},status=400)


   








@api_view(['GET', 'POST'])
@csrf_exempt 
def tempLogin(request):
   if(request.method == 'GET'):
      res=TempLogin.objects.filter(tempID=request.GET.get("tempid")).count()
      if(res==0):
         return JsonResponse({'error': 'User not found.'},status=400)
      else:
         res=TempLogin.objects.filter(tempID=request.GET.get("tempid")).values()
         data=res[0]
         if(data['password']==request.GET.get("password")):
               return JsonResponse({'message':"valid student!"})
         else:
            return JsonResponse({'error': 'Invalid Username or Password!'}, status=400)
   else:
      return JsonResponse({'error': 'Need GET request.'}, status=400) 
   
@api_view(['GET', 'POST'])
@csrf_exempt 
def ChangePassword(request):
   if request.method == 'POST':
      username = request.POST.get('tempid')
      new_tempid=request.POST.get('newtempid')
      new_password = request.POST.get('newpassword')
      user = TempLogin.objects.filter(tempID=username).first()
      if user:
         user.delete()
         new=TempLogin(tempID=new_tempid,password = new_password)
         new.save()
         return JsonResponse({'message': 'TempID and Password updated successfully!'})
      else:
         return JsonResponse({'error': 'User not found.'}, status=400)
   else:
      return JsonResponse({'error': 'Unsupported request method.'}, status=400)

@api_view(['GET', 'POST'])
@csrf_exempt 
def showpass(request):
   if request.method == 'GET':
      res=TempLogin.objects.all().values()

      return JsonResponse({'message': res[0]})
   else:
      return JsonResponse({'error': 'Unsupported request method.'}, status=400)