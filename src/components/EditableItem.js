import React from 'react';
import PropTypes from 'prop-types';

const Image = ({item}) => {
    return (
        <p>I'm an Image called {item.title}</p>
    );
};

Image.propTypes = {
    item: PropTypes.object.isRequired
};

export default Image;