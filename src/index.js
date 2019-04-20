import React, {Component} from 'react';
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
        document.body.onresize = this.resize.bind(this);
        if (!!this.props.background) this.setState({background: this.props.background});
        
    }

    async componentDidMount() {
        await this.resize(true);
        this.rands = this.genRands();
        this.draw();
    }

    draw = () => {
        this.drawBack();
        console.log(this.rands);
        for (let rand of this.rands) {
            const rad = Math.random()*200;
            this.ctx.fillStyle = this.state.primary;
            this.ctx.beginPath();
            this.ctx.arc(rand[0], rand[1], rad, 0, 2*Math.PI);
            this.ctx.fill();
        }
    }

    genRands = () => {
        let out = [];
        console.log(this.state.width);
        for (let _i = 0; _i < this.state.width / 100; _i++) {
            out.push([Math.random()*(this.state.width-100), Math.random()*(this.state.height-100)]);
        }
        return out;
    }

    drawBack = () => {
        this.ctx.fillStyle = this.state.background
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
        return <canvas 
                ref={ref => { if (!!ref) this.ctx = ref.getContext('2d'); }} 
                width={this.state.width}
                height={this.state.height} 
            />
    }
}
