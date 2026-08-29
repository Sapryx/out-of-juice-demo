class GameWindowManager {
    constructor() {
        this._currentWindowNode = null;
    }

    get windowIsOpen() {
        return this._currentWindowNode != null;
    }

    closeCurrentWindow() {
        if(this.windowIsOpen) {
            this._currentWindowNode.__close();
            this._currentWindowNode = null;
        }
    }

    showInventoryWindow() {
        this._currentWindowNode = showWindow("inventory_window", (windowNode) => {
            const items = G.player.inventory.getItems();

            windowNode.__init({
                __addedProperties: {
                    _selectedItem: {
                        set(value) {
                            console.log("F");
                            this.__si = value;
                            this.__show_info(value);
                        },
                        get() {
                            return this.__si;
                        }
                    }
                },

                __show_info(item) {
                    if(item != null) {
                        windowNode.__setAliasesData({
                            item_info_name: {__text: item.item.name},
                            item_info_description: {__text: item.item.description}
                        });


                    }
                },

                __aliasing1: {
                    use_button: {
                        __onTap() {
                            if(windowNode._selectedItem !== undefined) {
                                windowNode._selectedItem.use(G.player);
                            }
                        }
                    },

                    item_sidebar: {
                        __childs: $map(items.filter(it => it != null), item => new ENode("item_card").__init({
                            __aliasing1: {
                                item_icon: {__img: item.item.iconPath},
                                item_text: {__text: item.item.name}
                            },
                            __onTap() {
                                console.log("Tap");
                                windowNode._selectedItem = item;
                            }
                        }))
                    }
                }
            });

            windowNode._selectedItem = items[0];
        });
    }
}
