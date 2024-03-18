
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
      res=list(Questions.objects.filter(department=request.GET.get("stream")).values())
      print(res)
      return JsonResponse({'data':res})
   else:
      return JsonResponse({'error': 'Need GET request.'},status=400)