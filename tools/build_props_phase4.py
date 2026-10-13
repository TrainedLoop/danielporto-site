"""Draws the phase 4 objects in pixel art (Hebara, the first dev job).

Usage:
    python -I tools/build_props_phase4.py <output-dir> [--lang en]

Office with scratch-card posters, the badge, the IDE with the intranet code, the first
production deploy and a scratch card (drawn from scratch) that reveals the new site.
With --lang en, writes only the English variants (<name>.en.png) of the sprites with text.
"""

import random
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from build_props import H, OUTLINE, W, WHITE, box, canvas, rect, run, tr  # noqa: E402
from build_props_phase1 import CLOSE_H, CLOSE_W, XP_GREEN, text  # noqa: E402
from build_props_phase3 import CARPET, FLOOR_Y  # noqa: E402

GOLD = [(255, 220, 90), (240, 190, 50), (200, 140, 30)]
SILVER = [(214, 218, 226), (190, 194, 204), (160, 164, 176)]
IDE_BG = (30, 30, 36)


def ticket(d, x, y, w, h, color, label):
    """Generic scratch-card ticket, for the wall posters."""
    box(d, x, y, w, h, color[0], color[1], color[2])
    rect(d, x + 3, y + 3, w - 6, 7, WHITE)
    rect(d, x + 4, y + 5, len(label) * 2, 3, color[2])
    for i in range(3):
        rect(d, x + 4 + i * ((w - 8) // 3), y + 14, (w - 8) // 3 - 2, (h - 20), SILVER[1])
        d.point((x + 6 + i * ((w - 8) // 3), y + 16), fill=WHITE)


def office():
    img, d = canvas(W, H)
    rect(d, 0, 0, W, FLOOR_Y, (240, 238, 232))
    rect(d, 0, 98, W, FLOOR_Y - 98, (222, 218, 210))
    rect(d, 0, 98, W, 2, (196, 192, 184))
    rect(d, 0, FLOOR_Y, W, H - FLOOR_Y, CARPET[1])
    for y in range(FLOOR_Y + 4, H, 6):
        for x in range((y // 6 % 2) * 3, W, 6):
            d.point((x, y), fill=CARPET[2])
    rect(d, 0, FLOOR_Y - 1, W, 1, OUTLINE)
    # Scratch-card posters on the wall.
    ticket(d, 14, 24, 30, 44, [(70, 160, 230), (110, 190, 250), (40, 110, 180)], "RIO")
    ticket(d, 52, 30, 30, 44, [(240, 110, 60), (255, 150, 90), (190, 70, 30)], "SORTE")
    ticket(d, 90, 24, 30, 44, [(90, 190, 90), (130, 220, 120), (50, 140, 60)], "PREMIO")
    # The company's sign.
    box(d, 200, 22, 76, 18, (40, 60, 120), (70, 90, 160), (20, 36, 80))
    text(d, 214, 27, "HEBARA", GOLD[0])
    # Little "prize" sparkles around the posters.
    for sx, sy in ((10, 20), (48, 78), (124, 20), (126, 70)):
        rect(d, sx, sy + 1, 3, 1, GOLD[0])
        rect(d, sx + 1, sy, 1, 3, GOLD[0])
    return img


def badge():
    """First job badge, with a lanyard (inventory item)."""
    img, d = canvas(32, 32)
    lanyard = (60, 90, 200)
    for i in range(10):
        for dx in (0, 1):
            d.point((9 + dx + i // 2, i), fill=lanyard)
            d.point((22 - dx - i // 2, i), fill=lanyard)
    rect(d, 14, 9, 4, 3, SILVER[2])
    box(d, 6, 11, 20, 20, WHITE, None, SILVER[2])
    rect(d, 7, 12, 18, 4, (40, 60, 120))
    box(d, 9, 17, 7, 8, (250, 210, 170))
    rect(d, 10, 17, 5, 2, (40, 30, 26))  # photo's hair
    rect(d, 9, 23, 7, 2, (30, 30, 30))  # black t-shirt
    for y in (18, 21, 24):
        rect(d, 18, y, 6, 1, (150, 150, 160))
    return img


# ---------------------------------------------------------------- close-up screens

IDE_LINES = [
    ("public class", (90, 160, 250)),
    ("  Intranet", (80, 200, 170)),
    ("{", (220, 220, 220)),
    ("  Index() {", (220, 200, 120)),
    ("    return", (90, 160, 250)),
    ("      View();", (220, 220, 220)),
    ("}", (220, 220, 220)),
]


def ide(lines):
    img, d = canvas(CLOSE_W, CLOSE_H)
    rect(d, 0, 0, CLOSE_W, CLOSE_H, IDE_BG)
    rect(d, 0, 0, CLOSE_W, 11, (60, 60, 70))
    text(d, 3, 2, "Intranet.cs", (200, 200, 210))
    rect(d, 0, 11, 14, CLOSE_H - 11, (40, 40, 48))
    for i in range(min(lines + 1, len(IDE_LINES))):
        text(d, 2, 15 + i * 12, str(i + 1), (110, 110, 120))
    for i, (line, color) in enumerate(IDE_LINES[:lines]):
        text(d, 18, 15 + i * 12, line, color)
    if lines < len(IDE_LINES):
        rect(d, 18, 15 + lines * 12, 6, 8, (220, 220, 220))
    return img


def intranet():
    img, d = canvas(CLOSE_W, CLOSE_H)
    rect(d, 0, 0, CLOSE_W, CLOSE_H, (244, 244, 248))
    rect(d, 0, 0, CLOSE_W, 14, (40, 60, 120))
    text(d, 4, 3, "Intranet", GOLD[0])
    rect(d, 0, 14, 40, CLOSE_H - 14, (220, 224, 236))
    for y in (20, 32, 44, 56):
        rect(d, 4, y, 30, 6, (170, 180, 210))
    for i, (x, y) in enumerate(((48, 22), (112, 22), (48, 64), (112, 64))):
        box(d, x, y, 56, 36, WHITE, None, (200, 200, 210))
        rect(d, x + 4, y + 4, 30, 4, (40, 60, 120))
        for k in range(3):
            rect(d, x + 4, y + 12 + k * 6, 44 - k * 8, 2, (180, 180, 190))
    return img


def deploy(done):
    """Publishing to the server; the bar (x=24, y=60, 128x10) is filled in code."""
    img, d = canvas(CLOSE_W, CLOSE_H)
    rect(d, 0, 0, CLOSE_W, CLOSE_H, (240, 240, 236))
    rect(d, 0, 0, CLOSE_W, 12, (60, 60, 70))
    text(d, 3, 2, tr("Publicar", "Publish"), WHITE)
    # Production server.
    box(d, 12, 20, 24, 34, (60, 62, 70), (90, 92, 100), (30, 32, 36))
    for y in (24, 32, 40):
        rect(d, 15, y, 18, 5, (40, 42, 48))
        rect(d, 29, y + 2, 2, 1, XP_GREEN if done else (240, 180, 40))
    text(d, 44, 24, tr("PRODUÇÃO", "PRODUCTION"), (190, 40, 40))
    text(d, 44, 38, "IIS + Oracle", (80, 80, 90))
    rect(d, 22, 58, 132, 14, (200, 200, 200))
    rect(d, 24, 60, 128, 10, (230, 230, 230))
    if done:
        rect(d, 24, 60, 128, 10, XP_GREEN)
        box(d, 16, 80, 144, 20, (220, 250, 220), WHITE, (120, 190, 120))
        text(d, 22, 86, tr("Sucesso! Online", "Success! Online"), (20, 110, 40))
    else:
        text(d, 40, 84, tr("Publicando...", "Publishing..."), (80, 80, 90))
    return img


# Scratch card: the card and the silver layer that gets scratched off in a zigzag.
CARD = {"x": 8, "y": 6, "w": 160, "h": 96}
SCRATCH = {"x": 24, "y": 44, "w": 128, "h": 40}
SCRATCH_FRAMES = 8


def card_base():
    img, d = canvas(CLOSE_W, CLOSE_H)
    rect(d, 0, 0, CLOSE_W, CLOSE_H, (30, 70, 140))
    c = CARD
    box(d, c["x"], c["y"], c["w"], c["h"], GOLD[1], GOLD[0], GOLD[2])
    rect(d, c["x"] + 4, c["y"] + 4, c["w"] - 8, 30, (200, 40, 60))
    text(d, c["x"] + 16, c["y"] + 8, "RASPADINHA", GOLD[0])
    text(d, c["x"] + 32, c["y"] + 20, "DO RIO", WHITE)
    s = SCRATCH
    rect(d, s["x"], s["y"], s["w"], s["h"], WHITE)
    text(d, s["x"] + 24, s["y"] + 10, tr("SITE", "NEW"), (30, 120, 50))
    text(d, s["x"] + 24, s["y"] + 22, tr("NOVO!", "SITE!"), (200, 40, 60))
    for sx, sy in ((s["x"] + 8, s["y"] + 6), (s["x"] + 112, s["y"] + 28), (s["x"] + 100, s["y"] + 8)):
        rect(d, sx, sy + 1, 5, 1, GOLD[2])
        rect(d, sx + 2, sy - 1, 1, 5, GOLD[2])
    return img


def scratch_layer(frame):
    """Silver layer; each frame scratches off one more strip."""
    img, d = canvas(CLOSE_W, CLOSE_H)
    s = SCRATCH
    rect(d, s["x"], s["y"], s["w"], s["h"], SILVER[1])
    rng = random.Random(7)
    for _ in range(140):
        d.point((s["x"] + rng.randrange(s["w"]), s["y"] + rng.randrange(s["h"])), fill=SILVER[0])
    text(d, s["x"] + 36, s["y"] + 16, tr("RASPE", "SCRATCH"), SILVER[2])
    # Zigzag: each frame scratches a diagonal strip.
    total = SCRATCH_FRAMES
    width = s["w"] / total
    for k in range(frame):
        x0 = s["x"] + int(k * width) - 6
        for y in range(s["h"]):
            jitter = int((y / s["h"]) * 10) if k % 2 else int((1 - y / s["h"]) * 10)
            rect(d, x0 + jitter, s["y"] + y, int(width) + 8, 1, (0, 0, 0, 0))
    return img


def coin():
    img, d = canvas(12, 12)
    d.ellipse((0, 0, 11, 11), fill=OUTLINE)
    d.ellipse((1, 1, 10, 10), fill=GOLD[1])
    d.ellipse((3, 3, 8, 8), fill=GOLD[0])
    return img


def build():
    sprites = {
        "office": office(),
        "item-badge": badge(),
        "intranet": intranet(),
        "deploy": deploy(False),
        "deploy-done": deploy(True),
        "card": card_base(),
        "coin": coin(),
    }
    for lines in range(len(IDE_LINES) + 1):
        sprites[f"ide-{lines}"] = ide(lines)
    for frame in range(SCRATCH_FRAMES + 1):
        sprites[f"scratch-{frame}"] = scratch_layer(frame)
    return sprites


if __name__ == "__main__":
    run(build)
