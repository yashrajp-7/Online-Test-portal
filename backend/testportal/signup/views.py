from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from .models import Student
from django.http import JsonResponse
from rest_framework.response import Response
from .forms import SignupForm







# Create your views here.
@api_view(['GET', 'POST'])
@csrf_exempt 
def signup(request):
    if(request.method == 'POST'):
        a=Student.objects.filter(email=request.POST.get('email')).count()
        if(a==0):
            form=SignupForm(request.POST)
            if form.is_valid():
                form.save()
                res=Student.objects.all().values()
                print(res)
                return JsonResponse({'message':"sucessfully signed up!!!"})
            else:
                return JsonResponse({'error': 'Enter correct data.'},status=400)
        else:
            return JsonResponse({'error': 'Email ID already exists.'},status=400)
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
        res.save()
        res=Student.objects.all().values()
        print(res)
        return JsonResponse({'message':"sucessfully submitted!!!"})
    else:
        return JsonResponse({'error': 'Need POST request.'},status=400)