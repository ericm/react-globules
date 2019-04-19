import React, {Component} from 'react'

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {width: 0}
        
        this.ctx = null;
        document.onresize = this.resize;
    }

    componentDidMount() {
        if (this.props.widthPercent) {
            this.resize();
        }
    }

    resize = () => {
        const width = document.body.offsetWidth*(this.props.width/100);
        this.setState({width});
    }

    render() {
        return <div>
            <canvas 
                ref={ref => { if (!!ref) this.ctx = ref.getContext('2d'); }} 
                width={this.state.width}
                height={this.props.height} 
            />
        </div>
    }
}
