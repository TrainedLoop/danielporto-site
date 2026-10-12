"""Monta as versões do personagem a partir das camadas do LPC Character Generator.

Uso:
    python -I tools/build_character.py <pasta-do-lpc> <pasta-de-saida> [prévia.png]

Só lê PNGs e JSONs do gerador (não executa nada dele). Para cada fase da
história gera uma folha por animação usada no site (walk, sit e, no adulto,
idle) com as camadas empilhadas por zPos e recoloridas pelas paletas do próprio
gerador, além do arquivo de créditos exigido pelas licenças. Se receber um
terceiro argumento, salva ali uma prévia ampliada de todas as versões.
"""

import json
import sys
from pathlib import Path

from PIL import Image

FRAME = 64
# Linhas da caminhada na folha "universal" antiga (13 colunas x 21 linhas).
UNIVERSAL_WALK_ROW = 8

SKIN = None  # "light" já é a cor-base do gerador
HAIR = "espresso"  # castanho bem escuro, definido em CUSTOM_PALETTES
SHIRT = "black"
SHORTS = "tan"
SHOES = "white"

# Cada camada: (definição, cor na paleta do material ou None, caminho por tipo de corpo).
# O caminho vem da própria definição; aqui só escolhemos o que entra em cada fase.
VARIANTS = {
    # NPC da fase 5: desenvolvedora do time na Fulllab.
    "dev-woman": {
        "body": "female",
        "anims": ["walk"],
        "layers": [
            ("body", None),
            ("heads_human_female", None),
            ("feet_shoes_basic", "white"),
            ("legs_pants", "navy"),
            ("torso_clothes_tshirt", "purple"),
            ("hair_ponytail", "blonde"),
        ],
    },
    # NPC da fase 4: colega de trabalho na Hebara.
    "coworker": {
        "body": "teen",
        "anims": ["walk", "sit"],
        "layers": [
            ("body", None),
            ("heads_human_male", None),
            ("feet_shoes_basic", "black"),
            ("legs_pants", "charcoal"),
            ("torso_clothes_shortsleeve_polo", "white"),
            ("hair_parted", "black"),
        ],
    },
    # NPCs da fase 2: os vizinhos que traziam o PC para consertar.
    "neighbor-man": {
        "body": "male",
        "anims": ["walk"],
        "layers": [
            ("body", None),
            ("heads_human_male_elderly", None),
            ("feet_shoes_basic", "brown"),
            ("legs_pants", "gray"),
            ("torso_clothes_shortsleeve_polo", "blue"),
            ("hair_balding", "gray"),
        ],
    },
    "neighbor-woman": {
        "body": "female",
        "anims": ["walk", "sit"],
        "layers": [
            ("body", None),
            ("heads_human_female", None),
            ("feet_shoes_basic", "black"),
            ("legs_skirts_plain", "navy"),
            ("torso_clothes_tshirt", "green"),
            ("hair_bob", "chestnut"),
        ],
    },
    # NPC: o amigo que emprestou a apostila de HTML (fase 1).
    "friend": {
        "body": "teen",
        "anims": ["walk", "sit"],
        "layers": [
            ("body", None),
            ("heads_human_male", None),
            ("feet_shoes_basic", "black"),
            ("legs_pants", "blue"),
            ("torso_clothes_tshirt", "red"),
            ("hair_messy2", "blonde"),
        ],
    },
    "kid": {
        "body": "child",
        "anims": ["walk"],
        "layers": [
            ("body", None),
            ("heads_human_child", None),
            ("legs_childpants", "file:white>tan:cloth"),
            ("torso_clothes_child_shirt", "file:black"),
            ("hair_messy", f"file:brown>{HAIR}:hair"),
        ],
    },
    "teen": {
        "body": "teen",
        "anims": ["walk", "sit"],
        "layers": [
            ("body", None),
            ("heads_human_male", None),
            ("feet_shoes_basic", SHOES),
            ("legs_shorts", SHORTS),
            ("torso_clothes_tshirt", SHIRT),
            ("hair_long", HAIR),
        ],
    },
    "young": {
        "body": "teen",  # corpo mais magro; "male" fica musculoso demais
        "anims": ["walk", "sit"],
        "layers": [
            ("body", None),
            ("heads_human_male", None),
            ("feet_shoes_basic", SHOES),
            ("legs_shorts", SHORTS),
            ("torso_clothes_tshirt", SHIRT),
            ("beards_trimmed", HAIR),
            ("hair_long", HAIR),
        ],
    },
    "mohawk": {
        "body": "teen",  # corpo mais magro; "male" fica musculoso demais
        "anims": ["walk", "sit"],
        "layers": [
            ("body", None),
            ("heads_human_male", None),
            ("feet_shoes_basic", SHOES),
            ("legs_shorts", SHORTS),
            ("torso_clothes_tshirt", SHIRT),
            ("beards_trimmed", HAIR),
            ("hair_high_and_tight", HAIR),
        ],
    },
    "adult": {
        "body": "teen",  # corpo mais magro; "male" fica musculoso demais
        "anims": ["walk", "idle", "sit"],
        "layers": [
            ("body", None),
            ("heads_human_male", None),
            ("feet_shoes_basic", SHOES),
            ("legs_shorts", SHORTS),
            ("torso_clothes_tshirt", SHIRT),
            ("beards_trimmed", HAIR),
            ("hair_buzzcut", HAIR),
        ],
    },
}


def hex_rgb(value):
    value = value.lstrip("#")
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))


# Cores próprias, além das paletas do gerador.
CUSTOM_PALETTES = {
    "hair": {"espresso": ["#000000", "#0B0605", "#170D09", "#24140E", "#331D14", "#45291C"]},
}


class Lpc:
    def __init__(self, root):
        self.root = Path(root)
        self.defs = {p.stem: p for p in (self.root / "sheet_definitions").rglob("*.json")}
        self.palettes = {}

    def definition(self, name):
        return json.loads(self.defs[name].read_text())

    def palette(self, material):
        if material not in self.palettes:
            folder = self.root / "palette_definitions" / material
            meta = json.loads((folder / f"meta_{material}.json").read_text())
            colors = json.loads((folder / f"{material}_ulpc.json").read_text())
            colors.update(CUSTOM_PALETTES.get(material, {}))
            self.palettes[material] = (meta["base"], colors)
        return self.palettes[material]

    def recolor(self, image, material, target, source=None):
        base, colors = self.palette(material)
        source = source or base
        if target == source:
            return image
        mapping = {hex_rgb(a): hex_rgb(b) for a, b in zip(colors[source], colors[target])}
        cache = {}
        pixels = image.load()
        for y in range(image.height):
            for x in range(image.width):
                r, g, b, a = pixels[x, y]
                if a == 0:
                    continue
                if (r, g, b) not in cache:
                    # Algumas folhas usam tons levemente fora da paleta-base
                    # (ex.: #A02600 no lugar de #A42600); usa a cor mais próxima.
                    near = min(mapping, key=lambda c: sum((u - v) ** 2 for u, v in zip(c, (r, g, b))))
                    distance = sum((u - v) ** 2 for u, v in zip(near, (r, g, b))) ** 0.5
                    cache[(r, g, b)] = mapping[near] if distance <= 16 else (r, g, b)
                pixels[x, y] = (*cache[(r, g, b)], a)
        return image

    def remap_by_luminance(self, image, material, target):
        """Recolore folhas já coloridas (sem paleta-base) pela ordem de brilho dos tons."""
        _, colors = self.palette(material)
        palette = [hex_rgb(c) for c in colors[target]]
        luminance = lambda c: 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]
        tones = sorted({px[:3] for px in image.getdata() if px[3] > 0}, key=luminance)
        if not tones:
            return image
        step = (len(palette) - 1) / max(len(tones) - 1, 1)
        mapping = {tone: palette[round(i * step)] for i, tone in enumerate(tones)}
        pixels = image.load()
        for y in range(image.height):
            for x in range(image.width):
                r, g, b, a = pixels[x, y]
                if a:
                    pixels[x, y] = (*mapping[(r, g, b)], a)
        return image

    def layer_image(self, name, body, anim, color):
        definition = self.definition(name)
        layer = definition["layer_1"]
        folder = self.root / "spritesheets" / layer[body]
        material = (definition.get("recolors") or {}).get("material")

        if color and color.startswith("file:"):
            # "file:<variante>[><cor>:<material>]": folha já colorida, opcionalmente recolorida por brilho.
            variant, _, recolor_to = color[5:].partition(">")
            per_anim = folder / anim / f"{variant}.png"
            if per_anim.exists():
                image = Image.open(per_anim).convert("RGBA")
            elif anim == "walk":
                # Folha universal antiga: recorta a caminhada.
                sheet = Image.open(folder / f"{variant}.png").convert("RGBA")
                top = UNIVERSAL_WALK_ROW * FRAME
                image = sheet.crop((0, top, 9 * FRAME, top + 4 * FRAME))
            else:
                return layer["zPos"], None
            if recolor_to:
                target, _, target_material = recolor_to.partition(":")
                image = self.remap_by_luminance(image, target_material, target)
            return layer["zPos"], image

        path = folder / f"{anim}.png"
        if not path.exists():
            return layer["zPos"], None
        image = Image.open(path).convert("RGBA")
        if color and material:
            image = self.recolor(image, material, color)
        return layer["zPos"], image

    def credits(self, name):
        return self.definition(name).get("credits", [])


def build(lpc_root, out_dir, preview_path=None):
    lpc = Lpc(lpc_root)
    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)
    credits = {}
    previews = []

    for variant, spec in VARIANTS.items():
        for anim in spec["anims"]:
            layers = []
            for name, color in spec["layers"]:
                z, image = lpc.layer_image(name, spec["body"], anim, color)
                if image is None:
                    print(f"  aviso: {variant}/{anim} sem a camada {name}")
                    continue
                layers.append((z, image))
                for credit in lpc.credits(name):
                    credits[credit["file"]] = credit
            layers.sort(key=lambda item: item[0])
            width = max(image.width for _, image in layers)
            height = max(image.height for _, image in layers)
            sheet = Image.new("RGBA", (width, height))
            for _, image in layers:
                sheet.alpha_composite(image)
            sheet.save(out / f"{variant}-{anim}.png")
            if anim == "walk":
                # Quadro parado olhando para frente (linha 2 = baixo) e de lado (linha 3 = direita).
                front = sheet.crop((0, 2 * FRAME, FRAME, 3 * FRAME))
                side = sheet.crop((0, 3 * FRAME, FRAME, 4 * FRAME))
                previews.append((variant, front, side))
        print(f"ok {variant}")

    scale = 4
    preview = Image.new("RGBA", (len(previews) * FRAME * scale, 2 * FRAME * scale), (40, 44, 52, 255))
    for i, (_, front, side) in enumerate(previews):
        preview.alpha_composite(front.resize((FRAME * scale, FRAME * scale), Image.NEAREST), (i * FRAME * scale, 0))
        preview.alpha_composite(side.resize((FRAME * scale, FRAME * scale), Image.NEAREST), (i * FRAME * scale, FRAME * scale))
    if preview_path:
        preview.save(preview_path)

    lines = ["file,authors,licenses,urls"]
    for credit in credits.values():
        lines.append(
            ",".join(
                '"' + value.replace('"', "'") + '"'
                for value in (
                    credit["file"],
                    "; ".join(credit.get("authors", [])),
                    "; ".join(credit.get("licenses", [])),
                    "; ".join(credit.get("urls", [])),
                )
            )
        )
    (out / "CREDITS.csv").write_text("\n".join(lines) + "\n")


if __name__ == "__main__":
    build(sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else None)
