BUS.__addEventListener(E.EntityMove, (type, entity) => {
    const view = G.entityViews.get(entity);

    view.animateTo(entity.position, G.config.tilePassTime)
        .__setOnComplete(() => G.turnManager.isPlayerTurn = true);
});
