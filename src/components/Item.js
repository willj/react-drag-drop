import React from 'react';
import Axios from 'axios';

class Item extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            name: this.props.file.name,
            file: this.props.file,
            isUploading: true,
            url: ''
        };
    }

    componentDidMount(){
        // upload..?
    }

    uploadProgressUpdate(e){
        console.log(e);
    }

    render(){
        return (
            <p>I'm an item called {this.state.name}</p>
        )
    }

}

export default Item;