# 🚀 Setup & Run Flask Backend

## Prerequisites
- Python 3.7+ sudah terinstall
- Pip (package manager Python)

## Installation & Running

### 1. Install Dependencies
Buka PowerShell/Terminal di folder project, jalankan:

```powershell
pip install -r requirements.txt
```

### 2. Jalankan Flask Server
```powershell
python app.py
```

Expected output:
```
 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5000
```

### 3. Buka Frontend
Buka browser, ke: **http://127.0.0.1:5000**

---

## 📋 Backend API Endpoints

### Push Element
- **URL**: `POST /api/stack/push`
- **Body**: `{ "value": "string" }`
- **Response**: 
  ```json
  {
    "success": true,
    "message": "Push 'nilai' berhasil",
    "stack": ["val1", "val2"],
    "size": 2,
    "operations": 5
  }
  ```

### Pop Element
- **URL**: `POST /api/stack/pop`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Pop 'nilai' berhasil",
    "popped_value": "nilai",
    "stack": ["val1"],
    "size": 1,
    "operations": 6
  }
  ```

### Peek (Lihat elemen teratas)
- **URL**: `GET /api/stack/peek`
- **Response**:
  ```json
  {
    "success": true,
    "peek_value": "val2",
    "operations": 7
  }
  ```

### Clear Stack
- **URL**: `POST /api/stack/clear`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Stack telah dikosongkan",
    "stack": [],
    "size": 0,
    "operations": 8
  }
  ```

### Get Status
- **URL**: `GET /api/stack/status`
- **Response**:
  ```json
  {
    "stack": ["val1", "val2"],
    "size": 2,
    "isEmpty": false,
    "operations": 3
  }
  ```

### Reset
- **URL**: `POST /api/stack/reset`
- **Response**:
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

## 🛠️ Structure

```
tugasuasstrukturdata/
├── app.py              # Flask backend dengan Stack API
├── requirements.txt    # Python dependencies
├── index.html          # Frontend (served by Flask)
├── script.js           # Frontend logic (modified untuk API calls)
├── style.css           # Styling
└── README_BACKEND.md   # File ini
```

---

## ⚠️ Troubleshooting

### Error: "ModuleNotFoundError: No module named 'flask'"
```powershell
pip install Flask flask-cors
```

### Error: "Port 5000 already in use"
Flask sudah berjalan di port lain, atau ada program lain pakai port 5000.
Ubah di `app.py`:
```python
app.run(debug=True, host='127.0.0.1', port=5001)  # Ganti port ke 5001
```

Dan update di `script.js`:
```javascript
const API_BASE_URL = 'http://127.0.0.1:5001/api';  // Update port
```

### Error: "Connection refused"
Pastikan Flask server sudah running (`python app.py`).

---

## 📝 Perubahan dari Frontend

Script.js sudah dimodifikasi:
- ❌ Local Stack class dihapus (logic pindah ke backend)
- ✅ Semua operasi (push/pop/peek/clear) sekarang async dan panggil API
- ✅ State diambil dari API response
- ✅ Error handling untuk koneksi backend

---

## 🎯 Testing dengan cURL

### Push nilai
```bash
curl -X POST http://127.0.0.1:5000/api/stack/push \
  -H "Content-Type: application/json" \
  -d "{\"value\": \"hello\"}"
```

### Pop
```bash
curl -X POST http://127.0.0.1:5000/api/stack/pop
```

### Get status
```bash
curl http://127.0.0.1:5000/api/stack/status
```

---

## ✨ Notes

- Backend state **tidak persisten** (reset saat server restart)
- Jika ingin database persistent, tambahkan SQLAlchemy + SQLite
- CORS sudah enabled, bisa akses dari domain lain
- Debug mode aktif, perubahan kode otomatis reload

Enjoy! 🎉
