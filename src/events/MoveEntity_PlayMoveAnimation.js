BUS.__addEventListener(E.MoveEntity, (type, entity) => {
    const view = G.entityViews.get(entity);
    view.animateTo(math2d.flipY(entity.position), G.config.tilePassTime);
});
