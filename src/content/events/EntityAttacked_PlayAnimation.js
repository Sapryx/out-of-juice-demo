BUS.__addEventListener(E.EntityAttacked, (type, attacker, target, onHitTarget, onComplete) => {
    const attackerView = G.entityViews.get(attacker);
    const targetPosition = math2d.flipY(target.position);
    const startPosition = math2d.flipY(attacker.position);

    if(attackerView) {
        Anims.attack(
            attackerView.node,
            startPosition,
            targetPosition,
            0.25,
            () => {
                G.audio.play(attacker.dealDamageSfx);
                G.audio.play(target.takeDamageSfx);
                onHitTarget();
            },
            onComplete
        );
    }

    G.audio.play(SFX.Swing);
});
