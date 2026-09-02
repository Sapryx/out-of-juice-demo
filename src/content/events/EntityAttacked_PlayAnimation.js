BUS.__addEventListener(E.EntityAttacked, (type, attacker, target, damage) => {
    const attackerView = G.entityViews.get(attacker);

    const onAttackHit = () => {
        BUS.__post(E.EntityAttackHit, attacker, target, damage);
    };

    const onAttackFinished = () => {
        BUS.__post(E.EntityAttackFinished, attacker);
    };

    if(!attackerView) {
        onAttackHit();
        onAttackFinished();
        return;
    }

    Anims.attack(
        attackerView.node,
        math2d.flipY(attacker.position),
        math2d.flipY(target.position),
        0.25,
        onAttackHit,
        onAttackFinished
    );
});
