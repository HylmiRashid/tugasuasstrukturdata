# 🔧 Implementation Details - Code Deep Dive

Dokumentasi ini menjelaskan implementasi detail Stack dan bagaimana kode bekerja.

---

## 📌 Table of Contents

1. [Backend Implementation](#backend-implementation)
2. [Frontend Implementation](#frontend-implementation)
3. [State Management](#state-management)
4. [Error Handling](#error-handling)
5. [Data Flow](#data-flow)

---

## Backend Implementation

### Stack Class - Python

#### Source Code (app.py lines 7-38)

```python
class Stack:
    def __init__(self):
        """Initialize empty stack"""
        self.items = []
    
    def push(self, element):
        """Add element to top of stack (O(1))"""
        self.items.append(element)
        return True
    
    def pop(self):
        """Remove and return top element (O(1))"""
        if self.isEmpty():
            return None
        return self.items.pop()
    
    def peek(self):
        """Return top element without removing (O(1))"""
        if self.isEmpty():
            return None
        return self.items[-1]
    
    def isEmpty(self):
        """Check if stack is empty (O(1))"""
        return len(self.items) == 0
    
    def size(self):
        """Return number of elements (O(1))"""
        return len(self.items)
    
    def clear(self):
        """Remove all elements (O(n))"""
        self.items = []
    
    def getAll(self):
        """Return copy of all elements (O(n))"""
        return self.items.copy()
```

#### Time Complexity Analysis

| Operation | Time | Space | Notes |
|-----------|------|-------|-------|
| `push()` | O(1) | O(1) | Append to list = constant |
| `pop()` | O(1) | O(1) | Pop from list = constant |
| `peek()` | O(1) | O(1) | Index access = constant |
| `isEmpty()` | O(1) | O(1) | Length check = constant |
| `size()` | O(1) | O(1) | Return length = constant |
| `clear()` | O(n) | O(n) | Clear all items = linear |
| `getAll()` | O(n) | O(n) | Copy all items = linear |

**Why Python list is good for Stack:**
- Append & pop from end = O(1)
- No need to shift elements (unlike remove from front)
- Efficient memory usage

---

### Global State

```python
# Global state variables (app.py lines 41-43)
stack = Stack()              # Instance of Stack class
operations_count = 0         # Counter untuk all operations
```

**Why global?**
- Persist state across requests
- Share state between API endpoints
- Simple implementation (good for learning)

**⚠️ Note:** Ini bukan production practice. Gunakan database untuk persistent storage.

---

### API Endpoint Implementation

#### Example: Push Endpoint

```python
@app.route('/api/stack/push', methods=['POST'])
def api_push():
    """Handle push request"""
    global operations_count
    
    # 1. Parse request
    data = request.get_json()
    value = data.get('value', '').strip()
    
    # 2. Validate input
    if not value:
        return jsonify({'error': 'Nilai tidak boleh kosong'}), 400
    
    # 3. Perform operation
    stack.push(value)
    operations_count += 1
    
    # 4. Return response
    return jsonify({
        'success': True,
        'message': f'Push "{value}" berhasil',
        'stack': stack.getAll(),
        'size': stack.size(),
        'operations': operations_count
    })
```

**Flow breakdown:**
```
Request: POST /api/stack/push {"value": "hello"}
    ↓
Parse JSON data
    ↓
Validate: value != empty
    ↓
Execute: stack.push("hello")
         operations_count += 1
    ↓
Response: {success, message, stack, size, operations}
```

---

## Frontend Implementation

### State Management in JavaScript

```javascript
// app.js lines 1-15
const API_BASE_URL = 'http://127.0.0.1:5000/api';

let stackData = [];      // From backend API
let ops = 0;             // From backend API
let colorIdx = 0;        // Local tracking
let colorMap = [];       // Visual mapping
```

**State separation:**
- **Backend state:** `stackData`, `ops` (source of truth)
- **Frontend state:** `colorIdx`, `colorMap` (UI only)

---

### Rendering Pipeline

#### renderStack() Function

```javascript
function renderStack() {
  // 1. Get DOM elements
  const vis = document.getElementById('stackVis');
  const empty = document.getElementById('emptyMsg');
  
  // 2. Clear old elements
  vis.querySelectorAll('.stack-item').forEach(el => el.remove());
  
  // 3. Update stats
  updateStats();
  
  // 4. Handle empty state
  if (stackData.length === 0) {
    empty.style.display = 'block';
    return;
  }
  
  empty.style.display = 'none';
  
  // 5. Render each element
  stackData.forEach((val, i) => {
    const isTop = i === stackData.length - 1;
    const ci = colorMap[i] % COLORS.length;
    
    // Create element
    const div = document.createElement('div');
    div.className = 'stack-item' + (isTop ? ' top' : '');
    div.textContent = val;
    
    // Apply styling
    div.style.background = COLORS[ci];
    div.style.color = TEXT_COLORS[ci];
    div.style.borderColor = isTop 
      ? BORDER_COLORS[ci]
      : BORDER_COLORS[ci] + '55';  // Semi-transparent
    
    // Add to DOM (insert from top so order reversed)
    vis.insertBefore(div, vis.firstChild);
  });
}
```

**Why insert from top?**
- `insertBefore(newNode, firstChild)` places new node at top
- Loop from index 0 to n
- Result: visual order is reversed (index 0 at bottom, n at top)

**Rendering complexity:** O(n) where n = stack size

---

### Async Operations

#### Push Operation Flow

```javascript
async function doPush() {
  // 1. Get input value
  const inp = document.getElementById('inputVal');
  const val = inp.value.trim();
  
  // 2. Validate
  if (!val) {
    setInfo('Masukkan nilai terlebih dahulu.', 'error');
    return;
  }
  
  try {
    // 3. Send API request
    const response = await fetch(`${API_BASE_URL}/stack/push`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: val })
    });
    
    // 4. Parse response
    const data = await response.json();
    
    // 5. Check for errors
    if (!response.ok) {
      setInfo(data.error || 'Error saat push', 'error');
      return;
    }
    
    // 6. Update frontend state from backend
    stackData = data.stack;
    ops = data.operations;
    
    // 7. Add color mapping
    const ci = colorIdx % COLORS.length;
    colorMap.push(ci);
    colorIdx++;
    
    // 8. Clear input
    inp.value = '';
    
    // 9. Update UI
    renderStack();
    setInfo(`Nilai "${val}" berhasil ditambahkan ke dalam stack.`, 'info');
    addLog('push', `push("${val}")`);
    
  } catch (error) {
    // 10. Handle network errors
    setInfo(`Error: ${error.message}`, 'error');
  }
}
```

**Execution flow:**
```
User input "hello" + Click Push
    ↓
Fetch POST /api/stack/push {"value": "hello"}
    ↓ (waiting...)
Backend processes
    ↓
Response: {success, stack: ["hello"], operations: 1}
    ↓
Update stackData = ["hello"]
Update ops = 1
Add color
    ↓
renderStack()  → Update UI
    ↓
Update info box & history log
```

---

## State Management

### Backend State Flow

```
┌─────────────────────────────────────────────┐
│         Global Backend State                 │
├─────────────────────────────────────────────┤
│                                              │
│  stack = Stack()                             │
│  ┌──────────────────────────────────┐       │
│  │ items = ["hello", "world"]       │       │
│  └──────────────────────────────────┘       │
│                                              │
│  operations_count = 5                        │
│                                              │
│  * State exists only in memory               │
│  * Lost when server restarts                 │
│  * Shared across all requests                │
│                                              │
└─────────────────────────────────────────────┘
```

### Frontend State Flow

```
┌──────────────────────────────────────────┐
│       Frontend Local State (Browser)       │
├──────────────────────────────────────────┤
│                                           │
│  stackData = ["hello", "world"]          │ ← From backend
│  ops = 5                                  │ ← From backend
│  colorIdx = 2                             │ ← Local tracking
│  colorMap = [0, 1]                        │ ← Local tracking
│                                           │
│  * Synced from backend after each op      │
│  * Used for rendering UI                  │
│  * Visual state only                      │
│                                           │
└──────────────────────────────────────────┘
```

---

## Error Handling

### Backend Error Handling

```python
@app.route('/api/stack/push', methods=['POST'])
def api_push():
    try:
        # Validation error
        if not value:
            return jsonify({'error': 'Nilai tidak boleh kosong'}), 400
        
        # Execute
        stack.push(value)
        
        # Success
        return jsonify({'success': True, ...})
        
    except Exception as e:
        # Unexpected error
        return jsonify({'error': str(e)}), 500
```

**Error types:**
- **400**: Validation/Bad Request (client error)
- **500**: Server error (unexpected exception)

---

### Frontend Error Handling

```javascript
async function doPush() {
  try {
    // API call
    const response = await fetch(...);
    const data = await response.json();
    
    // HTTP error check
    if (!response.ok) {
      setInfo(data.error, 'error');  // Show error to user
      return;
    }
    
    // Success
    stackData = data.stack;
    renderStack();
    
  } catch (error) {
    // Network error
    setInfo(`Error: ${error.message}`, 'error');
  }
}
```

**Error scenarios:**
1. **Empty input** → Validation error
2. **Pop on empty** → Logic error
3. **Network down** → Catch block
4. **Backend crash** → HTTP 500

---

## Data Flow

### Complete Request-Response Cycle

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  1. User types "hello" in input field                        │
│     input.value = "hello"                                    │
│                                                               │
│  2. Click Push button                                        │
│     → Call doPush()                                          │
│                                                               │
│  3. Validate input                                           │
│     if (!val) → show error & return                          │
│                                                               │
│  4. Prepare request                                          │
│     method: 'POST'                                           │
│     body: JSON.stringify({ value: 'hello' })                │
│                                                               │
│  5. Send FETCH request                                       │
│     POST /api/stack/push HTTP/1.1                           │
│     Content-Type: application/json                          │
│     {"value": "hello"}                                      │
│                   ↓ HTTP ↓                                   │
└─────────────────────────────────────────────────────────────┘
                        NETWORK
┌─────────────────────────────────────────────────────────────┐
│                   SERVER (Flask)                             │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  6. Receive request                                          │
│     @app.route('/api/stack/push', methods=['POST'])         │
│     def api_push():                                          │
│                                                               │
│  7. Parse JSON                                               │
│     data = request.get_json()                               │
│     value = data.get('value', '').strip()                  │
│     → value = "hello"                                       │
│                                                               │
│  8. Validate                                                 │
│     if not value:                                            │
│         return error 400  # (not executed)                  │
│                                                               │
│  9. Execute operation                                        │
│     stack.push("hello")     # items = ["hello"]            │
│     operations_count += 1   # = 1                          │
│                                                               │
│  10. Build response                                          │
│      {                                                       │
│        "success": true,                                      │
│        "message": "Push 'hello' berhasil",                  │
│        "stack": ["hello"],                                   │
│        "size": 1,                                            │
│        "operations": 1                                       │
│      }                                                       │
│                                                               │
│  11. Send response                                           │
│      HTTP/1.1 200 OK                                        │
│      Content-Type: application/json                        │
│      {...}                                                   │
│                   ↓ HTTP ↓                                   │
└─────────────────────────────────────────────────────────────┘
                        NETWORK
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  12. Receive response                                        │
│      const data = await response.json()                     │
│      data = {...}  (parsed JSON)                            │
│                                                               │
│  13. Check status                                            │
│      if (!response.ok) → (not executed)                     │
│                                                               │
│  14. Update frontend state                                   │
│      stackData = data.stack = ["hello"]                     │
│      ops = data.operations = 1                              │
│      colorMap.push(0)                                       │
│      colorIdx++ = 1                                         │
│                                                               │
│  15. Update UI                                               │
│      renderStack()                                           │
│      → Creates div with "hello ← TOP"                       │
│      → Sets background, border, shadow                      │
│      → Appends to DOM                                        │
│                                                               │
│  16. Update info box                                         │
│      setInfo("Nilai 'hello' berhasil...")                   │
│                                                               │
│  17. Update history log                                      │
│      addLog('push', 'push("hello")')                        │
│                                                               │
│  18. Clear input                                             │
│      input.value = ""                                       │
│                                                               │
│  UI Updated! ✅                                              │
│  Stack visualization shows: hello ← TOP                     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 State Diagram

### Push "hello"

```
BEFORE:
stackData = []
ops = 0

        ↓ doPush("hello")
        
AFTER:
stackData = ["hello"]  ← Updated from backend response
ops = 1                ← Updated from backend response
colorMap = [0]
colorIdx = 1

        ↓ renderStack()
        
UI:
┌─────────────┐
│  hello      │
│  ← TOP      │
└─────────────┘
Size: 1, Ops: 1
```

### Push "world"

```
BEFORE:
stackData = ["hello"]
ops = 1

        ↓ doPush("world")
        
AFTER:
stackData = ["hello", "world"]  ← Backend re-returns full stack
ops = 2
colorMap = [0, 1]
colorIdx = 2

        ↓ renderStack()
        
UI:
┌─────────────┐
│  world      │
│  ← TOP      │
├─────────────┤
│  hello      │
└─────────────┘
Size: 2, Ops: 2
```

### Pop "world"

```
BEFORE:
stackData = ["hello", "world"]
ops = 2

        ↓ doPop()
        
AFTER:
stackData = ["hello"]  ← Backend re-returns after pop
ops = 3
colorMap = [0]         ← colorMap.pop()
colorIdx = 2           ← Unchanged

        ↓ renderStack()
        
UI:
┌─────────────┐
│  hello      │
│  ← TOP      │
└─────────────┘
Size: 1, Ops: 3
```

---

## 💾 Data Persistence

### Current Architecture
```
┌──────────────┐
│  Browser     │  (Local state in memory)
├──────────────┤
│  stackData   │  ← Discarded when page refresh
│  ops         │  ← Lost when browser closed
└──────────────┘
         ↕
    Fetch API
         ↕
┌──────────────┐
│  Flask       │  (Global state in memory)
├──────────────┤
│  stack       │  ← Discarded when server restart
│  operations  │  ← Shared by all users
└──────────────┘
```

### To Add Database Persistence

```python
# Option 1: SQLite
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy(app)

class StackRecord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.String(100))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

# Option 2: PostgreSQL
DATABASE_URL = "postgresql://user:pass@localhost/stack_db"
```

---

## 📊 Performance Analysis

### Frontend Rendering Performance

```
renderStack() {
  1. Get DOM (O(1))
  2. Clear old elements (O(n))
  3. Update stats (O(1))
  4. Render each element (O(n))
     - Create div
     - Set styles
     - Add to DOM
}

Total: O(n) where n = stack size
```

**For n=1000:**
- ~1000 DOM creations
- ~1000 style updates
- Typical time: <50ms

---

### Backend Performance

```
api_push() {
  1. Parse JSON (O(1))
  2. Validate (O(1))
  3. Push (O(1))
  4. Increment counter (O(1))
  5. Get all items (O(n))  ← Most expensive
  6. Build response (O(1))
}

Total: O(n) where n = stack size
```

**For n=1000:**
- ~1000 item copy
- Typical time: <1ms

---

## 🔍 Debugging Tips

### Add console logging

```javascript
async function doPush() {
  console.log('=== PUSH START ===');
  console.log('Input value:', val);
  
  const response = await fetch(...);
  console.log('Response status:', response.status);
  
  const data = await response.json();
  console.log('Response data:', data);
  
  stackData = data.stack;
  console.log('Updated stackData:', stackData);
  
  renderStack();
  console.log('=== PUSH END ===');
}
```

### Check Network tab in DevTools

1. Press F12 → Network tab
2. Perform operation
3. Click on request
4. See Request/Response details

### Check Application state

```javascript
// In browser console
console.log(stackData)    // Current stack
console.log(ops)          // Operations count
console.log(colorMap)     // Color mapping
```

---

## 📝 Summary

### Key Implementation Points

1. **Backend (Python):**
   - Stack class dengan LIFO operations
   - Global state management
   - REST API dengan JSON

2. **Frontend (JavaScript):**
   - Async/await untuk API calls
   - State sync from backend
   - O(n) rendering

3. **Data Flow:**
   - User action → API request → Backend process → Response → UI update

4. **Error Handling:**
   - Validation errors (400)
   - Logic errors (business logic)
   - Network errors (try-catch)

---

**Last Updated:** May 1, 2026
