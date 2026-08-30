class GameWindowManager {
    constructor() {
        this._currentWindowNode = null;
    }

    get anyIsOpen() {
        return this._currentWindowNode != null;
    }

    get nothingIsOpen() {
        return this._currentWindowNode == null;
    }

    /**
     * @param {WindowType} windowType
     */
    isOpen(windowType) {
        if(this._currentWindowNode) {
            return this._currentWindowNode._type === windowType;
        } else {
            return false;
        }
    }

    closeCurrentWindow() {
        const windowNode = this._currentWindowNode;

        if(windowNode != null) {
            windowNode.__close();
            this._currentWindowNode = null;

            G.presenter.onWindowClose(windowNode);
        }
    }

    openInventoryWindow() {
        this._displayWindow(WindowType.Inventory, (windowNode) => {
            const items = G.player.inventory.getItems();
            let firstItemCard = null;

            windowNode.__init({
                __addedProperties: {
                    _selectedItemCard: {
                        get() {
                            return this.__selectedItemCard;
                        },

                        set(value) {
                            if(this.__selectedItemCard) {
                                this.__selectedItemCard._setSelected(false);
                            }

                            this.__selectedItemCard = value;

                            if(value) {
                                value._setSelected(true);
                            }

                            this._show_info(value);
                        }
                    }
                },

                _show_info(itemCard) {
                    if(itemCard) {
                        windowNode.__setAliasesData({
                            item_info_name: {__text: itemCard._item.asset.name},
                            item_info_description: {__text: itemCard._item.asset.description}
                        });
                    }
                },

                __aliasing1: {
                    use_button: {
                        __onTap() {
                            if(windowNode._selectedItemCard) {
                                windowNode._selectedItemCard._item.use(G.player);
                            }
                        }
                    },

                    item_sidebar: {
                        __childs: $map(items.filter(it => it != null), item => {
                            const itemCard = new ENode("item_card").__init({
                                __addedProperties: {
                                    _item: {
                                        set(value) {
                                            this.__item = value;
                                        },
                                        get() {
                                            return this.__item;
                                        }
                                    }
                                },
                                _item: item,

                                _setSelected(selected) {
                                    const defaultColor = 0x4a5462;
                                    const selectedColor = 0xfa6a0a;

                                    this.__color = selected ? selectedColor : defaultColor;
                                    this.__setAliasesData({
                                        item_name: {__color: selected ? selectedColor : defaultColor}
                                    });
                                },

                                __aliasing1: {
                                    item_icon: {__img: item.asset.iconPath},
                                    item_text: {__text: item.asset.name}
                                },
                                __onTap() {
                                    windowNode._selectedItemCard = this;
                                }
                            });

                            if(!firstItemCard) {
                                firstItemCard = itemCard;
                            }

                            return itemCard;
                        })
                    }
                }
            });

            if(firstItemCard) {
                windowNode._selectedItemCard = firstItemCard;
            }
        });
    }

    openPauseWindow() {
        this._displayWindow(WindowType.Pause, (windowNode) => {
            windowNode.__setAliasesData({
                resume_button: {
                    __onTap() {
                        G.windows.closeCurrentWindow();
                    }
                },

                abandon_run_button: {
                    __onTap() {
                        restartGame();
                        G.windows.closeCurrentWindow();
                    }
                }
            });
        });
    }

    /**
     * @param {WindowType} windowType
     * @param {(ENode) => void} onShow
     * @private
     */
    _displayWindow(windowType, onShow) {
        this._currentWindowNode = showWindow(windowType, (windowNode) => {
            windowNode.init({
                __addedProperties: {
                    _type: {
                        get() {
                            return this.__type;
                        },
                        set(value) {
                            this.__type = value;
                        }
                    }
                },

                _type: windowType
            });

            if(onShow) {
                onShow(windowNode);
            }

            G.presenter.onWindowOpen(windowNode);
        });
    }
}
