const SortingOrder = {
    get(sortingLayer) {
        const sortingLayerSize = 10000;
        return sortingLayer * sortingLayerSize;
    },

    getForEntity(entity) {
        return get(SortingLayer.Entities) + entity.position.y;
    }
}
