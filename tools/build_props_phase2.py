"""Draws the phase 2 objects in pixel art (the neighborhood tech guy).

Usage:
    python -I tools/build_props_phase2.py <output-dir> [--lang en]

Same scale and rules as the previous phases.
With --lang en, writes only the English variants (<name>.en.png) of the sprites with text.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from build_props import BEIGE, H, OUTLINE, W, WHITE, WOOD, box, canvas, rect, run, tr  # noqa: E402
from build_props_phase1 import CLOSE_H, CLOSE_W, PLANT, XP_BLUE, text  # noqa: E402

SIDEWALK_Y = 132
STREET_Y = 154

SKY = [(150, 206, 244), (176, 222, 250)]
FACADE = [(236, 214, 178), (220, 196, 156), (190, 164, 124)]
NEIGHBOR = [(196, 222, 200), (176, 204, 182), (146, 176, 154)]
CONCRETE = [(196, 196, 190), (176, 176, 170), (150, 150, 146)]
ASPHALT = [(84, 86, 92), (70, 72, 78), (58, 60, 66)]
BOARD = [(40, 120, 70), (30, 96, 56), (20, 70, 40)]
METAL = [(200, 204, 210), (170, 174, 182), (130, 134, 142)]


def street():
    img, d = canvas(W, H)
    # Céu.
    rect(d, 0, 0, W, 40, SKY[0])
    rect(d, 0, 0, W, 14, SKY[1])
    for cx, cy in ((40, 10), (230, 16)):
        rect(d, cx, cy, 18, 4, WHITE)
        rect(d, cx + 4, cy - 2, 9, 2, WHITE)

    # Casa do Daniel (fachada com a garagem aberta virando oficina).
    rect(d, 0, 22, 214, SIDEWALK_Y - 22, FACADE[0])
    rect(d, 0, 22, 214, 3, FACADE[2])
    rect(d, 0, 18, 220, 5, (170, 80, 60))  # beiral de telha
    for x in range(0, 220, 6):
        rect(d, x, 18, 1, 5, (130, 60, 46))
    rect(d, 60, 56, 112, SIDEWALK_Y - 56, (90, 76, 70))  # garagem aberta
    rect(d, 60, 56, 112, 3, (60, 50, 46))
    rect(d, 58, 54, 116, 2, FACADE[2])
    rect(d, 58, 54, 2, SIDEWALK_Y - 54, FACADE[2])
    rect(d, 172, 54, 2, SIDEWALK_Y - 54, FACADE[2])
    # Janela da casa.
    box(d, 12, 50, 34, 28, WHITE)
    rect(d, 15, 53, 28, 22, SKY[0])
    rect(d, 28, 53, 2, 22, WHITE)
    for x in range(12, 46, 4):
        rect(d, x, 80, 2, 4, (120, 120, 120))  # grade
    rect(d, 12, 80, 34, 1, (120, 120, 120))
    # Porta.
    box(d, 182, 64, 24, SIDEWALK_Y - 64, WOOD[2], WOOD[1], WOOD[4])
    rect(d, 200, 98, 2, 3, (230, 200, 90))

    # Casa do vizinho, à direita.
    rect(d, 218, 34, W - 218, SIDEWALK_Y - 34, NEIGHBOR[0])
    rect(d, 214, 30, W - 214, 5, (150, 70, 56))
    box(d, 236, 58, 30, 26, WHITE)
    rect(d, 239, 61, 24, 20, SKY[0])
    box(d, 282, 70, 22, SIDEWALK_Y - 70, (120, 80, 60))

    # Poste com os fios.
    rect(d, 214, 0, 4, SIDEWALK_Y, (150, 150, 150))
    rect(d, 214, 0, 1, SIDEWALK_Y, (110, 110, 110))
    rect(d, 206, 8, 20, 2, (120, 120, 120))
    for y0 in (9, 13):
        for x in range(0, W):
            sag = int(((x - 216) / 120) ** 2 * 6)
            d.point((x, y0 + sag), fill=(50, 50, 56))

    # Calçada, meio-fio e rua.
    rect(d, 0, SIDEWALK_Y, W, STREET_Y - SIDEWALK_Y, CONCRETE[0])
    for x in range(0, W, 20):
        rect(d, x, SIDEWALK_Y, 1, STREET_Y - SIDEWALK_Y, CONCRETE[2])
    rect(d, 0, SIDEWALK_Y, W, 1, CONCRETE[2])
    rect(d, 0, STREET_Y - 3, W, 3, CONCRETE[1])
    rect(d, 0, STREET_Y - 1, W, 1, OUTLINE)
    rect(d, 0, STREET_Y, W, H - STREET_Y, ASPHALT[1])
    for x in range(8, W, 32):
        rect(d, x, 168, 16, 2, (230, 220, 150))

    # Plantinha no canto.
    for x, y, w, h in ((298, 116, 3, 16), (292, 120, 8, 3), (300, 122, 8, 3)):
        rect(d, x, y, w, h, PLANT[1])
    return img


def bench():
    """Bancada de trabalho; tampo em y=0."""
    img, d = canvas(84, 22)
    box(d, 0, 0, 84, 5, WOOD[1], WOOD[0], WOOD[3])
    for x in (3, 76):
        box(d, x, 4, 5, 18, WOOD[2], None, WOOD[4])
    rect(d, 8, 14, 68, 3, WOOD[3])
    return img


def monitor():
    img, d = canvas(44, 44)
    box(d, 2, 2, 40, 32, BEIGE[1], BEIGE[0], BEIGE[3])
    rect(d, 6, 5, 32, 24, BEIGE[3])
    rect(d, 7, 6, 30, 22, (0, 40, 160))
    rect(d, 9, 9, 18, 2, WHITE)
    rect(d, 9, 18, 26, 3, WHITE)
    rect(d, 10, 19, 12, 1, (0, 160, 60))
    box(d, 8, 34, 28, 6, BEIGE[2], BEIGE[1], BEIGE[3])
    box(d, 12, 39, 20, 5, BEIGE[2], BEIGE[1], BEIGE[3])
    return img


def open_tower():
    """Gabinete com a tampa lateral aberta, mostrando a placa-mãe."""
    img, d = canvas(26, 36)
    box(d, 0, 0, 26, 36, BEIGE[1], BEIGE[0], BEIGE[3])
    rect(d, 3, 3, 20, 30, (60, 60, 66))
    rect(d, 5, 5, 16, 22, BOARD[1])
    rect(d, 7, 7, 6, 6, METAL[1])
    rect(d, 15, 6, 1, 10, (30, 30, 30))
    rect(d, 17, 6, 1, 10, (30, 30, 30))
    rect(d, 6, 28, 14, 4, METAL[2])
    return img


def small_pc():
    """Gabinete que os vizinhos carregam."""
    img, d = canvas(16, 22)
    box(d, 0, 0, 16, 22, BEIGE[1], BEIGE[0], BEIGE[3])
    box(d, 2, 3, 12, 3, BEIGE[2], None, BEIGE[3])
    rect(d, 6, 15, 3, 3, BEIGE[3])
    rect(d, 11, 16, 2, 1, (90, 200, 90))
    return img


def sign():
    """Placa de papelão: CONSERTO DE PC."""
    img, d = canvas(72, 26)
    box(d, 0, 0, 72, 26, (200, 160, 110), (220, 184, 136), (160, 120, 80))
    text(d, 4, 4, tr("CONSERTO", "COMPUTER"), (40, 30, 30))
    text(d, tr(20, 12), 15, tr("DE PC", "REPAIR"), (180, 40, 40))
    rect(d, 34, 0, 4, 2, (120, 120, 120))
    return img


def toolbox():
    img, d = canvas(20, 14)
    box(d, 0, 4, 20, 10, (200, 50, 50), (230, 80, 70), (150, 30, 30))
    rect(d, 6, 0, 8, 2, OUTLINE)
    rect(d, 6, 0, 1, 5, OUTLINE)
    rect(d, 13, 0, 1, 5, OUTLINE)
    rect(d, 2, 8, 16, 1, (150, 30, 30))
    return img


def thumbs_up():
    """Joinha: o cliente aprovou o conserto."""
    img, d = canvas(11, 12)
    skin, shade = (250, 210, 170), (214, 160, 120)
    shape = [
        "....XX.....",
        "...X..X....",
        "...X..X....",
        "...X..X....",
        "XXXX..XXXX.",
        "X..X.....X.",
        "X..X..XXXX.",
        "X..X.....X.",
        "X..X..XXXX.",
        "X..X.....X.",
        "XXXXXXXXX..",
    ]
    for y, row in enumerate(shape):
        for x, c in enumerate(row):
            if c == "X":
                d.point((x, y), fill=OUTLINE)
            elif c == "." and 0 < x < 10 and 0 < y < 11:
                inside = row.find("X") < x < row.rfind("X")
                if inside:
                    d.point((x, y), fill=shade if x < 3 else skin)
    return img


def counter(n):
    img, d = canvas(132, 14)
    rect(d, 0, 0, 132, 14, (27, 22, 34))
    rect(d, 1, 1, 130, 12, (42, 33, 51))
    text(d, 4, 3, f"PCs: {n}", (243, 192, 63))
    for i in range(n):
        rect(d, 64 + i * 10, 4, 7, 6, BEIGE[1])
        rect(d, 64 + i * 10, 4, 7, 1, (90, 200, 90))
    return img


# ---------------------------------------------------------------- de perto


def close_case():
    """Interior do gabinete aberto, 200x130 (moldura de metal + placa-mãe)."""
    img, d = canvas(200, 130)
    box(d, 0, 0, 200, 130, METAL[1], METAL[0], METAL[2])
    rect(d, 8, 8, 184, 114, (54, 56, 62))
    # Placa-mãe.
    rect(d, 14, 14, 120, 100, BOARD[1])
    for y in range(18, 112, 6):
        rect(d, 16, y, 116, 1, BOARD[2])
    for x in range(20, 130, 14):
        rect(d, x, 16, 1, 96, BOARD[0])
    # Processador com cooler.
    box(d, 28, 26, 30, 30, METAL[1], METAL[0], METAL[2])
    for y in range(30, 54, 3):
        rect(d, 31, y, 24, 1, METAL[2])
    # Slots de memória (vazios).
    for y in (32, 42):
        rect(d, 72, y, 52, 6, OUTLINE)
        rect(d, 73, y + 1, 50, 4, (30, 30, 34))
        rect(d, 70, y, 2, 6, WHITE)
        rect(d, 124, y, 2, 6, WHITE)
    # Slots PCI.
    for y in (76, 88, 100):
        rect(d, 24, y, 70, 5, (236, 236, 228))
        rect(d, 26, y + 2, 66, 1, (180, 180, 172))
    # Baia do HD (vazia), à direita.
    rect(d, 142, 62, 44, 36, (40, 42, 46))
    rect(d, 142, 62, 44, 2, METAL[2])
    rect(d, 142, 96, 44, 2, METAL[2])
    # Cabos.
    for i, color in enumerate(((230, 60, 60), (240, 200, 60), (60, 60, 60))):
        rect(d, 138 + i * 3, 20, 2, 40, color)
    return img


def ram():
    img, d = canvas(50, 7)
    rect(d, 0, 0, 50, 7, OUTLINE)
    rect(d, 1, 1, 48, 5, (30, 110, 60))
    for x in range(4, 46, 7):
        rect(d, x, 2, 5, 3, (40, 40, 46))
    for x in range(2, 48, 2):
        d.point((x, 6), fill=(230, 190, 70))
    return img


def hd():
    img, d = canvas(42, 32)
    box(d, 0, 0, 42, 32, METAL[0], WHITE, METAL[2])
    box(d, 4, 4, 34, 18, METAL[1], None, METAL[2])
    rect(d, 6, 6, 30, 3, (240, 240, 240))
    d.ellipse((24, 12, 34, 22), fill=METAL[2])
    rect(d, 4, 25, 34, 4, BOARD[1])
    return img


def close_format():
    """Tela de formatação/instalação, 176x108; a barra (x=24, y=70, 128x10) é preenchida no código."""
    img, d = canvas(CLOSE_W, CLOSE_H)
    rect(d, 0, 0, CLOSE_W, CLOSE_H, (0, 0, 168))
    rect(d, 0, 0, CLOSE_W, 12, (0, 0, 120))
    text(d, 4, 2, tr("Setup do Windows", "Windows Setup"), WHITE)
    text(d, 12, 26, tr("Formatando C:", "Formatting C:"), (230, 230, 230))
    text(d, 12, 42, tr("Aguarde...", "Please wait..."), (200, 200, 230))
    rect(d, 22, 68, 132, 14, (230, 230, 230))
    rect(d, 24, 70, 128, 10, (0, 0, 100))
    rect(d, 0, CLOSE_H - 12, CLOSE_W, 12, (180, 180, 180))
    text(d, 4, CLOSE_H - 10, tr("ENTER=Continuar", "ENTER=Continue"), (40, 40, 40))
    return img


def screwdriver():
    """Chave de fenda (item do inventário)."""
    img, d = canvas(32, 32)
    # Haste de metal na diagonal.
    for i in range(14):
        rect(d, 16 + i, 15 - i, 2, 2, METAL[0] if i % 2 else METAL[1])
        d.point((17 + i, 17 - i), fill=METAL[2])
    rect(d, 29, 1, 2, 2, METAL[2])
    # Cabo.
    for i in range(12):
        x, y = 4 + i, 27 - i
        rect(d, x, y - 2, 4, 4, (230, 60, 40) if i < 9 else (250, 200, 40))
        d.point((x, y - 2), fill=(250, 130, 110))
    rect(d, 3, 25, 4, 4, OUTLINE)
    return img


def build():
    sprites = {
        "street": street(),
        "bench": bench(),
        "monitor": monitor(),
        "tower": open_tower(),
        "pc": small_pc(),
        "sign": sign(),
        "toolbox": toolbox(),
        "thumbs": thumbs_up(),
        "close-case": close_case(),
        "ram": ram(),
        "hd": hd(),
        "close-format": close_format(),
        "item-screwdriver": screwdriver(),
    }
    for n in range(4):
        sprites[f"counter-{n}"] = counter(n)
    return sprites


if __name__ == "__main__":
    run(build)
