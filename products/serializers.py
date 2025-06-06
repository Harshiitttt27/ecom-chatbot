from rest_framework import serializers
from .models import Product, ChatMessage

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'user', 'message', 'response', 'timestamp']
        read_only_fields = ['user', 'timestamp']
