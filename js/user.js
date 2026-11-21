// js/user.js
function switchTab(tabId, element) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    document.getElementById('tab-' + tabId).style.display = 'block';
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    element.classList.add('active');
}

auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('user-name').innerText = user.email.split('@')[0];
        db.ref('users/' + user.uid).on('value', snapshot => {
            const data = snapshot.val();
            if (data) {
                document.getElementById('basic-credit').innerText = data.basic || 0;
                document.getElementById('special-credit').innerText = data.special || 0;
            }
        });
    } else {
        window.location.href = 'login.html';
    }
});

function logout() { auth.signOut().then(() => window.location.href = 'login.html'); }

let currentMethod = '';
let currentAmount = 0;

function showPayment(method, amount) {
    currentMethod = method;
    currentAmount = amount;
    document.getElementById('paymentModal').style.display = 'flex';
    document.getElementById('modalTitle').innerText = `Pay via ${method.toUpperCase()}`;
    document.getElementById('modalAmount').innerText = method === 'binance' ? `$${amount}` : `৳${amount}`;
}

function closeModal() { document.getElementById('paymentModal').style.display = 'none'; }

function submitPayment() {
    const sender = document.getElementById('senderNumber').value;
    const trxId = document.getElementById('trxId').value;
    const user = auth.currentUser;

    if(!sender || !trxId) return alert("Please fill all fields!");

    db.ref('payments').push({
        uid: user.uid,
        username: user.email.split('@')[0],
        method: currentMethod,
        amount: currentAmount,
        sender: sender,
        trxId: trxId,
        status: "pending",
        date: new Date().toISOString()
    }).then(() => {
        alert("Payment submitted! Please wait for admin approval.");
        closeModal();
    });
}
