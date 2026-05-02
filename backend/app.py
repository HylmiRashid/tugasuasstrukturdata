from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS untuk akses dari frontend

# =====================================================
# CLASS STACK — Implementasi struktur data LIFO
# =====================================================
class Stack:
    def __init__(self):
        self.items = []

    def push(self, element):
        """Tambah elemen ke atas stack"""
        self.items.append(element)
        return True

    def pop(self):
        """Hapus & kembalikan elemen paling atas"""
        if self.isEmpty():
            return None
        return self.items.pop()

    def peek(self):
        """Lihat elemen paling atas tanpa menghapus"""
        if self.isEmpty():
            return None
        return self.items[-1]

    def isEmpty(self):
        """Cek apakah stack kosong"""
        return len(self.items) == 0

    def size(self):
        """Kembalikan jumlah elemen"""
        return len(self.items)

    def clear(self):
        """Kosongkan semua elemen"""
        self.items = []

    def getAll(self):
        """Kembalikan semua elemen stack"""
        return self.items.copy()


# =====================================================
# GLOBAL STATE
# =====================================================
stack = Stack()
operations_count = 0


# =====================================================
# API ENDPOINTS
# =====================================================

@app.route('/api/stack/push', methods=['POST'])
def api_push():
    """API endpoint untuk push elemen ke stack"""
    global operations_count
    
    data = request.get_json()
    value = data.get('value', '').strip()
    
    if not value:
        return jsonify({'error': 'Nilai tidak boleh kosong'}), 400
    
    stack.push(value)
    operations_count += 1
    
    return jsonify({
        'success': True,
        'message': f'Push "{value}" berhasil',
        'stack': stack.getAll(),
        'size': stack.size(),
        'operations': operations_count
    })


@app.route('/api/stack/pop', methods=['POST'])
def api_pop():
    """API endpoint untuk pop elemen dari stack"""
    global operations_count
    
    if stack.isEmpty():
        return jsonify({'error': 'Stack kosong, tidak bisa pop'}), 400
    
    popped = stack.pop()
    operations_count += 1
    
    return jsonify({
        'success': True,
        'message': f'Pop "{popped}" berhasil',
        'popped_value': popped,
        'stack': stack.getAll(),
        'size': stack.size(),
        'operations': operations_count
    })


@app.route('/api/stack/peek', methods=['GET'])
def api_peek():
    """API endpoint untuk peek elemen teratas"""
    global operations_count
    
    if stack.isEmpty():
        return jsonify({
            'success': True,
            'message': 'Stack kosong',
            'peek_value': None,
            'operations': operations_count
        })
    
    peek_val = stack.peek()
    operations_count += 1
    
    return jsonify({
        'success': True,
        'message': f'Peek: {peek_val}',
        'peek_value': peek_val,
        'operations': operations_count
    })


@app.route('/api/stack/clear', methods=['POST'])
def api_clear():
    """API endpoint untuk clear stack"""
    global operations_count
    
    stack.clear()
    operations_count += 1
    
    return jsonify({
        'success': True,
        'message': 'Stack telah dikosongkan',
        'stack': stack.getAll(),
        'size': 0,
        'operations': operations_count
    })


@app.route('/api/stack/status', methods=['GET'])
def api_status():
    """API endpoint untuk mendapatkan status stack"""
    return jsonify({
        'stack': stack.getAll(),
        'size': stack.size(),
        'isEmpty': stack.isEmpty(),
        'operations': operations_count
    })


@app.route('/api/stack/reset', methods=['POST'])
def api_reset():
    """API endpoint untuk reset semua (stack + counter)"""
    global operations_count
    
    stack.clear()
    operations_count = 0
    
    return jsonify({
        'success': True,
        'message': 'Stack dan counter direset',
        'stack': stack.getAll(),
        'size': 0,
        'operations': 0
    })


# =====================================================
# SERVE FRONTEND
# =====================================================
import os

FRONTEND_DIR = os.path.join(os.path.dirname(__file__), '..', 'frontend')

@app.route('/')
def index():
    """Serve index.html"""
    from flask import send_from_directory
    return send_from_directory(FRONTEND_DIR, 'index.html')


@app.route('/<path:filename>')
def serve_static(filename):
    """Serve CSS, JS, dan file statis lainnya"""
    from flask import send_from_directory
    return send_from_directory(FRONTEND_DIR, filename)


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
