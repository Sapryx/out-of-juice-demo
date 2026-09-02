BUS.__addEventListener(E.EntityAttackHit, (type, attacker, target, damage) => {
    if(target.takeDamageSfx) G.audio.play(target.takeDamageSfx);
    if(attacker.dealDamageSfx) G.audio.play(attacker.dealDamageSfx);
});
