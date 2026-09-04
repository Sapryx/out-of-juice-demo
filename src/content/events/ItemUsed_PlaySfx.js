BUS.__addEventListener(E.ItemUsed, (type, item) => {
    console.log(item.asset);
    if(item.asset.useSfx) G.audio.play(item.asset.useSfx);
});
