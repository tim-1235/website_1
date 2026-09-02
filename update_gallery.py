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
    for idx, f in enumerate(pl_files, 1):
        src = build_image_src(os.path.join("site_photos", "Prints", "Polish", f))
        if src in existing_prints_pl:
            new_pl_list.append(existing_prints_pl[src])
        else:
            title = format_title(f)
            new_pl_list.append({
                "id": f"print-pl-{idx}",
                "src": src,
                "title_pl": title,
                "title_en": title,
                "alt_pl": f"Chrześcijański nadruk {title} – projekt graficzny na koszulkę i bluzę",
                "alt_en": f"Christian print design {title} – graphic design for apparel"
            })

    # 2. English Prints
    en_files = scan_folder(os.path.join("site_photos", "Prints", "English"))
    new_en_list = []
    for idx, f in enumerate(en_files, 1):
        src = build_image_src(os.path.join("site_photos", "Prints", "English", f))
        if src in existing_prints_en:
            new_en_list.append(existing_prints_en[src])
        else:
            title = format_title(f)
            new_en_list.append({
                "id": f"print-en-{idx}",
                "src": src,
                "title_pl": title,
                "title_en": title,
                "alt_pl": f"Chrześcijański nadruk {title} – projekt graficzny na odzież",
                "alt_en": f"Christian print design {title} – custom apparel graphic"
            })

    # 3. Past Work
    past_files = scan_folder(os.path.join("site_photos", "Past Work"))
    new_past_list = []
    for idx, f in enumerate(past_files, 1):
        src = build_image_src(os.path.join("site_photos", "Past Work", f))
        if src in existing_past_work:
            new_past_list.append(existing_past_work[src])
        else:
            title = f"Realizacja {idx}"
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
