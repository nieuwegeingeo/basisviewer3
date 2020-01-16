function getLayersBy(layers, key, value) {
    return layers.array_.array_.filter(layer => layer.get(key) === value);
}

function getLayerById(layers, value) {
    return layers.array_.filter(layer => layer.ol_uid === value);
}

export {getLayersBy, getLayerById};