// chatbot/static/js/app.js
const chatBox = document.getElementById('chat-box');
const inputBox = document.getElementById('input-box');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', sendMessage);

function sendMessage() {
    const userMessage = inputBox.value;
    if (userMessage.trim() === "") return;

    // Display user message
    displayMessage(userMessage, 'user');

    // Send the message to Django backend
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    fetch("/", {
        method: "POST",
        headers: {
            "X-CSRFToken": csrftoken,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            'message': userMessage
        })
    })
    .then(response => response.json())
    .then(data => {
        // Display the bot's response
        displayMessage(data.response, 'bot');
    });

    inputBox.value = '';  // Clear input box
}

function displayMessage(message, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.innerText = message;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}
