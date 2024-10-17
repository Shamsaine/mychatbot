from django.http import JsonResponse
from django.shortcuts import render
from .chatbot_logic import chatbot_response

def chatbot_view(request):
    # If it's a POST request, process user input
    if request.method == 'POST':
        user_input = request.POST.get('message')
        response = chatbot_response(user_input)
        return JsonResponse({'response': response})
    return render(request, 'index.html')
