import React from 'react';
import DragDropGrid from './DragDropGrid';
import FileDropHandler from '../File/FileDropHandler';
import './Grid.css';

class Grid extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            items: [],
            title: 'My Project'
        };

        this.addItem = this.addItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.moveItem = this.moveItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
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

    onTitleChange(e){
        this.setState({ title: e.target.value });
    }

    render(){
        return (
            <div>
                <input type="text" value={this.state.title} className="grid-title" onChange={this.onTitleChange} />
                <FileDropHandler onNewFile={this.addItem}>
                    <DragDropGrid items={this.state.items} onChange={this.updateItem} onMove={this.moveItem} onDelete={this.deleteItem}>
                        { this.state.items.length === 0 && <h2>Drop files here</h2> }
                    </DragDropGrid>
                </FileDropHandler>
            </div>
        );
    }
}

export default Grid;