from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets,permissions
from .models import Event
from .serializers import EventSerializer
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to Chivent!")

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by('start_time')
    serializer_class = EventSerializer
