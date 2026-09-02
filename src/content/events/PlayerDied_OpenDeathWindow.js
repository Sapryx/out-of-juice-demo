BUS.__addEventListener(E.PlayerDied, (type, player) => {
    if(G.windows.hasOpenWindow) {
        G.windows.closeCurrentWindow();
    }

    G.windows.openDeathWindow();
});
