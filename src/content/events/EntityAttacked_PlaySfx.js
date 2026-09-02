BUS.__addEventListener(E.EntityAttacked, (type, attacker, target, damage) => {
    G.audio.play(SFX.Swing);
});
