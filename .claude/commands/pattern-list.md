---
description: แสดง patterns ทั้งหมดใน .claude/patterns/
---
# /pattern-list

## งาน
1. `ls .claude/patterns/`
2. อ่าน `manifest.md` frontmatter ของแต่ละ pattern (เฉพาะ 10 บรรทัดแรก)
3. แสดง tree: base patterns → forks

## Output format
```
📦 Available patterns:
├── astronomy-game   (base · game)      — COSMOS LOG style
│   └── bio-exploration  (fork)         — CELL LOG variant
└── wave-5e-poe      (base · lesson-plan) — ฟิสิกส์ 5E+POE
```

## Token budget
- อ่าน frontmatter เท่านั้น · ไม่อ่านเนื้อ manifest
- ≤80 คำ
