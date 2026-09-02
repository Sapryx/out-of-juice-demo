BUS.__addEventListener(E.EntityHurt, (type, entity, damage) => {
    const view = G.entityViews.get(entity);
    Anims.hurt(view.node, 0.1);
});
