from django.contrib import admin
from .models import Questions, PrevQuestionPaperSet

# Register your models here.
admin.site.register(Questions)
admin.site.register(PrevQuestionPaperSet)
