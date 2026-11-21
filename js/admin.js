auth.onAuthStateChanged(user => {
    if (!user) window.location.href = 'login.html';
    else loadPayments();
});

function loadPayments() {
    db.ref('payments').on('value', snapshot => {
        const tbody = document.querySelector('#paymentsTable tbody');
        tbody.innerHTML = '';
        const data = snapshot.val();
        
        if(!data) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No pending payments.</td></tr>';
            return;
        }

        Object.keys(data).forEach(key => {
            const p = data[key];
            if (p.status === 'pending') {
                tbody.innerHTML += `
                    <tr id="row-${key}">
                        <td>${p.username}</td>
                        <td>${p.method.toUpperCase()}</td>
                        <td>${p.amount}</td>
                        <td>${p.trxId}</td>
                        <td>
                            <button class="action-btn btn-approve" onclick="approvePayment('${key}', '${p.uid}', '${p.amount}')">Approve</button>
                            <button class="action-btn btn-reject" onclick="rejectPayment('${key}')">Reject</button>
                        </td>
                    </tr>
                `;
            }
        });
    });
}

function approvePayment(paymentKey, userId, amount) {
    // Determine how many credits to add based on amount (Example logic)
    // Here assuming amount is equivalent to 1 credit for basic
    const creditsToAdd = amount >= 90 ? 1 : 0; 

    const updates = {};
    // Update payment status
    updates[`payments/${paymentKey}/status`] = 'approved';
    
    // Add credits to user (Firebase Transactions is best for this, but doing a simple increment here)
    db.ref('users/' + userId).once('value').then(snap => {
        const user = snap.val() || {};
        updates[`users/${userId}/basic`] = (user.basic || 0) + creditsToAdd;
        
        // Apply all updates
        db.ref().update(updates).then(() => {
            alert('Payment Approved! Credits Added.');
            document.getElementById('row-' + paymentKey).remove();
        });
    });
}

function rejectPayment(paymentKey) {
    db.ref(`payments/${paymentKey}/status`).set('rejected').then(() => {
        alert('Payment Rejected.');
        document.getElementById('row-' + paymentKey).remove();
    });
}

function updateLogo() {
    const url = document.getElementById('logoUrl').value;
    if(!url) return;
    db.ref('settings/logoUrl').set(url).then(() => alert('Logo Updated globally!'));
}

function logoutAdmin() {
    auth.signOut().then(() => window.location.href = 'login.html');
}
