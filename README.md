BRD Aplication:
04-11-2021

- waktu buka, lakukan 6 fetch API:
- data tabel detail, sudah sebagian datanya yang sudah disediakan API
- data buying & seling bisa di add lebih dari 1 kali
- layouting & kolom sudah fixing.
  select2 -> library select (sekaligus dengan tag)
  (mata uang) (satuan mata uang yang lain)
  nominal / kurs = nominal dollar
- data "nominal dollar" tidak boleh ada jika data pendukung masih kosong
- jika nilai kurs 999 tidak perlu dikalkulasi hitungan nonimal dollar
- data harus terurut layouting nya
- ketika dibuka dengan id, maka data default akan pakai data yang di fetch dengan id tersebut, jika tidak, maka akan pakai data baru.

04-11-2021
url: {host}/{parameter} - host = host - parameter = id data

- untuk data dropdown ambil datanya dari API (pakai select2)
- ada 2 action (edit & delete)
  - untuk edit akan mengisi form add tetapi menggunakan data yang akan diedit
- Nominal dollar akan terhitung secara otomastis
- jika pemanggilan url dengan parameter, maka lakukan pemanggilan ke api apakah data sudah ada atau tidak
- 2 tipe array, array statis (yang diatas) & array dinamis (yang dinamis)
- heigth data fix, kalau berlebihan akan overflow
