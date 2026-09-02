BUS.__addEventListener(E.EntityHealed, (type, entity) => {
    if(entity === G.player) {
        Anims.animatePlayerHealthBar();
    }
});
