const SpriteSorting = {
    getZ(sortingLayer) {
        const sortingLayerSize = 10000;
        return sortingLayer * sortingLayerSize;
    }
}

const SortingLayer = Object.freeze({
    Floor: 1,
    Entities: 0
});
