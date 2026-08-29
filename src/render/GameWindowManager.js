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
                            this.__selectedItem = value;
                            this._show_info(value);
                        },
                        get() {
                            return this.__selectedItem;
                        }
                    }
                },

                _show_info(item) {
                    if(item != null) {
                        windowNode.__setAliasesData({
                            item_info_name: {__text: item.asset.name},
                            item_info_description: {__text: item.asset.description}
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
                                item_icon: {__img: item.asset.iconPath},
                                item_text: {__text: item.asset.name}
                            },
                            __onTap() {
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
