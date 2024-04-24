from django.db import models
from django.utils import timezone
choice=(
    ("B.Tech","B.Tech"),
    ("M.Tech","M.Tech"),
    ("M.S","M.S"),
    ("B.Des","B.Des"),
    ("M.Des","M.Des")
    )
choice2=(
    ("Applied Mechanics(Fluid Mechanics)","Applied Mechanics(Fluid Mechanics)"),
    ("Artificial Intelligence & Machine Learning","Artificial Intelligence & Machine Learning"),
    ("Computer Science Engineering","Computer Science Engineering"),
    ("Design Engineering","Design Engineering"),
    ("Electronics & Telecommunication Engineering","Electronics & Telecommunication Engineering"),
    ("Manufacturing Engineering and Industrial Management","Manufacturing Engineering and Industrial Management"),
    ("Manufacturing Solutions","Manufacturing Solutions"),
    ("Mechanical and Aerospace Engineering", "Mechanical and Aerospace Engineering"),
    ("Mechanical Engineering","Mechanical Engineering"),
    ("Computer Engineering","Computer Engineering"),
    ("Mechanics & Design","Mechanics & Design"),
    ("Power Electronics & Power Systems","Power Electronics & Power Systems"),
    ("Thermal Engineering","Thermal Engineering"),
    ("Mechanical","Mechanical"),
    ("Industrial","Industrial"),
    ("Production","Production"),
    ("Instrumentation","Instrumentation"),
    ("Chemical","Chemical"),
    ("Computer Science","Computer Science"),
    ("Information Technology","Information Technology"),
    ("Electronics & Telecommunication","Electronics & Telecommunication"),
    ("Product Design","Product Design"),
    ("UI/UX Design","UI/UX Design"),
    ("Automobile","Automobile"),
    ("Interdisciplinary","Interdisciplinary")
)

class  Questions(models.Model):
    id = models.BigAutoField(primary_key=True)
    date=models.CharField(max_length=100) 
    filename=models.CharField(max_length=500)
    question= models.CharField(max_length=500)
    option1=models.CharField(max_length=500)
    option2=models.CharField(max_length=500)
    option3=models.CharField(max_length=500)
    option4=models.CharField(max_length=500)
    answer= models.CharField(max_length=500)
    stream= models.CharField(max_length=100,choices=choice)
    branch=models.CharField(max_length=100,choices=choice2)
    take=models.BooleanField(default=True)
    def __str__(self):
        return str(self.id)
    
class PrevQuestionPaperSet(models.Model):
    id = models.BigAutoField(primary_key=True)
    date=models.CharField(max_length=100) 
    filename=models.FileField(upload_to='prevfiles')
    stream= models.CharField(max_length=100,choices=choice)
    branch=models.CharField(max_length=100,choices=choice2)
    def __str__(self):
        return str(self.id)