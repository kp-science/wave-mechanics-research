---
description: Register Four-tier questions ใน content/physics3/questions.js
argument-hint: <waves|SHM> <N>
---
# /web-reg-question

## งาน
เพิ่ม array N ใน `content/physics3/questions.js`:
```js
N: [
  { misc:'M_N.1', stem:'...', opts:{ก,ข,ค,ง}, reasons:[1,2,3,4], key:{t1:'ก',t3:'1'} },
  { misc:'M_N.2', ... },
  { misc:'M_N.3', ... }
]
```

## Required
- 3 ข้อ (1 ต่อ misconception)
- Distractors map กับ M_N.1, M_N.2, M_N.3 จาก Infographic

## Token budget
- อ่าน entry N-1 · Edit เพิ่ม · ≤40 คำ
