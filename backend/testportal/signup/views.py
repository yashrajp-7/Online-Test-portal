from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from .models import Student
from login.models import Login
from django.http import JsonResponse
from rest_framework.response import Response
from .forms import SignupForm
import pandas as pd
from django.http import HttpResponse


# Create your views here.
@api_view(['GET', 'POST'])
@csrf_exempt 
def signup(request):
    if(request.method == 'POST'):
        a=Student.objects.filter(email=request.POST.get('email')).count()
        b=Student.objects.filter(rollno=request.POST.get('rollno')).count()
        if(a==0 and b == 0):
            form=SignupForm(request.POST,request.FILES)
            if form.is_valid():
                form.save()
                res=Student.objects.all().values()
                print(res)
                return JsonResponse({'message':"sucessfully signed up!!!"})
            else:
                return JsonResponse({'error': 'Enter correct data.'},status=400)
        elif(a==1):
            res=Student.objects.filter(email=request.POST.get('email')).values()
            data=res[0]
            if(data['test_taken']):
                return JsonResponse({'message':"Your Test is done!!!"})
            return JsonResponse({'message':"Email exists!!!"})
    else:
      return JsonResponse({'error': 'Need POST request.'},status=400)


@api_view(['GET', 'POST'])
@csrf_exempt 
def submit(request):
    if(request.method == 'POST'):
        res=Student.objects.get(email=request.POST.get("email"))
        data=request.data
        res.score=data['score']
        res.test_taken=data['test_taken']
        res.tabSwitchCount=data['TabSwitchCount']
        res.save()
        res=Student.objects.all().values()
        return JsonResponse({'message':"sucessfully submitted!!!"})
    else:
        return JsonResponse({'error': 'Need POST request.'},status=400)
    

@api_view(['GET', 'POST'])
@csrf_exempt 
def resultfile(request):
    if(request.method == "GET"):
        queryset = Student.objects.all().values()
        res=[]
        
        for i in queryset:
            d={
                'Name':i['name'],
                "College_Name":i['college_name'],
                "Rollno":i['rollno'],
                "EmailID":i['email'],
                "Gender":i['gender'],
                "Highest_Degree_and_Specialization":i['highestdegree'],
                "Phone_Number":i['phone_no'],
                "SFID":i['SFID'],
                "Stream":i['stream'],
                "Branch":i['branch'],
                "Test_Taken":i['test_taken'],
                "Score":i['score'],
                'TabSwitchCount':i['tabSwitchCount'],
                "Resume_Link":("http://127.0.0.1:8000/media/"+i['resume'])
            }
            res.append(d)
     
        return JsonResponse({'message':res})