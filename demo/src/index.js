import React, {Component} from 'react'
import {render} from 'react-dom'

import Example from '../../src'

class Demo extends Component {
    render() {
        return <div>
            <Example 
                widthPercent={true} 
                heightPercent={true} 
                width={100} 
                height={100} 
            />
        </div>
    }
}
render(<style>{"* { margin: 0; padding: 0; border: 0; }"}</style>, document.head)
render(<Demo/>, document.querySelector('#demo'))
