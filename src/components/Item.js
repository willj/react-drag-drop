import React from 'react';
import UploadingItem from './UploadingItem';
import EditableItem from './EditableItem';
import PropTypes from 'prop-types';

const Item = ({item, index, onChange}) => {
    return (item.url) 
    ? <EditableItem item={item} />
    : <UploadingItem file={item.file} item={item} index={index} uploadComplete={onChange} /> ;
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Item;