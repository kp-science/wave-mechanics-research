---
description: Register แผนใน content/physics3/worksheets.js
argument-hint: <waves|SHM> <N>
---
# /web-reg-worksheet

## งาน
เพิ่ม entry `N: {...}` ใน `content/physics3/worksheets.js`:
```js
N: {
  poe:  { title, description, viewFile, submitLabel, sheetPrefix, misconception, allowUpload, hero },
  calc: { title, description, viewFile, submitLabel, sheetPrefix, allowUpload },
  spot: { title, description, viewFile, submitLabel, sheetPrefix, allowUpload },
  cer:  { id, title, description, columns, allowImage, sheetPrefix }
}
```

## Reference
- Schema spec: memory `reference_plan_pipeline_checklist` Step 6c
- ⚠️ CER ไม่ใส่ `file:` field

## Token budget
- อ่านไฟล์แค่ entry ก่อนหน้า (N-1) เพื่อ match format
- Edit เพิ่มเฉพาะ entry ใหม่
- ≤40 คำ
