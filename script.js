const canvas = document.getElementById('writingCanvas');
const ctx = canvas.getContext('2d');
const input = document.getElementById('textInput');

// Settings for realism
const charWidth = 30;   // Base width of letters
const charHeight = 40;  // Base height
const lineSpacing = 60; // Space between lines
const startX = 20;
const startY = 60;

input.addEventListener('input', () => {
    renderText(input.value);
});

async function renderText(text) {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let cursorX = startX;
    let cursorY = startY;

    for (let char of text) {
        if (char === '\n') {
            cursorX = startX;
            cursorY += lineSpacing;
            continue;
        }

        if (char === ' ') {
            cursorX += charWidth * 0.8;
            continue;
        }

        // Only process letters (a-z, A-Z)
        if (/[a-zA-Z]/.test(char)) {
            // Randomly pick variation 1 through 5
            const variation = Math.floor(Math.random() * 5) + 1;
            const imgPath = `images/${char}-${variation}.png`;

            await drawLetter(imgPath, cursorX, cursorY);
        }

        // Move cursor with a tiny bit of random spacing (kerning jitter)
        cursorX += charWidth + (Math.random() * 4 - 2);

        // Wrap text if it hits the edge
        if (cursorX > canvas.width - 50) {
            cursorX = startX;
            cursorY += lineSpacing;
        }
    }
}

function drawLetter(path, x, y) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = path;
        img.onload = () => {
            // Add vertical jitter so letters aren't perfectly aligned
            const jitterY = (Math.random() * 4 - 2);
            
            // Draw the letter
            ctx.drawImage(img, x, y + jitterY, charWidth, charHeight);
            resolve();
        };
        // If image fails to load (missing file), just skip it
        img.onerror = () => resolve();
    });
}
