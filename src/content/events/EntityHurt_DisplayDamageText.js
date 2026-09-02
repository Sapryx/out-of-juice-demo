BUS.__addEventListener(E.EntityHurt, (type, entity, damage) => {
    if(entity === G.player) return;

    const view = G.entityViews.get(entity);
    const y = view.node.__ofs.y - view.node.sprite.__size.y;
    const x = view.node.__ofs.x + randomFloatSpread(G.config.tileSize);
    const damageText = G.gameView.levelView.node.__addChildBox({
        __ofs: [x, y, -100],
        __size: [1, 1, 0, "o"],
        __text: {
            __color: 0xFF0000,
            __fontsize: 10,
            __text: damage
        },
    });

    anim(damageText, {
        __y: damageText.__y - 8,
        __alpha: 0
    }, 1, undefined, easeQuadO)
        .__setOnComplete(() => damageText.__removeFromParent());
});
