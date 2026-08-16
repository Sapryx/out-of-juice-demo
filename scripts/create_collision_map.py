import argparse
import json

import numpy as np
from PIL import Image


def load_alpha(png_path: str) -> np.ndarray:
    img = Image.open(png_path).convert("RGBA")
    return np.array(img)[:, :, 3]


def crop_to_multiple(alpha: np.ndarray, tile_size: int) -> np.ndarray:
    h, w = alpha.shape
    return alpha[
        :(h // tile_size) * tile_size,
        :(w // tile_size) * tile_size,
    ]


def collision_numpy(alpha: np.ndarray, tile_size: int) -> np.ndarray:
    alpha = crop_to_multiple(alpha, tile_size)
    h, w = alpha.shape
    tiles_y, tiles_x = h // tile_size, w // tile_size

    blocks = alpha.reshape(tiles_y, tile_size, tiles_x, tile_size)
    block_max = blocks.max(axis=(1, 3))

    return (block_max > 0).astype(np.uint8)


def grid_to_json(grid: np.ndarray) -> str:
    rows = [
        json.dumps(row.tolist(), separators=(", ", ":"))
        for row in grid
    ]

    return "[\n" + ",\n".join(rows) + "\n]"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("png", help="path to the PNG containing walls")
    parser.add_argument("--tile-size", type=int, default=16)
    parser.add_argument(
        "--out",
        default=None,
        help="where to save the JSON map (defaults to stdout)",
    )
    args = parser.parse_args()

    alpha = load_alpha(args.png)
    grid = collision_numpy(alpha, args.tile_size)
    collision_map = grid_to_json(grid)

    if args.out:
        with open(args.out, "w") as f:
            f.write(collision_map)

        print(f"Saved to {args.out}")
    else:
        print(collision_map)


if __name__ == "__main__":
    main()
