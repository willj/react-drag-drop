import React from 'react';
import PropTypes from 'prop-types';

class DraggableItem extends React.Component {
    constructor(props) {
        super(props);

        this.dragStart = this.dragStart.bind(this);
        this.dragEnter = this.dragEnter.bind(this);
        this.dragLeave = this.dragLeave.bind(this);
        this.dragOver = this.dragOver.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
        this.drop = this.drop.bind(this);
    }

    dragStart(e){
        this.props.dragStarted(this.props.index, e);
        e.currentTarget.className += " active-drag-item";
        e.dataTransfer.setData("text/plain", this.props.index.toString());
        e.dataTransfer.effectAllowed = "move";
    }

    dragEnter(e){
        e.preventDefault();
        if (this.props.currentDragIndex !== this.props.index) {
            if (e.currentTarget.className.indexOf("active-drop-zone") === -1){
                e.currentTarget.className += " active-drop-zone";
            }
        }
    }

    dragLeave(e){
        this.removeActiveDropZoneClass(e);
    }

    dragOver(e){
        e.preventDefault();
    }

    dragEnd(e){
        e.currentTarget.className = e.currentTarget.className.replace(" active-drag-item", "");
    }

    drop(e){
        this.removeActiveDropZoneClass(e);
        this.props.itemDropped(e, this.props.index);
    }

    removeActiveDropZoneClass(e){
        e.currentTarget.className = e.currentTarget.className.replace(" active-drop-zone", "");
    }

    render() {
        return (
            <div className="item" 
                draggable="true" 
                onDragStart={this.dragStart}
                onDragEnter={this.dragEnter} 
                onDragOver={this.dragOver} 
                onDragLeave={this.dragLeave}
                onDragEnd={this.dragEnd} 
                onDrop={this.drop}>
                {this.props.children}
            </div>
        );
    }

}

export default DraggableItem;


DraggableItem.propTypes = {
    index: PropTypes.number.isRequired,
    currentDragIndex: PropTypes.number.isRequired,
    dragStarted: PropTypes.func.isRequired,
    itemDropped: PropTypes.func.isRequired
};