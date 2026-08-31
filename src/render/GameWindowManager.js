class GameWindowManager {
    constructor() {
        this.current = null;
    }

    get hasOpenWindow() {
        return this.current != null;
    }

    /**
     * @param {WindowType} windowType
     */
    isOpen(windowType) {
        if(this.current) {
            return this.current.type === windowType;
        } else {
            return false;
        }
    }

    closeCurrentWindow() {
        const windowNode = this.current;

        if(windowNode != null) {
            windowNode.__close();
            this.current = null;

            G.presenter.onWindowClose(windowNode);
        }
    }

    openInventoryWindow() {
        this._openWindow(WindowType.Inventory, (windowNode) => {
            windowNode.__init({
                __addedProperties: {
                    selectedItemCard: {
                        get() {
                            return this._selectedItemCard;
                        },

                        set(value) {
                            if(this._selectedItemCard) {
                                this._selectedItemCard._setSelected(false);
                            }

                            this._selectedItemCard = value;

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
                            item_info_name: {__text: itemCard.item.asset.name},
                            item_info_description: {__text: itemCard.item.asset.description}
                        });
                    }
                },

                refreshItemSidebar() {
                    const items = G.player.inventory.getItems();
                    let firstItemCard = null;

                    this.root.item_sidebar.__clearChildNodes();

                    this.__setAliasesData({
                        item_sidebar: {
                            __childs: $map(items.filter(it => it != null), item => {
                                const itemCard = new ENode("item_card").__init({
                                    __addedProperties: {
                                        item: {
                                            set(value) {
                                                this._item = value;
                                            },
                                            get() {
                                                return this._item;
                                            }
                                        }
                                    },
                                    item: item,

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
                                        windowNode.selectedItemCard = this;
                                    }
                                });

                                if(!firstItemCard) {
                                    firstItemCard = itemCard;
                                }

                                return itemCard;
                            })
                        }
                    });

                    if(firstItemCard) {
                        windowNode.selectedItemCard = firstItemCard;
                    }
                },

                __aliasing1: {
                    use_button: {
                        __onTap() {
                            if(windowNode.selectedItemCard) {
                                const item = windowNode.selectedItemCard.item;
                                item.use(G.player);
                                G.player.inventory.removeItem(item);
                            }
                        }
                    },

                    item_sidebar: {
                        __scroll: {
                            __onlyScrollY: true
                        }
                    }
                }
            });

            windowNode.refreshItemSidebar();
        });
    }

    openPauseWindow() {
        this._openWindow(WindowType.Pause, (windowNode) => {
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
     * @param {(ENode) => void} onOpened
     * @private
     */
    _openWindow(windowType, onOpened) {
        this.current = showWindow(windowType, (windowNode) => {
            windowNode.init({
                __addedProperties: {
                    type: {
                        get() {
                            return this._type;
                        },
                        set(value) {
                            this._type = value;
                        }
                    }
                },

                type: windowType
            });

            if(onOpened) onOpened(windowNode);
            G.presenter.onWindowOpen(windowNode);
        });
    }
}
