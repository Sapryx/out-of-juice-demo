BUS.__addEventListener(E.WindowClosed, (type, windowNode) => {
    G.gameView.levelView.tileSelection.__alpha = 1;
    document.body.style.cursor = "none";
});
