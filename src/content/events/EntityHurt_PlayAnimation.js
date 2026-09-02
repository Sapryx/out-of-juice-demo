BUS.__addEventListener(E.EntityAttackHit, (type, attacker, target, damage, hitIsCritical) => {
    const view = G.entityViews.get(target);
    Anims.hurt(view.node, 0.1);
});
