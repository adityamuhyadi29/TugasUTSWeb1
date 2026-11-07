
// Data login contoh
const emailBenar = "admin@gmail.com";
const passwordBenar = "123456";

// Validasi Login
document.getElementById("loginForm")
    .addEventListener("submit", function(e) {

    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email === emailBenar &&
        password === passwordBenar) {

        alert("Login berhasil!");

        // Arahkan ke halaman dashboard
        // window.location.href = "dashboard.html";

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
