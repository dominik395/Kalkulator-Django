from django.shortcuts import render
from django.views import View
#from kalkulator_app.template import HelloWorld

# Create your views here.

class HelloWorld(View):
    def get(self, request):
        return render(request, 'helloWorld.html')
    