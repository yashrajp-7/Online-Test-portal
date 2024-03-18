from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    college_name = models.CharField(max_length=100)
    branch = models.CharField(max_length=100)
    email = models.EmailField()
    gender = models.CharField(max_length=10)
    highestdegree = models.CharField(max_length=100)
    phone_no = models.CharField(max_length=10)
    SFID = models.CharField(max_length=100)
    degree = models.CharField(max_length=100)
    stream = models.CharField(max_length=100)
    score = models.IntegerField(default=0)
    test_taken = models.BooleanField(default=False)
    def __str__(self):
        return self.email
