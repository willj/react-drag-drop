import React from 'react';
import UploadingImage from './UploadingImage';

const Item = ({item, index, onChange}) => {
    return (item.url) 
    ? <p>I'm an item called {item.title}</p>
    : <UploadingImage file={item.file} item={item} index={index} uploadComplete={onChange} /> ;
}

export default Item;