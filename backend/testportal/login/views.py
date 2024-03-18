from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from .models import Login
from django.http import JsonResponse
from rest_framework.response import Response
import pandas as pd
from django.conf import settings
from django.core.mail import send_mail
import  random
from quizquestions.models import Questions

# Create your views here.
@api_view(['GET', 'POST'])
@csrf_exempt 
def admin(request):
   if(request.method == 'GET'):
      res=Login.objects.filter(email=request.GET.get("email")).count()
      if(res==0):
         return JsonResponse({'error': 'User not found.'},status=400)
      else:
         res=Login.objects.filter(email=request.GET.get("email")).values()
         data=res[0]
         if(data['password']==request.GET.get("password")):
            return JsonResponse({'message':"valid admin!!!"})
         else:
            return JsonResponse({'error': 'Invalid Username or Password!!!'},status=400)
   else:
      return JsonResponse({'error': 'Need GET request.'},status=400)

@api_view(['GET', 'POST'])
@csrf_exempt 
def client(request):
   if(request.method == 'GET'):
      res=Login.objects.filter(email=request.GET.get("email")).count()
      if(res==0):
         return JsonResponse({'error': 'User not found.'},status=400)
      else:
         res=Login.objects.filter(email=request.GET.get("email")).values()
         data=res[0]
         if(data['password']==request.GET.get("password")):
            return JsonResponse({'message':"valid client!!!"})
         else:
            return JsonResponse({'error': 'Invalid Username or Password!!!'},status=400)
   else:
      return JsonResponse({'error': 'Need GET request.'},status=400)
   





def send(email,username,password):
    subject = 'welcome to Whirlpool Test Portal'
    message = f'Hi {username},\n Your Login Id: {email}\n Your Password: {password}\n ALL THE BEST FOR TEST \n Thank You'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email, ]
    send_mail( subject, message, email_from, recipient_list )
    return

@api_view(['GET', 'POST'])
@csrf_exempt 
def home(request):
   if(request.method == 'POST'):
      print(request.FILES['email'])
      df = pd.read_excel(request.FILES['email'])
      print(df)
      for i in range(len(df)):
         password =random.randint(1000,99999)
         res=Login.objects.filter(email=df.iloc[i, 0]).count()
         if(res==0):
            query=Login(email=df.iloc[i, 0],password=password)
            query.save()
            send(df.iloc[i, 0],df.iloc[i, 1],password)
         else:
            print("email exists!!")
      print(Login.objects.all().values())
      print(request.FILES['question'])
      df = pd.read_excel(request.FILES['question'])
      print(df)
      depart=dict()
      depart["B.Tech Mechanical Engineering"]="BME"
      depart["B.Tech Computer science/ IT"]="BCSE"
      depart["B.Tech Electronics & Telecomm"]="BET"
      depart["B.Tech Electrical/Electronics"]="BEE"
      depart["M.Tech Mechanical Engineering"]="MME"
      depart["M.Tech Computer science/ IT"]="MCSE"
      depart["M.Tech Electronics & Telecomm"]="MET"
      depart["M.Tech Electrical/Electronics"]="MEE"
      for i in range(len(df)):
         query=Questions(question=df.iloc[i, 0],option1=df.iloc[i, 1],option2=df.iloc[i, 2],option3=df.iloc[i, 3],option4=df.iloc[i, 4],answer=df.iloc[i, 5],department=depart[df.iloc[i, 6]])
         query.save()
      print(Questions.objects.all().values())
      return JsonResponse({'message':"send email and questions saved successfully!!!"})
   else:
      return JsonResponse({'error': 'Need POST request.'},status=400)
