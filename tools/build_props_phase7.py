"""Draws the phase 7 objects in pixel art (Purple Metrics, from home).

Usage:
    python -I tools/build_props_phase7.py <output-dir> [--lang en]

The home office (with Sugarloaf Mountain in the window), the stack change, the CI/CD
pipeline, the product's AI chat and the final item, "applied AI".
With --lang en, writes only the English variants (<name>.en.png) of the sprites with text.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from build_props import H, OUTLINE, W, WHITE, WOOD, box, canvas, rect, run, tr  # noqa: E402
from build_props_phase1 import CLOSE_H, CLOSE_W, PLANT, text  # noqa: E402
from build_props_phase3 import FLOOR_Y  # noqa: E402

PURPLE = [(150, 100, 230), (120, 70, 200), (80, 40, 150)]
GREEN = (60, 200, 110)
GOLD = [(255, 220, 90), (240, 190, 50)]


def home_office():
    img, d = canvas(W, H)
    rect(d, 0, 0, W, FLOOR_Y, (232, 222, 206))
    rect(d, 0, FLOOR_Y, W, H - FLOOR_Y, (170, 120, 80))
    for y in range(FLOOR_Y, H, 6):
        rect(d, 0, y, W, 1, (150, 100, 64))
    rect(d, 0, FLOOR_Y - 1, W, 1, OUTLINE)
    # Janela com o Pão de Açúcar e o mar.
    wx, wy, ww, wh = 20, 20, 96, 70
    box(d, wx, wy, ww, wh, WHITE)
    rect(d, wx + 3, wy + 3, ww - 6, wh - 6, (160, 210, 245))
    rect(d, wx + 3, wy + wh - 18, ww - 6, 15, (70, 140, 200))
    for x in range(ww - 6):
        # Morro principal e o morro da Urca.
        h1 = max(0, 34 - abs(x - 58) * 2) if abs(x - 58) < 9 else max(0, 18 - abs(x - 58))
        h2 = max(0, 16 - abs(x - 26))
        height = max(h1, h2)
        if height:
            rect(d, wx + 3 + x, wy + wh - 18 - height, 1, height, (80, 110, 90))
    rect(d, wx + 26, wy + 30, 34, 1, (60, 60, 60))  # cabo do bondinho
    rect(d, wx + ww // 2, wy + 3, 2, wh - 6, WHITE)
    # Estante com o cristal (lembrança do fã-site) e livros.
    box(d, 236, 34, 70, 6, WOOD[1], WOOD[0], WOOD[3])
    box(d, 236, 66, 70, 6, WOOD[1], WOOD[0], WOOD[3])
    for i, c in enumerate(((200, 60, 60), (60, 110, 200), (240, 190, 50), (90, 170, 90))):
        rect(d, 240 + i * 6, 52, 5, 14, c)
    for i in range(7):
        half = i if i < 4 else 7 - i
        rect(d, 284 - half, 18 + i * 2, half * 2 + 1, 2, (120, 190, 250))
    # Planta grande.
    box(d, 296, 116, 16, 24, (210, 130, 90), (230, 160, 120), (170, 100, 70))
    for lx, ly, lw, lh in ((302, 84, 4, 32), (294, 92, 9, 4), (305, 96, 10, 4), (294, 104, 9, 4)):
        rect(d, lx, ly, lw, lh, PLANT[1])
        rect(d, lx, ly, lw, 1, PLANT[0])
    return img


def home_desk():
    img, d = canvas(120, 36)
    box(d, 0, 0, 120, 6, WOOD[1], WOOD[0], WOOD[3])
    for x in (4, 110):
        rect(d, x, 6, 5, 30, (50, 52, 58))
    return img


def ultrawide():
    """Monitor ultrawide; a tela (54x20) começa em (3, 3)."""
    img, d = canvas(60, 34)
    box(d, 0, 0, 60, 26, (40, 42, 48), (70, 72, 80), (20, 22, 26))
    rect(d, 3, 3, 54, 20, PURPLE[2])
    rect(d, 27, 26, 6, 4, (40, 42, 48))
    box(d, 20, 29, 20, 5, (40, 42, 48), (70, 72, 80), (20, 22, 26))
    return img


def laptop():
    img, d = canvas(30, 18)
    box(d, 3, 0, 24, 14, (180, 184, 196), (210, 214, 226), (140, 144, 156))
    rect(d, 5, 2, 20, 10, (30, 30, 40))
    for y in (4, 7):
        rect(d, 7, y, 10, 1, GREEN)
    box(d, 0, 13, 30, 5, (180, 184, 196), (210, 214, 226), (140, 144, 156))
    return img


def badge(label, color):
    width = len(label) * 8 + 8
    img, d = canvas(width, 14)
    box(d, 0, 0, width, 14, color[1], color[0], color[2])
    text(d, 4, 3, label, WHITE)
    return img


# ---------------------------------------------------------------- telas de perto

def stages():
    return ["build", "lint", tr("testes", "tests"), "deploy"]


# Posição de cada etapa na tela de perto; o código acende a bolinha da etapa.
STAGE_Y0, STAGE_STEP = 20, 18


def close_pipeline():
    """Esteira de CI/CD: as etapas acendem no código; o contador também é desenhado no código."""
    img, d = canvas(CLOSE_W, CLOSE_H)
    rect(d, 0, 0, CLOSE_W, CLOSE_H, (24, 26, 34))
    rect(d, 0, 0, CLOSE_W, 12, (44, 48, 60))
    text(d, 4, 2, tr("CI/CD do front", "Front-end CI/CD"), (220, 220, 230))
    for i, stage in enumerate(stages()):
        y = STAGE_Y0 + i * STAGE_STEP
        box(d, 6, y, 72, 14, (50, 54, 66), (70, 74, 86), (30, 32, 40))
        d.ellipse((9, y + 3, 16, y + 10), fill=(80, 84, 100))
        text(d, 20, y + 3, stage, (190, 194, 210))
        if i < len(stages()) - 1:
            rect(d, 40, y + 14, 2, 4, (90, 94, 110))
    text(d, 92, 30, "deploys", (180, 184, 200))
    text(d, 92, 40, tr("em prod", "to prod"), (180, 184, 200))
    box(d, 90, 54, 80, 22, (30, 32, 40), None, (70, 74, 86))
    return img


def deploy_counter(value):
    """Número do contador de deploys (desenhado sobre a caixa da tela da esteira)."""
    img, d = canvas(76, 18)
    label = f"{value}+" if value >= 800 else str(value)
    text(d, 38 - len(label) * 4, 5, label, GOLD[0])
    return img


def close_dashboard():
    """Dashboard do produto com o painel do chat; mensagens e barras entram no código."""
    img, d = canvas(CLOSE_W, CLOSE_H)
    rect(d, 0, 0, CLOSE_W, CLOSE_H, (246, 244, 252))
    rect(d, 0, 0, CLOSE_W, 12, PURPLE[1])
    text(d, 4, 2, "Purple Metrics", WHITE)
    # Lado esquerdo: um gráfico do dashboard.
    box(d, 4, 16, 70, 50, WHITE, None, (210, 206, 226))
    for i, h in enumerate((18, 30, 24, 36, 28)):
        rect(d, 10 + i * 12, 60 - h, 8, h, (200, 190, 236))
    # Painel do chat à direita.
    box(d, 80, 16, 92, 88, WHITE, None, (210, 206, 226))
    rect(d, 81, 17, 90, 10, PURPLE[0])
    text(d, 84, 18, tr("Chat IA", "AI chat"), WHITE)
    box(d, 83, 92, 86, 10, (240, 238, 248), None, (210, 206, 226))
    return img


# Chamada de vídeo com o time: as caras entram no código (recortadas das folhas LPC).
CALL_TILES = [(6, 16), (64, 16), (122, 16), (6, 58), (64, 58), (122, 58)]
CALL_TILE = (48, 38)


def close_call():
    img, d = canvas(CLOSE_W, CLOSE_H)
    rect(d, 0, 0, CLOSE_W, CLOSE_H, (30, 30, 40))
    rect(d, 0, 0, CLOSE_W, 12, (50, 50, 64))
    text(d, 4, 2, tr("Call do time", "Team call"), (220, 220, 230))
    for x, y in CALL_TILES:
        box(d, x, y, CALL_TILE[0], CALL_TILE[1], (60, 60, 76), (80, 80, 96), (40, 40, 52))
    rect(d, 0, CLOSE_H - 10, CLOSE_W, 10, (50, 50, 64))
    d.ellipse((CLOSE_W // 2 - 4, CLOSE_H - 9, CLOSE_W // 2 + 4, CLOSE_H - 2), fill=(220, 60, 60))
    return img


def live_label():
    img, d = canvas(84, 12)
    box(d, 0, 0, 84, 12, (40, 150, 80), (70, 190, 110), (20, 100, 50))
    text(d, 3, 2, tr("chat no ar", "chat live"), WHITE)
    return img


TERMINAL_LINES = 6


def terminal_lines():
    return [
        (tr("$ mcp conectar", "$ mcp connect"), (200, 200, 210)),
        (tr("  APIs da Purple ok", "  Purple APIs ok"), GREEN),
        (tr("$ agente spec", "$ agent spec"), (200, 200, 210)),
        (tr("  plano ok", "  plan ok"), GREEN),
        (tr("  testes ok", "  tests ok"), GREEN),
        ("  deploy ok", GREEN),
    ]


def close_terminal(lines):
    img, d = canvas(CLOSE_W, CLOSE_H)
    rect(d, 0, 0, CLOSE_W, CLOSE_H, (16, 18, 24))
    rect(d, 0, 0, CLOSE_W, 12, (44, 48, 60))
    text(d, 4, 2, "terminal", (200, 200, 210))
    for i, (line, color) in enumerate(terminal_lines()[:lines]):
        text(d, 4, 16 + i * 14, line, color)
    if lines < TERMINAL_LINES:
        rect(d, 4, 16 + lines * 14, 6, 8, (200, 200, 210))
    return img


def user_message():
    img, d = canvas(84, 20)
    box(d, 0, 0, 84, 20, PURPLE[0], PURPLE[0], PURPLE[1])
    text(d, 3, 2, tr("Qual canal", "Best ROI"), WHITE)
    text(d, 3, 11, tr("rende mais", "channel?"), WHITE)
    return img


def ai_message():
    img, d = canvas(84, 46)
    box(d, 0, 0, 84, 46, (238, 236, 246), None, (210, 206, 226))
    text(d, 3, 2, tr("Busca paga", "Search ads"), (40, 40, 60))
    rect(d, 4, 42, 76, 1, (180, 176, 200))
    return img


def ia_item(size):
    """O item final: uma estrela dourada com um núcleo roxo de circuito (IA aplicada)."""
    img, d = canvas(size, size)
    c = size // 2
    r = size // 2 - 1
    # Raios principais (cruz) afinando nas pontas.
    for i in range(r):
        w = max(0, (r - i) // 4)
        rect(d, c - w, c - i, 2 * w + 1, 1, GOLD[0])
        rect(d, c - w, c + i, 2 * w + 1, 1, GOLD[0])
        rect(d, c - i, c - w, 1, 2 * w + 1, GOLD[0])
        rect(d, c + i, c - w, 1, 2 * w + 1, GOLD[0])
    # Raios diagonais curtos.
    for i in range(r // 2):
        for sx, sy in ((1, 1), (1, -1), (-1, 1), (-1, -1)):
            d.point((c + sx * i, c + sy * i), fill=GOLD[1])
    # Núcleo roxo com circuito.
    core = max(3, size // 6)
    box(d, c - core, c - core, core * 2 + 1, core * 2 + 1, PURPLE[1], PURPLE[0], PURPLE[2])
    for k in range(-core + 2, core - 1, 2):
        d.point((c + k, c), fill=(120, 230, 255))
        d.point((c, c + k), fill=(120, 230, 255))
    # Brilhos.
    for bx, by in ((c - r + 2, c - r + 4), (c + r - 4, c + r - 3)):
        d.point((bx, by), fill=WHITE)
    return img


def build():
    sprites = {
        "room": home_office(),
        "desk": home_desk(),
        "ultrawide": ultrawide(),
        "laptop": laptop(),
        "badge-csharp": badge("C#", [(160, 110, 230), (120, 70, 200), (80, 40, 150)]),
        "badge-react": badge("React", [(110, 210, 250), (40, 150, 210), (20, 100, 160)]),
        "badge-ts": badge("TS", [(90, 140, 230), (50, 100, 200), (30, 70, 150)]),
        "pipeline": close_pipeline(),
        "dashboard": close_dashboard(),
        "msg-user": user_message(),
        "msg-ai": ai_message(),
        "ia-big": ia_item(48),
        "item-ia": ia_item(32),
    }
    sprites["call"] = close_call()
    sprites["live"] = live_label()
    for lines in range(TERMINAL_LINES + 1):
        sprites[f"terminal-{lines}"] = close_terminal(lines)
    for value in range(0, 900, 100):
        sprites[f"count-{value}"] = deploy_counter(value)
    return sprites


if __name__ == "__main__":
    run(build)
