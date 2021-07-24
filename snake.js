const canvas = document.getElementById('game-background');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');
const size = Math.round(canvas.width / 50);
const xEnd = Math.round(canvas.width / size) * size;
const yEnd = Math.round(canvas.height / size) * size;

let directionLock = false; 

const snake = [{x: 0, y: 0}];
const apple = {};
let direction = 'right';
let speed = 200;

function random(min, max) {
    return Math.random() * (max - min ) + min;
};

function setApple() {
    apple.x = Math.round(random(size, canvas.width - size) / size) * size;
    apple.y = Math.round(random(size, canvas.height - size) / size) * size; 
};

function draw() {
    constext.clearRect(0,0, canvas.width, canvas.height)
}