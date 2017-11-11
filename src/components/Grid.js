import React from 'react';
import DragDropGrid from './DragDropGrid';
import FileDropHandler from './FileDropHandler';

class Grid extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            items: []
        };

        this.addItem = this.addItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.moveItem = this.moveItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    addItem(item){
        this.setState((prevState, props) => { 
            let items = [...prevState.items, item];
            return { items: items };
        });
    }

    updateItem(itemIndex, item){
        this.setState((prevState, props) => {
            let items = [...prevState.items];
            items.splice(itemIndex, 1, item);

            return { items: items };
        });
    }

    moveItem(currentIndex, newIndex){
        let items = [...this.state.items];
        let item = items.splice(currentIndex, 1);

        items.splice(newIndex, 0, item[0]);

        this.setState({items: items});
    }

    deleteItem(itemIndex){
        this.setState((prevState, props) => {
            let items = [...prevState.items];
            items.splice(itemIndex, 1);
            return { items: items };
        });
    }

    render(){
        return (
            <FileDropHandler onNewFile={this.addItem}>
                <DragDropGrid items={this.state.items} updateItem={this.updateItem} moveItem={this.moveItem} >
                    { this.state.items.length === 0 && <h1>Drop files here</h1> }
                </DragDropGrid>
            </FileDropHandler>
        );
    }
}

export default Grid;