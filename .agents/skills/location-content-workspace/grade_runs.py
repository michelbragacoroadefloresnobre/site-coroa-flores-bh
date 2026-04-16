#!/usr/bin/env python3
"""Grade location-content skill outputs against assertions."""

import json
import os
import re
import sys

WORKSPACE = os.path.dirname(os.path.abspath(__file__))
ITERATION = os.path.join(WORKSPACE, "iteration-1")

EVALS = [
    {
        "dir": "eval-cemiterio-saudade-campinas",
        "expected_article": "no",
        "location_type": "cemetery",
    },
    {
        "dir": "eval-funeraria-prever-uberlandia",
        "expected_article": "na",
        "location_type": "funeral-home",
    },
    {
        "dir": "eval-crematorio-metropolitano-curitiba",
        "expected_article": "no",
        "location_type": "crematory",
    },
]

RUNS = ["with_skill", "without_skill"]


def count_words(text: str) -> int:
    return len(text.split())


def get_all_text(data: dict) -> str:
    parts = [data.get("introduction", "")]
    for section in data.get("infoSections", []):
        parts.append(section.get("title", ""))
        parts.extend(section.get("paragraphs", []))
    for section in data.get("tributeSections", []):
        parts.append(section.get("title", ""))
        parts.extend(section.get("paragraphs", []))
    return " ".join(parts)


def grade_output(filepath: str, eval_config: dict) -> list:
    results = []

    # Try to parse JSON
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
        results.append({"text": "valid-json", "passed": True, "evidence": "JSON parsed successfully"})
    except (json.JSONDecodeError, FileNotFoundError) as e:
        results.append({"text": "valid-json", "passed": False, "evidence": str(e)})
        return results

    # All fields present
    required = ["slug", "name", "city", "uf", "title", "introduction", "infoSections", "tributeSections"]
    missing = [f for f in required if f not in data]
    results.append({
        "text": "all-fields-present",
        "passed": len(missing) == 0,
        "evidence": f"Missing: {missing}" if missing else "All 8 fields present"
    })

    # Slug format
    slug = data.get("slug", "")
    slug_ok = bool(re.match(r'^[a-z0-9-]+$', slug)) and slug == slug.lower()
    results.append({
        "text": "slug-format",
        "passed": slug_ok,
        "evidence": f"Slug: '{slug}' - {'valid' if slug_ok else 'invalid format'}"
    })

    # Title length
    title = data.get("title", "")
    title_len = len(title)
    results.append({
        "text": "title-length",
        "passed": 50 <= title_len <= 63,
        "evidence": f"Title length: {title_len} chars (target: 50-63)"
    })

    # Meta description boundary (first 152 chars)
    intro = data.get("introduction", "")
    if len(intro) > 155:
        first_152 = intro[:152]
        # Check if it ends at a word boundary (not mid-word)
        ends_at_boundary = first_152[-1] in ".!?,;: " or (len(intro) > 152 and intro[152] in " .!?,;:")
        results.append({
            "text": "meta-description-boundary",
            "passed": ends_at_boundary,
            "evidence": f"First 152 chars end with: '...{first_152[-20:]}' -> {'word boundary' if ends_at_boundary else 'mid-word cut'}"
        })
    else:
        results.append({
            "text": "meta-description-boundary",
            "passed": True,
            "evidence": f"Introduction is {len(intro)} chars (under 155, no cut needed)"
        })

    # infoSections count
    info_count = len(data.get("infoSections", []))
    results.append({
        "text": "info-sections-count",
        "passed": info_count == 3,
        "evidence": f"infoSections count: {info_count} (expected: 3)"
    })

    # tributeSections count
    tribute_count = len(data.get("tributeSections", []))
    results.append({
        "text": "tribute-sections-count",
        "passed": tribute_count == 3,
        "evidence": f"tributeSections count: {tribute_count} (expected: 3)"
    })

    # Word count
    all_text = get_all_text(data)
    wc = count_words(all_text)
    results.append({
        "text": "word-count-500",
        "passed": wc >= 500,
        "evidence": f"Word count: {wc} (minimum: 500)"
    })

    # No em dashes
    em_dash_count = all_text.count("—")
    results.append({
        "text": "no-em-dashes",
        "passed": em_dash_count == 0,
        "evidence": f"Em dash count: {em_dash_count}"
    })

    # Disclaimer present
    tribute_sections = data.get("tributeSections", [])
    if tribute_sections:
        last_section = tribute_sections[-1]
        last_paragraphs = last_section.get("paragraphs", [])
        if last_paragraphs:
            last_para = last_paragraphs[-1]
            has_disclaimer = "não possuímos nenhum vínculo" in last_para or "nosso serviço é independente" in last_para.lower()
            results.append({
                "text": "disclaimer-present",
                "passed": has_disclaimer,
                "evidence": f"Last paragraph contains disclaimer: {has_disclaimer}"
            })
        else:
            results.append({"text": "disclaimer-present", "passed": False, "evidence": "No paragraphs in last tribute section"})
    else:
        results.append({"text": "disclaimer-present", "passed": False, "evidence": "No tribute sections"})

    # Correct article (no/na)
    expected = eval_config["expected_article"]
    delivery_title = ""
    for section in tribute_sections:
        if "entrega" in section.get("title", "").lower():
            delivery_title = section["title"]
            break

    if delivery_title:
        has_correct = f" {expected} " in delivery_title.lower() or delivery_title.lower().startswith(f"entrega de flores {expected} ") or f" {expected} " in delivery_title.lower()
        # More flexible check
        if expected == "na":
            has_correct = " na " in delivery_title.lower() or delivery_title.lower().endswith(" na " + data.get("name", "").lower())
        else:
            has_correct = " no " in delivery_title.lower()
        results.append({
            "text": "correct-article",
            "passed": has_correct,
            "evidence": f"Delivery title: '{delivery_title}' - expected article '{expected}'"
        })
    else:
        results.append({"text": "correct-article", "passed": False, "evidence": "No delivery section found"})

    # Four flowers
    flower_section = None
    for section in tribute_sections:
        title_lower = section.get("title", "").lower()
        if "flores" in title_lower and ("significado" in title_lower or "significados" in title_lower):
            flower_section = section
            break

    if flower_section:
        flower_count = len(flower_section.get("paragraphs", []))
        results.append({
            "text": "four-flowers",
            "passed": flower_count == 4,
            "evidence": f"Flower paragraphs: {flower_count} (expected: 4)"
        })
    else:
        results.append({"text": "four-flowers", "passed": False, "evidence": "No flower meanings section found"})

    # Cremation mentioned (only for crematory type)
    if eval_config["location_type"] == "crematory":
        cremation_count = all_text.lower().count("cremação") + all_text.lower().count("cremacao")
        results.append({
            "text": "cremation-mentioned",
            "passed": cremation_count >= 1,
            "evidence": f"'cremação' mentioned {cremation_count} times"
        })

    # No exclamation marks (tone check)
    excl_count = all_text.count("!")
    results.append({
        "text": "natural-tone-no-exclamations",
        "passed": excl_count == 0,
        "evidence": f"Exclamation marks: {excl_count}"
    })

    # Keyword frequency: location name
    name = data.get("name", "")
    name_count = all_text.lower().count(name.lower()) if name else 0
    results.append({
        "text": "keyword-location-name-6x",
        "passed": name_count >= 6,
        "evidence": f"'{name}' appears {name_count} times (minimum: 6)"
    })

    # Keyword frequency: city name
    city = data.get("city", "")
    city_count = all_text.lower().count(city.lower()) if city else 0
    results.append({
        "text": "keyword-city-3x",
        "passed": city_count >= 3,
        "evidence": f"'{city}' appears {city_count} times (minimum: 3)"
    })

    # Keyword frequency: "coroa de flores"
    cdf_count = all_text.lower().count("coroa de flores") + all_text.lower().count("coroas de flores")
    results.append({
        "text": "keyword-coroa-de-flores-4x",
        "passed": cdf_count >= 4,
        "evidence": f"'coroa(s) de flores' appears {cdf_count} times (minimum: 4)"
    })

    return results


def main():
    all_results = {}

    for eval_config in EVALS:
        eval_dir = eval_config["dir"]
        for run_type in RUNS:
            # Find the JSON file
            output_dir = os.path.join(ITERATION, eval_dir, run_type, "outputs")
            json_files = [f for f in os.listdir(output_dir) if f.endswith(".json")] if os.path.exists(output_dir) else []

            if not json_files:
                print(f"SKIP: {eval_dir}/{run_type} - no output file")
                continue

            filepath = os.path.join(output_dir, json_files[0])
            run_id = f"{eval_dir}-{run_type}"

            grades = grade_output(filepath, eval_config)

            grading = {
                "run_id": run_id,
                "expectations": grades,
                "pass_rate": sum(1 for g in grades if g["passed"]) / len(grades) if grades else 0,
                "total": len(grades),
                "passed": sum(1 for g in grades if g["passed"]),
                "failed": sum(1 for g in grades if not g["passed"]),
            }

            all_results[run_id] = grading

            # Save grading.json
            grading_path = os.path.join(ITERATION, eval_dir, run_type, "grading.json")
            with open(grading_path, "w", encoding="utf-8") as f:
                json.dump(grading, f, indent=2, ensure_ascii=False)

            # Print summary
            status = "PASS" if grading["failed"] == 0 else "FAIL"
            print(f"{status}: {run_id} — {grading['passed']}/{grading['total']} assertions passed ({grading['pass_rate']:.0%})")

            for g in grades:
                icon = "✓" if g["passed"] else "✗"
                print(f"  {icon} {g['text']}: {g['evidence']}")
            print()

    # Print comparison summary
    print("=" * 60)
    print("COMPARISON SUMMARY")
    print("=" * 60)
    for eval_config in EVALS:
        eval_dir = eval_config["dir"]
        ws = all_results.get(f"{eval_dir}-with_skill", {})
        wo = all_results.get(f"{eval_dir}-without_skill", {})
        ws_rate = ws.get("pass_rate", 0)
        wo_rate = wo.get("pass_rate", 0)
        delta = ws_rate - wo_rate
        print(f"{eval_dir}:")
        print(f"  With skill:    {ws.get('passed', 0)}/{ws.get('total', 0)} ({ws_rate:.0%})")
        print(f"  Without skill: {wo.get('passed', 0)}/{wo.get('total', 0)} ({wo_rate:.0%})")
        print(f"  Delta:         {delta:+.0%}")
        print()


if __name__ == "__main__":
    main()
