from django.db import models

choice=(
    ("BME","B.Tech Mechanical Engineering"),
    ("BCSE","B.Tech Computer science/ IT"),
    ("BET","B.Tech Electronics & Telecomm"),
    ("BEE","B.Tech Electrical/Electronics"),
    ("MME","M.Tech Mechanical Engineering"),
    ("MCSE","M.Tech Computer science/ IT"),
    ("MET","M.Tech Electronics & Telecomm"),
    ("MEE","M.Tech Electrical/Electronics"),
    )

class  Questions(models.Model):
    id = models.BigAutoField(primary_key=True)
    question= models.CharField(max_length=500)
    option1=models.CharField(max_length=100)
    option2=models.CharField(max_length=100)
    option3=models.CharField(max_length=100)
    option4=models.CharField(max_length=100)
    answer= models.CharField(max_length=100)
    department= models.CharField(max_length=100,choices=choice)
    def __str__(self):
        return str(self.id)