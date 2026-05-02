# 📖 User Guide - Panduan Penggunaan Aplikasi Stack

## 🎯 Pengenalan Aplikasi

Selamat datang! Ini adalah aplikasi pembelajaran **Stack** - salah satu struktur data fundamental dalam ilmu komputer.

### Apa itu Stack?

Stack adalah struktur data dengan konsep **LIFO (Last In First Out)**:
- Elemen yang **terakhir masuk** akan **yang pertama keluar**
- Analogi: **Stack piring** di meja makan
  - Piring yang ditaruh paling akhir diambil duluan
  - Piring yang paling bawah diambil paling akhir

### Contoh Dunia Nyata
1. **Browser back button** - Stack halaman yang dikunjungi
2. **Ctrl+Z (Undo)** - Stack operasi yang dilakukan
3. **Function call stack** - Urutan function yang dipanggil
4. **Shopping cart** - Bisa tambah/hapus item dari atas

---

## 🚀 Mulai Menggunakan

### Langkah 1: Nyalakan Aplikasi

**Untuk instruktur:**
1. Buka Terminal/PowerShell
2. Ketik: `python app.py`
3. Tunggu sampai muncul: `Running on http://127.0.0.1:5000`
4. Buka browser, kunjungi: `http://127.0.0.1:5000`

**Untuk mahasiswa:**
- Minta instruktur untuk jalankan server
- Buka browser dengan URL yang diberikan

### Langkah 2: Familiarkan Diri dengan UI

```
┌─────────────────────────────────────────────┐
│  UAS Struktur Data - Kelompok 2 (stack)     │
├──────────────────────┬──────────────────────┤
│   VISUALISASI STACK  │   OPERASI STACK      │
│                      │                      │
│  • Stack visualization  • Input field      │
│  • TOP indicator     │  • 4 buttons        │
│  • Ukuran counter    │  • Info output      │
│                      │  • History log      │
└──────────────────────┴──────────────────────┘
```

---

## 💻 Operasi Stack

### 1️⃣ PUSH (Menambah Elemen)

**Apa itu?** Menambahkan nilai baru ke atas stack

**Cara melakukan:**
1. Ketik nilai di text field (contoh: "hello")
2. Klik tombol "Push" atau tekan **Enter**
3. Lihat elemen baru muncul di atas stack

**Contoh visual:**
```
Sebelum:          Sesudah Push "world":
┌─────┐           ┌─────────┐
│hello│           │ world ← TOP
└─────┘           ├─────────┤
Size: 1           │ hello   │
                  └─────────┘
                  Size: 2
```

**Tips:**
- Bisa push nilai berupa angka, huruf, atau kata
- Maksimal 12 karakter per nilai
- Operasi counter akan naik 1

---

### 2️⃣ POP (Mengambil Elemen)

**Apa itu?** Menghapus dan mengambil elemen dari atas stack (TOP)

**Cara melakukan:**
1. Klik tombol "Pop (ambil dan hapus top)"
2. Lihat elemen teratas dihapus dari stack
3. Lihat pesan di info box: "Pop berhasil! Nilai 'xxx' diambil dan dihapus"

**Contoh visual:**
```
Sebelum Pop:      Sesudah Pop:
┌─────────┐       ┌─────┐
│ world   │       │hello│
├─────────┤  →    └─────┘
│ hello   │       Size: 1
└─────────┘
Size: 2    
```

**Penting:**
- Hanya bisa pop elemen dari atas (TOP)
- Jika stack kosong, akan ada pesan error
- Element yang di-pop hilang selamanya

---

### 3️⃣ PEEK (Melihat Elemen Teratas)

**Apa itu?** Melihat elemen apa yang berada di atas (TOP) tanpa menghapusnya

**Cara melakukan:**
1. Klik tombol "Peek (lihat top)"
2. Lihat pesan di info box: "Peek: elemen di atas adalah 'xxx' (tidak dihapus)"
3. Stack tetap sama, tidak ada elemen yang dihapus

**Contoh visual:**
```
Sebelum & Sesudah Peek (tidak berubah):
┌─────────┐
│ world   │  ← Peek lihat ini
├─────────┤
│ hello   │
└─────────┘
Size: 2 (tidak berubah)
```

**Gunakan untuk:**
- Cek elemen apa yang akan di-pop selanjutnya
- Tidak mengubah stack
- Membantu debug/pembelajaran

---

### 4️⃣ CLEAR (Kosongkan Stack)

**Apa itu?** Menghapus SEMUA elemen dari stack sekaligus

**Cara melakukan:**
1. Klik tombol "Clear (kosongkan stack)"
2. Lihat stack menjadi kosong
3. Pesan info: "Stack dikosongkan"
4. Size kembali ke 0

**Contoh visual:**
```
Sebelum Clear:      Sesudah Clear:
┌─────────┐         
│ world   │         (kosong)
├─────────┤    →    
│ hello   │         Size: 0
└─────────┘         
Size: 2             
```

**Hati-hati:** Semua data hilang! Tidak bisa di-undo.

---

## 📊 Memahami UI

### Panel Kiri - Visualisasi Stack

```
┌─────────────────────────────┐
│ Visualisasi Stack           │
├─────────────────────────────┤
│                             │
│  ┌────────────────────────┐ │
│  │ world        ← TOP     │ │  
│  ├────────────────────────┤ │
│  │ hello                  │ │
│  ├────────────────────────┤ │
│  │ apple                  │ │
│  └────────────────────────┘ │
│  ────────────────────────────  ← BASE (dasar)
│                             │
│  🔹 ukuran    🔹 banyaknya  │
│     3            5          │
│                             │
└─────────────────────────────┘
```

**Penjelasan:**
- **TOP indicator**: Menunjukkan elemen yang akan di-pop pertama
- **Elements**: Daftar semua elemen dalam urutan stack
- **BASE line**: Garis dasar stack untuk referensi visual
- **Ukuran**: Jumlah elemen dalam stack
- **Banyaknya operasi**: Total operasi yang sudah dilakukan (push+pop+peek+clear)

### Panel Kanan - Operasi

```
┌──────────────────────────┐
│ Operasi Stack            │
├──────────────────────────┤
│                          │
│ Input: [text field]      │
│ 
│ [Push] [Pop] [Peek]      │
│ [Clear]                  │
│                          │
│ Output: Info message     │
│ ────────────────────────  │
│                          │
│ History Operasi:         │
│ • 19:25:21 push("world") │
│ • 19:25:14 push("hello") │
│ • 19:25:09 pop("apple")  │
│                          │
└──────────────────────────┘
```

**Penjelasan:**
- **Input field**: Tempat mengetik nilai yang ingin di-push
- **Tombol operasi**: Klik untuk jalankan operasi
- **Info box**: Menampilkan hasil atau error dari operasi terbaru
- **History log**: Daftar 10 operasi terakhir dengan timestamp

---

## 🎓 Contoh Skenario Pembelajaran

### Skenario 1: Belajar Push & Pop

**Langkah-langkah:**
1. Push "A" → Stack = [A], Size = 1
2. Push "B" → Stack = [A, B], Size = 2
3. Push "C" → Stack = [A, B, C], Size = 3
4. Peek → Lihat C (tidak dihapus)
5. Pop → Stack = [A, B], Size = 2
6. Pop → Stack = [A], Size = 1
7. Pop → Stack = [], Size = 0

**Yang dipelajari:** LIFO concept - elemen yang terakhir ditambah (C) paling dulu dihapus

---

### Skenario 2: Browser History Simulation

**Langkah-langkah:**
1. Push "google.com"
2. Push "github.com"
3. Push "stackoverflow.com"
4. Peek → "stackoverflow.com" (halaman sekarang)
5. Pop → Back to "github.com"
6. Pop → Back to "google.com"

**Yang dipelajari:** Bagaimana browser back button bekerja dengan stack

---

### Skenario 3: Undo Function

**Langkah-langkah (Simulasi undo operasi):**
1. Push "Step 1 - Buka file"
2. Push "Step 2 - Edit teks"
3. Push "Step 3 - Ubah warna"
4. Peek → "Step 3 - Ubah warna" (operasi terakhir)
5. Pop → Undo ke "Step 2"
6. Pop → Undo ke "Step 1"

**Yang dipelajari:** Bagaimana undo/redo bekerja dalam aplikasi

---

## 🔍 Membaca Output

### Info Box Messages

**Sukses:**
```
✅ Nilai "hello" berhasil ditambahkan ke dalam stack.
✅ Pop berhasil! Nilai "hello" diambil dan dihapus dari stack.
✅ Peek: elemen di atas adalah "world" (tidak dihapus).
✅ Stack dikosongkan.
```

**Error:**
```
❌ Masukkan nilai terlebih dahulu.
❌ Stack kosong! Tidak ada yang bisa di-pop.
❌ Stack kosong! Tidak ada elemen di atas.
❌ Backend tidak terhubung. Pastikan Flask server berjalan.
```

### History Log Format

```
HH:MM:SS operation(parameters)

Contoh:
19:25:21 push("world")    ← Waktu operasi
19:25:18 peek() → "hello"
19:25:14 pop("world")
19:25:09 clear()
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Fungsi |
|----------|--------|
| **Enter** | Push nilai (setelah ketik di input) |
| **Click Push** | Push nilai |
| **Click Pop** | Pop nilai |
| **Click Peek** | Peek nilai teratas |
| **Click Clear** | Clear semua |

---

## 🆘 Troubleshooting

### Masalah: "Backend tidak terhubung"

**Penyebab:** Flask server tidak running

**Solusi:**
1. Minta instruktur untuk jalankan server
2. Pastikan Flask running: `python app.py`
3. Refresh page (Ctrl+R)

---

### Masalah: Tombol tidak berfungsi

**Penyebab:** Page error atau browser issue

**Solusi:**
1. Refresh page (Ctrl+R)
2. Coba browser lain
3. Clear browser cache (Ctrl+Shift+Delete)
4. Cek apakah nilai input kosong sebelum push

---

### Masalah: Stacknya tidak bertambah setelah push

**Penyebab:** Input kosong atau error tidak terlihat

**Solusi:**
1. Pastikan Anda ketik sesuatu di input field
2. Lihat info box untuk error message
3. Cek browser console (F12 → Console)

---

## 💡 Tips & Tricks

### Tips 1: Gunakan Peek untuk Preview
Sebelum pop, gunakan peek untuk melihat apa yang akan dihapus

### Tips 2: Monitor Operations Counter
Counter operasi menunjukkan berapa banyak operasi yang dilakukan, berguna untuk tracking pembelajaran

### Tips 3: Check History Log
History log menunjukkan timeline operasi, berguna untuk debugging atau review

### Tips 4: Eksperimen dengan Berbagai Nilai
Coba push dengan berbagai jenis input:
- Angka: "123", "999"
- Kata: "hello", "world"
- Spasi: "my value"
- Special characters: "user@email"

### Tips 5: Practice LIFO Concept
Coba prediksi elemen mana yang akan di-pop, kemudian verifikasi dengan actual

---

## 🎯 Learning Objectives

Setelah menggunakan aplikasi ini, Anda seharusnya memahami:

- ✅ Apa itu Stack (LIFO structure)
- ✅ Perbedaan push, pop, peek, dan clear
- ✅ Kapan stack kosong dan handling error
- ✅ Mengapa stack penting dalam programming
- ✅ Real-world use cases dari stack

---

## 📚 Referensi Tambahan

### Buku
- Introduction to Algorithms (CLRS)
- Data Structures and Algorithm Analysis

### Website
- GeeksforGeeks - Stack Tutorial
- TutorialsPoint - Data Structures
- Visualgo.net - Algorithm Visualization

### Video
- YouTube: "Stack Data Structure"
- Coursera: Data Structures Course
- Udemy: DSA Tutorial

---

## 🤝 Support

### Pertanyaan?
- Hubungi instruktur Anda
- Lihat DOKUMENTASI.md untuk detail teknis
- Lihat DEVELOPMENT_GUIDE.md untuk developers

### Bug Reports?
- Catat langkah-langkah untuk reproduce
- Screenshot error message
- Laporkan ke instruktur

---

## 📝 Checklist Belajar

- [ ] Pahami konsep LIFO
- [ ] Berhasil push minimal 3 elemen
- [ ] Coba pop dan lihat elemen dihapus
- [ ] Gunakan peek tanpa pop
- [ ] Kosongkan stack dengan clear
- [ ] Monitor size dan operations counter
- [ ] Baca history log
- [ ] Coba skenario pembelajaran
- [ ] Pahami kapan stack empty
- [ ] Relate dengan real-world examples

---

**Selamat belajar! 🎉**

*Last Updated: May 1, 2026*
