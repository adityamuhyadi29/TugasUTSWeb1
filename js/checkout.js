// =====================================
// HALAMAN PEMESANAN / CHECKOUT
// =====================================

let daftarBuku = document.getElementById("daftarBuku");
let keranjang = document.getElementById("keranjang");
let formPemesanan = document.getElementById("formPemesanan");

let dataKeranjang = [];

// Format harga menjadi Rupiah
function formatRupiah(harga) {
    return "Rp " + harga.toLocaleString("id-ID");
}

// Menampilkan katalog buku
function tampilkanBuku() {
    if (!daftarBuku) return;

    daftarBuku.innerHTML = "";

    dataKatalogBuku.forEach(function(buku, index) {
        let kartu = document.createElement("div");

        let gambar = document.createElement("img");
        gambar.src = buku.cover;
        gambar.alt = buku.namaBarang;

        let nama = document.createElement("h3");
        nama.textContent = buku.namaBarang;

        let kode = document.createElement("p");
        kode.textContent = "Kode: " + buku.kodeBarang;

        let stok = document.createElement("p");
        stok.textContent = "Stok: " + buku.stok;

        let harga = document.createElement("p");
        harga.textContent = formatRupiah(buku.harga);

        let tombol = document.createElement("button");
        tombol.textContent = "Tambah ke Keranjang";

        tombol.addEventListener("click", function() {
            tambahKeranjang(index);
        });

        kartu.appendChild(gambar);
        kartu.appendChild(nama);
        kartu.appendChild(kode);
        kartu.appendChild(stok);
        kartu.appendChild(harga);
        kartu.appendChild(tombol);

        daftarBuku.appendChild(kartu);
    });
}

// Menambahkan buku ke keranjang
function tambahKeranjang(index) {
    let buku = dataKatalogBuku[index];

    let pesanan = dataKeranjang.find(function(item) {
        return item.kodeBarang === buku.kodeBarang;
    });

    if (pesanan) {
        if (pesanan.jumlah < buku.stok) {
            pesanan.jumlah++;
        } else {
            alert("Jumlah pesanan melebihi stok!");
            return;
        }
    } else {
        if (buku.stok <= 0) {
            alert("Stok buku habis!");
            return;
        }

        dataKeranjang.push({
            kodeBarang: buku.kodeBarang,
            namaBarang: buku.namaBarang,
            harga: buku.harga,
            cover: buku.cover,
            jumlah: 1,
            stok: buku.stok
        });
    }

    tampilkanKeranjang();
}

// Menampilkan keranjang
function tampilkanKeranjang() {
    if (!keranjang) return;

    keranjang.innerHTML = "";

    let total = 0;

    dataKeranjang.forEach(function(item, index) {
        let subtotal = item.harga * item.jumlah;
        total += subtotal;

        let baris = document.createElement("tr");

        let kolomGambar = document.createElement("td");
        let gambar = document.createElement("img");
        gambar.src = item.cover;
        gambar.alt = item.namaBarang;
        gambar.width = 60;
        kolomGambar.appendChild(gambar);

        let kolomNama = document.createElement("td");
        kolomNama.textContent = item.namaBarang;

        let kolomHarga = document.createElement("td");
        kolomHarga.textContent = formatRupiah(item.harga);

        let kolomJumlah = document.createElement("td");
        let inputJumlah = document.createElement("input");

        inputJumlah.type = "number";
        inputJumlah.min = 1;
        inputJumlah.max = item.stok;
        inputJumlah.value = item.jumlah;

        inputJumlah.addEventListener("change", function() {
            let jumlahBaru = Number(inputJumlah.value);

            if (jumlahBaru < 1 || jumlahBaru > item.stok) {
                alert("Jumlah harus antara 1 dan " + item.stok);
                inputJumlah.value = item.jumlah;
                return;
            }

            item.jumlah = jumlahBaru;
            tampilkanKeranjang();
        });

        kolomJumlah.appendChild(inputJumlah);

        let kolomSubtotal = document.createElement("td");
        kolomSubtotal.textContent = formatRupiah(subtotal);

        let kolomAksi = document.createElement("td");
        let tombolHapus = document.createElement("button");

        tombolHapus.textContent = "Hapus";
        tombolHapus.addEventListener("click", function() {
            dataKeranjang.splice(index, 1);
            tampilkanKeranjang();
        });

        kolomAksi.appendChild(tombolHapus);

        baris.appendChild(kolomGambar);
        baris.appendChild(kolomNama);
        baris.appendChild(kolomHarga);
        baris.appendChild(kolomJumlah);
        baris.appendChild(kolomSubtotal);
        baris.appendChild(kolomAksi);

        keranjang.appendChild(baris);
    });

    document.getElementById("totalHarga").textContent =
        "Total: " + formatRupiah(total);
}

// Menyimpan pemesanan
if (formPemesanan) {
    formPemesanan.addEventListener("submit", function(e) {
        e.preventDefault();

        if (dataKeranjang.length === 0) {
            alert("Silakan pilih buku terlebih dahulu!");
            return;
        }

        let pemesanan = {
            nama: document.getElementById("namaPemesan").value,
            email: document.getElementById("emailPemesan").value,
            telepon: document.getElementById("teleponPemesan").value,
            alamat: document.getElementById("alamatPemesan").value,
            pembayaran: document.getElementById("metodePembayaran").value,
            daftarPesanan: dataKeranjang,
            total: dataKeranjang.reduce(function(total, item) {
                return total + (item.harga * item.jumlah);
            }, 0)
        };

        alert(
            "Pesanan berhasil dibuat!\n" +
            "Nama: " + pemesanan.nama + "\n" +
            "Total: " + formatRupiah(pemesanan.total)
        );

        console.log("Data pemesanan:", pemesanan);

        formPemesanan.reset();
        dataKeranjang = [];
        tampilkanKeranjang();
    });
}

// Jalankan hanya jika elemen halaman checkout tersedia
if (daftarBuku) {
    tampilkanBuku();
    tampilkanKeranjang();
}