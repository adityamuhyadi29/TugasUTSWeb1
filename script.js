
// Proses Login
document.getElementById("loginForm")
    .addEventListener("submit", function(e) {

    e.preventDefault();

    // Mengambil input email dan password
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Mencari pengguna berdasarkan email dan password
    let pengguna = dataPengguna.find(function(user) {
        return user.email === email &&
               user.password === password;
    });

    // Mengecek apakah pengguna ditemukan
    if (pengguna) {

        alert("Login berhasil! Selamat datang " + pengguna.nama);

        // Mengecek role pengguna
        if (pengguna.role === "Admin") {
            window.location.href = "admin.html";
        } 
        else if (pengguna.role === "User") {
            window.location.href = "dashboard.html";
        }

    } else {

        alert("email/password yang anda masukkan salah");

    }

});


// Membuka Modal
function openModal(id) {
    document.getElementById(id).style.display = "flex";
}


// Menutup Modal
function closeModal(id) {
    document.getElementById(id).style.display = "none";
}


// Menutup modal ketika klik di luar kotak
window.onclick = function(event) {
    if (event.target.classList.contains("modal")) {
        event.target.style.display = "none";
    }
};
