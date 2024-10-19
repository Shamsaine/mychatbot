# chatbot/views.py
from django.shortcuts import render
from django.http import JsonResponse
from .transformers_logic import generate_response  # Import the transformers logic

def chatbot_view(request):
    """Render the main chatbot page"""
    return render(request, 'chatbot/index.html')

def get_transformers_response(request):
    """Get a response from GPT-2 based on user input"""
    if request.method == 'POST':
        user_message = request.POST.get('message')
        
        # Ensure the message is not empty
        if not user_message:
            return JsonResponse({'error': 'Empty message'}, status=400)

        # Generate a response from GPT-2
        bot_response = generate_response(user_message)  # Generate response from GPT-2
        
        return JsonResponse({'response': bot_response})
    
    # If it's a GET request, render the chatbot page
    return render(request, 'chatbot/index.html')
