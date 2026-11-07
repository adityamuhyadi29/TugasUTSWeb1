// =====================================
// INFORMASI PENGIRIMAN / TRACKING
// =====================================

let formTracking = document.getElementById("formTracking");

if (formTracking) {

    formTracking.addEventListener("submit", function(e) {
        e.preventDefault();

        let nomorDO = document.getElementById("nomorDO").value.trim();

        // Mencari data tracking
        let pengiriman = dataTracking[nomorDO];

        let hasil = document.getElementById("hasilTracking");
        let pesan = document.getElementById("pesanTidakDitemukan");

        if (pengiriman) {

            hasil.style.display = "block";
            pesan.style.display = "none";

            // Menampilkan informasi pengiriman
            document.getElementById("hasilDO").textContent =
                pengiriman.nomorDO;

            document.getElementById("hasilNama").textContent =
                pengiriman.nama;

            document.getElementById("hasilEkspedisi").textContent =
                pengiriman.ekspedisi;

            document.getElementById("hasilTanggal").textContent =
                pengiriman.tanggalKirim;

            document.getElementById("hasilPaket").textContent =
                pengiriman.paket;

            document.getElementById("hasilTotal").textContent =
                pengiriman.total;

            // Menentukan progress berdasarkan status
            let persentase = 0;

            if (pengiriman.status === "Sedang Diproses") {
                persentase = 25;
            }
            else if (pengiriman.status === "Dalam Perjalanan") {
                persentase = 65;
            }
            else if (pengiriman.status === "Telah Diterima") {
                persentase = 100;
            }

            document.getElementById("statusPengiriman").textContent =
                pengiriman.status;

            document.getElementById("progressBar").style.width =
                persentase + "%";

            document.getElementById("teksProgress").textContent =
                persentase + "% - " + pengiriman.status;

            // Menampilkan riwayat perjalanan
            let riwayat = document.getElementById("riwayatPerjalanan");

            riwayat.innerHTML = "";

            pengiriman.perjalanan.forEach(function(perjalanan) {

                let baris = document.createElement("tr");

                let kolomWaktu = document.createElement("td");
                kolomWaktu.textContent = perjalanan.waktu;

                let kolomKeterangan = document.createElement("td");
                kolomKeterangan.textContent = perjalanan.keterangan;

                baris.appendChild(kolomWaktu);
                baris.appendChild(kolomKeterangan);

                riwayat.appendChild(baris);

            });

        } else {

            hasil.style.display = "none";
            pesan.style.display = "block";

        }
    });
}