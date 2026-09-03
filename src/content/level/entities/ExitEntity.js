class ExitEntity extends GameEntity {
    getInteractionName() {
        return "descend";
    }

    getInteractionAction(actor) {
        return new InteractAction(actor, this);
    }

    interactWith(actor) {
        G.factory.moveToNextLevel();
    }
}
