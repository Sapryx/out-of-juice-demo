BUS.__addEventListener(E.WindowOpened, (type, windowNode) => {
    G.gameView.levelView.tileSelection.__alpha = 0;
    document.body.style.cursor = "auto";
});
