// =====================================
// INFORMASI STOK / KATALOG BUKU
// =====================================

let daftarKatalog = document.getElementById("daftarKatalog");
let formKatalog = document.getElementById("formKatalog");

// Menampilkan data katalog
function tampilkanKatalog() {
    if (!daftarKatalog) return;

    daftarKatalog.innerHTML = "";

    dataKatalogBuku.forEach(function(buku, index) {
        let baris = document.createElement("tr");

        let kolomNo = document.createElement("td");
        kolomNo.textContent = index + 1;

        let kolomKode = document.createElement("td");
        kolomKode.textContent = buku.kodeBarang;

        let kolomNama = document.createElement("td");
        kolomNama.textContent = buku.namaBarang;

        let kolomJenis = document.createElement("td");
        kolomJenis.textContent = buku.jenisBarang;

        let kolomEdisi = document.createElement("td");
        kolomEdisi.textContent = buku.edisi;

        let kolomStok = document.createElement("td");
        kolomStok.textContent = buku.stok;

        let kolomHarga = document.createElement("td");
        kolomHarga.textContent = buku.harga;

        baris.appendChild(kolomNo);
        baris.appendChild(kolomKode);
        baris.appendChild(kolomNama);
        baris.appendChild(kolomJenis);
        baris.appendChild(kolomEdisi);
        baris.appendChild(kolomStok);
        baris.appendChild(kolomHarga);

        daftarKatalog.appendChild(baris);
    });
}

// Menampilkan katalog saat halaman dibuka
tampilkanKatalog();

// Menambahkan buku baru
if (formKatalog) {
    formKatalog.addEventListener("submit", function(e) {
        e.preventDefault();

        let bukuBaru = {
            kodeBarang: document.getElementById("kodeBarang").value,
            namaBarang: document.getElementById("namaBarang").value,
            jenisBarang: document.getElementById("jenisBarang").value,
            edisi: document.getElementById("edisi").value,
            stok: Number(document.getElementById("stok").value),
            harga: document.getElementById("harga").value,
            cover: document.getElementById("cover").value
        };

        dataKatalogBuku.push(bukuBaru);

        tampilkanKatalog();

        formKatalog.reset();

        alert("Data buku berhasil ditambahkan!");
    });
}