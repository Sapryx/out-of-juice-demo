BUS.__addEventListener(E.EntityHurt, (type, entity, damage) => {
    if(entity === G.player) {
        Anims.animatePlayerHealthBar();
    }
});
