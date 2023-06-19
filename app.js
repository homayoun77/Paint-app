const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const brushWidth = document.querySelector('#brush-width')
const brushColor = document.querySelector('#color-picker')
const brush = document.querySelector('.brush');
const eraser = document.querySelector('.eraser');
const clearBtn = document.querySelector('.clear');
const saveBtn = document.querySelector('.save');

let isDrawing = false;
let currentWidth = 5;
let currentColor = '';

window.addEventListener('load' , ()=>{
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.fillStyle = 'white'
    ctx.fillRect(0,0,canvas.width,canvas.height);
})
function startDraw(){
    isDrawing = true;
    ctx.beginPath();
    ctx.lineWidth = currentWidth;
}
function endDraw(){
    isDrawing = false;
}
function drawing(e){
    if(!isDrawing){
        return
    }
    ctx.lineTo(e.offsetX , e.offsetY)
    ctx.stroke()
    ctx.strokeStyle = currentColor;
}
canvas.addEventListener('mousedown' , startDraw);
canvas.addEventListener('mousemove' , drawing);
canvas.addEventListener('mouseup' , endDraw);

brushWidth.addEventListener('change' , function(){
    currentWidth = brushWidth.value
})

brushColor.addEventListener('change' , function(){
    currentColor = brushColor.value
})

eraser.addEventListener('click' , function(){
    eraser.classList.add('active');
    brush.classList.remove('active');
    currentColor = 'white';
})

brush.addEventListener('click' , function(){
    brush.classList.add('active');
    eraser.classList.remove('active');
    currentColor = brushColor.value;
})

clearBtn.addEventListener('click' , function(){
    ctx.fillStyle = 'white'
    ctx.fillRect(0,0,canvas.width,canvas.height);
})

saveBtn.addEventListener('click' , function(){
    let link = document.createElement('a');
    link.download = `${Date.now()}.jpg`;
    link.href = canvas.toDataURL();
    link.click()
})