class ExitEntity extends GameEntity {
    getInteractionAction(actor) {
        return new InteractAction(actor, this);
    }

    interactWith(actor) {
        G.factory.moveToNextLevel();
        // restartGame();
    }
}
