class Presenter {
    onMoveEntity(entity, callback) {
        const view = G.entityViews.get(entity);
        view.animateTo(math2d.flipY(entity.position), G.config.tilePassTime)
            .__setOnComplete(callback);
    }
}
