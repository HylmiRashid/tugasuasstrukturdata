# Stack Data Structure Implementation

A web-based interactive visualization and implementation of the **Stack** data structure with a clean, user-friendly interface.

## 📋 Deskripsi Project

Proyek ini adalah implementasi **Stack (LIFO - Last In First Out)** yang mendemonstrasikan operasi-operasi dasar pada struktur data Stack:
- **Push**: Menambahkan elemen ke atas stack
- **Pop**: Menghapus elemen dari atas stack
- **Peek**: Melihat elemen teratas tanpa menghapusnya
- **Clear**: Mengosongkan seluruh stack
- **isEmpty**: Mengecek apakah stack kosong

Proyek ini dilengkapi dengan visualisasi animasi untuk memudahkan pemahaman konsep Stack.

**Course**: Struktur Data | **Kelompok**: 2 | **Institution**: Pradita

## 🚀 Cara Menjalankan Project

### Prasyarat
- Browser modern (Chrome, Firefox, Safari, Edge, dll)
- Tidak ada dependencies tambahan yang diperlukan

### Langkah-Langkah Menjalankan

1. **Clone repository** (atau download file)
   ```bash
   git clone https://github.com/HylmiRashid/tugasuasstrukturdata.git
   cd "Stack Data Structure Implementation"
   ```

2. **Buka file HTML di browser**
   - Double-click pada file `index.html`, atau
   - Buka file explorer, klik kanan `index.html` → Open with Browser, atau
   - Gunakan Live Server:
     ```bash
     # Jika menggunakan VS Code dengan Live Server extension
     # Klik "Go Live" di bottom right
     ```

3. **Gunakan aplikasi**
   - Masukkan nilai di input field
   - Klik tombol **Push** untuk menambahkan elemen
   - Klik tombol **Pop** untuk menghapus elemen teratas
   - Klik tombol **Peek** untuk melihat elemen teratas
   - Klik tombol **Clear** untuk mengosongkan stack
   - Lihat visualisasi dan history operasi di sebelah kanan

## 📁 Struktur File

```
Stack Data Structure Implementation/
├── index.html       # File HTML utama (UI)
├── style.css        # Styling dan layout
├── stack.js         # Class Stack (implementasi struktur data)
├── script.js        # Logika aplikasi dan interaksi UI
└── README.md        # File dokumentasi
```

## 💻 Fitur Aplikasi

✅ **Visualisasi Stack** - Animasi pergerakan elemen
✅ **Operasi LIFO** - Push, Pop, Peek, Clear
✅ **History Operasi** - Mencatat semua operasi yang dilakukan
✅ **Counter** - Menampilkan ukuran stack dan jumlah operasi
✅ **Notifikasi** - Feedback untuk setiap operasi
✅ **Responsive Design** - Interface yang user-friendly

## 🔧 Teknologi yang Digunakan

- **HTML5** - Struktur halaman
- **CSS3** - Styling dan animasi
- **Vanilla JavaScript** - Logika dan interaksi

## 📝 Contoh Penggunaan

1. Masukkan angka `5` dan tekan **Push** → Stack: [5]
2. Masukkan angka `10` dan tekan **Push** → Stack: [5, 10]
3. Masukkan angka `15` dan tekan **Push** → Stack: [5, 10, 15]
4. Tekan **Peek** → Menampilkan `15` (tanpa menghapus)
5. Tekan **Pop** → Menghapus `15`, Stack: [5, 10]

## 📚 Penjelasan Stack Operations

| Operasi | Kompleksitas | Deskripsi |
|---------|-------------|----------|
| Push | O(1) | Menambah elemen ke atas |
| Pop | O(1) | Menghapus elemen paling atas |
| Peek | O(1) | Melihat elemen paling atas |
| isEmpty | O(1) | Cek apakah stack kosong |
| Clear | O(1) | Mengosongkan stack |

## 📌 Catatan Penting

- Proyek ini menggunakan **dynamic array**, sehingga tidak ada batasan kapasitas stack
- Semua operasi memiliki kompleksitas waktu **O(1)**
- History operasi disimpan di sisi kanan untuk referensi

## 👥 Tim Pengembang

Kelompok 2 - Mata Kuliah Struktur Data

## 📄 Lisensi

Proyek ini dibuat untuk keperluan akademis.

---

**Dibuat dengan ❤️ untuk pembelajaran Struktur Data**
