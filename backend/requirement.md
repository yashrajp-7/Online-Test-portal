#Excute this command to bypass the error in creating and activating virtual environment
Set-ExecutionPolicy Unrestricted -Scope Process


#Cereating Virtual Environment
py -m venv arun

#Activating Virtual Environment
arun\Scripts\Activate.ps1

#installing django
pip install django

#installing django rest framework
pip install djangorestframework

#installing django corsheader
pip install django-cors-headers

#installing pandas
pip install pandas

#installing lib for reading excel file
pip install openpyxl