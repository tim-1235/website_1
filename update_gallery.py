import os
import json
import re

GALLERY_JSON_PATH = os.path.join("site_photos", "gallery.json")
GALLERY_REPO = os.getenv("GALLERY_REPO", "").strip()
GALLERY_BRANCH = os.getenv("GALLERY_BRANCH", "main").strip() or "main"


def format_title(filename):
    name = os.path.splitext(filename)[0]
    name = re.sub(r'_[0-9]+[a-z0-9]*$', '', name, flags=re.IGNORECASE)
    name = name.replace('_', ' ').strip()
    return name

def extract_text_from_filename(filename):
    """Extract the actual text content from filename for search purposes"""
    name = os.path.splitext(filename)[0]
    # Remove version numbers and suffixes
    name = re.sub(r'_[0-9]+[a-z0-9]*$', '', name, flags=re.IGNORECASE)
    # Replace underscores with spaces for readability
    text_content = name.replace('_', ' ').strip()
    return text_content

def extract_text_from_image(image_path):
    """Extract text from image using OCR"""
    try:
        # Initialize EasyOCR reader (support both Polish and English)
        reader = easyocr.Reader(['pl', 'en'], gpu=False)
        
        # Read text from image
        result = reader.readtext(image_path, detail=0)
        
        # Combine all detected text
        extracted_text = ' '.join(result)
        
        # Clean up the text
        extracted_text = extracted_text.strip()
        
        print(f"OCR result for {os.path.basename(image_path)}: '{extracted_text}'")
        
        return extracted_text if extracted_text else None
    except Exception as e:
        print(f"OCR error for {image_path}: {e}")
        return None


def build_image_src(relative_path):
    relative_path = relative_path.replace("\\", "/")
    if GALLERY_REPO:
        return f"https://raw.githubusercontent.com/{GALLERY_REPO}/{GALLERY_BRANCH}/{relative_path.lstrip('./')}"
    return f"./{relative_path.lstrip('./')}"


def scan_folder(folder_path):
    if not os.path.exists(folder_path):
        return []
    valid_exts = {'.png', '.jpg', '.jpeg', '.webp', '.avif', '.svg'}
    files = [f for f in sorted(os.listdir(folder_path)) if os.path.splitext(f)[1].lower() in valid_exts]
    return files


def normalize_ids(items, prefix):
    seen = set()
    normalized = []
    for idx, item in enumerate(items, 1):
        candidate = f"{prefix}-{idx}"
        while candidate in seen:
            idx += 1
            candidate = f"{prefix}-{idx}"
        seen.add(candidate)
        item["id"] = candidate
        normalized.append(item)
    return normalized


def update_gallery():
    data = {"prints": {"polish": [], "english": []}, "past_work": []}

    if os.path.exists(GALLERY_JSON_PATH):
        try:
            with open(GALLERY_JSON_PATH, "r", encoding="utf-8") as f:
                data = json.load(f)
        except Exception:
            pass

    existing_prints_pl = {item["src"]: item for item in data.get("prints", {}).get("polish", [])}
    existing_prints_en = {item["src"]: item for item in data.get("prints", {}).get("english", [])}
    existing_past_work = {item["src"]: item for item in data.get("past_work", [])}

    # 1. Polish Prints
    pl_files = scan_folder(os.path.join("site_photos", "Prints", "Polish"))
    new_pl_list = []
    print_number = 1
    for idx, f in enumerate(pl_files, 1):
        src = build_image_src(os.path.join("site_photos", "Prints", "Polish", f))
        title_pl = f"Wzór {print_number}"
        title_en = f"Print {print_number}"
        image_path = os.path.join("site_photos", "Prints", "Polish", f)
        
        text_content = extract_text_from_filename(f)
        
        new_pl_list.append({
            "id": f"print-pl-{idx}",
            "src": src,
            "title_pl": title_pl,
            "title_en": title_en,
            "text_content": text_content,
            "alt_pl": f"Chrześcijański nadruk {title_pl} – projekt graficzny na koszulkę i bluzę",
            "alt_en": f"Christian print design {title_en} – graphic design for apparel"
        })
        print_number += 1

    # 2. English Prints
    en_files = scan_folder(os.path.join("site_photos", "Prints", "English"))
    new_en_list = []
    for idx, f in enumerate(en_files, 1):
        src = build_image_src(os.path.join("site_photos", "Prints", "English", f))
        title_pl = f"Wzór {print_number}"
        title_en = f"Print {print_number}"
        image_path = os.path.join("site_photos", "Prints", "English", f)
        
        text_content = extract_text_from_filename(f)
        
        new_en_list.append({
            "id": f"print-en-{idx}",
            "src": src,
            "title_pl": title_pl,
            "title_en": title_en,
            "text_content": text_content,
            "alt_pl": f"Chrześcijański nadruk {title_pl} – projekt graficzny na odzież",
            "alt_en": f"Christian print design {title_en} – custom apparel graphic"
        })
        print_number += 1

    # 3. Past Work
    past_files = scan_folder(os.path.join("site_photos", "Past Work"))
    new_past_list = []
    for idx, f in enumerate(past_files, 1):
        src = build_image_src(os.path.join("site_photos", "Past Work", f))
        title = f"Realizacja {idx}"
        if src in existing_past_work:
            item = existing_past_work[src]
            # Keep existing titles for past work but ensure ids exist
            item.setdefault("title_pl", title)
            item.setdefault("title_en", f"Work {idx}")
            new_past_list.append(item)
        else:
            new_past_list.append({
                "id": f"work-{idx}",
                "src": src,
                "title_pl": title,
                "title_en": f"Work {idx}",
                "alt_pl": f"Zdjęcie chrześcijańskiego nadruku na odzieży – realizacja {title} Tymofii Pryimak",
                "alt_en": f"Photo of Christian print on apparel – project {idx} by Tymofii Pryimak"
            })

    gallery = {
        "prints": {
            "polish": normalize_ids(new_pl_list, "print-pl"),
            "english": normalize_ids(new_en_list, "print-en")
        },
        "past_work": normalize_ids(new_past_list, "work")
    }

    with open(GALLERY_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(gallery, f, indent=2, ensure_ascii=False)

    print(f"Updated {GALLERY_JSON_PATH} successfully:")
    print(f" - Polish Prints: {len(new_pl_list)}")
    print(f" - English Prints: {len(new_en_list)}")
    print(f" - Past Work: {len(new_past_list)}")


if __name__ == "__main__":
    update_gallery()
