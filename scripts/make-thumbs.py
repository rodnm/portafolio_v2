#!/usr/bin/env python3
"""Builds the public thumbnails of credentials from the private originals.

Usage: python3 -I scripts/make-thumbs.py <docs-root>

Only page 1 of each document is rendered. Any word on that page that looks like a
personal identifier (8 digits, e.g. a DNI or a student code, or a Peruvian phone)
is covered with a solid box, using the PDF's own word positions. Image files
(PNG/JPEG certificates) carry no text layer and are only resized.
Requires poppler-utils (pdftoppm, pdftotext) and Pillow.
"""
import re
import subprocess
import sys
import tempfile
from pathlib import Path
from xml.etree import ElementTree

from PIL import Image, ImageDraw

WIDTH = 640
QUALITY = 70
DPI = 110
OUT = Path(__file__).resolve().parent.parent / "src/assets/generated/credentials"
SENSITIVE = re.compile(r"\d{8}|9\d{2}\s?\d{3}\s?\d{3}")

# thumbnail id -> glob under the docs root (globs never spell out file names with personal data)
SOURCES = {
    "dsrp-ai": "Certificaciones/Institutos/Data Science Research Peru/*LLM Y RAGS*.pdf",
    "dsrp-data-eng": "Certificaciones/Institutos/Data Science Research Peru/*Apache Airflow*.pdf",
    "dsrp-foundations": "Certificaciones/Institutos/Data Science Research Peru/*Estad*stica Descriptiva*.pdf",
    "dsrp-summit": "Certificaciones/Institutos/Data Science Research Peru/*SUMMIT*.pdf",
    "lds-python": "Certificaciones/Institutos/LABORATORIO DE DATOS SOCIALES/Python*.pdf",
    "lds-sql": "Certificaciones/Institutos/LABORATORIO DE DATOS SOCIALES/SQL*.pdf",
    "lds-models": "Certificaciones/Institutos/LABORATORIO DE DATOS SOCIALES/Modelos*.pdf",
    "lasai-2025": "Certificaciones/UNMSM/0000393-*.pdf",
    "unmsm-finance": "Certificaciones/UNMSM/0000183-*.pdf",
    "udemy-research": "Certificaciones/Udemy/Programming for Scientific Research*.pdf",
    "udemy-canva": "Certificaciones/Udemy/Canva*.pdf",
    "infopuc-python-ml": "Certificaciones/PUCP/InfoPUC/Certificado2021-*.pdf",
    "infopuc-vba": "Certificaciones/PUCP/InfoPUC/Certificado2020-345-B-0000997-*.pdf",
    "infopuc-sheets": "Certificaciones/PUCP/InfoPUC/Certificado2020-345-B-0000244-*.pdf",
    "coursera-py4e": "Certificaciones/Coursera/*V2DVU3RRVYF4.jpeg",
    "coursera-ds-python": "Certificaciones/Coursera/*BDTXFPWJASRE.jpeg",
    "coursera-matlab": "Certificaciones/Coursera/*RWCZPQ98HWC7.jpeg",
    "iddea-r": "Certificaciones/Institutos/CONSTANCIA Iddea*.pdf",
    "qlab-ws-2026": "Certificaciones/PUCP/QLAB/Winter School 2026/*-0001435-*.pdf",
    "qlab-ws-2025": "Certificaciones/PUCP/QLAB/Winter School 2025/*-0000649-*.pdf",
    "qlab-ts-2023": "Certificaciones/PUCP/QLAB/Taller/*.pdf",
    "pucp-stata": "Certificaciones/PUCP/FACULTAD DE CIENCIAS SOCIALES (FCCSS)/*STATA.pdf",
    "pucp-arcgis": "Certificaciones/PUCP/FACULTAD DE CIENCIAS SOCIALES (FCCSS)/*ArcGIS.pdf",
    "pucp-coil": "Certificaciones/PUCP/FACULTAD DE CIENCIAS SOCIALES (FCCSS)/*COIL*.pdf",
    "proimpacto": "Certificaciones/Institutos/Certificado Proimpacto*.pdf",
    "netcram": "Certificaciones/Institutos/NETCRAM/*.pdf",
    "escuela-global": "Certificaciones/Institutos/Escuela Global/*/GNRAL-*.pdf",
    "skill-sqlserver": "Certificaciones/Institutos/Skill/*.pdf",
    "revista-powerbi": "Certificaciones/PUCP/Revista Econ*mica/Certificado-Curso*.pdf",
    "revista-award": "Certificaciones/PUCP/Revista Econ*mica/2024-1*.pdf",
    "revista-volunteer": "Certificaciones/PUCP/Revista Econ*mica/Constancia de voluntariado*.pdf",
    "cide-blockchain": "Certificaciones/PUCP/CIDE PUCP/Blockchain*.pdf",
    "invalor": "Certificaciones/Institutos/CONSTANCIA InValor*.pdf",
    "idiomas-english": "Certificaciones/Idiomas/*.pdf",
    "ieee-cs-agentic": "Certificaciones/IEEE CS PUCP/*.pdf",
    "ieee-upc-codeflowers": "Certificaciones/IEEE UPC/*.png",
    "pucp-conf-wolfram": "Certificaciones/PUCP/Conferencias/*-0000869-*.pdf",
    "pucp-conf-nasa": "Certificaciones/PUCP/Conferencias/*-0001049-*.pdf",
    "pucp-sports-day": "Certificaciones/PUCP/Selecci*n de Deportes PUCP/*Deporte Universitario.pdf",
    "pucp-kungfu": "Certificaciones/PUCP/Selecci*n de Deportes PUCP/*Kung Fu Wushu.pdf",
    "pucp-bachelor": "Diplomas de grado/Bachiller*.pdf",
    "qiskit-2026": "Hackathones/*/*_Certificate.png",
    "oefa-2025": "Datathones/*OEFA*.pdf",
    "sunass-2025": "Datathones/*SUNASS*.pdf",
    "pcm-2024": "Datathones/Expresate*.pdf",
    "innovation-2020": "Certificaciones/PUCP/FACULTAD DE GESTI*N Y ALTA DIRECCI*N/*.pdf",
}


def sensitive_boxes(pdf: Path) -> list[tuple[float, float, float, float]]:
    xml = subprocess.run(
        ["pdftotext", "-f", "1", "-l", "1", "-bbox", str(pdf), "-"],
        check=True, capture_output=True, text=True,
    ).stdout
    root = ElementTree.fromstring(re.sub(r"<!DOCTYPE[^>]*>", "", xml))
    scale = DPI / 72
    boxes = []
    for word in root.iter("{http://www.w3.org/1999/xhtml}word"):
        if SENSITIVE.search(word.text or ""):
            boxes.append(tuple(float(word.get(k)) * scale for k in ("xMin", "yMin", "xMax", "yMax")))
    return boxes


def render(src: Path) -> tuple[Image.Image, int]:
    if src.suffix.lower() != ".pdf":
        return Image.open(src).convert("RGB"), 0
    with tempfile.TemporaryDirectory() as tmp:
        stem = Path(tmp) / "page"
        subprocess.run(["pdftoppm", "-f", "1", "-l", "1", "-r", str(DPI), "-png", "-singlefile", str(src), str(stem)], check=True)
        image = Image.open(f"{stem}.png").convert("RGB")
    boxes = sensitive_boxes(src)
    draw = ImageDraw.Draw(image)
    for x0, y0, x1, y1 in boxes:
        draw.rectangle((x0 - 4, y0 - 3, x1 + 4, y1 + 3), fill="black")
    return image, len(boxes)


def main() -> None:
    root = Path(sys.argv[1]).resolve()
    OUT.mkdir(parents=True, exist_ok=True)
    for thumb, pattern in SOURCES.items():
        matches = sorted(root.glob(pattern))
        if len(matches) != 1:
            sys.exit(f"{thumb}: expected 1 match for {pattern!r}, found {len(matches)}")
        image, redacted = render(matches[0])
        if image.width > WIDTH:
            image = image.resize((WIDTH, round(image.height * WIDTH / image.width)), Image.LANCZOS)
        target = OUT / f"{thumb}.webp"
        image.save(target, "WEBP", quality=QUALITY, method=6)
        note = f"  ({redacted} redacted)" if redacted else ""
        print(f"{thumb}.webp  {target.stat().st_size // 1024} KB{note}")


if __name__ == "__main__":
    main()
