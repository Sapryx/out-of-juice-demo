BUS.__addEventListener(E.WindowOpen, (type, windowNode) => {
    G.gameView.levelView.tileSelection.__alpha = 0;
    document.body.style.cursor = "auto";
});
