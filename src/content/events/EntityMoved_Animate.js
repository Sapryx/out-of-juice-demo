BUS.__addEventListener(E.EntityMoved, (type, entity, callback) => {
    const view = G.entityViews.get(entity);

    if(!view) return;

    const targetPosition = math2d.flipY(entity.position);
    const animationDuration = G.config.tilePassTime;

    view.node.__z = SortingOrder.getForEntity(entity);

    if(entity !== G.player && entity.isHostile) {
        const playerDirection = sign(G.player.position.x - entity.position.x);

        if(playerDirection !== 0) {
            view.node.__scalex = playerDirection;
        }
    }

    if(entity === G.player) {
        G.audio.play(SFX.PlayerWalk);
    }

    G.targeting.update();

    Anims.walk(view.node, targetPosition, animationDuration)
        .__setOnComplete(callback);
});
