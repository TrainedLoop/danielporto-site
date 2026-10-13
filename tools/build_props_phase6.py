"""Draws the phase 6 objects in pixel art (Fu2re, computer vision).

Usage:
    python -I tools/build_props_phase6.py <output-dir> [--lang en]

The office (similar to Fulllab's, with a fish tank), the SmartVision screen, the street
with Light's utility poles and the car with the roof camera, and the black box.
With --lang en, writes only the English variants (<name>.en.png) of the sprites with text.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from build_props import H, OUTLINE, W, WHITE, box, canvas, rect, run, tr  # noqa: E402
from build_props_phase1 import CLOSE_H, CLOSE_W, PLANT, text  # noqa: E402
from build_props_phase5 import office as fulllab_office  # noqa: E402

CYAN = (80, 220, 255)
SV_BLUE = [(40, 80, 170), (70, 110, 210), (20, 50, 120)]
WATER = [(110, 190, 230), (80, 160, 210), (60, 130, 190)]
ASPHALT = [(84, 86, 92), (70, 72, 78)]
CONCRETE = [(196, 196, 190), (170, 170, 164), (140, 140, 136)]
DETECT = (60, 230, 120)


def office():
    """Mesmo escritório da Fulllab, com o letreiro da Fu2re e um aquário no lugar do quadro."""
    img = fulllab_office("FU2RE", CYAN, (20, 90, 120))
    from PIL import ImageDraw

    d = ImageDraw.Draw(img)
    # Cobre o quadro com a parede e põe o aquário em cima de um móvel.
    rect(d, 246, 26, 66, 52, (236, 232, 224))
    box(d, 244, 92, 64, 46, (90, 70, 60), (120, 96, 80), (60, 46, 40))
    rect(d, 248, 98, 56, 1, (60, 46, 40))
    box(d, 244, 46, 64, 46, WATER[1], (200, 236, 250), OUTLINE)
    rect(d, 246, 48, 60, 4, WATER[0])
    rect(d, 246, 84, 60, 6, (220, 200, 150))  # areia
    for x, h in ((252, 16), (258, 22), (292, 18)):
        rect(d, x, 84 - h, 2, h, PLANT[1])
        rect(d, x + 2, 84 - h + 4, 2, h - 6, PLANT[0])
    for bx, by in ((270, 70), (284, 60), (276, 54)):
        d.point((bx, by), fill=WHITE)
    return img


# ---------------------------------------------------------------- SmartVision


def close_smartvision():
    """Tela da SmartVision: fila de treino e o gráfico (barras e curva são desenhadas no código)."""
    img, d = canvas(CLOSE_W, CLOSE_H)
    rect(d, 0, 0, CLOSE_W, CLOSE_H, (240, 242, 248))
    rect(d, 0, 0, CLOSE_W, 12, SV_BLUE[0])
    text(d, 4, 2, "SmartVision", WHITE)
    # Fila de treino.
    text(d, 4, 16, tr("Fila", "Queue"), SV_BLUE[2])
    for i, name in enumerate(tr(("postes", "placas", "fios"), ("poles", "signs", "wires"))):
        y = 28 + i * 18
        box(d, 4, y, 78, 16, WHITE, None, (200, 204, 216))
        text(d, 7, y + 2, name, (40, 44, 60))
        rect(d, 7, y + 11, 70, 3, (220, 224, 234))
    # Gráfico da perda (loss).
    text(d, 90, 16, "loss", SV_BLUE[2])
    rect(d, 90, 28, 82, 56, WHITE)
    rect(d, 92, 30, 1, 52, (120, 124, 140))
    rect(d, 92, 81, 78, 1, (120, 124, 140))
    # Miniaturas com caixas de detecção.
    for i in range(4):
        x = 4 + i * 42
        rect(d, x, 88, 38, 16, (130, 170, 210))
        rect(d, x + 16, 88, 3, 16, (110, 110, 110))
        rect(d, x + 13, 89, 9, 13, (0, 0, 0, 0))
        d.rectangle((x + 13, 89, x + 21, 102), outline=DETECT)
    return img


# ---------------------------------------------------------------- rua com os postes

POLES = [40, 120, 200, 280]
STREET_SIDEWALK = 130
STREET_ROAD = 146


def avenue():
    img, d = canvas(W, H)
    rect(d, 0, 0, W, 70, (150, 206, 244))
    rect(d, 0, 0, W, 20, (176, 222, 250))
    # Prédios ao fundo.
    for bx, bw, bh, c in ((0, 40, 70, (180, 190, 200)), (44, 30, 54, (200, 196, 186)), (78, 46, 80, (170, 180, 196)), (128, 34, 60, (210, 200, 190)), (166, 50, 74, (176, 186, 200)), (220, 36, 56, (200, 196, 186)), (260, 60, 82, (170, 180, 196))):
        rect(d, bx, STREET_SIDEWALK - bh, bw, bh, c)
        for wy in range(STREET_SIDEWALK - bh + 6, STREET_SIDEWALK - 6, 8):
            for wx in range(bx + 4, bx + bw - 4, 7):
                rect(d, wx, wy, 3, 4, (230, 236, 244))
    # Calçada e avenida.
    rect(d, 0, STREET_SIDEWALK, W, STREET_ROAD - STREET_SIDEWALK, CONCRETE[0])
    rect(d, 0, STREET_ROAD - 2, W, 2, CONCRETE[2])
    rect(d, 0, STREET_ROAD, W, H - STREET_ROAD, ASPHALT[1])
    for x in range(6, W, 30):
        rect(d, x, 164, 14, 2, (230, 220, 150))
    # Postes de concreto com cruzeta e transformador.
    for px in POLES:
        rect(d, px, 44, 5, STREET_SIDEWALK - 42, CONCRETE[1])
        rect(d, px, 44, 1, STREET_SIDEWALK - 42, CONCRETE[2])
        rect(d, px - 12, 50, 29, 3, (110, 110, 110))
        box(d, px + 6, 58, 10, 14, (120, 124, 130), (150, 154, 160), (90, 94, 100))
        for ix in (px - 11, px + 14):
            rect(d, ix, 47, 2, 3, (200, 210, 220))
    # Fio entre os postes.
    rect(d, 0, 49, W, 1, (50, 50, 56))
    return img


def survey_car():
    """Carro com a câmera de 360° no teto (como os do Street View), virado para a direita."""
    img, d = canvas(64, 40)
    box(d, 2, 22, 58, 12, (236, 236, 240), WHITE, (180, 180, 190))
    box(d, 14, 14, 30, 10, (236, 236, 240), WHITE, (180, 180, 190))
    rect(d, 17, 16, 11, 6, (120, 170, 210))
    rect(d, 30, 16, 11, 6, (120, 170, 210))
    rect(d, 56, 25, 3, 3, (250, 220, 120))
    for wx in (10, 44):
        d.ellipse((wx, 29, wx + 10, 39), fill=OUTLINE)
        d.ellipse((wx + 3, 32, wx + 7, 36), fill=(160, 160, 170))
    # Mastro e câmera.
    rect(d, 28, 2, 2, 12, (90, 90, 96))
    d.ellipse((24, 0, 34, 8), fill=(40, 42, 50))
    for cx, cy in ((26, 3), (30, 2), (32, 5)):
        d.point((cx, cy), fill=CYAN)
    return img


def flash():
    img, d = canvas(16, 16)
    rect(d, 7, 0, 2, 16, WHITE)
    rect(d, 0, 7, 16, 2, WHITE)
    rect(d, 4, 4, 8, 8, (255, 255, 220))
    return img


def detect_label():
    img, d = canvas(42, 10)
    rect(d, 0, 0, 42, 10, DETECT)
    text(d, 1, 1, tr("poste", "pole"), OUTLINE)
    return img


# ---------------------------------------------------------------- caixa-preta


def black_box(opening):
    """Caixa-preta abrindo (0 = fechada, 3 = aberta com engrenagens e luz)."""
    img, d = canvas(80, 72)
    base_top = 32
    if opening > 0:
        # Raios de luz saindo de dentro, mais fortes conforme abre.
        for i, x in enumerate(range(16, 66, 6)):
            length = 8 + opening * 8 - (i % 2) * 6
            spread = (x - 40) // 6
            for k in range(length):
                alpha = max(0, 200 - k * 8)
                d.point((x + spread * k // 8, base_top - 2 - k), fill=(255, 236, 150, alpha))
    box(d, 10, base_top, 60, 38, (34, 34, 40), (60, 60, 70), (14, 14, 18))
    rect(d, 14, base_top + 18, 52, 1, (60, 60, 70))
    text(d, 22, base_top + 22, tr("IA?", "AI?"), (120, 120, 140) if opening == 0 else CYAN)
    lid_lift = opening * 7
    box(d, 8, base_top - 6 - lid_lift, 64, 8, (40, 40, 48), (70, 70, 80), (20, 20, 24))
    if opening >= 2:
        # Engrenagens e "neurônios" aparecendo.
        for gx, gy, r in ((26, base_top - 4, 6), (44, base_top - 8, 8), (58, base_top - 2, 5)):
            d.ellipse((gx - r, gy - r, gx + r, gy + r), outline=(250, 200, 60), width=2)
            d.point((gx, gy), fill=(250, 200, 60))
        for nx, ny in ((20, 10), (34, 4), (50, 12), (62, 6)):
            d.ellipse((nx - 2, ny - 2, nx + 2, ny + 2), fill=CYAN)
        d.line((20, 10, 34, 4), fill=CYAN)
        d.line((34, 4, 50, 12), fill=CYAN)
        d.line((50, 12, 62, 6), fill=CYAN)
    return img


def box_item():
    """Caixa-preta aberta (item do inventário)."""
    img, d = canvas(32, 32)
    d.polygon([(10, 14), (22, 14), (27, 2), (5, 2)], fill=(255, 240, 170, 140))
    box(d, 4, 14, 24, 16, (34, 34, 40), (70, 70, 80), (14, 14, 18))
    box(d, 3, 9, 26, 5, (40, 40, 48), (80, 80, 90), (20, 20, 24))
    for gx, gy in ((12, 6), (20, 5)):
        d.ellipse((gx - 3, gy - 3, gx + 3, gy + 3), outline=(250, 200, 60))
    rect(d, 13, 20, 6, 2, CYAN)
    return img


def build():
    sprites = {
        "office": office(),
        "smartvision": close_smartvision(),
        "avenue": avenue(),
        "car": survey_car(),
        "flash": flash(),
        "detect-label": detect_label(),
        "item-box": box_item(),
    }
    for k in range(4):
        sprites[f"box-{k}"] = black_box(k)
    return sprites


if __name__ == "__main__":
    run(build)
