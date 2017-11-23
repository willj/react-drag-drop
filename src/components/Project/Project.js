import React from 'react';
import Grid from '../Grid/Grid';

class Project extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            title: 'My Project',
            items: []
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.publish = this.publish.bind(this);
        this.updateItemState = this.updateItemState.bind(this);
    }

    onTitleChange(e){
        this.setState({ title: e.target.value });
    }

    publish(){
        console.log(this.state);
    }

    updateItemState(items){
        this.setState({ items: items });
    }

    render(){
        return (
            <div>
                <input type="text" value={this.state.title} className="grid-title" onChange={this.onTitleChange} />
                <button onClick={this.publish}>Publish</button>
                <Grid items={this.state.items} onChangeItems={this.updateItemState} />
            </div>
        );
    };
}

export default Project;