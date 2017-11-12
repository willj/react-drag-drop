import React from 'react';
import PropTypes from 'prop-types';

const supportedFileTypes = ["image/png", "image/jpeg", "image/gif", "image/webp"];

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
        
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
            let file = e.dataTransfer.files.item(i);
            
            if (this.isValidFile(file.type)) {

                let item = {
                    file: file,
                    key: file.name + Date.now(),
                    title: file.name
                }; 
                
                this.props.onNewFile(item);
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