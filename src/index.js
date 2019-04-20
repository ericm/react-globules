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

    componentDidMount() {
        this.resize();
    }

    draw = () => {
        this.drawBack();
        this.genRands();
    }

    genRands = () => {
        let out = [];
        for (let _i = 0; _i < this.state.width / 100; _i++) {
            out.push([Math.random()*(this.state.width-100), Math.random()*(this.state.height-100)]);
        }
        console.log(out);
    }

    drawBack = () => {
        this.ctx.fillStyle = this.state.background
        this.ctx.fillRect(0, 0, this.state.width, this.state.height);
    }

    clear = () => this.ctx.clearRect(0, 0, this.state.width, this.state.height)
    

    async resize() {
        if (this.props.heightPercent) {
            const height = window.innerHeight*(this.props.height/100);
            await this.setState({height});
        }
        if (this.props.widthPercent) {
            const width = document.body.clientWidth*(this.props.width/100);
            await this.setState({width});
        }
        await this.clear();
        this.draw();
    }

    render() {
        return <canvas 
                ref={ref => { if (!!ref) this.ctx = ref.getContext('2d'); }} 
                width={this.state.width}
                height={this.state.height} 
            />
    }
}
