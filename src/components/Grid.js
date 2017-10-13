import React from 'react';
import DraggableItem from './DraggableItem.js';
import FileDropHandler from './FileDropHandler';

class Grid extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            items: ["One", "Two", "Three", "Four", "Five", <div>Six <button>Cheeses</button></div>],
            currentDragIndex: -1
        };

        this.dragStarted = this.dragStarted.bind(this);
        this.itemDropped = this.itemDropped.bind(this);
        this.gridDragEnd = this.gridDragEnd.bind(this);
        this.gridDragOver = this.gridDragOver.bind(this);
        this.addItem = this.addItem.bind(this);
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

        items.splice(dropzoneIndex, 0, item[0]);

        this.setState({items: items});
    }

    addItem(item){
        this.setState((prevState, props) => { 
            let items = [...prevState.items,item];
            return { items: items };
        });
    }

    render(){
        return (
            <FileDropHandler onNewFile={this.addItem}>
                <div className="grid" 
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
            </FileDropHandler>
        );
    }
}

export default Grid;