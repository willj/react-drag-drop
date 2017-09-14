import React from 'react';
import DraggableItem from './DraggableItem.js';

class Grid extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            items: ["One", "Two", "Three", "Four", "Five", <div>Six <button>Cheeses</button></div>],
            currentDragIndex: -1
        };

        this.dragStarted = this.dragStarted.bind(this);
        this.itemDropped = this.itemDropped.bind(this);
        this.fileDropped = this.fileDropped.bind(this);
        this.gridDragEnd = this.gridDragEnd.bind(this);
        this.gridDragOver = this.gridDragOver.bind(this);
    }

    // you can't access an item being dragged from the dragOver event, only the target, so lets keep track of what's being dragged
    dragStarted(dragIndex, e) {
        this.setState({ currentDragIndex: dragIndex });
    }

    gridDragEnd(e){
        e.preventDefault();
        e.dataTransfer.clearData();
    }

    gridDragOver(e){
        e.preventDefault();
    }

    itemDropped(e, dropzoneIndex){
        e.preventDefault();

        if (e.dataTransfer.files.length > 0) {
            return;
        }

        e.stopPropagation();
        
        console.log("item dropped");

        let itemIndex = e.dataTransfer.getData("text/plain");
        
        let items = [...this.state.items];
        let item = items.splice(itemIndex, 1);

        items.splice(dropzoneIndex, 0, item);

        this.setState({items: items});
    }

    fileDropped(e){
        e.preventDefault();
        console.log("file dropped");
        console.log(e.dataTransfer.files);
    }

    render(){
        return (
            <div className="grid" 
                onDrop={this.fileDropped} 
                onDragEnd={this.gridDragEnd} 
                onDragOver={this.gridDragOver}>
                {
                    this.state.items.map((item, index) => {
                        return (
                            <DraggableItem key={index} index={index} 
                                currentDragIndex={this.state.currentDragIndex}
                                dragStarted={this.dragStarted} 
                                itemDropped={this.itemDropped}>
                                {item}
                            </DraggableItem>
                        );
                    })
                }
            </div>
        );
    }
}

export default Grid;