let stack = new Stack();
let totalOperations = 0;
let logList = [];

const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from { opacity: 0; transform: translateY(-10px); }
        to   { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

function refreshDisplay() {
    document.getElementById("ukuran").textContent = stack.size();
    document.getElementById("operasi").textContent = totalOperations;

    const column = document.getElementById("kolomnya");
    column.innerHTML = "";

    if (stack.isEmpty()) {
        column.innerHTML = '<div style="text-align:center; color:#555; padding:20px; opacity:0.6;">[ EMPTY ]</div>';
        document.getElementById("topnya").style.display = "none";
        document.getElementById("labelnya").textContent = "";
        return;
    }

    stack.items.forEach(item => {
        const div = document.createElement("div");
        div.textContent = item;
        div.style.animation = "slideIn 0.3s ease-out";
        column.appendChild(div);
    });

    const topElement = document.getElementById("topnya");
    topElement.style.display = "block";
    topElement.style.bottom = (stack.size() * 55 - 15) + "px";
    document.getElementById("labelnya").textContent = stack.peek() + " -> TOP";
}

function showNotif(message, type = "info") {
    const notif = document.getElementById("notif");
    notif.textContent = message;

    const color = type === "success" ? "#00F000"
                : type === "error"   ? "#ff4444"
                :                      "#79AE6F";

    notif.style.borderColor = color;
    notif.style.color = color;

    setTimeout(() => {
        notif.textContent = "";
        notif.style.borderColor = "#79AE6F";
        notif.style.color = "#79AE6F";
    }, 3000);
}

function addLog(action, value = "") {
    const time = new Date().toLocaleTimeString("id-ID");
    const entry = `[${time}] ${action}${value ? ': ' + value : ''}`;
    logList.push(entry);

    const area = document.getElementById("areahistory");
    const div = document.createElement("div");
    div.textContent = entry;
    div.className = `operation-${action.toLowerCase()}`;
    area.appendChild(div);
    area.scrollTop = area.scrollHeight;
}

function pushAction() {
    const input = document.getElementById("inputnilai");
    const value = input.value.trim();

    if (!value) {
        showNotif("Masukkan nilai dulu!", "error");
        input.focus();
        return;
    }

    if (stack.isFull()) {
        showNotif("Stack penuh!", "error");
        return;
    }

    stack.push(value);
    totalOperations++;
    refreshDisplay();
    addLog("PUSH", value);
    showNotif(`Push "${value}" berhasil`, "success");
    input.value = "";
    input.focus();
}

function popAction() {
    if (stack.isEmpty()) {
        showNotif("Stack kosong, gabisa pop!", "error");
        return;
    }

    const value = stack.pop();
    totalOperations++;
    refreshDisplay();
    addLog("POP", value);
    showNotif(`Pop "${value}" berhasil`, "success");
}

function peekAction() {
    if (stack.isEmpty()) {
        showNotif("Stack kosong!", "error");
        return;
    }

    const value = stack.peek();
    totalOperations++;
    refreshDisplay();
    addLog("PEEK", value);
    showNotif(`-> Top: "${value}"`, "info");
}

function clearAction() {
    if (!confirm("Yakin mau hapus semua?")) return;

    stack.clear();
    totalOperations++;
    refreshDisplay();
    addLog("CLEAR");
    showNotif("Stack dikosongkan", "success");
}

document.addEventListener("DOMContentLoaded", () => {
    refreshDisplay();
    document.getElementById("inputnilai").addEventListener("keypress", e => {
        if (e.key === "Enter") pushAction();
    });
});