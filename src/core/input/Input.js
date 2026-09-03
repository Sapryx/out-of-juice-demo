class Input {
    init() {
        this._upIsPressed = false;
        this._downIsPressed = false;
        this._leftIsPressed = false;
        this._rightIsPressed = false;
        this._attackIsPressed = false;

        gestures.__onKeyDown = this._onKeyDown.bind(this);
        gestures.__onKeyUp = this._onKeyUp.bind(this);
    }

    reset() {
        this._attackIsPressed = false;
    }

    getMouseScreenPosition() {
        return new Vector2(mouse.x / layoutsResolutionMult, mouse.y / layoutsResolutionMult);
    }

    getMouseWorldPosition(camera) {
        const screenPosition = this.getMouseScreenPosition();
        const cameraPosition = new Vector2(camera.__x, camera.__y);

        const screenOffset = math2d.flipY(math2d.sub(screenPosition, __screenCenter));
        const worldOffset = math2d.div(screenOffset, camera.__zoom);
        const worldPixelPosition = math2d.add(worldOffset, cameraPosition);

        return math2d.div(worldPixelPosition, G.config.tileSize);
    }

    getMouseGridPosition(camera) {
        return math2d.round(this.getMouseWorldPosition(camera));
    }

    getAxis(axis) {
        switch(axis) {
            case Axis.Horizontal: {
                if(this._rightIsPressed) {
                    return 1;
                }

                if(this._leftIsPressed) {
                    return -1;
                }

                return 0;
            }

            case Axis.Vertical: {
                if(this._downIsPressed) {
                    return -1;
                }

                if(this._upIsPressed) {
                    return 1;
                }

                return 0;
            }
        }
    }

    consumeAttack() {
        if(this._attackIsPressed) {
            this._attackIsPressed = false;
            return true;
        }

        return false;
    }

    _onKeyDown(keyCode, key, ctrl, shift, alt, e) {
        switch(key) {
            case "w": this._upIsPressed = true; break;
            case "s": this._downIsPressed = true; break;
            case "a": this._leftIsPressed = true; break;
            case "d": this._rightIsPressed = true; break;
            case " ": this._attackIsPressed = true; break;
            case "e": this._selectNextTarget(); break;
            case "q": this._selectPreviousTarget(); break;
            case "tab": this._toggleInventoryWindow(e); break;
            case "escape": this._togglePauseWindow(); break;
        }
    }

    _selectNextTarget() {
        if(!G.windows.hasOpenWindow) {
            G.targeting.selectNext();
        }
    }

    _selectPreviousTarget() {
        if(!G.windows.hasOpenWindow) {
            G.targeting.selectPrevious();
        }
    }

    _toggleInventoryWindow(e) {
        if(G.windows.isOpen(WindowType.Inventory)) {
            G.windows.closeCurrentWindow();
            e.preventDefault();
            return;
        }

        if(!G.windows.hasOpenWindow) {
            e.preventDefault();
            G.windows.openInventoryWindow();
        }
    }

    _togglePauseWindow() {
        if(!G.player) {
            return;
        }

        if(G.windows.hasOpenWindow) {
            G.windows.closeCurrentWindow();
        } else {
            G.windows.openPauseWindow();
        }
    }

    _onKeyUp(keyCode, key, ctrl, shift, alt, e) {
        switch(key) {
            case "w": this._upIsPressed = false; break;
            case "s": this._downIsPressed = false; break;
            case "a": this._leftIsPressed = false; break;
            case "d": this._rightIsPressed = false; break;
            case " ": this._attackIsPressed = false; break;
        }
    }
}
