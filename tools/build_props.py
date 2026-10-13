"""Draws the phase 0 objects in pixel art (grandma's house).

Usage:
    python -I tools/build_props.py <output-dir> [--lang en]

Everything is drawn in code, at the scale of the LPC sprites (native 320x180 scene),
with a dark outline and light coming from above, to match the character.
With --lang en, writes only the English variants (<name>.en.png) of the sprites with text. Phase 0 has no text, so it writes none.
"""

import sys
from pathlib import Path

from PIL import Image, ImageDraw

W, H = 320, 180
FLOOR_Y = 140

OUTLINE = (39, 25, 32)

BEIGE = [(244, 238, 216), (228, 220, 192), (204, 194, 164), (170, 158, 128), (128, 116, 92)]
WOOD = [(192, 134, 84), (166, 110, 68), (138, 88, 54), (108, 66, 40), (80, 48, 30)]
FLOOR = [(156, 104, 66), (140, 92, 58), (122, 80, 50), (96, 62, 38)]
WALL = [(238, 224, 190), (226, 208, 170), (204, 182, 142)]
ROSE = [(214, 120, 132), (184, 92, 106), (146, 66, 82)]
SKY = [(176, 218, 242), (140, 196, 234), (110, 170, 220)]
WHITE = (250, 250, 244)

WIN_TEAL = (0, 128, 128)
WIN_GRAY = (192, 192, 192)
WIN_DARK = (128, 128, 128)
WIN_BLUE = (0, 0, 128)


# Language of the text drawn into the sprites. Each script draws Portuguese by default;
# with `--lang en` it draws again in English and saves only the sprites whose pixels
# changed (the ones with text), as <name>.en.png next to the Portuguese ones.
_LANG = {"current": "pt"}


def tr(pt, en):
    """Picks the Portuguese or the English value for the language being drawn."""
    return en if _LANG["current"] == "en" else pt


def run(build, argv=None):
    """Command line shared by the build_props*.py scripts.

    `build()` returns {name: image}. Without `--lang`, saves every sprite as <name>.png.
    With `--lang en`, saves only <name>.en.png for the sprites that differ from Portuguese.
    """
    args = list(sys.argv[1:] if argv is None else argv)
    lang = "pt"
    if "--lang" in args:
        i = args.index("--lang")
        lang = args[i + 1]
        del args[i : i + 2]
    if lang not in ("pt", "en"):
        raise SystemExit(f"unknown language: {lang}")
    out = Path(args[0])
    out.mkdir(parents=True, exist_ok=True)
    _LANG["current"] = "pt"
    sprites = build()
    if lang == "pt":
        for name, image in sprites.items():
            image.save(out / f"{name}.png")
        print("ok", len(sprites), "sprites:", ", ".join(sprites))
        return
    _LANG["current"] = lang
    try:
        localized = build()
    finally:
        _LANG["current"] = "pt"
    changed = [name for name, image in localized.items() if _differs(sprites[name], image)]
    for name in changed:
        localized[name].save(out / f"{name}.{lang}.png")
    print("ok", len(changed), f"{lang} variants:", ", ".join(changed))


def _differs(a, b):
    return a.size != b.size or a.tobytes() != b.tobytes()


def canvas(w, h):
    image = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    return image, ImageDraw.Draw(image)


def rect(d, x, y, w, h, color):
    if w > 0 and h > 0:
        d.rectangle((x, y, x + w - 1, y + h - 1), fill=color)


def box(d, x, y, w, h, fill, light=None, shade=None, outline=OUTLINE):
    """Caixa com contorno, borda clara em cima/esquerda e sombra embaixo/direita."""
    rect(d, x, y, w, h, outline)
    rect(d, x + 1, y + 1, w - 2, h - 2, fill)
    if light:
        rect(d, x + 1, y + 1, w - 2, 1, light)
        rect(d, x + 1, y + 1, 1, h - 2, light)
    if shade:
        rect(d, x + 1, y + h - 2, w - 2, 1, shade)
        rect(d, x + w - 2, y + 1, 1, h - 2, shade)


def room():
    img, d = canvas(W, H)
    # Parede com papel de parede listrado e florzinhas.
    rect(d, 0, 0, W, FLOOR_Y, WALL[0])
    for x in range(0, W, 12):
        rect(d, x, 0, 4, FLOOR_Y, WALL[1])
    for y in range(8, FLOOR_Y - 12, 16):
        for x in range(6 + (y // 16 % 2) * 6, W, 12):
            d.point((x, y), fill=ROSE[1])
            d.point((x - 1, y + 1), fill=ROSE[0])
            d.point((x + 1, y + 1), fill=ROSE[0])
            d.point((x, y + 2), fill=ROSE[2])
    # Rodapé.
    rect(d, 0, FLOOR_Y - 8, W, 8, WOOD[2])
    rect(d, 0, FLOOR_Y - 8, W, 1, WOOD[1])
    rect(d, 0, FLOOR_Y - 1, W, 1, OUTLINE)
    # Piso de tacos.
    rect(d, 0, FLOOR_Y, W, H - FLOOR_Y, FLOOR[1])
    for row, y in enumerate(range(FLOOR_Y, H, 8)):
        rect(d, 0, y, W, 1, FLOOR[3])
        offset = (row % 2) * 12
        for x in range(offset, W, 24):
            rect(d, x, y + 1, 1, 7, FLOOR[3])
            rect(d, x + 1, y + 1, 11, 1, FLOOR[0])
    # Tapete.
    rx, ry, rw, rh = 120, 150, 120, 22
    rect(d, rx, ry, rw, rh, OUTLINE)
    rect(d, rx + 1, ry + 1, rw - 2, rh - 2, ROSE[2])
    rect(d, rx + 4, ry + 4, rw - 8, rh - 8, ROSE[1])
    for x in range(rx + 8, rx + rw - 8, 8):
        rect(d, x, ry + 10, 4, 2, (232, 190, 110))
    for x in range(rx, rx + rw, 3):
        d.point((x, ry - 1), fill=(232, 220, 190))
        d.point((x, ry + rh), fill=(232, 220, 190))
    # Janela com cortinas.
    wx, wy, ww, wh = 24, 22, 64, 56
    box(d, wx, wy, ww, wh, WHITE)
    rect(d, wx + 4, wy + 4, ww - 8, wh - 8, SKY[1])
    rect(d, wx + 4, wy + 4, ww - 8, 14, SKY[0])
    rect(d, wx + 4, wy + wh - 16, ww - 8, 12, SKY[2])
    for cx, cy in ((wx + 14, wy + 14), (wx + 40, wy + 24)):
        rect(d, cx, cy, 12, 4, WHITE)
        rect(d, cx + 3, cy - 2, 6, 2, WHITE)
    rect(d, wx + ww // 2 - 1, wy + 4, 2, wh - 8, WHITE)
    rect(d, wx + 4, wy + wh // 2 - 1, ww - 8, 2, WHITE)
    rect(d, wx - 6, wy - 6, ww + 12, 4, WOOD[3])
    for side in (wx - 8, wx + ww - 6):
        rect(d, side, wy - 2, 14, wh + 10, ROSE[1])
        for x in range(side + 2, side + 14, 4):
            rect(d, x, wy - 2, 1, wh + 10, ROSE[2])
        rect(d, side, wy - 2, 1, wh + 10, OUTLINE)
        rect(d, side + 13, wy - 2, 1, wh + 10, OUTLINE)
    # Quadro na parede.
    box(d, 236, 34, 34, 26, WOOD[1], WOOD[0], WOOD[3])
    rect(d, 240, 38, 26, 18, (196, 220, 180))
    rect(d, 240, 48, 26, 8, (110, 160, 90))
    rect(d, 252, 41, 5, 5, (240, 200, 90))
    return img


def desk():
    """Mesa de madeira com gaveteiro; tampo em y=0."""
    img, d = canvas(112, 34)
    box(d, 0, 0, 112, 6, WOOD[1], WOOD[0], WOOD[3])
    box(d, 4, 5, 4, 29, WOOD[2], None, WOOD[4])
    box(d, 74, 5, 34, 29, WOOD[2], WOOD[1], WOOD[4])
    for y in (8, 20):
        rect(d, 77, y, 28, 1, WOOD[4])
        rect(d, 89, y + 4, 4, 2, (220, 196, 120))
    return img


def doily(d, x, y, w):
    """Paninho de crochê da avó."""
    for i in range(w):
        if i % 2 == 0:
            d.point((x + i, y + 1), fill=WHITE)
        d.point((x + i, y), fill=WHITE)
    for i in range(1, w - 1, 3):
        d.point((x + i, y + 2), fill=(236, 236, 228))


def monitor():
    """Monitor de tubo bege; a tela (30x22) começa em (7, 6)."""
    img, d = canvas(44, 44)
    box(d, 2, 2, 40, 32, BEIGE[1], BEIGE[0], BEIGE[3])
    rect(d, 6, 5, 32, 24, BEIGE[3])
    rect(d, 7, 6, 30, 22, OUTLINE)
    box(d, 8, 34, 28, 6, BEIGE[2], BEIGE[1], BEIGE[3])
    box(d, 12, 39, 20, 5, BEIGE[2], BEIGE[1], BEIGE[3])
    rect(d, 33, 30, 3, 2, (90, 200, 90))
    doily(d, 8, 0, 28)
    return img


def screen_off():
    img, d = canvas(30, 22)
    rect(d, 0, 0, 30, 22, (36, 44, 42))
    rect(d, 2, 2, 8, 1, (70, 82, 78))
    rect(d, 2, 3, 3, 1, (70, 82, 78))
    return img


def screen_boot():
    """Tela de abertura: céu azul com nuvens e a bandeirinha de quatro cores."""
    img, d = canvas(30, 22)
    for y in range(22):
        shade = int(40 + y * 4)
        rect(d, 0, y, 30, 1, (shade, shade + 70, 200))
    for cx, cy in ((3, 4), (18, 14), (22, 3)):
        rect(d, cx, cy, 7, 2, WHITE)
        rect(d, cx + 2, cy - 1, 3, 1, WHITE)
    for (x, y), color in (((11, 7), (230, 60, 40)), ((15, 7), (80, 180, 60)), ((11, 11), (50, 110, 230)), ((15, 11), (250, 200, 40))):
        rect(d, x, y, 4, 4, color)
    rect(d, 9, 17, 12, 1, WHITE)
    return img


def screen_desktop():
    img, d = canvas(30, 22)
    rect(d, 0, 0, 30, 22, WIN_TEAL)
    for y in (2, 8, 14):
        rect(d, 2, y, 4, 3, WHITE)
        rect(d, 2, y + 4, 4, 1, (200, 230, 230))
    rect(d, 0, 19, 30, 3, WIN_GRAY)
    rect(d, 0, 19, 30, 1, WHITE)
    rect(d, 1, 20, 7, 2, WIN_DARK)
    rect(d, 1, 20, 6, 1, WHITE)
    rect(d, 2, 21, 2, 1, (230, 60, 40))
    rect(d, 26, 20, 3, 2, WIN_DARK)
    # Janela aberta do "Meu computador".
    rect(d, 10, 3, 17, 12, WIN_GRAY)
    rect(d, 10, 3, 17, 2, WIN_BLUE)
    rect(d, 25, 3, 2, 2, WIN_GRAY)
    rect(d, 11, 6, 15, 8, WHITE)
    return img


def screen_game():
    """Um joguinho de plataforma dos CDs da revista."""
    img, d = canvas(30, 22)
    rect(d, 0, 0, 30, 22, (20, 24, 60))
    for x, y in ((3, 3), (12, 5), (24, 2), (19, 8)):
        d.point((x, y), fill=WHITE)
    rect(d, 0, 18, 30, 4, (60, 160, 60))
    rect(d, 0, 18, 30, 1, (120, 220, 90))
    rect(d, 16, 13, 8, 2, (180, 110, 60))
    rect(d, 6, 14, 3, 4, (230, 60, 40))
    rect(d, 6, 13, 3, 1, (250, 210, 160))
    for x in (18, 21):
        rect(d, x, 10, 2, 2, (250, 210, 40))
    return img


def tower():
    """Gabinete bege em pé, com drive de CD e de disquete."""
    img, d = canvas(20, 40)
    box(d, 0, 0, 20, 40, BEIGE[1], BEIGE[0], BEIGE[3])
    box(d, 3, 4, 14, 4, BEIGE[2], None, BEIGE[3])
    rect(d, 5, 6, 10, 1, BEIGE[4])
    box(d, 3, 10, 14, 3, BEIGE[2], None, BEIGE[3])
    rect(d, 7, 11, 6, 1, OUTLINE)
    rect(d, 9, 30, 3, 3, BEIGE[3])
    rect(d, 14, 31, 2, 1, (90, 200, 90))
    for y in range(18, 27, 2):
        rect(d, 4, y, 12, 1, BEIGE[2])
    return img


def keyboard():
    img, d = canvas(30, 6)
    box(d, 0, 0, 30, 6, BEIGE[1], BEIGE[0], BEIGE[3])
    for x in range(3, 27, 3):
        d.point((x, 2), fill=BEIGE[3])
        d.point((x + 1, 3), fill=BEIGE[3])
    return img


def magazines():
    """Pilha de revistas CD-ROM no chão, cada uma de uma cor."""
    img, d = canvas(28, 24)
    colors = [((210, 60, 60), (240, 200, 60)), ((60, 110, 210), (250, 250, 250)), ((240, 170, 40), (210, 60, 60)), ((90, 170, 80), (250, 250, 250)), ((150, 80, 170), (240, 200, 60))]
    y = 22
    for i, (cover, logo) in enumerate(colors):
        x = 1 + (i % 2) * 2
        box(d, x, y - 4, 24, 4, cover)
        rect(d, x + 2, y - 3, 6, 1, logo)
        y -= 4
    return img


def cd(size):
    """Disco prateado com reflexo de arco-íris (também é o item do inventário)."""
    img, d = canvas(size, size)
    r = size // 2
    d.ellipse((0, 0, size - 1, size - 1), fill=OUTLINE)
    d.ellipse((1, 1, size - 2, size - 2), fill=(206, 212, 222))
    d.pieslice((1, 1, size - 2, size - 2), 200, 250, fill=(170, 220, 240))
    d.pieslice((1, 1, size - 2, size - 2), 20, 70, fill=(240, 190, 220))
    d.pieslice((1, 1, size - 2, size - 2), 290, 320, fill=(250, 250, 255))
    hole = max(2, size // 6)
    d.ellipse((r - hole, r - hole, r + hole - 1, r + hole - 1), fill=OUTLINE)
    return img


def build():
    return {
        "room": room(),
        "desk": desk(),
        "monitor": monitor(),
        "screen-off": screen_off(),
        "screen-boot": screen_boot(),
        "screen-desktop": screen_desktop(),
        "screen-game": screen_game(),
        "tower": tower(),
        "keyboard": keyboard(),
        "magazines": magazines(),
        "cd": cd(12),
        "item-cd": cd(32),
    }


if __name__ == "__main__":
    run(build)
