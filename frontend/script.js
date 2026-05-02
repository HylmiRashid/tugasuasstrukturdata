// =====================================================
// BACKEND API CONFIGURATION
// =====================================================
const API_BASE_URL = 'http://127.0.0.1:5000/api';

// =====================================================
// STATE APLIKASI (UI ONLY)
// =====================================================
let stackData   = [];  // Disimpan dari API response
let ops         = 0;   // Operasi counter dari API
let colorIdx    = 0;
let colorMap    = []; // menyimpan index warna tiap elemen

// =====================================================
// KONFIGURASI WARNA ELEMEN STACK
// =====================================================
const COLORS        = ['#000000', '#000000', '#000000', '#000000', '#000000'];
const TEXT_COLORS   = ['#e6edf3', '#e6edf3', '#e6edf3', '#e6edf3', '#e6edf3'];
const BORDER_COLORS = ['#58a6ff', '#58a6ff', '#58a6ff', '#58a6ff', '#58a6ff'];

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
  document.getElementById('sizeVal').textContent = stackData.length;
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

  if (stackData.length === 0) {
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';

  // Loop dari belakang ke depan agar visual order benar (top index = paling atas)
  for (let i = stackData.length - 1; i >= 0; i--) {
    const val = stackData[i];
    const isTop = i === stackData.length - 1;
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

    // Append dari belakang ke depan (urutan terbalik akan menghasilkan order yang benar)
    vis.appendChild(div);
  }
}

// =====================================================
// OPERASI STACK (ASYNC - PANGGIL API)
// =====================================================
async function doPush() {
  const inp = document.getElementById('inputVal');
  const val = inp.value.trim();

  if (!val) {
    setInfo('Masukkan nilai terlebih dahulu.', 'error');
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/stack/push`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: val })
    });

    const data = await response.json();

    if (!response.ok) {
      setInfo(data.error || 'Error saat push', 'error');
      return;
    }

    // Update state dari API response
    stackData = data.stack;
    ops = data.operations;
    
    // Add warna untuk elemen baru
    const ci = colorIdx % COLORS.length;
    colorMap.push(ci);
    colorIdx++;

    inp.value = '';
    renderStack();
    setInfo(`Nilai "${val}" berhasil ditambahkan ke dalam stack.`, 'info');
    addLog('push', `push("${val}")`);
  } catch (error) {
    setInfo(`Error: ${error.message}`, 'error');
  }
}

async function doPop() {
  try {
    const response = await fetch(`${API_BASE_URL}/stack/pop`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();

    if (!response.ok) {
      setInfo(data.error || 'Error saat pop', 'error');
      addLog('pop', 'pop() → error: kosong');
      return;
    }

    // Update state dari API response
    stackData = data.stack;
    ops = data.operations;
    const val = data.popped_value;
    
    // Hapus warna dari elemen yang di-pop
    colorMap.pop();

    renderStack();
    setInfo(`Pop berhasil! Nilai "${val}" diambil dan dihapus dari stack.`, '');
    addLog('pop', `pop("${val}")`);
  } catch (error) {
    setInfo(`Error: ${error.message}`, 'error');
  }
}

async function doPeek() {
  try {
    const response = await fetch(`${API_BASE_URL}/stack/peek`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();

    if (!response.ok) {
      setInfo('Error saat peek', 'error');
      return;
    }

    ops = data.operations;
    updateStats();

    if (data.peek_value === null) {
      setInfo('Stack kosong! Tidak ada elemen di atas.', 'error');
      addLog('peek', 'peek() → error: kosong');
    } else {
      setInfo(`Peek: elemen di atas adalah "${data.peek_value}" (tidak dihapus).`, 'info');
      addLog('peek', `peek() → "${data.peek_value}"`);
    }
  } catch (error) {
    setInfo(`Error: ${error.message}`, 'error');
  }
}

async function doClear() {
  try {
    const response = await fetch(`${API_BASE_URL}/stack/clear`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();

    if (!response.ok) {
      setInfo('Error saat clear', 'error');
      return;
    }

    // Update state
    stackData = data.stack;
    ops = data.operations;
    colorMap = [];
    colorIdx = 0;

    renderStack();
    setInfo('Stack dikosongkan.', '');
    addLog('clear', 'clear() → stack kosong');
  } catch (error) {
    setInfo(`Error: ${error.message}`, 'error');
  }
}

// =====================================================
// EVENT LISTENER & INITIALIZATION
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('inputVal').addEventListener('keydown', e => {
    if (e.key === 'Enter') doPush();
  });
  
  // Load initial state dari backend
  loadStackStatus();
});

async function loadStackStatus() {
  try {
    const response = await fetch(`${API_BASE_URL}/stack/status`);
    const data = await response.json();
    
    stackData = data.stack;
    ops = data.operations;
    
    // Rekonstruksi colorMap berdasarkan jumlah elemen
    colorMap = [];
    for (let i = 0; i < stackData.length; i++) {
      colorMap.push(i % COLORS.length);
    }
    colorIdx = stackData.length;
    
    renderStack();
  } catch (error) {
    console.error('Backend connection error:', error);
    setInfo('⚠️ Backend tidak terhubung. Pastikan Flask server berjalan di http://127.0.0.1:5000', 'error');
  }
}