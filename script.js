// =====================================================
// CLASS STACK — Implementasi struktur data LIFO
// =====================================================
class Stack {
  constructor() {
    this.items = [];
  }

  // Tambah elemen ke atas stack
  push(element) {
    this.items.push(element);
  }

  // Hapus & kembalikan elemen paling atas
  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }

  // Lihat elemen paling atas tanpa menghapus
  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }
}

// =====================================================
// KONFIGURASI WARNA ELEMEN STACK
// =====================================================
const COLORS        = ['#000000', '#000000', '#000000', '#000000', '#000000'];
const TEXT_COLORS   = ['#e6edf3', '#e6edf3', '#e6edf3', '#e6edf3', '#e6edf3'];
const BORDER_COLORS = ['#58a6ff', '#58a6ff', '#58a6ff', '#58a6ff', '#58a6ff'];

// =====================================================
// STATE APLIKASI
// =====================================================
const stack    = new Stack();
let ops        = 0;
let colorIdx   = 0;
let colorMap   = []; // menyimpan index warna tiap elemen

// =====================================================
// UTILITAS
// =====================================================
function getTime() {
  return new Date().toLocaleTimeString('id-ID', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

function setInfo(msg, type = '') {
  const el = document.getElementById('infoBox');
  el.textContent = msg;
  el.className = 'info-box ' + type;
}

function addLog(type, msg) {
  const panel = document.getElementById('logPanel');
  const item  = document.createElement('div');
  item.className = 'log-item ' + type + '-log';
  item.innerHTML = `<span class="ts">${getTime()}</span><span class="op">${msg}</span>`;
  panel.insertBefore(item, panel.firstChild);
  // Batasi log maksimal 10 baris
  while (panel.children.length > 10) {
    panel.removeChild(panel.lastChild);
  }
}

function updateStats() {
  document.getElementById('sizeVal').textContent = stack.size();
  document.getElementById('opsVal').textContent  = ops;
}

// =====================================================
// RENDER VISUAL STACK
// =====================================================
function renderStack() {
  const vis   = document.getElementById('stackVis');
  const empty = document.getElementById('emptyMsg');

  // Hapus elemen lama
  vis.querySelectorAll('.stack-item').forEach(el => el.remove());

  updateStats();

  if (stack.isEmpty()) {
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';

  stack.items.forEach((val, i) => {
    const isTop = i === stack.items.length - 1;
    const ci    = colorMap[i] % COLORS.length;

    const div = document.createElement('div');
    div.className       = 'stack-item' + (isTop ? ' top' : '');
    div.textContent     = val;
    div.style.background  = COLORS[ci];
    div.style.color       = TEXT_COLORS[ci];
    div.style.borderColor = isTop
      ? BORDER_COLORS[ci]
      : BORDER_COLORS[ci] + '55';
    div.style.boxShadow = isTop
      ? `0 0 12px ${BORDER_COLORS[ci]}33`
      : 'none';

    // Sisipkan dari atas agar urutan kolom terbalik (index 0 = bawah)
    vis.insertBefore(div, vis.firstChild);
  });
}

// =====================================================
// OPERASI STACK
// =====================================================
function doPush() {
  const inp = document.getElementById('inputVal');
  const val = inp.value.trim();

  if (!val) {
    setInfo('Masukkan nilai terlebih dahulu.', 'error');
    return;
  }

  const ci = colorIdx % COLORS.length;
  colorMap.push(ci);
  stack.push(val);
  colorIdx++;
  ops++;

  inp.value = '';
  renderStack();
  setInfo(`Nilai "${val}" berhasil ditambahkan ke dalam stack.`, 'info');
  addLog('push', `push("${val}")`);
}

function doPop() {
  if (stack.isEmpty()) {
    setInfo('Stack kosong! Tidak ada yang bisa di-pop.', 'error');
    addLog('pop', 'pop() → error: kosong');
    return;
  }

  const val = stack.pop();
  colorMap.pop();
  ops++;

  renderStack();
  setInfo(`Pop berhasil! Nilai "${val}" diambil dan dihapus dari stack.`, '');
  addLog('pop', `pop("${val}")`);
}

function doPeek() {
  if (stack.isEmpty()) {
    setInfo('Stack kosong! Tidak ada elemen di atas.', 'error');
    addLog('peek', 'peek() → error: kosong');
    return;
  }

  const val = stack.peek();
  ops++;

  updateStats();
  setInfo(`Peek: elemen di atas adalah "${val}" (tidak dihapus).`, 'info');
  addLog('peek', `peek() → "${val}"`);
}

function doClear() {
  stack.clear();
  colorMap = [];
  ops++;

  renderStack();
  setInfo('Stack dikosongkan.', '');
  addLog('pop', 'clear() → stack kosong');
}

// =====================================================
// EVENT LISTENER
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('inputVal').addEventListener('keydown', e => {
    if (e.key === 'Enter') doPush();
  });
});