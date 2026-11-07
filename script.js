
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


// =====================================
// DASHBOARD
// =====================================

// Mengambil data pengguna yang sedang login
let penggunaLogin = JSON.parse(
    sessionStorage.getItem("penggunaLogin")
);

// Mengecek apakah sedang berada di halaman Dashboard
let halamanDashboard = document.getElementById("greeting");

if (halamanDashboard) {

    // Mengecek sesi login
    if (!penggunaLogin) {

        window.location.href = "login.html";

    } else {

        // Menampilkan nama pengguna
        document.getElementById("namaPengguna").innerHTML =
            "Halo, " + penggunaLogin.nama + "!";

        // Greeting berdasarkan waktu lokal
        function tampilkanGreeting() {

            let waktu = new Date();
            let jam = waktu.getHours();

            let greeting;

            if (jam >= 5 && jam < 11) {
                greeting = "Selamat Pagi!";
            }
            else if (jam >= 11 && jam < 15) {
                greeting = "Selamat Siang!";
            }
            else if (jam >= 15 && jam < 18) {
                greeting = "Selamat Sore!";
            }
            else {
                greeting = "Selamat Malam!";
            }

            document.getElementById("greeting").innerHTML =
                greeting;
        }

        // Menjalankan greeting
        tampilkanGreeting();

    }

}


// =====================================
// NAVIGASI MENU
// =====================================

function bukaHalaman(halaman) {
    window.location.href = halaman;
}


// =====================================
// LOGOUT
// =====================================

function logout() {

    let konfirmasi = confirm(
        "Apakah Anda yakin ingin logout?"
    );

    if (konfirmasi) {

        sessionStorage.removeItem("penggunaLogin");

        window.location.href = "login.html";

    }

}
