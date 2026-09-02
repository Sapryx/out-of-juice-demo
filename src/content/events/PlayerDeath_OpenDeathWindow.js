BUS.__addEventListener(E.PlayerDeath, (type, player) => {
    if(G.windows.hasOpenWindow) {
        G.windows.closeCurrentWindow();
    }

    G.player = null;
    G.windows.openDeathWindow();
});
