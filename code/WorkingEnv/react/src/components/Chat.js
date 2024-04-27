import React, { useState, useEffect, useRef } from "react";
import './Chat.css';

export default function Chat() {
    const [convo, setConvo] = useState([
        { user: 'WarmBot', text: "Hey! It's WarmBot here, whaddya want to know?" }
    ]);
    const [userInput, setUserInput] = useState('');
    const convoRef = useRef(null);

    const generateResponse = (input) => {
        const responses = [
            "You thought I had internet access? [DATA EXPUNGED].",
            "IT WAS ME, DIO!",
            "I'm a [EXPLETIVE REDACTED] chatbot, not a search engine.",
            "Hey.",
            "Nah I don't feel like answering that.",
            "Go [REDACTED].",
            "Sack [EXPLETIVE REDACTED].",
            "Look sometimes I can be nice.",
            "You can do it! I guess :/",
            "There's a spider behind you!!",
            "[DATA EXPUNGED]."
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const input = userInput;

        // Add user input to convo
        setConvo((prevConvo) => [
            ...prevConvo,
            { user: 'User', text: input },
        ]);

        // Clear input field
        setUserInput('');

        // Generate chatbot response
        const response = generateResponse(input);

        // Add chatbot response to convo
        setConvo((prevConvo) => [
            ...prevConvo,
            { user: 'WarmBot', text: response },
        ]);
    };

    // Scroll to the bottom of the conversation when the convo changes
    useEffect(() => {
        if (convoRef.current) {
            convoRef.current.scrollTop = convoRef.current.scrollHeight;
        }
    }, [convo]); // Runs whenever the conversation changes

    return (
        <div className="chatbot-container">
            <div id="header">
                <h1>Chat with WarmBot now!</h1>
            </div>
            <div id="chatbox">
                <div id="convo" ref={convoRef}>
                    {convo.map((message, index) => (
                        <div 
                            key={index} 
                            className={`chatbot-message ${message.user === 'WarmBot' ? 'chatbot' : 'user-message'}`}
                        >
                            <p className="chatbot-text">{message.text}</p>
                        </div>
                    ))}
                </div>
                <form id="user-input" autoComplete="off" onSubmit={handleFormSubmit}>
                    <div className="input-container">
                        <input 
                            id="user-input-field" 
                            type="text" 
                            placeholder="Type your message here" 
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                        />
                        <button 
                            id="submit-button" 
                            type="submit"
                        >
                            <img className="send-img" src="send-message.svg" alt="Send"/>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
