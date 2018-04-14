import React, {Component} from 'react';
import ReactDOM from 'react-dom';

let AppComponent =  class extends Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
      vue = 'vanilla' + 'react'
    }

    render () {
        return (
            <div>
              react app
            </div>
        )
    }
};

ReactDOM.render(<AppComponent/>, document.querySelector('.react-area'));
