import React, {Component} from 'react';

class Glob {
    constructor(x, y, diam, dirX, dirY, speed) {
        this.x = x;
        this.y = y;
        this.diam = diam;
        this.dirX = Math.ceil(dirX - 1);
        this.dirY = Math.ceil(dirY - 1);
        this.vel = speed;
    }

    count = 0

    move = () => { 
        this.count++;
        if (this.count === 50) {
            this.dirY = Math.ceil(Math.random() - 1);
        } else if (this.count === 100) {
            this.dirX =  Math.ceil(Math.random() - 1);
            this.count = 0;
        }
        this.x += this.dirX * this.vel;
        this.y += this.dirY * this.vel;
    }

    
    
}

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 0, 
            height: 0, 
            primary: '#80ffb0', 
            secondary: '#1ac75c', 
            background: '#3ce47c'
        };
        document.body.onresize = () => this.resize.bind(this)();
        if (!!this.props.background) this.setState({background: this.props.background});
        
    }

    async componentDidMount() {
        await this.resize(true);
        this.rands = this.genRands();
        this.draw();
        this.count = 0;
        window.requestAnimationFrame(this.step);
    }

    changed = [];

    step = () => {
        if (this.count === 500) {
            this.count = 0;
            this.newRand(this.rands);
        }
        for (let i in this.rands) {
            let rand = this.rands[i];
            this.rands.forEach((randOther, j, _) => {
                if (i !== j && rand.x < window.innerWidth - 100 && rand.y < window.innerHeight - 100 &&
                    Math.sqrt((rand.x - randOther.x)**2 + (rand.y - randOther.y)**2) <= randOther.diam + rand.diam && 
                    Math.random()*10 > 9) {
                    rand.dirX = (randOther.dirX + Math.ceil(Math.random()*2 - 1)*3) / 4;
                    rand.dirY = (randOther.dirY + Math.ceil(Math.random()*2 - 1)*3) / 4;
                } else if (Math.random()*100 > 95) {
                    rand.dirX -= .1;
                    rand.dirY -= .1;
                }
            });
            rand.move();
        }
        this.count++;
        this.draw();
        window.requestAnimationFrame(this.step);
    }

    draw = () => {
        console.log(this.rands);
        this.drawBack();
        for (let rand of this.rands) {
            this.ctx.fillStyle = this.state.primary + 'aa';
            this.ctx.strokeStyle = this.state.primary + 'ef';
            this.ctx.lineWidth = 7;
            this.ctx.beginPath();
            this.ctx.arc(rand.x, rand.y, rand.diam, 0, 2*Math.PI);
            this.ctx.fill();
            this.ctx.stroke();
        }
    }

    

    genRands = () => {
        let out = [];
        console.log(this.state.width);
        for (let _i = 0; _i < this.state.width / 100; _i++) {
            this.newRand(out);            
        }
        return out;
    }

    // x, y, diameter, deg1, deg2
    newRand = (out) => out.push(
        new Glob(
            Math.random()*(this.state.width-100), 
            Math.random()*(this.state.height-100), 
            Math.random()*200,
            Math.random()*2, 
            Math.random()*2,
            this.props.speed
            )
        )

    drawBack = () => {
        this.ctx.fillStyle = this.state.background;
        this.ctx.fillRect(0, 0, this.state.width, this.state.height);
    }

    clear = () => this.ctx.clearRect(0, 0, this.state.width, this.state.height)
    

    async resize(init = false) {
        console.log(init);
        if (this.props.heightPercent) {
            const height = window.innerHeight*(this.props.height/100);
            await this.setState({height});
        }
        if (this.props.widthPercent) {
            const width = document.body.clientWidth*(this.props.width/100);
            await this.setState({width});
        }
        if (!init) {
            await this.clear();
            this.draw();
        }
        
    }

    render() {
        return (
            <div style={{margin: 0, padding: 0, border: 0}}>
                <div style={{
                    width: this.state.width,
                    height: this.state.height,
                    position: "relative",
                    zIndex: 2,
                    margin: 0, padding: 0, border: 0
                }}>
                    {this.props.children}
                </div>
                <canvas 
                    ref={ref => { if (!!ref) this.ctx = ref.getContext('2d'); }} 
                    width={this.state.width}
                    height={this.state.height}
                    style={{position:"absolute", top: 0, zIndex: 1, margin: 0, padding: 0, border: 0}}
                />
            </div>
        );
    }
}
