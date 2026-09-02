BUS.__addEventListener(E.EntityRemoved, (type, entity) => {
    G.entityViews.remove(entity);
    G.targeting.update();
});
