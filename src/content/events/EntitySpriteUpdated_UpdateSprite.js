BUS.__addEventListener(E.EntitySpriteUpdated, (type, entity, spritePath) => {
    const view = G.entityViews.get(entity);

    if(!view) return;

    view.node.__setAliasesData({
        sprite: {
            __img: spritePath
        }
    });
});
