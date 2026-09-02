BUS.__addEventListener(E.EntityAttackHit, (type, attacker, target, damage, hitIsCritical) => {
    if(target === G.player) {
        return;
    }

    const view = G.entityViews.get(target);
    const y = view.node.__ofs.y - view.node.sprite.__size.y;
    const x = view.node.__ofs.x + randomFloatSpread(G.config.tileSize);
    const damageText = G.gameView.levelView.node.__addChildBox({
        __ofs: [x, y, -100],
        __size: [1, 1, 0, "o"],
        __text: {
            __color: hitIsCritical ? 0xFFFF00 : 0xFF0000,
            __fontsize: hitIsCritical ? 14 : 10,
            __text: damage
        },
    });

    anim(damageText, {
        __y: damageText.__y - 8,
        __alpha: 0
    }, 1, undefined, easeQuadO)
        .__setOnComplete(() => damageText.__removeFromParent());
});
