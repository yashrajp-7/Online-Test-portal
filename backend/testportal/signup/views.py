from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from .models import Student
from login.models import Login
from django.http import JsonResponse
from rest_framework.response import Response
from .forms import SignupForm
from django.forms import model_to_dict
import pandas as pd
from django.http import HttpResponse





# Create your views here.
@api_view(['GET', 'POST'])
@csrf_exempt 
def signup(request):
    if(request.method == 'POST'):
        a=Student.objects.filter(email=request.POST.get('email')).count()
        print(request.FILES)
        if(a==0):
            form=SignupForm(request.POST,request.FILES)
            if form.is_valid():
                form.save()
                res=Student.objects.all().values()
                print(res)
                return JsonResponse({'message':"sucessfully signed up!!!"})
            else:
                print(2)
                return JsonResponse({'error': 'Enter correct data.'},status=400)
        else:
            print(1)
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
        res2=Login.objects.get(email=request.POST.get("email"))
        res2.test_taken=data['test_taken']
        res2=Login.objects.all().values()
        print(res2)
        return JsonResponse({'message':"sucessfully submitted!!!"})
    else:
        return JsonResponse({'error': 'Need POST request.'},status=400)
    

@api_view(['GET', 'POST'])
@csrf_exempt 
def resultfile(request):
    if(request.method == "GET"):
        queryset = Student.objects.all().values()
        name=[]
        collegename=[]
        branch=[]
        email=[]
        gender=[]
        highestdegree=[]
        phone=[]
        sfid=[]
        testdegree=[]
        teststream=[]
        score=[]
        testtaken=[]
        resumeurl=[]
        for i in queryset:
            name.append(i['name'])
            collegename.append(i['college_name'])
            branch.append(i['branch'])
            email.append(i['email'])
            gender.append(i['gender'])
            highestdegree.append(i['highestdegree'])
            phone.append(i['phone_no'])
            sfid.append(i['SFID'])
            testdegree.append(i['degree'])
            teststream.append(i['stream'])
            score.append(i['score'])
            testtaken.append(i['test_taken'])
            resumeurl.append(("http://127.0.0.1:8000/media/"+i['resume']))
        dict = {'Name':name,"College Name":collegename,"Branch":branch,"Email ID":email,"Gender":gender,"Highest Degree and Specialization":highestdegree,"Phone Number":phone,"SFID":sfid,"Test_Taken_Degree":testdegree,"Test_Taken_Stream":teststream,"Test_Taken":testtaken,"Score":score,"Resume Link":resumeurl} 
        
        df = pd.DataFrame(dict)
        print(df)
        df.to_excel("./media/excel/res.xlsx",index=False)
        with open("./media/excel/res.xlsx",'rb') as e:
            response=HttpResponse(e.read(),content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            response['Content-Disposition']='attachment; filename="res.xlsx"'
            return response
        # return JsonResponse({'message':"sucessfully result!!!"})