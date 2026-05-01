# API Quick Reference

## Base URL
```
http://127.0.0.1:5000/api
```

## Endpoints Summary

| Method | Endpoint | Purpose | Body |
|--------|----------|---------|------|
| POST | `/stack/push` | Tambah elemen | `{"value": "string"}` |
| POST | `/stack/pop` | Hapus elemen teratas | None |
| GET | `/stack/peek` | Lihat elemen teratas | None |
| POST | `/stack/clear` | Kosongkan stack | None |
| GET | `/stack/status` | Get status | None |
| POST | `/stack/reset` | Reset semua | None |

---

## Detailed Endpoints

### 1. Push
```bash
curl -X POST http://127.0.0.1:5000/api/stack/push \
  -H "Content-Type: application/json" \
  -d '{"value": "hello"}'
```

**Response:**
```json
{
  "success": true,
  "message": "Push \"hello\" berhasil",
  "stack": ["hello"],
  "size": 1,
  "operations": 1
}
```

---

### 2. Pop
```bash
curl -X POST http://127.0.0.1:5000/api/stack/pop
```

**Response:**
```json
{
  "success": true,
  "message": "Pop \"hello\" berhasil",
  "popped_value": "hello",
  "stack": [],
  "size": 0,
  "operations": 2
}
```

---

### 3. Peek
```bash
curl http://127.0.0.1:5000/api/stack/peek
```

**Response:**
```json
{
  "success": true,
  "message": "Peek: hello",
  "peek_value": "hello",
  "operations": 3
}
```

---

### 4. Clear
```bash
curl -X POST http://127.0.0.1:5000/api/stack/clear
```

**Response:**
```json
{
  "success": true,
  "message": "Stack telah dikosongkan",
  "stack": [],
  "size": 0,
  "operations": 4
}
```

---

### 5. Status
```bash
curl http://127.0.0.1:5000/api/stack/status
```

**Response:**
```json
{
  "stack": ["val1", "val2"],
  "size": 2,
  "isEmpty": false,
  "operations": 2
}
```

---

### 6. Reset
```bash
curl -X POST http://127.0.0.1:5000/api/stack/reset
```

**Response:**
```json
{
  "success": true,
  "message": "Stack dan counter direset",
  "stack": [],
  "size": 0,
  "operations": 0
}
```

---

## JavaScript Fetch Examples

### Push
```javascript
const response = await fetch('http://127.0.0.1:5000/api/stack/push', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ value: 'hello' })
});
const data = await response.json();
console.log(data);
```

### Pop
```javascript
const response = await fetch('http://127.0.0.1:5000/api/stack/pop', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
});
const data = await response.json();
console.log(data);
```

### Peek
```javascript
const response = await fetch('http://127.0.0.1:5000/api/stack/peek');
const data = await response.json();
console.log(data);
```

---

## Error Responses

### 400 - Bad Request
```json
{
  "error": "Nilai tidak boleh kosong"
}
```

### 400 - Stack Empty
```json
{
  "error": "Stack kosong, tidak bisa pop"
}
```

---

## Status Codes
- **200** - Success
- **400** - Bad Request / Validation Error
- **404** - Not Found
- **500** - Server Error

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Operation successful |
| `message` | string | Human-readable message |
| `stack` | array | Current stack contents |
| `size` | integer | Number of elements |
| `operations` | integer | Total operations count |
| `popped_value` | string | Value yang di-pop |
| `peek_value` | string | Value yang di-peek |
| `isEmpty` | boolean | Is stack empty |
| `error` | string | Error message |

---

**Last Updated:** May 1, 2026
