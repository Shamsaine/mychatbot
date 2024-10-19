from transformers import pipeline

# Force the use of PyTorch (framework='pt')
generator = pipeline('text-generation', model='microsoft/DialoGPT-medium', framework='pt')

def generate_response(user_input):
    try:
        # Truncate long inputs if necessary
        if len(user_input) > 1000:
            user_input = user_input[:1000]

        # Generate a response using the text-generation pipeline
        # Set truncation=True and pad_token_id explicitly
        response = generator(
            user_input, 
            max_length=50, 
            num_return_sequences=1, 
            truncation=True,             # Explicit truncation
            pad_token_id=50256           # Explicit padding token (GPT-2 EOS token)
        )

        # Extract and return the generated response text
        return response[0]['generated_text']
    
    except Exception as e:
        # Log the error and return a fallback response
        print(f"Error generating response: {str(e)}")
        return "Sorry, I couldn't process your request. Please try again."



'''
# chatbot/transformers_logic.py
from transformers import pipeline

# Load pre-trained GPT-2 model from Hugging Face
# This can be swapped with DialoGPT or any other conversation-based model
generator = pipeline('text-generation', model='gpt2', revision='main', framework='pt')

def generate_response(user_input):
    # Generate response using the model, limiting output to 50 tokens
    response = generator(user_input, max_length=50, num_return_sequences=1)
    return response[0]['generated_text']
'''