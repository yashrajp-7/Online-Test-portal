from django.db import models

class Login(models.Model):
    email = models.EmailField(primary_key=True)
    password= models.CharField(max_length=100)
    admin=models.BooleanField(default=False)
    def __str__(self):
        return self.email
class TempLogin(models.Model):
    tempID = models.CharField(primary_key=True,max_length=100)
    password= models.CharField(max_length=100)
    def __str__(self):
        return self.tempID

