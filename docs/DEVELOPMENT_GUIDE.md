# Development Guide & Deployment

## 🛠️ Development Setup

### Prerequisites
- Python 3.7+
- VS Code atau text editor
- Git (optional)
- Postman atau curl (untuk test API)

### Initial Setup

1. **Clone/Download Project**
   ```powershell
   cd c:\Users\Lenovo\Downloads\tugasuasstrukturdata
   ```

2. **Create Virtual Environment (Recommended)**
   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```

3. **Install Dependencies**
   ```powershell
   pip install -r requirements.txt
   ```

4. **Run Development Server**
   ```powershell
   python app.py
   ```

5. **Open in Browser**
   ```
   http://127.0.0.1:5000
   ```

---

## 📁 Project Structure Detail

```
tugasuasstrukturdata/
├── app.py                      # Flask main application (115 lines)
├── script.js                   # Frontend JavaScript (modified - 280 lines)
├── index.html                  # HTML structure (80 lines)
├── style.css                   # Styling (~150 lines)
├── requirements.txt            # Python dependencies (3 packages)
├── README_BACKEND.md           # Backend setup guide
├── API_REFERENCE.md            # API quick reference
├── DOKUMENTASI.md              # This comprehensive documentation
└── DEVELOPMENT_GUIDE.md        # This file
```

---

## 🔄 Development Workflow

### 1. Making Backend Changes

**Example: Adding new endpoint**

```python
@app.route('/api/stack/duplicate-top', methods=['GET'])
def api_duplicate_top():
    """Duplicate elemen paling atas"""
    global operations_count
    
    if stack.isEmpty():
        return jsonify({'error': 'Stack kosong'}), 400
    
    top_val = stack.peek()
    stack.push(top_val)  # Push duplicate
    operations_count += 1
    
    return jsonify({
        'success': True,
        'message': f'Duplicated "{top_val}"',
        'stack': stack.getAll(),
        'size': stack.size(),
        'operations': operations_count
    })
```

**Steps:**
1. Edit `app.py`
2. Server auto-reload (debug mode aktif)
3. Test dengan curl atau frontend

### 2. Making Frontend Changes

**Example: Adding new button**

In `index.html`:
```html
<button class="btn btn-duplicate" onclick="doDuplicate()">Duplicate Top</button>
```

In `script.js`:
```javascript
async function doDuplicate() {
  try {
    const response = await fetch(`${API_BASE_URL}/stack/duplicate-top`);
    const data = await response.json();
    
    if (!response.ok) {
      setInfo(data.error, 'error');
      return;
    }
    
    stackData = data.stack;
    ops = data.operations;
    
    // Update color mapping
    const ci = colorIdx % COLORS.length;
    colorMap.push(ci);
    colorIdx++;
    
    renderStack();
    setInfo(`Duplicated top element successfully.`, 'info');
    addLog('duplicate', `duplicate-top() → "${data.stack[data.stack.length - 1]}"`);
  } catch (error) {
    setInfo(`Error: ${error.message}`, 'error');
  }
}
```

### 3. Debugging

**Enable Console Logging:**

In `script.js`:
```javascript
async function doPush() {
  console.log('Pushing:', value);  // Add this
  
  try {
    const response = await fetch(...);
    console.log('Response:', response.status);  // Add this
    const data = await response.json();
    console.log('Data:', data);  // Add this
    ...
  }
}
```

**Browser DevTools:**
- Press F12 to open DevTools
- Console tab: See logs and errors
- Network tab: See API requests/responses
- Debugger tab: Set breakpoints

---

## 🚀 Deployment Guide

### Option 1: Local Network (LAN)

**Allow network access:**

Edit `app.py`:
```python
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)  # Accept any IP
```

Then access from other computer:
```
http://<YOUR_COMPUTER_IP>:5000
```

### Option 2: Heroku Deployment

**1. Create `Procfile`:**
```
web: gunicorn app:app
```

**2. Update `requirements.txt`:**
```
Flask==2.3.3
flask-cors==4.0.0
Werkzeug==2.3.7
gunicorn==20.1.0
```

**3. Deploy:**
```bash
heroku login
heroku create your-app-name
git push heroku main
```

### Option 3: PythonAnywhere

1. Sign up at pythonywhere.com
2. Upload files
3. Create WSGI config
4. Enable your web app
5. Done!

### Option 4: Using Gunicorn (Local Server)

**Install Gunicorn:**
```powershell
pip install gunicorn
```

**Run:**
```powershell
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

**Access:**
```
http://127.0.0.1:5000
```

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Push with empty value → Error
- [ ] Push "hello" → Size = 1, Ops = 1
- [ ] Push "world" → Size = 2, TOP = "world"
- [ ] Peek → Shows "world", Size = 2
- [ ] Pop → Returns "world", Size = 1
- [ ] Pop last element → Size = 0, empty message
- [ ] Pop empty → Error
- [ ] Clear → Empty stack, Size = 0

### API Testing with Curl

```bash
# Test push
curl -X POST http://127.0.0.1:5000/api/stack/push ^
  -H "Content-Type: application/json" ^
  -d "{\"value\": \"test\"}"

# Test status
curl http://127.0.0.1:5000/api/stack/status

# Test pop
curl -X POST http://127.0.0.1:5000/api/stack/pop

# Test clear
curl -X POST http://127.0.0.1:5000/api/stack/clear
```

### Load Testing

Using Apache Bench:
```bash
ab -n 1000 -c 10 http://127.0.0.1:5000/api/stack/status
```

---

## 📊 Code Metrics

### Lines of Code
- `app.py`: ~115 lines
- `script.js`: ~280 lines (modified)
- `index.html`: ~80 lines
- `style.css`: ~150 lines
- **Total:** ~625 lines

### Complexity
- **Time Complexity:** O(1) for all operations
- **Space Complexity:** O(n) where n = stack size
- **Big-O:** Very efficient

---

## 🔧 Common Tasks

### Task: Change Port Number

1. Edit `app.py`:
```python
app.run(debug=True, host='127.0.0.1', port=8000)
```

2. Edit `script.js`:
```javascript
const API_BASE_URL = 'http://127.0.0.1:8000/api';
```

### Task: Add Persistent Storage (SQLite)

1. Install SQLAlchemy:
```powershell
pip install SQLAlchemy
```

2. Modify `app.py`:
```python
from flask_sqlalchemy import SQLAlchemy

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///stack.db'
db = SQLAlchemy(app)

class StackHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    operation = db.Column(db.String(50))
    value = db.Column(db.String(200))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

@app.route('/api/stack/push', methods=['POST'])
def api_push():
    # ... existing code ...
    
    # Save to database
    history = StackHistory(operation='push', value=value)
    db.session.add(history)
    db.session.commit()
    
    return jsonify({...})
```

### Task: Add Authentication

1. Install Flask-Login:
```powershell
pip install Flask-Login
```

2. Add login route:
```python
from flask_login import LoginManager, login_required

login_manager = LoginManager()
login_manager.init_app(app)

@app.route('/login', methods=['POST'])
def login():
    # Implement login logic
    pass

@app.route('/api/stack/push', methods=['POST'])
@login_required
def api_push():
    # Existing logic
    pass
```

### Task: Enable HTTPS (Self-signed cert)

```bash
# Generate certificate (one-time)
openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365

# Run with HTTPS
python app.py --ssl-context=adhoc
```

---

## 🐛 Debugging Tips

### Issue: API returns 404
- Check endpoint URL spelling
- Verify Flask server is running
- Check API_BASE_URL in script.js

### Issue: CORS error
- Make sure `CORS(app)` is in app.py
- Verify frontend URL matches API domain

### Issue: State not updating
- Check browser console for errors
- Verify API response format
- Check colorMap array

### Issue: Frontend is slow
- Minimize DOM manipulations
- Use requestAnimationFrame for animations
- Cache frequently accessed elements

---

## 📈 Performance Optimization

### Caching
```javascript
// Cache DOM elements
const stackContainer = document.getElementById('stackVis');
const infoBox = document.getElementById('infoBox');
```

### Debouncing Input
```javascript
let debounceTimer;
inputField.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    // Validate input
  }, 300);
});
```

### Batch Updates
```javascript
// Instead of multiple re-renders
renderStack();  // ONE render call

// Update multiple UI elements at once
updateStats();
renderStack();
addLog('push', msg);
```

---

## 📚 Resources

### Official Documentation
- [Flask Docs](https://flask.palletsprojects.com/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Python Docs](https://docs.python.org/3/)

### Useful Tools
- [Postman](https://www.postman.com/) - API testing
- [VS Code](https://code.visualstudio.com/) - Code editor
- [Python Debugger](https://docs.python.org/3/library/pdb.html) - Python debugging

---

## ✅ Checklist for New Developers

- [ ] Cloned/downloaded project
- [ ] Created virtual environment
- [ ] Installed dependencies
- [ ] Ran Flask server successfully
- [ ] Accessed http://127.0.0.1:5000
- [ ] Tested all operations (Push/Pop/Peek/Clear)
- [ ] Opened DevTools (F12)
- [ ] Tested API with curl or Postman
- [ ] Read DOKUMENTASI.md
- [ ] Read API_REFERENCE.md

---

**Last Updated:** May 1, 2026
**Version:** 1.0
