"""Draws the phase 1 objects in pixel art (the first PC, 2004).

Usage:
    python -I tools/build_props_phase1.py <output-dir> [--lang en]

Same scale and rules as phase 0. The close-up screens (monitor close-up) use the
Press Start 2P font (OFL license, in tools/fonts) without antialiasing.
With --lang en, writes only the English variants (<name>.en.png) of the sprites with text.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from PIL import ImageFont  # noqa: E402

from build_props import (  # noqa: E402
    BEIGE,
    FLOOR_Y,
    H,
    OUTLINE,
    SKY,
    W,
    WHITE,
    WOOD,
    box,
    canvas,
    rect,
    run,
    tr,
)

FONT = ImageFont.truetype(str(Path(__file__).parent / "fonts" / "PressStart2P-Regular.ttf"), 8)

WALL = [(246, 234, 186), (232, 216, 160), (210, 190, 132)]
TILE = [(226, 214, 190), (206, 192, 166), (176, 160, 134)]
SOFA = [(86, 118, 178), (66, 94, 150), (46, 68, 116)]
PLANT = [(96, 168, 76), (64, 128, 56), (40, 90, 40)]

XP_BLUE = [(0, 84, 227), (36, 112, 236), (0, 60, 180)]
XP_GREEN = (60, 160, 60)
XP_SKY = [(92, 156, 236), (130, 186, 246), (180, 214, 250)]
XP_HILL = [(110, 180, 50), (84, 156, 36), (60, 126, 28)]

# Close-up screens: a 176x108 usable area inside a 200x130 frame.
CLOSE_W, CLOSE_H = 176, 108


def text(d, x, y, value, color=OUTLINE):
    d.fontmode = "1"
    d.text((x, y), value, font=FONT, fill=color)


# ---------------------------------------------------------------- living room


def living_room():
    img, d = canvas(W, H)
    # Painted wall with a chair rail.
    rect(d, 0, 0, W, FLOOR_Y, WALL[0])
    rect(d, 0, 92, W, 2, WALL[2])
    rect(d, 0, 94, W, FLOOR_Y - 94, WALL[1])
    # Baseboard and ceramic tile floor.
    rect(d, 0, FLOOR_Y - 6, W, 6, (236, 236, 228))
    rect(d, 0, FLOOR_Y - 1, W, 1, OUTLINE)
    rect(d, 0, FLOOR_Y, W, H - FLOOR_Y, TILE[0])
    for y in range(FLOOR_Y, H, 10):
        rect(d, 0, y, W, 1, TILE[2])
    for row, y in enumerate(range(FLOOR_Y, H, 10)):
        for x in range((row % 2) * 10, W, 20):
            rect(d, x, y, 1, 10, TILE[2])
            rect(d, x + 1, y + 1, 18, 1, (240, 232, 214))

    # Window with blinds.
    wx, wy, ww, wh = 104, 24, 60, 52
    box(d, wx, wy, ww, wh, WHITE)
    rect(d, wx + 3, wy + 3, ww - 6, wh - 6, SKY[1])
    for y in range(wy + 3, wy + 30, 4):
        rect(d, wx + 3, y, ww - 6, 3, (240, 240, 232))
        rect(d, wx + 3, y + 2, ww - 6, 1, (200, 200, 192))
    rect(d, wx + ww - 8, wy + 3, 1, 30, (180, 180, 172))

    # Wall clock.
    d.ellipse((44, 26, 62, 44), fill=OUTLINE)
    d.ellipse((45, 27, 61, 43), fill=WHITE)
    rect(d, 53, 30, 1, 6, OUTLINE)
    rect(d, 53, 35, 5, 1, OUTLINE)

    # Open door on the right, where the friend comes in.
    rect(d, 288, 34, 32, FLOOR_Y - 34, (120, 84, 60))
    rect(d, 292, 38, 28, FLOOR_Y - 38, (70, 52, 44))
    rect(d, 292, 38, 28, 2, (50, 36, 30))

    # Family photos.
    for fx, fy in ((228, 36), (250, 44)):
        box(d, fx, fy, 16, 20, WOOD[2], WOOD[1], WOOD[4])
        rect(d, fx + 3, fy + 3, 10, 14, (200, 220, 236))
        rect(d, fx + 6, fy + 6, 4, 4, (236, 196, 160))
        rect(d, fx + 5, fy + 10, 6, 7, (90, 120, 170))

    # Sofa.
    sx, sy = 6, 98
    box(d, sx, sy, 84, 22, SOFA[1], SOFA[0], SOFA[2])
    box(d, sx, sy + 18, 84, 22, SOFA[0], SOFA[0], SOFA[2])
    box(d, sx - 4, sy + 10, 10, 30, SOFA[1], SOFA[0], SOFA[2])
    box(d, sx + 78, sy + 10, 10, 30, SOFA[1], SOFA[0], SOFA[2])
    rect(d, sx + 41, sy + 20, 1, 18, SOFA[2])
    box(d, sx + 10, sy + 8, 14, 12, (236, 196, 90), (250, 222, 130), (200, 156, 60))
    return img


def computer_desk():
    """MDF computer desk with a keyboard tray; top at y=0."""
    img, d = canvas(76, 36)
    light, mid, dark = (236, 230, 216), (214, 206, 188), (176, 166, 146)
    box(d, 0, 0, 76, 5, light, WHITE, dark)
    box(d, 2, 4, 5, 32, mid, None, dark)
    box(d, 69, 4, 5, 32, mid, None, dark)
    box(d, 8, 8, 60, 4, mid, light, dark)  # keyboard tray
    for x in range(12, 64, 3):
        d.point((x, 9), fill=BEIGE[3])
    box(d, 8, 26, 60, 4, mid, light, dark)  # bottom shelf
    return img


def speaker():
    img, d = canvas(8, 12)
    box(d, 0, 0, 8, 12, BEIGE[1], BEIGE[0], BEIGE[3])
    d.ellipse((2, 5, 5, 8), fill=BEIGE[4])
    return img


def stool():
    img, d = canvas(20, 18)
    box(d, 0, 0, 20, 4, WOOD[1], WOOD[0], WOOD[3])
    for x in (2, 15):
        rect(d, x, 4, 3, 14, WOOD[2])
        rect(d, x, 4, 1, 14, OUTLINE)
    rect(d, 4, 12, 12, 2, WOOD[3])
    return img


def plant():
    img, d = canvas(18, 30)
    box(d, 3, 18, 12, 12, (190, 100, 70), (214, 128, 92), (150, 72, 50))
    for x, y, w, h in ((8, 2, 3, 17), (2, 6, 7, 3), (10, 4, 7, 3), (1, 12, 8, 3), (10, 10, 7, 3)):
        rect(d, x, y, w, h, PLANT[1])
        rect(d, x, y, w, 1, PLANT[0])
    return img


def monitor_plain():
    """Same CRT monitor as phase 0, without the doily; the screen (30x22) starts at (7, 6)."""
    img, d = canvas(44, 44)
    box(d, 2, 2, 40, 32, BEIGE[1], BEIGE[0], BEIGE[3])
    rect(d, 6, 5, 32, 24, BEIGE[3])
    rect(d, 7, 6, 30, 22, OUTLINE)
    box(d, 8, 34, 28, 6, BEIGE[2], BEIGE[1], BEIGE[3])
    box(d, 12, 39, 20, 5, BEIGE[2], BEIGE[1], BEIGE[3])
    rect(d, 33, 30, 3, 2, (90, 200, 90))
    return img


def tower():
    img, d = canvas(20, 40)
    box(d, 0, 0, 20, 40, BEIGE[1], BEIGE[0], BEIGE[3])
    box(d, 3, 4, 14, 4, BEIGE[2], None, BEIGE[3])
    rect(d, 5, 6, 10, 1, BEIGE[4])
    box(d, 3, 10, 14, 3, BEIGE[2], None, BEIGE[3])
    rect(d, 9, 30, 3, 3, BEIGE[3])
    rect(d, 14, 31, 2, 1, (90, 200, 90))
    return img


# ---------------------------------------------------------------- small screen (30x22)


def bliss(d, w, h, taskbar):
    """The XP wallpaper: blue sky, clouds and the green hill."""
    for y in range(h):
        c = XP_SKY[0] if y < h * 0.3 else XP_SKY[1] if y < h * 0.55 else XP_SKY[2]
        rect(d, 0, y, w, 1, c)
    for cx, cy, cw in ((w * 0.15, h * 0.18, w * 0.2), (w * 0.6, h * 0.12, w * 0.25)):
        rect(d, int(cx), int(cy), int(cw), max(1, h // 20), WHITE)
    for x in range(w):
        top = int(h * 0.62 - (h * 0.18) * (1 - ((x - w * 0.45) / (w * 0.6)) ** 2))
        rect(d, x, top, 1, h - top, XP_HILL[1])
        rect(d, x, top, 1, max(1, h // 30), XP_HILL[0])
    if taskbar:
        tb = max(2, h // 11)
        rect(d, 0, h - tb, w, tb, XP_BLUE[0])
        rect(d, 0, h - tb, w, 1, XP_BLUE[1])
        rect(d, 0, h - tb, max(5, w // 6), tb, XP_GREEN)


def screen(kind):
    img, d = canvas(30, 22)
    if kind == "off":
        rect(d, 0, 0, 30, 22, (36, 44, 42))
        rect(d, 2, 2, 8, 1, (70, 82, 78))
    elif kind == "boot":
        rect(d, 0, 0, 30, 22, (0, 0, 0))
        for (x, y), c in (((12, 6), (230, 70, 40)), ((15, 6), (90, 190, 60)), ((12, 9), (40, 120, 230)), ((15, 9), (250, 200, 40))):
            rect(d, x, y, 3, 3, c)
        rect(d, 9, 16, 12, 2, (60, 60, 60))
        rect(d, 10, 16, 4, 2, XP_BLUE[1])
    elif kind == "desktop":
        bliss(d, 30, 22, True)
    elif kind == "msn":
        bliss(d, 30, 22, True)
        rect(d, 18, 13, 12, 7, (220, 232, 250))
        rect(d, 18, 13, 12, 1, XP_BLUE[0])
        rect(d, 20, 15, 2, 3, XP_GREEN)
    return img


# ---------------------------------------------------------------- close-up screens (176x108)


def close_frame():
    """Close-up monitor frame: 200x130, the screen starts at (12, 10)."""
    img, d = canvas(200, 130)
    box(d, 0, 0, 200, 130, BEIGE[1], BEIGE[0], BEIGE[3])
    rect(d, 10, 8, 180, 112, BEIGE[3])
    rect(d, 11, 9, 178, 110, OUTLINE)
    rect(d, 176, 122, 6, 3, (90, 200, 90))
    return img


def xp_window(d, x, y, w, h, title):
    rect(d, x, y, w, h, XP_BLUE[2])
    rect(d, x + 1, y + 1, w - 2, 12, XP_BLUE[0])
    rect(d, x + 1, y + 1, w - 2, 2, XP_BLUE[1])
    text(d, x + 4, y + 3, title, WHITE)
    rect(d, x + w - 12, y + 3, 9, 8, (220, 80, 50))
    text(d, x + w - 12, y + 3, "x", WHITE)
    rect(d, x + 2, y + 13, w - 4, h - 15, (236, 233, 216))


def close_desktop():
    img, d = canvas(CLOSE_W, CLOSE_H)
    bliss(d, CLOSE_W, CLOSE_H, True)
    text(d, 4, CLOSE_H - 9, tr("iniciar", "start"), WHITE)
    text(d, CLOSE_W - 42, CLOSE_H - 9, "20:04", WHITE)
    return img


NOTEPAD_LINES = [
    "<html>",
    "<body>",
    "<marquee>",
    " Final Fantasy",
    "</marquee>",
    '<img src="',
    ' cristal.gif">',
    "</body>",
]


def close_notepad(lines):
    img, d = canvas(CLOSE_W, CLOSE_H)
    bliss(d, CLOSE_W, CLOSE_H, True)
    xp_window(d, 4, 2, CLOSE_W - 8, CLOSE_H - 14, "site.html")
    rect(d, 7, 16, CLOSE_W - 14, CLOSE_H - 31, WHITE)
    for i, line in enumerate(NOTEPAD_LINES[:lines]):
        text(d, 9, 18 + i * 9, line, OUTLINE)
    if lines < len(NOTEPAD_LINES):
        rect(d, 9 + len(NOTEPAD_LINES[lines - 1] if lines else "") * 0, 18 + lines * 9, 6, 8, OUTLINE)
    return img


def crystal(d, cx, top):
    """Floating blue crystal with sparkles (the classic game symbol, drawn from scratch)."""
    light, mid, dark = (170, 230, 255), (80, 170, 240), (30, 90, 190)
    height = 34
    for i in range(height):
        half = (i if i < 12 else (height - i) * 12 // (height - 12)) // 1
        half = max(1, half if i < 12 else half)
        rect(d, cx - half, top + i, half, 1, light if i < 12 else mid)
        rect(d, cx, top + i, half, 1, mid if i < 12 else dark)
    rect(d, cx - 4, top + 6, 2, 3, WHITE)
    for x, y in ((cx - 18, top + 4), (cx + 16, top + 10), (cx - 14, top + 26), (cx + 20, top + 28)):
        d.point((x, y), fill=WHITE)
        d.point((x - 1, y), fill=light)
        d.point((x + 1, y), fill=light)


def close_site():
    """The Final Fantasy fan site, opened straight from disk: it never went live."""
    img, d = canvas(CLOSE_W, CLOSE_H)
    bliss(d, CLOSE_W, CLOSE_H, True)
    xp_window(d, 4, 2, CLOSE_W - 8, CLOSE_H - 14, "index.html")
    rect(d, 7, 16, CLOSE_W - 14, 10, WHITE)
    rect(d, 7, 16, CLOSE_W - 14, 1, (160, 160, 160))
    text(d, 9, 17, "C:\\site\\index", (60, 60, 60))
    rect(d, 7, 27, CLOSE_W - 14, CLOSE_H - 42, (8, 8, 40))
    text(d, 36, 30, "Final Fantasy", (250, 220, 90))
    text(d, tr(60, 56), 40, tr("fã-site", "fan site"), (200, 200, 220))
    crystal(d, CLOSE_W // 2, 50)
    rect(d, 46, 84, 84, 9, (40, 40, 70))
    text(d, 48, 85, tr("visitas:1", "visits:1"), (120, 250, 120))
    return img


def close_alert():
    img = close_site()
    from PIL import ImageDraw

    d = ImageDraw.Draw(img)
    # "Hello, world!" is longer: the English alert is a bit wider.
    x, w = tr((30, 116), (22, 132))
    y, h = 18, 50
    rect(d, x + 3, y + 3, w, h, (0, 0, 0, 90))
    xp_window(d, x, y, w, h, tr("Alerta", "Alert"))
    d.polygon([(x + 12, y + 18), (x + 6, y + 30), (x + 18, y + 30)], fill=(250, 200, 30), outline=OUTLINE)
    text(d, x + 10, y + 21, "!", OUTLINE)
    text(d, x + tr(24, 22), y + 22, tr("Olá, mundo!", "Hello, world!"), OUTLINE)
    box(d, x + w // 2 - 14, y + 35, 28, 12, (236, 233, 216), WHITE, (160, 160, 150))
    text(d, x + w // 2 - 8, y + 37, "OK", OUTLINE)
    return img


def msn_toast():
    """MSN notification in the corner of the screen: 'Amigo entrou' (a friend signed in)."""
    img, d = canvas(82, 30)
    rect(d, 0, 0, 82, 30, XP_BLUE[2])
    for y in range(1, 29):
        shade = 250 - y * 2
        rect(d, 1, y, 80, 1, (shade - 30, shade - 14, 255))
    rect(d, 1, 1, 80, 7, XP_BLUE[0])
    text(d, 3, 1, "MSN", WHITE)
    # Little green buddy icon.
    d.ellipse((5, 12, 11, 18), fill=XP_GREEN, outline=OUTLINE)
    rect(d, 4, 18, 9, 7, XP_GREEN)
    rect(d, 4, 18, 9, 1, OUTLINE)
    text(d, 16, 12, tr("Amigo", "Friend"), OUTLINE)
    text(d, 16, 21, tr("entrou", "online"), (40, 80, 160))
    return img


def music_note():
    """Light music note with an outline, to show over the dark zoom background."""
    img, d = canvas(9, 11)
    color = (243, 192, 63)
    for dx, dy in ((-1, 0), (1, 0), (0, -1), (0, 1)):
        rect(d, 5 + dx, 1 + dy, 1, 7, OUTLINE)
        rect(d, 5 + dx, 1 + dy, 3, 1, OUTLINE)
        d.ellipse((1 + dx, 6 + dy, 5 + dx, 9 + dy), fill=OUTLINE)
    rect(d, 5, 1, 1, 7, color)
    rect(d, 5, 1, 3, 1, color)
    rect(d, 7, 2, 1, 2, color)
    d.ellipse((1, 6, 5, 9), fill=color)
    return img


# ---------------------------------------------------------------- HTML workbook


def workbook(size):
    """Bound HTML workbook (small prop and inventory item)."""
    if size == "small":
        img, d = canvas(10, 13)
        box(d, 0, 0, 10, 13, WHITE)
        rect(d, 1, 1, 8, 3, (210, 60, 60))
        for y in (6, 8, 10):
            rect(d, 2, y, 6, 1, (150, 150, 150))
        return img
    img, d = canvas(32, 32)
    box(d, 5, 3, 22, 27, (236, 236, 228))
    box(d, 3, 2, 22, 27, WHITE)
    rect(d, 4, 3, 20, 9, (210, 60, 60))
    # "</>" drawn by hand, small, to fit on the cover.
    for px, py in ((8, 7), (9, 6), (10, 5), (9, 8), (10, 9), (18, 5), (19, 6), (20, 7), (19, 8), (18, 9)):
        d.point((px, py), fill=WHITE)
    for i in range(5):
        d.point((16 - i, 5 + i), fill=WHITE)
    for y in range(14, 27, 3):
        rect(d, 6, y, 16, 1, (150, 150, 150))
    for y in range(4, 28, 3):
        rect(d, 2, y, 2, 1, (120, 120, 130))
    return img


def build():
    sprites = {
        "room": living_room(),
        "desk": computer_desk(),
        "speaker": speaker(),
        "stool": stool(),
        "plant": plant(),
        "monitor": monitor_plain(),
        "tower": tower(),
        "screen-off": screen("off"),
        "screen-boot": screen("boot"),
        "screen-desktop": screen("desktop"),
        "screen-msn": screen("msn"),
        "close-frame": close_frame(),
        "close-desktop": close_desktop(),
        "close-site": close_site(),
        "close-alert": close_alert(),
        "msn-toast": msn_toast(),
        "note": music_note(),
        "apostila": workbook("small"),
        "item-apostila": workbook("item"),
    }
    for lines in range(len(NOTEPAD_LINES) + 1):
        sprites[f"close-notepad-{lines}"] = close_notepad(lines)
    return sprites


if __name__ == "__main__":
    run(build)
