import React, {Component} from 'react';

class Glob {
    constructor(x, y, diam, dirX, dirY, speed) {
        this.x = x;
        this.y = y;
        this.diam = diam;
        this.dirX = Math.ceil(dirX - 1);
        this.dirY = Math.ceil(dirY - 1);
        this.vel = speed/20;
    }

    count = 0

    move = () => { 
        this.count++;
        if (this.count === 100) {
            this.dirY = Math.ceil(Math.random() - 1);
        } else if (this.count === 200) {
            this.dirX =  Math.ceil(Math.random() - 1);
            this.count = 0;
        }
        this.x += this.dirX * this.vel;
        this.y += this.dirY * this.vel;
    }

    
    
}

export default class extends Component {
    genMore = false;

    constructor(props) {
        super(props);
        this.state = {
            width: this.props.height, 
            height: this.props.width, 
            primary: this.props.color || '#8e1957', 
            background: this.props.background || '#c5076b',
            density: this.props.density || 30
        };
        document.body.onresize = () => this.resize.bind(this)();
        if (this.props.genMore) {
            this.genMore = true;
        }
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
        if (this.count === 500 && this.genMore) {
            this.count = 0;
            this.newRand(this.rands);
        }
        for (let i in this.rands) {
            let rand = this.rands[i];
            let bounded = false;
            if (rand.x > window.innerWidth) {
                rand.dirX = -2;
                bounded = true;
            }
            if (rand.y > window.innerHeight) {
                rand.dirY = -2;
                bounded = true;
            }
            if (!bounded) {
                this.rands.forEach((randOther, j, _) => {
                    if (i != j && rand.x < window.innerWidth - 100 && rand.y < window.innerHeight - 100 &&
                        Math.sqrt((rand.x - randOther.x)**2 + (rand.y - randOther.y)**2) <= randOther.diam + rand.diam && 
                        Math.random()*10 > 9) {
                        rand.dirX = (Math.ceil(Math.random()*2 - 1)*9) / 10;
                        rand.dirY = (Math.ceil(Math.random()*2 - 1)*9) / 10;
                    } else if (Math.random()*100 > 60) {
                        rand.dirX += (Math.random()-.5)*.25;
                        rand.dirY += (Math.random()-.5)*.25;
                    }
                });
            }
            
            rand.move();
        }
        this.count++;
        this.draw();
        window.requestAnimationFrame(this.step);
    }

    coordLast = null

    move = e => {
        const coords = {x: e.clientX, y: e.clientY}
        if (this.coordLast === null) this.coordLast = coords;
        for (let rand of this.rands) {
            if (Math.abs(rand.x - coords.x) < 200) {
                rand.x += (coords.x - this.coordLast.x) / 300;
            }
            if (Math.abs(rand.y - coords.y) < 200) {
                rand.y += (coords.y - this.coordLast.y) / 300;
            }
        }
    }

    draw = () => {
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
        for (let _i = 0; _i < (this.state.width / (100-this.state.density))*1.5; _i++) {
            this.newRand(out);
        }
        return out;
    }

    // x, y, diameter, deg1, deg2
    newRand = (out) => {
        const coords = { x: Math.random()*(this.state.width-100), y: Math.random()*(this.state.height-100) };
        if (out.filter(v => { return Math.abs(v.x - coords.x) < 400 }).length > 0) coords.x += 100*Math.floor(Math.random()-.5);
        if (out.filter(v => { return Math.abs(v.y - coords.y) < 400 }).length > 0) coords.y -= 100*Math.floor(Math.random()-.5);
        out.push(
            new Glob(
                coords.x, 
                coords.y, 
                Math.random()*200,
                Math.random()*2, 
                Math.random()*2,
                this.props.speed
            )
        )
    }

    drawBack = () => {
        this.ctx.fillStyle = this.state.background;
        this.ctx.fillRect(0, 0, this.state.width, this.state.height);
    }

    clear = () => this.ctx.clearRect(0, 0, this.state.width, this.state.height)
    

    async resize(init = false) {
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
            <div style={{margin: 0, padding: 0, border: 0, background: this.state.background, width: this.state.width, height: this.state.height}}>
                <div onMouseMove={this.move} style={{
                    width: this.state.width,
                    height: this.state.height,
                    position: "relative",
                    zIndex: 2,
                    margin: 0, padding: 0, border: 0,
                    background: "radial-gradient(circle, rgba(2,0,36,0) 0%, rgba(9,9,121,0) 6%, rgba(0,0,0,0.45702030812324934) 100%)"
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
