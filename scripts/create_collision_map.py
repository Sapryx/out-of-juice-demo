import argparse

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

    return block_max > 0


def grid_to_ascii(grid: np.ndarray) -> str:
    return "\n".join(
        "".join("#" if cell else "." for cell in row)
        for row in grid
    )


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("png", help="path to the PNG containing walls")
    parser.add_argument("--tile-size", type=int, default=16)
    parser.add_argument(
        "--out",
        default=None,
        help="where to save the ASCII map (defaults to stdout)",
    )
    args = parser.parse_args()

    alpha = load_alpha(args.png)
    grid = collision_numpy(alpha, args.tile_size)
    ascii_map = grid_to_ascii(grid)

    if args.out:
        with open(args.out, "w") as f:
            f.write(ascii_map)

        print(f"Saved to {args.out}")
    else:
        print(ascii_map)


if __name__ == "__main__":
    main()
