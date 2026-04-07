const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');
const outputCanvas = document.getElementById('outputCanvas');
const oCtx = outputCanvas.getContext('2d');
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
let currentIdx = 0;
let modelData = {}; // Stores { 'A': [ {points: []}, ... ] }
let currentStroke = [];

// --- DRAWING LOGIC (Mobile & Desktop) ---
function startDrawing(e) {
    e.preventDefault();
    ctx.beginPath();
    currentStroke = [];
}

function draw(e) {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
    currentStroke.push({x, y});
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', (e) => e.buttons === 1 && draw(e));
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);

// --- WARPING ENGINE ---
function getWarpedStroke(stroke) {
    const intensity = 1.5; // How "shaky" the variation is
    return stroke.map(p => ({
        x: p.x + (Math.random() - 0.5) * intensity,
        y: p.y + (Math.random() - 0.5) * intensity
    }));
}

// --- SAVE & LOAD ---
function saveLetter() {
    const char = alphabet[currentIdx];
    if (!modelData[char]) modelData[char] = [];
    modelData[char].push(currentStroke);
    
    currentIdx++;
    document.getElementById('prompt').innerText = `Draw: ${alphabet[currentIdx]}`;
    clearCanvas();
}

function downloadModel() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(modelData));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "my_handwriting.json");
    downloadAnchorNode.click();
}

function loadModel(event) {
    const reader = new FileReader();
    reader.onload = (e) => {
        modelData = JSON.parse(e.target.result);
        alert("Model Loaded!");
    };
    reader.readAsText(event.target.files[0]);
}

function clearCanvas() { ctx.clearRect(0, 0, canvas.width, canvas.height); }
