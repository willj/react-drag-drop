import React from 'react';
import PropTypes from 'prop-types';

const Image = ({item}) => {
    return (
        <div>
            <p>I'm an Image called {item.title}</p>
            <img src={item.url} alt={item.title} style={{ width: '100%' }} />
        </div>
    );
};

Image.propTypes = {
    item: PropTypes.object.isRequired
};

export default Image;