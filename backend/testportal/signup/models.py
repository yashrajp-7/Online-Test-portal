from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    college_name = models.CharField(max_length=100)
    rollno = models.CharField(max_length=100)
    email = models.EmailField()
    gender = models.CharField(max_length=100)
    highestdegree = models.CharField(max_length=100)
    phone_no = models.CharField(max_length=10)
    SFID = models.CharField(max_length=100)
    stream = models.CharField(max_length=100)
    branch = models.CharField(max_length=100)
    score = models.IntegerField(default=0)
    resume = models.FileField(upload_to='resume/',blank=True,null=True)
    test_taken = models.BooleanField(default=False)
    tabSwitchCount = models.IntegerField(default=0)
    def __str__(self):
        return self.email
