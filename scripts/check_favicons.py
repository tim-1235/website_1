import os
import struct
import xml.etree.ElementTree as ET
from PIL import Image

def verify():
    errors = []

    # 1. Check favicon.svg
    if not os.path.exists('favicon.svg'):
        errors.append("favicon.svg does not exist")
    else:
        tree = ET.parse('favicon.svg')
        root = tree.getroot()
        w = root.attrib.get('width')
        h = root.attrib.get('height')
        if w != '35' or h != '35':
            errors.append(f"favicon.svg dimensions expected 35x35, got width='{w}', height='{h}'")

    # 2. Check favicon.ico (4 sizes)
    if not os.path.exists('favicon.ico'):
        errors.append("favicon.ico does not exist")
    else:
        with open('favicon.ico', 'rb') as f:
            data = f.read(6)
            if len(data) < 6:
                errors.append("favicon.ico file is invalid")
            else:
                reserved, ico_type, count = struct.unpack('<HHH', data)
                if count != 4:
                    errors.append(f"favicon.ico expected 4 icons in ICO header, got {count}")

    # 3. Check desktop PNG 96x96
    if os.path.exists('favicon-96.png'):
        errors.append("favicon-96.png exists, but requirement states 'There is no 96x96 desktop PNG favicon'")

    # 4. Check apple-touch-icon.png
    if not os.path.exists('apple-touch-icon.png'):
        errors.append("apple-touch-icon.png does not exist")
    else:
        im = Image.open('apple-touch-icon.png')
        if im.size != (180, 180):
            errors.append(f"apple-touch-icon.png expected (180, 180), got {im.size}")

    # 5. Check manifests
    for manifest_file in ['site.webmanifest', 'manifest.json']:
        if os.path.exists(manifest_file):
            errors.append(f"{manifest_file} exists, but requirement states 'No web app manifest'")

    # 6. Check index.html declarations
    if os.path.exists('index.html'):
        with open('index.html', 'r', encoding='utf-8') as f:
            content = f.read()

        if 'rel="manifest"' in content or 'rel="site.webmanifest"' in content:
            errors.append("index.html contains link to web app manifest")

        if '<meta name="apple-mobile-web-app-title" content="Tymofii Pryimak">' not in content:
            errors.append("index.html missing or incorrect apple-mobile-web-app-title meta tag")

        if 'favicon-96.png' in content:
            errors.append("index.html links to favicon-96.png")

        if 'favicon.svg' not in content:
            errors.append("index.html does not declare SVG favicon")

        if 'apple-touch-icon' not in content:
            errors.append("index.html does not declare apple-touch-icon")

    if errors:
        print("VERIFICATION FAILED:")
        for err in errors:
            print(" -", err)
        return False
    else:
        print("ALL VERIFICATIONS PASSED!")
        return True

if __name__ == '__main__':
    verify()
