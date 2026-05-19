from __future__ import annotations

import json
from pathlib import Path

import numpy as np
from PIL import Image


SUPPORTED_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".bmp", ".gif"}
OUTPUT_DIRNAME = "裁黑边"
ROW_MEAN_THRESHOLD = 10
ROW_STD_THRESHOLD = 10
MIN_BORDER_RATIO = 0.04
MIN_BORDER_PIXELS = 30


def is_black_band(line: np.ndarray) -> bool:
    return float(line.mean()) <= ROW_MEAN_THRESHOLD and float(line.std()) <= ROW_STD_THRESHOLD


def scan_top(arr: np.ndarray) -> int:
    count = 0
    for row in arr:
        if is_black_band(row):
            count += 1
        else:
            break
    return count


def scan_bottom(arr: np.ndarray) -> int:
    count = 0
    for row in arr[::-1]:
        if is_black_band(row):
            count += 1
        else:
            break
    return count


def scan_left(arr: np.ndarray) -> int:
    count = 0
    for col in np.moveaxis(arr, 1, 0):
        if is_black_band(col):
            count += 1
        else:
            break
    return count


def scan_right(arr: np.ndarray) -> int:
    count = 0
    for col in np.moveaxis(arr, 1, 0)[::-1]:
        if is_black_band(col):
            count += 1
        else:
            break
    return count


def normalized_border(value: int, length: int) -> int:
    minimum = max(MIN_BORDER_PIXELS, round(length * MIN_BORDER_RATIO))
    return value if value >= minimum else 0


def detect_crop_box(image: Image.Image) -> tuple[int, int, int, int]:
    arr = np.asarray(image.convert("RGB"), dtype=np.uint8)
    height, width = arr.shape[:2]

    top = normalized_border(scan_top(arr), height)
    bottom = normalized_border(scan_bottom(arr), height)
    left = normalized_border(scan_left(arr), width)
    right = normalized_border(scan_right(arr), width)

    if top + bottom >= height:
        top = bottom = 0
    if left + right >= width:
        left = right = 0

    return left, top, width - right, height - bottom


def iter_source_images(root: Path, output_root: Path):
    for path in root.rglob("*"):
      if not path.is_file():
          continue
      if path.suffix.lower() not in SUPPORTED_EXTENSIONS:
          continue
      if output_root in path.parents:
          continue
      if ".preview" in path.parts:
          continue
      yield path


def main() -> None:
    root = Path.cwd()
    output_root = root / OUTPUT_DIRNAME
    output_root.mkdir(exist_ok=True)

    report: list[dict[str, object]] = []

    for source in sorted(iter_source_images(root, output_root)):
        relative = source.relative_to(root)
        destination = output_root / relative
        destination.parent.mkdir(parents=True, exist_ok=True)

        with Image.open(source) as image:
            left, top, right, bottom = detect_crop_box(image)
            cropped = image.crop((left, top, right, bottom))
            cropped.save(destination)

            report.append(
                {
                    "source": str(relative),
                    "output": str(destination.relative_to(root)),
                    "original_size": list(image.size),
                    "cropped_size": [right - left, bottom - top],
                    "crop_box": [left, top, right, bottom],
                    "changed": [left, top, right, bottom] != [0, 0, image.size[0], image.size[1]],
                }
            )

    changed_count = sum(1 for item in report if item["changed"])
    report_path = output_root / "report.json"
    report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"已处理 {len(report)} 张图片")
    print(f"检测并裁切 {changed_count} 张图片")
    print(f"输出目录: {output_root}")
    print(f"报告文件: {report_path}")


if __name__ == "__main__":
    main()
