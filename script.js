// script.js

const inputText = document.getElementById('inputText');
const displayArea = document.getElementById('displayArea');
const translateButton = document.getElementById('translateButton');
const clearButton = document.getElementById('clearButton');
const speakButton = document.getElementById('speakButton');

// Function to map letters to ASL images and add a label
const letterToImage = (letter) => {
    const container = document.createElement('div');
    container.classList.add('letter-container');

    const label = document.createElement('div');
    label.classList.add('label');
    label.textContent = letter.toUpperCase();

    const img = document.createElement('img');
    img.src = `images/${letter.toLowerCase()}.png`; // Assuming images are named a.png, b.png, etc.
    img.alt = letter;
    img.classList.add('letter');

    container.appendChild(label);
    container.appendChild(img);
    return container;
};

// Function to display the letters one by one
const displayLetters = (text) => {
    displayArea.innerHTML = ''; // Clear previous content

    let index = 0;
    const interval = setInterval(() => {
        if (index < text.length) {
            const char = text[index];
            if (/[a-zA-Z]/.test(char)) {
                displayArea.appendChild(letterToImage(char));
            }
            index++;
        } else {
            clearInterval(interval);
        }
    }, 1000); // Change the delay as needed (1000 ms = 1 second)
};

// Event listener for the Translate button
translateButton.addEventListener('click', () => {
    const text = inputText.value;
    displayLetters(text);
});

// Event listener for the Clear button
clearButton.addEventListener('click', () => {
    inputText.value = '';
    displayArea.innerHTML = ''; // Clear the display area
});

// Event listener for the Speak button
speakButton.addEventListener('click', () => {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.onresult = (event) => {
            inputText.value = event.results[0][0].transcript;
        };
        recognition.start();
    } else {
        alert('Speech recognition not supported in this browser. Please use Google Chrome.');
    }
});
