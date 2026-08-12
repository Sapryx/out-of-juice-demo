BUS.__addEventListener(Events.EntityMove, (type, entity) => {
    const view = G.entityViews.get(entity);

    anim(view, {
        __x: entity.pos.x,
        __y: -entity.pos.y
    }, Cfg.MovementSpeed)
        .__setOnComplete(() => {
            G.turnManager.isPlayerTurn = true;
        });
});
