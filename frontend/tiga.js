// =====================================================
// STACK VISUALIZER - Frontend JavaScript
// =====================================================

const API_BASE = 'http://localhost:5000/api';
let operationLog = [];

// =====================================================
// UPDATE UI FUNCTIONS
// =====================================================

function updateStackDisplay(stackItems, size, operations) {
    // Update ukuran
    document.getElementById('ukuran').textContent = size;
    document.getElementById('operasi').textContent = operations;

    // Update stack kolom
    const kolom = document.getElementById('kolomnya');
    kolom.innerHTML = '';

    if (stackItems.length === 0) {
        kolom.innerHTML = '<div style="text-align: center; color: #000000; padding: 20px; opacity: 0.5;">[ EMPTY ]</div>';
        document.getElementById('topnya').style.display = 'none';
        document.getElementById('labelnya').textContent = '';
    } else {
        stackItems.forEach((item, index) => {
            const div = document.createElement('div');
            div.textContent = item;
            div.style.animation = 'slideIn 0.3s ease-out';
            kolom.appendChild(div);
        });
        
        // Update top pointer
        const topEl = document.getElementById('topnya');
        topEl.style.display = 'block';
        topEl.style.bottom = (stackItems.length * 55 - 15) + 'px';
        
        // Update label
        document.getElementById('labelnya').textContent = '→ ' + stackItems[stackItems.length - 1] + ' (TOP)';
    }
}

function showNotification(message, type = 'info') {
    const notif = document.getElementById('notif');
    notif.textContent = message;
    
    // Clear previous classes
    notif.className = 'notifikasi';
    
    // Add type-based styling
    if (type === 'success') {
        notif.style.borderColor = '#00ff00';
        notif.style.color = '#00ff00';
    } else if (type === 'error') {
        notif.style.borderColor = '#ff4444';
        notif.style.color = '#ff4444';
    } else if (type === 'info') {
        notif.style.borderColor = '#00ffff';
        notif.style.color = '#00ffff';
    }
    
    // Auto clear after 3 seconds
    setTimeout(() => {
        notif.textContent = '';
        notif.style.borderColor = '#00ffff';
        notif.style.color = '#00ffff';
    }, 3000);
}

function addToHistory(operation, value = '', result = '') {
    const timestamp = new Date().toLocaleTimeString('id-ID');
    const logEntry = `[${timestamp}] ${operation}${value ? ': ' + value : ''}${result ? ' → ' + result : ''}`;
    operationLog.push(logEntry);
    
    const historyArea = document.getElementById('areahistory');
    const entryDiv = document.createElement('div');
    entryDiv.textContent = logEntry;
    entryDiv.className = `operation-${operation.toLowerCase()}`;
    historyArea.appendChild(entryDiv);
    historyArea.scrollTop = historyArea.scrollHeight;
}

// =====================================================
// API FUNCTIONS
// =====================================================

async function opPush() {
    const input = document.getElementById('inputnilai');
    const value = input.value.trim();

    if (!value) {
        showNotification('⚠ Masukkan nilai terlebih dahulu!', 'error');
        input.focus();
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/stack/push`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ value: value })
        });

        const data = await response.json();

        if (response.ok) {
            updateStackDisplay(data.stack, data.size, data.operations);
            addToHistory('PUSH', value, 'berhasil');
            showNotification(`✓ Push "${value}" berhasil`, 'success');
            input.value = '';
            input.focus();
        } else {
            showNotification('✗ ' + data.error, 'error');
        }
    } catch (error) {
        showNotification('✗ Koneksi ke server gagal!', 'error');
        console.error('Error:', error);
    }
}

async function opPop() {
    try {
        const response = await fetch(`${API_BASE}/stack/pop`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();

        if (response.ok) {
            updateStackDisplay(data.stack, data.size, data.operations);
            addToHistory('POP', data.popped_value, 'berhasil');
            showNotification(`✓ Pop "${data.popped_value}" berhasil`, 'success');
        } else {
            showNotification('✗ ' + data.error, 'error');
        }
    } catch (error) {
        showNotification('✗ Koneksi ke server gagal!', 'error');
        console.error('Error:', error);
    }
}

async function opPeek() {
    try {
        const response = await fetch(`${API_BASE}/stack/peek`, {
            method: 'GET'
        });

        const data = await response.json();

        if (data.peek_value !== null) {
            addToHistory('PEEK', data.peek_value);
            showNotification(`→ Top element: "${data.peek_value}"`, 'info');
        } else {
            showNotification('⚠ Stack kosong, tidak ada yang di-peek', 'error');
        }
    } catch (error) {
        showNotification('✗ Koneksi ke server gagal!', 'error');
        console.error('Error:', error);
    }
}

async function opClear() {
    if (!confirm('Yakin ingin menghapus semua elemen stack?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/stack/clear`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();

        if (response.ok) {
            updateStackDisplay(data.stack, data.size, data.operations);
            addToHistory('CLEAR', '', 'semua dihapus');
            showNotification('✓ Stack telah dikosongkan', 'success');
        }
    } catch (error) {
        showNotification('✗ Koneksi ke server gagal!', 'error');
        console.error('Error:', error);
    }
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

function copyLog() {
    if (operationLog.length === 0) {
        showNotification('⚠ Tidak ada history untuk dicopy', 'error');
        return;
    }

    const logText = operationLog.join('\n');
    navigator.clipboard.writeText(logText).then(() => {
        showNotification('✓ History dicopy ke clipboard', 'success');
    }).catch(() => {
        showNotification('✗ Gagal copy ke clipboard', 'error');
    });
}

async function loadStatus() {
    try {
        const response = await fetch(`${API_BASE}/stack/status`);
        const data = await response.json();
        updateStackDisplay(data.stack, data.size, data.operations);
    } catch (error) {
        console.error('Error loading status:', error);
    }
}

// =====================================================
// INITIALIZATION
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    // Load initial status
    loadStatus();

    // Allow Enter key for push
    document.getElementById('inputnilai').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            opPush();
        }
    });

    console.log('✓ Stack Visualizer initialized');
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
