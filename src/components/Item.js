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

        window.testFile = this.state.file;

        // get an upload token
        Axios.post(process.env.REACT_APP_GET_UPLOAD_TOKEN_URL, { 
            mimeType: this.state.file.type, 
            fileSize: this.state.file.size 
        })
        .then((response) => {
            this.uploadFile(response.data.url);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    uploadFile(uploadUrl){
        Axios.put(uploadUrl, this.state.file, { 
            onUploadProgress: this.uploadProgressUpdate,
            headers: {
                'x-ms-blob-type': 'BlockBlob', 
                'x-ms-content-length': this.state.file.size, 
                'x-ms-blob-content-type': this.state.file.type, 
                'Content-Type': this.state.file.type 
            }
        })
        .then((response) => {
            console.log(response);
            console.log(uploadUrl);
        })
        .catch((err) => {
            console.log(err);
        });
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