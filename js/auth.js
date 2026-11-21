document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    // We use dummy email format for username login (e.g. user@ffglory.com)
    const email = `${username}@ffglory.com`;
    const btn = e.target.querySelector('button');
    btn.innerText = "Loading...";

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Check if user is admin or normal user
            if (username === 'admin') {
                window.location.href = "../admin/dashboard.html";
            } else {
                window.location.href = "dashboard.html";
            }
        })
        .catch((error) => {
            document.getElementById('error-msg').innerText = error.message;
            btn.innerText = "Sign In";
        });
});