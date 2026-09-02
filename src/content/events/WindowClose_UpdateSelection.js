BUS.__addEventListener(E.WindowClose, (type, windowNode) => {
    G.gameView.levelView.tileSelection.__alpha = 1;
    document.body.style.cursor = "none";
});
