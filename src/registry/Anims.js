const Anims = {
    /**
     * @param {ENode} node
     * @param {Vector2} targetPosition
     * @param {number} duration
     * @returns {Tween}
     */
    walk(node, targetPosition, duration) {
        const tileSize = G.config.tileSize;

        return anim(node, {
            __x: targetPosition.x * tileSize,
            __y: targetPosition.y * tileSize
        }, duration, undefined, easeLinear);
    },

    /**
     * @param {ENode} node
     * @param {Vector2} currentPosition
     * @param {Vector2} targetPosition
     * @param {number} duration
     * @param {ENode} node
     * @param {() => void} onHitTarget
     * @param {() => void} onComplete
     * @returns {TweenSequence}
     */
    attack(node, currentPosition, targetPosition, duration, onHitTarget, onComplete) {
        const start = math2d.copy(currentPosition);
        const halfDuration = duration / 2;
        const tileSize = G.config.tileSize;

        const steps = [
            [node, {
                __x: targetPosition.x * tileSize,
                __y: targetPosition.y * tileSize
            }, halfDuration, undefined, easeQuadO],

            () => {
                if(onHitTarget) onHitTarget();
            },

            [node, {
                __x: start.x * tileSize,
                __y: start.y * tileSize
            }, halfDuration, undefined, easeQuadI],
        ];

        if(onComplete) steps.push(onComplete);

        return anim(steps);
    },

    hurt(node, duration) {
        node.sprite.__color = 0xFF0000;
        _setTimeout(() => node.sprite.__color = 0xFFFFFF, duration);
    }
};
