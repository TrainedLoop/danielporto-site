"""Draws the phase 5 objects in pixel art (Fulllab, e-commerce and mobile).

Usage:
    python -I tools/build_props_phase5.py <output-dir> [--lang en]

A fancier open-plan office, the reverse engineering of the VTEX API (with the magnifying
glass revealing the endpoints), the diagram of the apps and stores, and the "LEVEL UP!".
Client names appear only as text, no logos.
With --lang en, writes only the English variants (<name>.en.png) of the sprites with text.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from build_props import H, OUTLINE, W, WHITE, WOOD, box, canvas, rect, run, tr  # noqa: E402
from build_props_phase1 import CLOSE_H, CLOSE_W, PLANT, text  # noqa: E402
from build_props_phase3 import FLOOR_Y  # noqa: E402

BRICK = [(176, 92, 70), (150, 74, 56), (120, 58, 44)]
NEON = (255, 90, 200)
GOLD = [(255, 220, 90), (240, 190, 50), (200, 140, 30)]
TERMINAL = (18, 22, 30)
VTEX_PINK = (240, 40, 110)


def office(sign="FULLLAB", neon=NEON, glow=(120, 30, 90)):
    """Open-plan office; phase 6 reuses it with another sign."""
    img, d = canvas(W, H)
    # Light wall with a stretch of exposed brick.
    rect(d, 0, 0, W, FLOOR_Y, (236, 232, 224))
    rect(d, 120, 0, 120, FLOOR_Y, BRICK[1])
    for row, y in enumerate(range(0, FLOOR_Y, 6)):
        rect(d, 120, y, 120, 1, BRICK[2])
        for x in range(120 + (row % 2) * 6, 240, 12):
            rect(d, x, y + 1, 1, 5, BRICK[2])
            rect(d, x + 1, y + 1, 10, 1, BRICK[0])
    # Neon sign.
    sign_x = 180 - len(sign) * 4
    for dx, dy in ((-1, 0), (1, 0), (0, -1), (0, 1)):
        text(d, sign_x + dx, 24 + dy, sign, glow)
    text(d, sign_x, 24, sign, neon)
    # Big window with the city.
    box(d, 8, 12, 104, 86, (60, 64, 72))
    rect(d, 11, 15, 98, 80, (150, 200, 240))
    for bx, bw, bh, c in ((14, 16, 46, (110, 130, 160)), (32, 22, 62, (90, 110, 140)), (56, 14, 38, (120, 140, 170)), (72, 20, 54, (100, 120, 150)), (94, 14, 30, (130, 150, 180))):
        rect(d, bx, 95 - bh, bw, bh, c)
        for wy in range(95 - bh + 4, 92, 6):
            for wx in range(bx + 3, bx + bw - 2, 5):
                rect(d, wx, wy, 2, 3, (220, 230, 180))
    rect(d, 59, 15, 2, 80, (60, 64, 72))
    # Right side: shelf with plants and a picture.
    box(d, 252, 30, 56, 44, (240, 240, 236), WHITE, (190, 190, 186))
    rect(d, 256, 34, 48, 36, (60, 120, 200))
    rect(d, 256, 54, 48, 16, (240, 190, 60))
    # Light wood floor.
    rect(d, 0, FLOOR_Y, W, H - FLOOR_Y, (196, 150, 104))
    for y in range(FLOOR_Y, H, 5):
        rect(d, 0, y, W, 1, (170, 124, 82))
    for row, y in enumerate(range(FLOOR_Y, H, 5)):
        for x in range((row * 13) % 40, W, 40):
            rect(d, x, y + 1, 1, 4, (170, 124, 82))
    rect(d, 0, FLOOR_Y - 1, W, 1, OUTLINE)
    # Tall plants in the corners.
    for px in (112, 300):
        box(d, px, 118, 14, 22, (240, 240, 236), WHITE, (190, 190, 186))
        for lx, ly, lw, lh in ((px + 5, 86, 4, 32), (px - 2, 94, 9, 4), (px + 8, 98, 9, 4), (px - 1, 106, 8, 4), (px + 9, 108, 8, 4)):
            rect(d, lx, ly, lw, lh, PLANT[1])
            rect(d, lx, ly, lw, 1, PLANT[0])
    return img


def wood_desk():
    img, d = canvas(104, 36)
    box(d, 0, 0, 104, 5, WOOD[1], WOOD[0], WOOD[3])
    for x in (4, 94):
        rect(d, x, 5, 4, 31, (40, 42, 48))
    rect(d, 8, 26, 86, 2, (40, 42, 48))
    return img


# ---------------------------------------------------------------- close-up screens

ENDPOINTS = [
    "GET /catalog",
    "GET /sku/{id}",
    "GET /price",
    "GET /stock",
    "POST /checkout",
]


def close_reverse(revealed):
    img, d = canvas(CLOSE_W, CLOSE_H)
    rect(d, 0, 0, CLOSE_W, CLOSE_H, TERMINAL)
    rect(d, 0, 0, CLOSE_W, 12, VTEX_PINK)
    text(d, 4, 2, "VTEX API", WHITE)
    text(d, 84, 2, tr("sem docs", "no docs"), (255, 210, 230))
    for i, endpoint in enumerate(ENDPOINTS):
        y = 20 + i * 16
        if i < revealed:
            text(d, 8, y, endpoint, (110, 230, 140))
            text(d, CLOSE_W - 28, y, "200", (110, 230, 140))
        else:
            text(d, 8, y, "???? ????????", (90, 96, 110))
    return img


def magnifier():
    img, d = canvas(24, 24)
    d.ellipse((1, 1, 15, 15), fill=OUTLINE)
    d.ellipse((3, 3, 13, 13), fill=(200, 230, 250, 120))
    rect(d, 5, 5, 3, 2, WHITE)
    for i in range(7):
        rect(d, 13 + i, 13 + i, 3, 3, (120, 70, 40))
        d.point((13 + i, 15 + i), fill=OUTLINE)
    return img


# Diagram: phone → API → stores. The coordinates are also used in code for the packets.
DIAGRAM = {
    "phone": (6, 34, 22, 38),
    "api": (52, 42, 40, 22),
    "stores": [("VTEX", 10), ("Sephora", 44), ("Magento", 78)],
    "store_x": 104,
    "store_w": 68,
    "store_h": 18,
}


def close_diagram():
    img, d = canvas(CLOSE_W, CLOSE_H)
    rect(d, 0, 0, CLOSE_W, CLOSE_H, (246, 246, 250))
    px, py, pw, ph = DIAGRAM["phone"]
    box(d, px, py, pw, ph, (40, 42, 48))
    rect(d, px + 3, py + 4, pw - 6, ph - 10, (110, 180, 250))
    for gy in range(py + 6, py + ph - 8, 7):
        for gx in range(px + 5, px + pw - 5, 7):
            rect(d, gx, gy, 4, 4, WHITE)
    ax, ay, aw, ah = DIAGRAM["api"]
    box(d, ax, ay, aw, ah, (70, 100, 190), (100, 130, 220), (40, 60, 140))
    text(d, ax + 8, ay + 7, "API", WHITE)
    line = (170, 174, 190)
    rect(d, px + pw, ay + ah // 2, ax - px - pw, 2, line)
    sx, sw, sh = DIAGRAM["store_x"], DIAGRAM["store_w"], DIAGRAM["store_h"]
    for name, sy in DIAGRAM["stores"]:
        color = VTEX_PINK if name == "VTEX" else (40, 40, 44) if name == "Sephora" else (240, 120, 40)
        # "L"-shaped line from the API to the store.
        mid_x = ax + aw + 6
        rect(d, ax + aw, ay + ah // 2, mid_x - ax - aw, 2, line)
        top, bottom = sorted((ay + ah // 2, sy + sh // 2))
        rect(d, mid_x, top, 2, bottom - top + 2, line)
        rect(d, mid_x, sy + sh // 2, sx - mid_x, 2, line)
        box(d, sx, sy, sw, sh, WHITE, None, (200, 200, 210))
        rect(d, sx + 1, sy + 1, 4, sh - 2, color)
        text(d, sx + 7, sy + 5, name, (40, 40, 48))
    # Little robot (Selenium) next to the store with no API.
    rx, ry = 96, 30
    box(d, rx, ry, 12, 10, (180, 186, 200), WHITE, (120, 126, 140))
    rect(d, rx + 3, ry + 3, 2, 2, (40, 200, 120))
    rect(d, rx + 7, ry + 3, 2, 2, (40, 200, 120))
    rect(d, rx + 5, ry - 3, 2, 3, (120, 126, 140))
    return img


def level_up():
    img, d = canvas(112, 32)
    for dx, dy in ((-1, 0), (1, 0), (0, -1), (0, 1), (1, 1)):
        text(d, 20 + dx, 2 + dy, "LEVEL UP!", OUTLINE)
    text(d, 20, 2, "LEVEL UP!", GOLD[0])
    box(d, 0, 14, 112, 16, (42, 33, 51), (60, 50, 70), (27, 22, 34))
    gold = (243, 192, 63)
    if tr(False, True):  # English: no accents to draw by hand
        text(d, 20, 19, "TECH LEAD", gold)
        return img
    # The font draws "Í" and "É" as lowercase: write without accents and draw them by hand.
    text(d, 4, 19, "LIDER TECNICO", gold)
    for char_index in (1, 7):  # the "I" of LIDER and the "E" of TECNICO
        x = 4 + char_index * 8
        rect(d, x + 4, 16, 2, 1, gold)
        d.point((x + 3, 17), fill=gold)
    return img


def star():
    img, d = canvas(7, 7)
    rect(d, 3, 0, 1, 7, GOLD[0])
    rect(d, 0, 3, 7, 1, GOLD[0])
    rect(d, 2, 2, 3, 3, GOLD[1])
    return img


def phone_item():
    """Phone with the app open (inventory item)."""
    img, d = canvas(32, 32)
    box(d, 8, 2, 16, 28, (30, 32, 38), (60, 62, 70), OUTLINE)
    rect(d, 10, 5, 12, 20, (110, 180, 250))
    rect(d, 10, 5, 12, 3, VTEX_PINK)
    for gy in (10, 15, 20):
        for gx in (11, 16):
            rect(d, gx, gy, 4, 3, WHITE)
    rect(d, 14, 27, 4, 1, (90, 92, 100))
    return img


def build():
    sprites = {
        "office": office(),
        "desk": wood_desk(),
        "lupa": magnifier(),
        "diagram": close_diagram(),
        "level-up": level_up(),
        "star": star(),
        "item-phone": phone_item(),
    }
    for revealed in range(len(ENDPOINTS) + 1):
        sprites[f"reverse-{revealed}"] = close_reverse(revealed)
    return sprites


if __name__ == "__main__":
    run(build)
