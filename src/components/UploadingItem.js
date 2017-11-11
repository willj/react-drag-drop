import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';

class UploadingImage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            percentUploaded: 0
        };

        this.uploadProgressUpdate = this.uploadProgressUpdate.bind(this);
    }

    componentDidMount(){
        this.getUploadToken();
    }

    getUploadToken(){
        return Axios.post(process.env.REACT_APP_GET_UPLOAD_TOKEN_URL, { 
            mimeType: this.props.file.type, 
            fileSize: this.props.file.size 
        })
        .then((response) => {
            this.uploadFile(response.data.url);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    uploadFile(uploadUrl){
        Axios.put(uploadUrl, this.props.file, { 
            onUploadProgress: this.uploadProgressUpdate,
            headers: {
                'x-ms-blob-type': 'BlockBlob', 
                'x-ms-content-length': this.props.file.size, 
                'x-ms-blob-content-type': this.props.file.type, 
                'Content-Type': this.props.file.type 
            }
        })
        .then((response) => {
            let item = Object.assign({}, this.props.item);
            item.url = uploadUrl.split('?')[0];
    
            this.props.uploadComplete(this.props.index, item);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    uploadProgressUpdate(e){
        let percent = (e.loaded / e.total) * 100;
        
        this.setState({ percentUploaded: percent });
    }

    render(){
        return (
            <div>
                <p>I'm uploading {this.props.name}</p>
                <p>Uploaded: {this.state.percentUploaded}</p>
            </div>
        );
    }
}

export default UploadingImage;

UploadingImage.propTypes = {
    file: PropTypes.objectOf(File).isRequired,
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    uploadComplete: PropTypes.func.isRequired
}