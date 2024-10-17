import re

def chatbot_response(user_input):
    responses = {
        "hello": "Hello! How can I assist you?",
        "how are you": "I'm doing well, thank you! How about you?",
        "bye": "Goodbye! Have a great day!",
        "your name": "I'm Code Copilot, your virtual assistant."
    }

    # Match input with predefined patterns
    for pattern, response in responses.items():
        if re.search(pattern, user_input.lower()):
            return response
    return "I'm sorry, I didn't understand that."
