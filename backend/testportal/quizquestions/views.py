
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from .models import Questions
from django.http import JsonResponse
from rest_framework.response import Response

# Create your views here.
@api_view(['GET', 'POST'])
@csrf_exempt 
def ques(request):
   if(request.method == 'GET'):
      res=list(Questions.objects.filter(stream=request.GET.get("stream"),branch=request.GET.get("branch")).values())
      result=list()
      for i in res:
         d=dict()
         d['question']=i['question']
         l=list()
         l.append(i['option1'])
         l.append(i['option2'])
         l.append(i['option3'])
         l.append(i['option4'])
         d['options']=l
         d['answer']=i['answer']
         result.append(d)
      print(result)
         
      return JsonResponse({'data':result})
   else:
      return JsonResponse({'error': 'Need GET request.'},status=400)