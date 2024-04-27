const chatbot = document.getElementById('chatbox');
const convo = document.getElementById('convo');
const inputForm = document.getElementById('user-input');
const inputField = document.getElementById('user-input-field');

inputForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const input = inputField.value;

    inputField.value = '';

    // add user input to convo

    let message = document.createElement('div');
    message.classList.add('chatbot-message', 'user-message');
    message.innerHTML = `<p class="chatbot-text" userName="User">${input}</p>`;
    convo.appendChild(message);
    
    // function call to lambda goes here to store it in dyanmoDB
    // submit_data(input);
    // generate chatbot response
    const response = generateResponse(input); // this function is a mocker for the lambda function, replace with call to above function when done

    // add chatbot response to convo
    message = document.createElement('div');
    message.classList.add('chatbot-message', 'chatbot');
    message.innerHTML = `<p class="chatbot-text" userName="WarmBot">${response}</p>`;
    convo.appendChild(message);
    message.scrollIntoView({ behavior: "smooth" });
});

function generateResponse(input) {
    // below is a mocker for the submit data function, since the submit data will return the bot response
    const responses = [
        "You thought I had internet access? [DATA EXPUNGED].",
        "IT WAS ME, DIO!",
        "I'm a [EXPLETIVE REDACTED] chatbot, not a search engine.",
        "Hey.",
        "Nah I dont feel like answering that.",
        "Go [REDACTED].",
        "Sack [EXPLETIVE REDACTED].",
        "Look sometimes I can be nice.",
        "You can do it! I guess :/",
        "Theres a spider behind you!!",
        "[DATA EXPUNGED]."
    ];

    return responses[Math.floor(Math.random() * responses.length)]
}

function submit_data(input) {
    // call to lambda function to store the data in dynamoDB
}