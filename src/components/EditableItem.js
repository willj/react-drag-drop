import React from 'react';
import PropTypes from 'prop-types';

const Image = ({item, index, onDelete}) => {
    return (
        <div>
            <p>I'm an Image called {item.title}</p>
            <img src={item.url} alt={item.title} style={{ width: '100%' }} />
            <button onClick={() => { onDelete(index); }}>Delete</button>
        </div>
    );
};

Image.propTypes = {
    item: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default Image;