const canvas = document.getElementById('cursorEffect'); // Get the canvas element by its ID
const ctx = canvas.getContext('2d'); // Get the 2D rendering context
canvas.width = window.innerWidth
canvas.height=window.innerHeight
let spots=[]
let hue = 0

const mouse={
    x:undefined,
    y:undefined
}

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i = 0; i < 3; i++){
        // Create particles with initial mouse position
        spots.push(new Particle(mouse.x, mouse.y));
    }
});

class Particle{
    constructor(x, y) {
        this.x = x; // Use the provided x value
        this.y = y; // Use the provided y value
        this.size = Math.random() * 2 + 0.1;
        this.speedX = Math.random() * 2 + 0.1;
        this.speedY = Math.random() * 2 + 0.1;
        this.color = 'hsl(' + hue + ', 100%, 50%)'; // Fixed the color issue
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size>0.1){
            this.size-=0.03
        }
    }
    draw(){
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
        ctx.fill()
    }
}

function handlePartcles() {
    for (let i = spots.length - 1; i >= 0; i--) {
        const particle = spots[i];

        if (particle && mouse.x !== undefined && mouse.y !== undefined) {
            particle.update();
            particle.draw();

            for (let j = i; j < spots.length; j++) {
                if (i === j) continue; // Skip self-comparison

                const dx = particle.x - spots[j].x;
                const dy = particle.y - spots[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 90) {
                    ctx.beginPath();
                    ctx.strokeStyle = particle.color;
                    ctx.lineWidth = particle.size / 10;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(spots[j].x, spots[j].y);
                    ctx.stroke();
                }
            }

            if (particle.size <= 0.3) {
                spots.splice(i, 1);
            }
        }
    }
}



function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    handlePartcles();
    hue++
    requestAnimationFrame(animate);
}

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

window.addEventListener('mouseout', function(){
    mouse.x = undefined
    mouse.y = undefined
})

animate();