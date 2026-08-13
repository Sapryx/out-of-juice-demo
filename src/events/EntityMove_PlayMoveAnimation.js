BUS.__addEventListener(E.EntityMove, (type, entity) => {
    const view = G.entityViews.get(entity);

    view.animateTo(entity.position, Cfg.MovementSpeed)
        .__setOnComplete(() => G.turnManager.isPlayerTurn = true);
});
