const chatBox = document.getElementById('chat-box');
const inputBox = document.getElementById('input-box');
const sendBtn = document.getElementById('send-btn');

// Add event listeners for both button click and "Enter" key
sendBtn.addEventListener('click', sendMessage);
inputBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Helper function to format current time in HH:MM format
function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    // Add leading zeros for hours and minutes less than 10
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    return `${hours}:${minutes}`;
}

function sendMessage() {
    const userMessage = inputBox.value.trim();
    if (userMessage === "") return;

    // Display user message with timestamp
    const timestamp = getCurrentTime();
    displayMessage(userMessage, 'user', timestamp);

    // Clear the input box immediately after the message is displayed
    inputBox.value = ''; 

    // Send the message to Django backend
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    fetch("/chatbot/get-response/", {
        method: "POST",
        headers: {
            "X-CSRFToken": csrftoken,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({ 'message': userMessage })
    })
    .then(response => response.json())
    .then(data => {
        // Display bot response with delay simulation and timestamp
        setTimeout(() => {
            const botTimestamp = getCurrentTime(); // Time when bot response is displayed
            displayMessage(data.response, 'bot', botTimestamp);
        }, 500);  // Simulate response delay
    })
    .catch(error => {
        console.error("Error:", error);
        displayMessage("Error fetching response. Try again.", 'bot', getCurrentTime());
    });

    inputBox.value = '';  // Clear the input box
}

function displayMessage(message, sender, timestamp) {
    // Create a wrapper div for the message and timestamp
    const msgWrapperDiv = document.createElement('div');
    msgWrapperDiv.classList.add('message-wrapper', sender);

    // Add message bubble
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);

    // Add message content
    const messageText = document.createElement('span');
    messageText.innerText = message;
    msgDiv.appendChild(messageText);

    // Create timestamp element (placed outside the bubble)
    const timeSpan = document.createElement('span');
    timeSpan.classList.add('timestamp');
    timeSpan.innerText = timestamp;

    // Append the message bubble and timestamp to the wrapper div
    msgWrapperDiv.appendChild(msgDiv);
    msgWrapperDiv.appendChild(timeSpan);

    // Append the wrapper to the chat box
    chatBox.appendChild(msgWrapperDiv);
    chatBox.scrollTop = chatBox.scrollHeight;  // Auto scroll to the bottom
}
