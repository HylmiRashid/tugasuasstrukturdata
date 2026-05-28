class Stack {
    constructor() {
        this.items = []; // pakai array dinamis, jadi ga ada batas kapasitas
    }
 
    // nambahin elemen ke atas stack - O(1)
    push(value) {
        this.items.push(value);
    }
 
    // hapus & return elemen paling atas - O(1)
    pop() {
        if (this.isEmpty()) return null;
        return this.items.pop();
    }
 
    // liat elemen paling atas tanpa hapus - O(1)
    peek() {
        if (this.isEmpty()) return null;
        return this.items[this.items.length - 1];
    }
 
    // cek apakah stack kosong - O(1)
    isEmpty() {
        return this.items.length === 0;
    }
 
    // cek apakah stack penuh - O(1)
    // karena pakai array dinamis, ini selalu false
    isFull() {
        return false;
    }
 
    // return jumlah elemen - O(1)
    size() {
        return this.items.length;
    }
 
    // kosongin semua isi stack - O(1)
    clear() {
        this.items = [];
    }
}