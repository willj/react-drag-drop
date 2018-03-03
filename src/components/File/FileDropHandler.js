import React from 'react';
import PropTypes from 'prop-types';
import * as FileTypes from './SupportedFileTypes';
import * as Item from './ItemFactory';

class FileDropHandler extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            errors: []
        }

        this.fileDropped = this.fileDropped.bind(this);
        this.addFile = this.addFile.bind(this);
        this.handlePaste = this.handlePaste.bind(this);
    }

    componentDidMount(){
        window.addEventListener("paste", this.handlePaste);
    }

    handlePaste(e){
        // this works on Windows Chrome/Firefox/Edge when pasting image *data* 
        // but not image files
        // on OS X it works in Chrome/Firefox (not Safari)
        // with both data and image files

        if (e.clipboardData){
            let items = e.clipboardData.items;

            for(let i in items){
                if (items[i].kind === 'file'){
                    let file = items[i].getAsFile();
                    this.addFile(file);
                }
            }
        }
    }

    fileDropped(e){
        e.preventDefault();
        
        // This stuff isn't in the standards, but allows us to upload directories
        if (e.dataTransfer.items && 
            e.dataTransfer.items.length > 0 && 
            (typeof e.dataTransfer.items[0].getAsEntry === 'function' || 
             typeof e.dataTransfer.items[0].webkitGetAsEntry === 'function')){
            
            for (let i = 0; i < e.dataTransfer.items.length; i++) {
                let item = (typeof e.dataTransfer.items[i].getAsEntry === 'function') 
                    ? e.dataTransfer.items[i].getAsEntry() 
                    : e.dataTransfer.items[i].webkitGetAsEntry();
                
                if (item.isFile){
                    item.file(this.addFile, error => {
                        this.appendErrorMessage(`${item.name} failed`);
                    });
                }

                if (item.isDirectory){                    
                    this.addFilesFromDirectory(item);
                }
            }
        } else {
            // this is the standard/supported way of recieving dropped files, but no dir support
            for (let i = 0; i < e.dataTransfer.files.length; i++) {
                this.addFile(e.dataTransfer.files.item(i));
            }        
        }
    }

    addFilesFromDirectory(dir){
        dir.createReader().readEntries(files => {
            files.forEach(file => {
                file.file(this.addFile, error => {
                    this.appendErrorMessage(`${file.name} failed`);
                });
            });
        });
    }

    addFile(file){
        if (FileTypes.isValidFile(file.type)) {
            this.props.onNewFile( Item.newItem(file) );
        } else {
            this.appendErrorMessage(`${file.name} is not a valid file type`);
        }
    }

    appendErrorMessage(message){
        this.setState((prevState, props) => {
            return { errors: [...prevState.errors, message] };
         });
    }

    render(){
        return (
            <div className="file-drop-handler" onDrop={this.fileDropped}>
                <ul>
                    {this.state.errors.map((err, index) => <li key={index}>{err}</li>)}
                </ul>
                {this.props.children}
            </div>
        );
    }

}

export default FileDropHandler;

FileDropHandler.propTypes = {
    onNewFile: PropTypes.func.isRequired
};