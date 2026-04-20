#!/usr/bin/env python3
"""
Crop baked-in semicircle decorations from Webflow illustration images.

Many Webflow CDN images used in FeatureFrame sections have decorative
semicircles baked into the bottom-left or bottom-right corners. This script
crops them out so the images fit cleanly inside their container divs.

Usage:
  # Crop a single image (auto-detect semicircle position)
  python3 scripts/crop-illustrations.py input.webp output.webp

  # Crop with explicit percentages
  python3 scripts/crop-illustrations.py input.webp output.webp --bottom 15 --right 5

  # Batch mode: crop all images listed in a JSON config
  python3 scripts/crop-illustrations.py --batch config.json

  # Generate a config template from a directory of images
  python3 scripts/crop-illustrations.py --generate-config /path/to/images

JSON config format (for --batch):
  [
    {
      "input": "https://cdn.prod.website-files.com/.../image.webp",
      "output": "public/assets/screenshots/image.webp",
      "bottom": 15,
      "right": 5
    }
  ]

  - "input" can be a URL (downloaded automatically) or a local file path
  - "bottom" / "right" are crop percentages (0-30)
  - If omitted, defaults are bottom=15, right=0

Typical crop values by semicircle position:
  - Bottom-left semicircle:  bottom=15-18%, right=0%
  - Bottom-right semicircle: bottom=15-18%, right=5-8%
"""

import argparse
import json
import os
import sys
import tempfile
import urllib.request
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Error: Pillow is required. Install with: pip install Pillow")
    sys.exit(1)


def download_if_url(source: str) -> str:
    """If source is a URL, download to a temp file and return its path."""
    if source.startswith("http://") or source.startswith("https://"):
        suffix = Path(source.split("?")[0]).suffix or ".webp"
        tmp = tempfile.NamedTemporaryFile(suffix=suffix, delete=False)
        print(f"  Downloading {source[:80]}...")
        urllib.request.urlretrieve(source, tmp.name)
        return tmp.name
    return source


def crop_image(
    input_path: str,
    output_path: str,
    bottom_pct: float = 15,
    right_pct: float = 0,
    quality: int = 90,
) -> dict:
    """
    Crop an image by removing a percentage from the bottom and right edges.

    Returns dict with original and cropped dimensions.
    """
    local_path = download_if_url(input_path)

    img = Image.open(local_path)
    w, h = img.size

    new_w = int(w * (1 - right_pct / 100))
    new_h = int(h * (1 - bottom_pct / 100))

    cropped = img.crop((0, 0, new_w, new_h))

    # Ensure output directory exists
    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)

    cropped.save(output_path, quality=quality)

    # Clean up temp file if we downloaded
    if local_path != input_path and os.path.exists(local_path):
        os.unlink(local_path)

    result = {
        "input": input_path,
        "output": output_path,
        "original": f"{w}x{h}",
        "cropped": f"{new_w}x{new_h}",
        "bottom_pct": bottom_pct,
        "right_pct": right_pct,
    }
    print(f"  {os.path.basename(output_path)}: {w}x{h} -> {new_w}x{new_h} "
          f"(bottom={bottom_pct}%, right={right_pct}%)")
    return result


def batch_crop(config_path: str):
    """Process a batch of images from a JSON config file."""
    with open(config_path) as f:
        items = json.load(f)

    print(f"Processing {len(items)} images...\n")
    results = []
    for item in items:
        result = crop_image(
            input_path=item["input"],
            output_path=item["output"],
            bottom_pct=item.get("bottom", 15),
            right_pct=item.get("right", 0),
        )
        results.append(result)

    print(f"\nDone! {len(results)} images cropped.")
    return results


def generate_config(directory: str):
    """Generate a template JSON config for all images in a directory."""
    exts = {".png", ".jpg", ".jpeg", ".webp"}
    images = sorted(
        p for p in Path(directory).iterdir()
        if p.suffix.lower() in exts
    )
    config = []
    for img in images:
        config.append({
            "input": str(img),
            "output": str(img),
            "bottom": 15,
            "right": 0,
        })
    print(json.dumps(config, indent=2))


def main():
    parser = argparse.ArgumentParser(
        description="Crop semicircle decorations from Webflow illustration images."
    )
    parser.add_argument("input", nargs="?", help="Input image path or URL")
    parser.add_argument("output", nargs="?", help="Output image path")
    parser.add_argument("--bottom", type=float, default=15,
                        help="Percentage to crop from bottom (default: 15)")
    parser.add_argument("--right", type=float, default=0,
                        help="Percentage to crop from right (default: 0)")
    parser.add_argument("--quality", type=int, default=90,
                        help="Output image quality (default: 90)")
    parser.add_argument("--batch", type=str,
                        help="Path to JSON config for batch processing")
    parser.add_argument("--generate-config", type=str,
                        help="Generate a template config from a directory")

    args = parser.parse_args()

    if args.generate_config:
        generate_config(args.generate_config)
    elif args.batch:
        batch_crop(args.batch)
    elif args.input and args.output:
        crop_image(args.input, args.output, args.bottom, args.right, args.quality)
    else:
        parser.print_help()
        sys.exit(1)


if __name__ == "__main__":
    main()
