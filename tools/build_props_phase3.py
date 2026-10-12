"""Desenha em pixel art os objetos da fase 3 (suporte no provedor e faculdade).

Uso:
    python -I tools/build_props_phase3.py <pasta-de-saida>

Três ambientes: o escritório do provedor de internet a rádio (de dia), a sala de
aula da faculdade (à noite) e o quarto, de madrugada, com o curso online de C#.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from build_props import H, OUTLINE, W, WHITE, WOOD, box, canvas, rect  # noqa: E402
from build_props_phase1 import CLOSE_H, CLOSE_W, XP_BLUE, XP_GREEN, text  # noqa: E402

FLOOR_Y = 140

LCD = [(60, 62, 70), (40, 42, 48), (24, 26, 30)]
CARPET = [(120, 126, 140), (106, 112, 126), (92, 98, 112)]
OFFICE_WALL = [(206, 216, 226), (188, 200, 212), (164, 176, 190)]
NIGHT = [(26, 30, 60), (36, 42, 78), (50, 58, 100)]
CHALK = (232, 240, 230)
BOARD = [(40, 96, 70), (30, 80, 58), (22, 62, 44)]


# ---------------------------------------------------------------- escritório do provedor


def radio_tower(d, x, base, height):
    """Torre treliçada com antenas, vista pela janela."""
    color = (200, 60, 50)
    top = base - height
    for y in range(top, base):
        half = 1 + (y - top) // 8
        d.point((x - half, y), fill=color)
        d.point((x + half, y), fill=color)
        if (y - top) % 6 == 0:
            rect(d, x - half, y, half * 2 + 1, 1, color)
    rect(d, x, top - 6, 1, 6, (120, 120, 120))
    for ay in (top + 4, top + 12):
        rect(d, x + 3, ay, 3, 4, WHITE)
        rect(d, x - 5, ay + 2, 3, 4, WHITE)
    d.point((x, top - 7), fill=(255, 60, 60))


def office():
    img, d = canvas(W, H)
    rect(d, 0, 0, W, FLOOR_Y, OFFICE_WALL[0])
    rect(d, 0, 96, W, FLOOR_Y - 96, OFFICE_WALL[1])
    rect(d, 0, 96, W, 2, OFFICE_WALL[2])
    rect(d, 0, FLOOR_Y, W, H - FLOOR_Y, CARPET[1])
    for y in range(FLOOR_Y + 4, H, 6):
        for x in range((y // 6 % 2) * 3, W, 6):
            d.point((x, y), fill=CARPET[2])
    rect(d, 0, FLOOR_Y - 1, W, 1, OUTLINE)

    # Janela com a torre de rádio lá fora.
    wx, wy, ww, wh = 18, 22, 76, 60
    box(d, wx, wy, ww, wh, (230, 230, 236))
    rect(d, wx + 3, wy + 3, ww - 6, wh - 6, (150, 204, 240))
    rect(d, wx + 3, wy + wh - 16, ww - 6, 13, (120, 170, 110))
    radio_tower(d, wx + 46, wy + wh - 14, 40)
    rect(d, wx + ww // 2, wy + 3, 2, wh - 6, (230, 230, 236))

    # Faixa do provedor.
    box(d, 120, 18, 160, 22, XP_BLUE[0], XP_BLUE[1], XP_BLUE[2])
    text(d, 128, 21, "INTERNET VIA", WHITE)
    text(d, 128, 30, "RÁDIO", (250, 220, 90))
    # Ondinhas de sinal ao lado do texto.
    for i, r in enumerate((3, 6, 9)):
        d.arc((250 - r, 30 - r, 250 + r, 30 + r), 300, 60, fill=WHITE)

    # Divisória de baia à direita.
    box(d, 262, 78, 58, FLOOR_Y - 78, (150, 160, 176), (170, 180, 196), (120, 130, 146))
    rect(d, 262, 78, 58, 4, (90, 96, 110))
    return img


def office_desk():
    """Mesa de escritório; tampo em y=0."""
    img, d = canvas(104, 36)
    box(d, 0, 0, 104, 5, (220, 220, 214), WHITE, (170, 170, 164))
    box(d, 2, 4, 5, 32, (150, 150, 150), None, (110, 110, 110))
    box(d, 66, 4, 36, 32, (200, 200, 194), (220, 220, 214), (160, 160, 154))
    for y in (12, 22):
        rect(d, 69, y, 30, 1, (150, 150, 144))
        rect(d, 82, y + 3, 6, 1, (110, 110, 110))
    return img


def lcd_monitor(screen_color=(0, 84, 227)):
    """Monitor LCD fininho; a tela (28x18) começa em (3, 3)."""
    img, d = canvas(34, 32)
    box(d, 0, 0, 34, 24, LCD[1], LCD[0], LCD[2])
    rect(d, 3, 3, 28, 18, screen_color)
    rect(d, 15, 24, 4, 4, LCD[1])
    box(d, 9, 27, 16, 5, LCD[1], LCD[0], LCD[2])
    return img


def phone():
    img, d = canvas(16, 9)
    box(d, 0, 3, 16, 6, (60, 60, 66), (90, 90, 96), (36, 36, 40))
    box(d, 1, 0, 14, 4, (60, 60, 66), (90, 90, 96), (36, 36, 40))
    for x in (4, 7, 10):
        d.point((x, 6), fill=(200, 200, 200))
    return img


def ring():
    """Balão "TRIM!" do telefone tocando."""
    img, d = canvas(44, 14)
    box(d, 0, 0, 44, 12, WHITE)
    rect(d, 6, 11, 4, 3, WHITE)
    rect(d, 6, 13, 1, 1, OUTLINE)
    text(d, 3, 2, "TRIM!", (200, 40, 40))
    return img


def office_chair():
    img, d = canvas(22, 20)
    box(d, 0, 0, 22, 5, (50, 50, 60), (80, 80, 90), (30, 30, 36))
    rect(d, 10, 5, 2, 9, (90, 90, 96))
    rect(d, 2, 14, 18, 2, (90, 90, 96))
    for x in (2, 10, 18):
        rect(d, x, 16, 2, 2, OUTLINE)
    return img


def lcd_frame():
    """Monitor LCD visto de perto: 200x130, tela começa em (12, 10)."""
    img, d = canvas(200, 130)
    box(d, 0, 0, 200, 124, LCD[1], LCD[0], LCD[2])
    rect(d, 11, 9, 178, 110, OUTLINE)
    rect(d, 96, 124, 8, 6, LCD[1])
    rect(d, 180, 118, 4, 2, (90, 160, 250))
    return img


def tray_icon(d, x, y, ok):
    """Ícone de rede da bandeja: dois computadores; X vermelho ou sinal verde."""
    rect(d, x, y + 2, 7, 5, (200, 220, 250))
    rect(d, x + 5, y, 7, 5, (200, 220, 250))
    rect(d, x, y + 2, 7, 1, OUTLINE)
    rect(d, x + 5, y, 7, 1, OUTLINE)
    if ok:
        for i in range(4):
            d.point((x + 8 + i, y + 6 - i), fill=XP_GREEN)
            d.point((x + 6 + i // 2, y + 4 + i // 2), fill=XP_GREEN)
    else:
        for i in range(5):
            d.point((x + 7 + i, y + 3 + i), fill=(220, 30, 30))
            d.point((x + 11 - i, y + 3 + i), fill=(220, 30, 30))


def close_remote(ok):
    """Janela de acesso remoto mostrando o PC do cliente."""
    img, d = canvas(CLOSE_W, CLOSE_H)
    rect(d, 0, 0, CLOSE_W, CLOSE_H, (58, 110, 165))
    rect(d, 0, CLOSE_H - 10, CLOSE_W, 10, XP_BLUE[0])
    rect(d, 0, CLOSE_H - 10, 26, 10, XP_GREEN)
    # Janela do acesso remoto.
    x, y, w, h = 8, 6, CLOSE_W - 16, CLOSE_H - 22
    rect(d, x, y, w, h, XP_BLUE[2])
    rect(d, x + 1, y + 1, w - 2, 11, XP_BLUE[0])
    text(d, x + 4, y + 3, "Acesso remoto", WHITE)
    # Desktop do cliente dentro da janela.
    ix, iy, iw, ih = x + 3, y + 14, w - 6, h - 17
    rect(d, ix, iy, iw, ih, (0, 128, 128))
    for yy in (iy + 4, iy + 18, iy + 32):
        rect(d, ix + 4, yy, 8, 7, WHITE)
    rect(d, ix, iy + ih - 9, iw, 9, (192, 192, 192))
    rect(d, ix, iy + ih - 9, iw, 1, WHITE)
    rect(d, ix + 2, iy + ih - 7, 20, 5, (160, 160, 160))
    tray_icon(d, ix + iw - 16, iy + ih - 8, ok)
    if ok:
        box(d, ix + 34, iy + 18, 92, 16, (255, 255, 225))
        text(d, ix + 38, iy + 22, "Conectado!", (20, 120, 40))
    else:
        box(d, ix + 30, iy + 18, 100, 16, (255, 255, 225))
        text(d, ix + 34, iy + 22, "Sem conexão", (190, 30, 30))
    return img


def cursor():
    img, d = canvas(8, 12)
    shape = ["X", "XX", "X.X", "X..X", "X...X", "X....X", "X.....X", "X..XXXX", "X.X", "XX", "X"]
    for y, row in enumerate(shape):
        for x, c in enumerate(row):
            if c == "X":
                d.point((x, y), fill=OUTLINE)
            elif c == ".":
                d.point((x, y), fill=WHITE)
    return img


# ---------------------------------------------------------------- faculdade


BOARD_LINES = [
    "#include <iostream>",
    "int main() {",
    '  cout << "Oi";',
    "}",
]


def classroom():
    img, d = canvas(W, H)
    rect(d, 0, 0, W, FLOOR_Y, (214, 206, 184))
    rect(d, 0, 100, W, FLOOR_Y - 100, (190, 180, 156))
    rect(d, 0, 100, W, 2, (160, 150, 128))
    rect(d, 0, FLOOR_Y, W, H - FLOOR_Y, (150, 140, 128))
    for y in range(FLOOR_Y, H, 8):
        rect(d, 0, y, W, 1, (130, 120, 110))
    rect(d, 0, FLOOR_Y - 1, W, 1, OUTLINE)
    # Janela de noite.
    wx, wy = 262, 30
    box(d, wx, wy, 46, 50, (200, 200, 200))
    rect(d, wx + 3, wy + 3, 40, 44, NIGHT[1])
    d.ellipse((wx + 26, wy + 8, wx + 36, wy + 18), fill=(250, 240, 200))
    d.ellipse((wx + 29, wy + 7, wx + 39, wy + 17), fill=NIGHT[1])
    for sx, sy in ((wx + 8, wy + 10), (wx + 16, wy + 26), (wx + 34, wy + 34)):
        d.point((sx, sy), fill=WHITE)
    # Relógio marcando de noite.
    d.ellipse((20, 20, 36, 36), fill=OUTLINE)
    d.ellipse((21, 21, 35, 35), fill=WHITE)
    rect(d, 28, 23, 1, 6, OUTLINE)
    rect(d, 24, 28, 5, 1, OUTLINE)
    return img


def blackboard(lines):
    img, d = canvas(184, 66)
    box(d, 0, 0, 184, 66, WOOD[2], WOOD[1], WOOD[4])
    rect(d, 4, 4, 176, 56, BOARD[1])
    for x in range(10, 176, 23):
        d.point((x, 50), fill=BOARD[0])
    for i, line in enumerate(BOARD_LINES[:lines]):
        text(d, 8, 8 + i * 12, line, CHALK)
    rect(d, 20, 60, 30, 3, (220, 220, 220))
    return img


def school_chair():
    """Cadeira de sala de aula, vista de trás."""
    img, d = canvas(22, 20)
    box(d, 0, 0, 22, 4, WOOD[1], WOOD[0], WOOD[3])
    for x in (2, 17):
        rect(d, x, 4, 3, 16, (100, 100, 110))
        rect(d, x, 4, 1, 16, OUTLINE)
    rect(d, 4, 12, 14, 2, (100, 100, 110))
    return img


def headset():
    """Headset do suporte (item do inventário)."""
    img, d = canvas(32, 32)
    band, pad, mic = (176, 180, 192), (110, 114, 126), (150, 154, 166)
    d.arc((5, 3, 27, 25), 180, 360, fill=OUTLINE, width=4)
    d.arc((6, 4, 26, 24), 180, 360, fill=band, width=2)
    for x in (3, 22):
        box(d, x, 13, 7, 11, pad, (210, 214, 224), OUTLINE)
    # Haste do microfone até a boca.
    for i in range(10):
        rect(d, 8 + i, 24 + i // 3, 2, 2, mic)
    rect(d, 18, 26, 5, 4, OUTLINE)
    rect(d, 19, 27, 3, 2, (200, 60, 60))
    return img


# ---------------------------------------------------------------- quarto de madrugada


def bedroom_night():
    img, d = canvas(W, H)
    rect(d, 0, 0, W, FLOOR_Y, NIGHT[1])
    rect(d, 0, 96, W, FLOOR_Y - 96, NIGHT[0])
    rect(d, 0, FLOOR_Y, W, H - FLOOR_Y, (40, 36, 52))
    rect(d, 0, FLOOR_Y - 1, W, 1, OUTLINE)
    # Janela com a lua.
    box(d, 40, 26, 50, 44, (70, 76, 110))
    rect(d, 43, 29, 44, 38, (14, 18, 40))
    d.ellipse((62, 34, 74, 46), fill=(250, 240, 200))
    for sx, sy in ((50, 40), (80, 56), (56, 60)):
        d.point((sx, sy), fill=WHITE)
    # Cama no canto.
    box(d, 236, 112, 84, 28, (120, 60, 70), (150, 80, 90), (90, 40, 50))
    box(d, 240, 106, 22, 10, (220, 220, 230), WHITE, (170, 170, 190))
    # Relógio digital marcando madrugada.
    box(d, 248, 70, 40, 16, (20, 20, 24))
    text(d, 251, 74, "02:13", (255, 70, 70))
    return img


def night_desk():
    img, d = canvas(84, 36)
    box(d, 0, 0, 84, 5, (90, 70, 64), (110, 90, 80), (60, 46, 42))
    box(d, 3, 4, 5, 32, (70, 54, 50), None, (50, 38, 34))
    box(d, 76, 4, 5, 32, (70, 54, 50), None, (50, 38, 34))
    return img


def close_course(done):
    """Curso online de C#: player de vídeo e, no fim, o certificado."""
    img, d = canvas(CLOSE_W, CLOSE_H)
    rect(d, 0, 0, CLOSE_W, CLOSE_H, (240, 240, 244))
    rect(d, 0, 0, CLOSE_W, 12, (104, 33, 122))
    text(d, 4, 2, "Curso de C#", WHITE)
    # Player.
    rect(d, 8, 18, 160, 66, (20, 20, 28))
    text(d, 66, 38, "C#", (180, 120, 230))
    text(d, 34, 56, "Aula 12/12", (200, 200, 210))
    rect(d, 8, 86, 160, 4, (80, 80, 90))
    rect(d, 8, 86, 160 if done else 120, 4, (104, 33, 122))
    if done:
        box(d, 26, 26, 124, 50, (255, 250, 230), WHITE, (200, 180, 120))
        rect(d, 30, 30, 116, 42, (255, 250, 230))
        text(d, 38, 34, "Certificado", (104, 33, 122))
        text(d, 46, 48, "Curso C#", OUTLINE)
        text(d, 42, 60, "Concluído!", (20, 120, 40))
    return img


def main(out_dir):
    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)
    sprites = {
        "office": office(),
        "office-desk": office_desk(),
        "lcd": lcd_monitor(),
        "lcd-night": lcd_monitor((104, 33, 122)),
        "phone": phone(),
        "ring": ring(),
        "chair": office_chair(),
        "lcd-frame": lcd_frame(),
        "close-remote": close_remote(False),
        "close-remote-ok": close_remote(True),
        "cursor": cursor(),
        "classroom": classroom(),
        "school-chair": school_chair(),
        "item-headset": headset(),
        "bedroom": bedroom_night(),
        "night-desk": night_desk(),
        "close-course": close_course(False),
        "close-course-done": close_course(True),
    }
    for lines in range(len(BOARD_LINES) + 1):
        sprites[f"board-{lines}"] = blackboard(lines)
    for name, image in sprites.items():
        image.save(out / f"{name}.png")
    print("ok", len(sprites), "sprites")


if __name__ == "__main__":
    main(sys.argv[1])
