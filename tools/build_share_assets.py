"""Generates the share image (Open Graph) and the site icons.

Usage:
    python -I tools/build_share_assets.py <public-dir> [--lang en]

- og-image.png (1200x630): avatar, name, role and the story's items.
- og-image.en.png: the same card in English (only this file is written with `--lang en`).
- favicon-32.png, apple-touch-icon.png (180x180): the character's face.
"""

import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

FONT_PATH = Path(__file__).parent / "fonts" / "PressStart2P-Regular.ttf"
BG = (27, 22, 34)
PANEL = (42, 33, 51)
INK = (244, 236, 216)
MUTED = (184, 169, 140)
ACCENT = (243, 192, 63)
FRAME = 64
DOWN_ROW = 2

ITEMS = [
    "phase0/item-cd",
    "phase1/item-apostila",
    "phase2/item-screwdriver",
    "phase3/item-headset",
    "phase4/item-badge",
    "phase5/item-phone",
    "phase6/item-box",
    "phase7/item-ia",
]


def font(size):
    return ImageFont.truetype(str(FONT_PATH), size)


def text(draw, xy, value, size, fill):
    draw.fontmode = "1"
    draw.text(xy, value, font=font(size), fill=fill)


def avatar(public):
    sheet = Image.open(public / "sprites/character/adult-idle.png").convert("RGBA")
    return sheet.crop((0, DOWN_ROW * FRAME, FRAME, (DOWN_ROW + 1) * FRAME))


# Card text per language: name and role, stack, and the call to action.
CARD_TEXT = {
    "pt": {
        "role": ("Desenvolvedor Full", "Stack Sênior"),
        "stack": ("IA aplicada · React", "TypeScript · C#/.NET"),
        "cta": ("currículo e a minha", "história em pixel art"),
    },
    "en": {
        "role": ("Senior Full Stack", "Developer"),
        "stack": ("Applied AI · React", "TypeScript · C#/.NET"),
        "cta": ("résumé and my story", "in pixel art"),
    },
}


def og_image(public, lang="pt"):
    words = CARD_TEXT[lang]
    img = Image.new("RGB", (1200, 630), BG)
    d = ImageDraw.Draw(img)
    # Frame and a subtle grid, in a pixel-art mood.
    for x in range(0, 1200, 30):
        d.line((x, 0, x, 630), fill=(32, 26, 40))
    for y in range(0, 630, 30):
        d.line((0, y, 1200, y), fill=(32, 26, 40))
    d.rectangle((24, 24, 1175, 605), outline=INK, width=6)

    # Avatar scaled up 6x, without smoothing.
    d.rectangle((70, 90, 70 + 360, 90 + 360), fill=PANEL, outline=INK, width=6)
    face = avatar(public).resize((FRAME * 6, FRAME * 6), Image.NEAREST)
    img.paste(face, (70 - 12, 90 - 30), face)

    x = 480
    text(d, (x, 110), "Daniel Porto", 48, ACCENT)
    text(d, (x, 196), words["role"][0], 22, INK)
    text(d, (x, 230), words["role"][1], 22, INK)
    text(d, (x, 290), words["stack"][0], 18, MUTED)
    text(d, (x, 320), words["stack"][1], 18, MUTED)
    text(d, (x, 380), words["cta"][0], 16, INK)
    text(d, (x, 406), words["cta"][1], 16, INK)

    # The journey's items, in a row.
    for i, item in enumerate(ITEMS):
        icon = Image.open(public / f"sprites/{item}.png").convert("RGBA").resize((64, 64), Image.NEAREST)
        bx = 70 + i * 84
        d.rectangle((bx - 6, 494, bx + 70, 570), fill=PANEL, outline=MUTED, width=3)
        img.paste(icon, (bx, 500), icon)

    text(d, (790, 528), "danielporto.com.br", 16, ACCENT)
    return img


def icons(public):
    """The character's face (head crop, facing front) on a dark background."""
    head = avatar(public).crop((16, 12, 48, 44))
    icon = Image.new("RGBA", (32, 32), BG + (255,))
    icon.alpha_composite(head)
    small = icon
    big = Image.new("RGBA", (180, 180), BG + (255,))
    big.alpha_composite(icon.resize((160, 160), Image.NEAREST), (10, 10))
    return small, big


def main(public_dir, lang="pt"):
    public = Path(public_dir)
    if lang != "pt":
        og_image(public, lang).save(public / f"og-image.{lang}.png", optimize=True)
        print("ok", lang)
        return
    og_image(public).save(public / "og-image.png", optimize=True)
    small, big = icons(public)
    small.save(public / "favicon-32.png")
    big.save(public / "apple-touch-icon.png")
    print("ok")


if __name__ == "__main__":
    args = sys.argv[1:]
    lang = "pt"
    if "--lang" in args:
        i = args.index("--lang")
        lang = args[i + 1]
        del args[i : i + 2]
    if lang not in CARD_TEXT:
        raise SystemExit(f"unknown language: {lang}")
    main(args[0], lang)
