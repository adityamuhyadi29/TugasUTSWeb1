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
