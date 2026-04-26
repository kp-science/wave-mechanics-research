---
description: Register แผนใน content/physics3/media.js
argument-hint: <waves|SHM> <N>
---
# /web-reg-media

## งาน
เพิ่ม entry N ใน `content/physics3/media.js`:
```js
N: {
  folder: 'lessons/physics3/<subject>/แผนNN_<slug>/',
  title: 'แผน N — <หัวข้อ>',
  meta: 'ว30203 · ม.5 · คาบ X-X+1 · ว2.1 ม.5/X',
  sections: [...],
  linkOut: [...]
}
```

## Reference
- Schema: memory `reference_plan_pipeline_checklist` Step 6e
- ⚠️ CER info-card ไม่มี `file:` field

## Token budget
- อ่าน entry N-1 · Edit เพิ่มใหม่ · ≤40 คำ
