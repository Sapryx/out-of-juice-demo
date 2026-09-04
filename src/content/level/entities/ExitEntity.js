class ExitEntity extends GameEntity {
    getInteractionName() {
        return "descend";
    }

    getInteractionAction(actor) {
        return new InteractAction(actor, this);
    }

    interactWith(actor) {
        const levelSwitched = G.factory.moveToNextLevel();

        if(!levelSwitched) {
            G.windows.openVictoryWindow();
        }
    }
}
