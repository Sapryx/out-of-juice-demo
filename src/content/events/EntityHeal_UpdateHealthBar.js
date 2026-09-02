BUS.__addEventListener(E.EntityHeal, (type, entity) => {
    if(entity === G.player) {
        Anims.healthBarDamage(G.gameView.gui.node.health_bar.health_bar_fill, 0.1);
    }
});
