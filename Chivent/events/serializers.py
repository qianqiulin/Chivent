from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    price = serializers.FloatField()
    class Meta:
        model = Event
        fields = '__all__'
