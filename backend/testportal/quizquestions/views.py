from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from .models import Questions
from django.http import JsonResponse
from rest_framework.response import Response
import pandas as pd
from quizquestions.models import Questions, PrevQuestionPaperSet
import datetime
import json
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
   

@api_view(['GET', 'POST'])
@csrf_exempt 
def home(request):
   if(request.method == 'POST'):
      df = pd.read_excel(request.FILES['question'])
      print(request.FILES['question'].name)
      stream = request.POST.get('stream')
      branch = request.POST.get('branch')
      date=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
      fileSave = PrevQuestionPaperSet(date=date, filename=request.FILES['question'],stream=stream,branch=branch)
      fileSave.save()
      Questions.objects.filter(stream=stream, branch=branch).delete()
      for i in range(len(df)):
         query=Questions(date=date,filename=request.FILES['question'].name,question=df.iloc[i, 0],option1=df.iloc[i, 1],option2=df.iloc[i, 2],option3=df.iloc[i, 3],option4=df.iloc[i, 4],answer=df.iloc[i, 5],stream=stream,branch=branch)
         query.save()
      return JsonResponse({'message':"questions saved successfully!!!"})
   else:
      return JsonResponse({'error': 'Need POST request.'},status=400)


@api_view(['GET', 'POST'])
@csrf_exempt 
def questionset(request):
   if(request.method == "GET"):
        queryset = PrevQuestionPaperSet.objects.all().values()
        res=[]
        for i in queryset:
            d={
                "Date":i['date'],
                "Filename":i['filename'],
                "Stream":i['stream'],
                "Branch":i['branch'],
                "Ques_Link":("http://127.0.0.1:8000/media/" + i['filename'])
               #  "Ques_Link":("http://127.0.0.1:8000/media/"+i['prevfiles'])
            } 
            res.append(d)
     
        return JsonResponse({'message':res})