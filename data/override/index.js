window.onload = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    const simulator = new Simulator(context);

    for(var i = 0; i < 75; i++){
        simulator.addParticle();
    }

    simulator.start();
};

window.onresize = () => {
    const canvas = document.getElementsByTagName("canvas")[0];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Simulator {
    constructor(context){
        this.particles = [];
        this.context = context;
    }

    addParticle(){
        this.particles.push(new Particle());
    }

    update(){
        this.clearCanvas();

        this.particles = this.particles
            .map((particle)=>{
                if (particle.y > (window.innerHeight + 5)){
                    particle.y =  -20;
                    particle.x = Math.floor(Math.random() * window.innerWidth);
                }
                else
                    particle.y += particle.size / 5;

                this.context.beginPath();
                this.context.arc(particle.x,particle.y, particle.size,0, 2 * Math.PI);
                this.context.fillStyle = 'white';
                this.context.fill();
                this.context.shadowBlur = 20;
                this.context.shadowColor = 'pink';
                return particle;
        });
    }

    start(){
        setInterval(this.update.bind(this), 40);
    }

    clearCanvas(){
        this.context.fillStyle = 'rgb(179, 208, 255)';
        this.context.fillRect(0,0,window.innerWidth, window.innerHeight);
    }
}

class Particle {
    constructor(){
        this.x = Math.floor(Math.random() * window.innerWidth);
        this.y = Math.floor(Math.random() * window.innerHeight);
        this.size = (Math.random() * 10) + 2;
    }
}