from django.urls import path
from . import views

urlpatterns = [
    path('', views.chatbot_view, name='chatbot'),  # Route for the chatbot interface
    path('get-response/', views.get_transformers_response, name='get_response'),  # API for getting GPT-2 response
]
