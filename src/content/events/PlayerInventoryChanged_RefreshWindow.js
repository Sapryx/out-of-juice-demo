BUS.__addEventListener(E.PlayerInventoryChanged, () => {
    const currentWindow = G.windows.current;

    if(currentWindow && currentWindow.type === WindowType.Inventory) {
        currentWindow.refreshItemSidebar();
    }
});
