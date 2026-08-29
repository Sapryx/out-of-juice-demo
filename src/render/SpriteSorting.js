const SpriteSorting = {
    getZ(sortingLayer) {
        const sortingLayerSize = 10_000;
        return sortingLayer * sortingLayerSize;
    }
}

const SortingLayer = Object.freeze({
    Floor: 1,
    Entities: 0
});
