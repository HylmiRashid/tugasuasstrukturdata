# 📚 Dokumentasi - Stack Visualization

## Apa itu Aplikasi Ini?
Aplikasi pembelajaran Stack (LIFO) dengan visualisasi interaktif. Dibangun dengan Flask backend dan HTML/CSS/JS frontend.

**Fitur:**
- Visualisasi Stack real-time
- Operasi: Push, Pop, Peek, Clear
- History log
- Counter operasi

---

## Cara Install

### 1. Install Dependencies
```powershell
cd tugasuasstrukturdata
pip install -r requirements.txt
```

### 2. Jalankan Server
```powershell
python app.py
```

### 3. Buka di Browser
```
http://127.0.0.1:5000
```

---

## Cara Pakai

### Push (Tambah Elemen)
1. Masukkan nilai di text field
2. Klik "Push" atau tekan Enter
3. Elemen ditambahkan ke atas stack

### Pop (Hapus Elemen)
- Klik "Pop" untuk hapus elemen teratas

### Peek (Lihat Elemen Teratas)
- Klik "Peek" untuk lihat tanpa menghapus

### Clear (Kosongkan)
- Klik "Clear" untuk hapus semua

---

## Struktur Stack (LIFO)
- **LIFO** = Last In First Out
- Elemen yang ditambahkan terakhir dihapus duluan
- Analogi: Stack piring, piring paling atas diambil duluan

---

## Struktur Project

```
tugasuasstrukturdata/
├── app.py              # Backend Flask
├── script.js           # Frontend JavaScript
├── index.html          # Frontend HTML
├── style.css           # Frontend CSS
└── requirements.txt    # Python dependencies
```

---

## API Endpoints

| Endpoint | Method | Deskripsi |
|----------|--------|-----------|
| `/api/stack/push` | POST | Tambah elemen |
| `/api/stack/pop` | POST | Hapus elemen |
| `/api/stack/peek` | GET | Lihat elemen teratas |
| `/api/stack/clear` | POST | Kosongkan stack |
| `/api/stack/status` | GET | Lihat status |
| `/api/stack/reset` | POST | Reset semua |

---

## Troubleshooting

### ❌ "Backend tidak terhubung"
**Solusi:** Pastikan server Flask running dengan `python app.py`

### ❌ "Port 5000 already in use"
**Solusi:** Ubah port di `app.py` dan `script.js`

### ❌ "ModuleNotFoundError: flask"
**Solusi:** Install dependencies: `pip install -r requirements.txt`

### ❌ Tombol tidak bekerja
**Solusi:** Buka DevTools (F12), cek Console untuk error. Pastikan Flask running.

---

## 📝 Changelog Dokumentasi

### Perubahan yang Dilakukan:

**✅ Tetap Disimpan:**
- Penjelasan singkat aplikasi + 4 fitur utama
- Cara Install (3 langkah: pip install, run server, buka browser)
- Cara Pakai (Push, Pop, Peek, Clear)
- Struktur Stack (LIFO)
- Struktur Project (file listing)
- API Endpoints (tabel 6 route)
- Troubleshooting (4 error umum + solusi)

**❌ Dihapus untuk Simplifikasi:**
- Daftar Isi (TOC)
- Architecture Diagram (ASCII diagram rumit)
- File Structure Diagram (tree diagram detail)
- Backend Code Section (Stack class, Flask routes implementation)
- Frontend Code Section (JavaScript functions - doPush, doPop, renderStack, dll)
- API Reference Detail (JSON request/response examples panjang)
- Installation Prerequisites (Python version, Pip, Browser)
- Usage Guide Tutorial (contoh berulang sebelum/sesudah)
- UI Understanding (LEFT/RIGHT panel diagrams)
- Security Notes (CORS, debug mode, production setup)
- Performance Notes (Big O notation, optimization)
- Future Enhancements (fitur yang belum ada)
- File Changelog (history modifikasi)
- Support & References (link eksternal)
- Version & Status Info (Last updated, version number)

**📊 Ringkas:**
- Dari: ~700 baris (comprehensive documentation)
- Ke: ~150 baris (quick start guide)
- Fokus: Enterprise-level → Practical & User-friendly
