// =====================================
// PROSES LOGIN
// =====================================

let formLogin = document.getElementById("loginForm");

if (formLogin) {

    formLogin.addEventListener("submit", function(e) {

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

            // Menyimpan data pengguna yang login
            sessionStorage.setItem(
                "penggunaLogin",
                JSON.stringify(pengguna)
            );

            window.location.href = "dashboard.html";

            // Mengarahkan berdasarkan role
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

}


// =====================================
// MODAL LOGIN
// =====================================

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
