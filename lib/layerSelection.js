// Function to select layers by a specified key in the values property //
function getLayersBy(layers, key, value) {
    return layers.array_.filter(layer => layer.get(key) === value);
}

// Select a layer by it's UID //
function getLayerByUid(layers, value) {
    return layers.array_.filter(layer => layer.ol_uid === value);
}

export {getLayersBy, getLayerByUid};