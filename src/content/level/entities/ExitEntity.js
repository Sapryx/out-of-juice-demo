class ExitEntity extends GameEntity {
    getInteractionAction(actor) {
        return new InteractAction(actor, this);
    }

    interactWith(actor) {
        restartGame();
    }
}
