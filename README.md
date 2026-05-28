# STACK VISUALIZATION

## Deskripsi Project

Stack Visualization adalah sebuah web interaktif untuk memvisualisasikan implementasi Stack dengan prinsip **LIFO (Last In First Out)**.Website ini menggunakan **dynamic array**, sehingga tidak ada batasan kapasitas stack
dan semua operasi memiliki kompleksitas waktu **O(1)**. Di website ini pengguna dapat melakukan beberapa operasi dasar dalam stack, meliputi : 

1. **Push** : Menambahkan element ke tumpukan teratas pada Stack.
2. **Pop** : Menghapus dan mengambil elemen teratas pada tumpukan stack.
3. **Peek** : Melihat elemen yang berada di tumpukan teratas pada stack tanpa menghapus elemen.
4. **Clear** : Menghapus semua isi yang terdapat di dalam stack.

Setiap operasi divisualisasikan secara real-time dan akan menampilkan : 
1. Ukuran stack
2. Total operasi yang dilakukan
3. Riwayat operasi stack
4. Pesan notifikasi success dan error berdasarkan setiap operasi yang dijalankan

## Instalasi Dependencies
Tidak ada dependencies eksternal yang diinstall pada website ini. Website ini adalah web application murni yang dapat berjalan di browser tanpa perlu instalasi package atau tools tambahan.

## Cara Menjalankan Project

### Prasyarat
- Browser modern (Chrome, Firefox, Safari, Edge, dll)

### Langkah-Langkah Menjalankan

1. **Clone repository** (atau download file)
   ```bash
   git clone https://github.com/HylmiRashid/tugasuasstrukturdata.git
<<<<<<< HEAD
   cd stack_visualization
=======
   cd "Stack Data Structure Implementation"
>>>>>>> d0bef48b8a6f8e881bc1603593b60e871581ba3a
   ```

2. **Buka file HTML di browser**
   - Buka Visual Studio Code -> Klik file `index.html` -> klik Run -> Klik Start Debugging -> Pilih Browser Tujuan  atau
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


<<<<<<< HEAD
## Fitur Aplikasi
=======
```
Stack Data Structure Implementation/
├── index.html       # File HTML utama (UI)
├── style.css        # Styling dan layout
├── stack.js         # Class Stack (implementasi struktur data)
├── script.js        # Logika aplikasi dan interaksi UI
└── README.md        # File dokumentasi
```
>>>>>>> d0bef48b8a6f8e881bc1603593b60e871581ba3a

**Visualisasi Stack** - Animasi pergerakan elemen
**Operasi LIFO** - Push, Pop, Peek, Clear
**History Operasi** - Mencatat semua operasi yang dilakukan
**Counter** - Menampilkan ukuran stack dan jumlah operasi
**Notifikasi** - Feedback untuk setiap operasi
**Responsive Design** - Interface yang user-friendly

## Komponen Website

- **HTML** - Struktur markup halaman
- **CSS** - Styling dan animasi
- **Vanilla JavaScript** - Logika dan interaksi

## Contoh Penggunaan

1. Masukkan angka `5` dan tekan **Push** → Stack: [5]
2. Masukkan angka `10` dan tekan **Push** → Stack: [5, 10]
3. Masukkan angka `15` dan tekan **Push** → Stack: [5, 10, 15]
4. Klik **Peek** → Menampilkan `15` (tanpa menghapus)
5. Klik **Pop** → Menghapus `15`, Stack: [5, 10]

## Nama Anggota Kelompok

Kelompok 2 - Stack
1. Hylmi Rashid Aydin - 2510101023
2. Sydney Calista - 2510101038
3. Yohan S Jalu Prakarsa - 2510101058
