const SFX = Object.freeze({
    PlayerWalk: new SoundEffect(
        0.2,
        "sfx",
        [
            "player_walk_1",
            "player_walk_2",
            "player_walk_3",
            "player_walk_4",
            "player_walk_5",
        ]
    ),

    Swing: new SoundEffect(
        1,
        "sfx",
        [
            "swing_1",
            "swing_2",
            "swing_3",
            "swing_4"
        ]
    ),

    HitMetal: new SoundEffect(
        1,
        "sfx",
        [
            "hit_metal"
        ]
    ),

    Burn: new SoundEffect(
        1,
        "sfx",
        [
            "burn"
        ]
    )
});
