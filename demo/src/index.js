import React, {Component} from 'react'
import {render} from 'react-dom'

import Globules from '../../src'

class Demo extends Component {
    render() {
        return <div style={{fontFamily: "Gugi"}}>
            <Globules 
                widthPercent={true} 
                heightPercent={true} 
                width={100} 
                height={100} 
                speed={4}
                density={50}
            >
            <div style={{height: "inherit"}}>
                <h1 style={{lineHeight: "100vh", textAlign: "center", color: "#ffffffcc"}}>React Globules 
                <i style={{fontSize: 17, marginLeft: 10}}><a style={{textDecoration: "none", color: "rgba(0, 0, 0, 0.57)"}} href="https://github.com/ericm">By Eric Moynihan</a></i></h1>
            </div>
                
            </Globules>
            <div style={{padding: 12, background: "rgb(8, 2, 7)", textAlign: "center"}}>
                <a style={{color: "#c5076b", textAlign: "center"}} href="#">Reload</a>
            </div>
            
        </div>
    }
}
render((<div><link href="https://fonts.googleapis.com/css?family=Gugi" rel="stylesheet"/><style>{"* { margin: 0; padding: 0; border: 0; }"}</style></div>), document.head)
render(<Demo/>, document.querySelector('#demo'))
