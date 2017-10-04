import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

const supportedFileTypes = ["image/png", "image/jpeg", "image/gif", "image/x-icon", "image/webp"];

class FileDropHandler extends React.Component {

    constructor(props){
        super(props);

        this.fileDropped = this.fileDropped.bind(this);
    }

    isValidFile(mimeType){
        return (supportedFileTypes.indexOf(mimeType) !== -1);
    }

    fileDropped(e){
        e.preventDefault();
        
        console.log(e.dataTransfer.files);
        
        console.log("file dropped in FDH");

        for (let i = 0; i < e.dataTransfer.files.length; i++) {
            let file = e.dataTransfer.files.item(i);
            console.log(file);

            if (this.isValidFile(file.type)) {
                this.props.onNewFile(<Item file={file} />);
            } else {
                console.log("invalid type");
            }
        }        
        
    }

    render(){
        return (
            <div className="file-drop-handler" onDrop={this.fileDropped}>
                {this.props.children}
            </div>
        );
    }

}

export default FileDropHandler;

FileDropHandler.propTypes = {
    onNewFile: PropTypes.func.isRequired
};