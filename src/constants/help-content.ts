import { PageHelp } from '@/contexts/help-context';

export const HELP_CONTENT: Record<string, PageHelp> = {
    dashboard: {
        pageKey: 'dashboard',
        title: 'Dashboard - Panduan Lengkap',
        description: 'Dashboard menampilkan analitik mendalam tentang hasil ujian bahasa Inggris mahasiswa dengan visualisasi data real-time.',
        steps: [
            {
                id: 'step-1',
                title: 'Filter Data',
                description: 'Gunakan dropdown "Program Studi" dan "Angkatan" untuk filter data yang ingin dilihat. Klik "Tampilkan" untuk memuat data.',
                element: '[data-help="filter-box"]',
            },
            {
                id: 'step-2',
                title: 'Stat Cards',
                description: 'Lihat statistik ringkas: Total mahasiswa, rata-rata TOEIC, rata-rata TOEFL, dan persentase lulus/remedial.',
                element: '[data-help="stat-cards"]',
            },
            {
                id: 'step-3',
                title: 'Tren Grafik',
                description: 'Grafik menunjukkan tren rata-rata skor per bulan untuk TOEIC dan TOEFL. Membantu tracking performa tim.',
                element: '[data-help="trend-chart"]',
            },
            {
                id: 'step-4',
                title: 'Rasio Kelulusan',
                description: 'Diagram donut menampilkan persentase lulus vs remedial. Gunakan tombol panah untuk switch antar kategori test.',
                element: '[data-help="ratio-chart"]',
            },
            {
                id: 'step-5',
                title: 'Tabel Mahasiswa',
                description: 'Daftar lengkap mahasiswa dengan score. Bisa search berdasarkan NPM, nama, tanggal, atau nilai. Klik mata icon untuk lihat detail.',
                element: '[data-help="students-table"]',
            },
        ],
        tooltips: {
            'update-btn': 'Klik untuk memuat data berdasarkan filter yang dipilih',
            'prev-btn': 'Lihat kategori kelulusan sebelumnya',
            'next-btn': 'Lihat kategori kelulusan berikutnya',
            'search-input': 'Cari mahasiswa berdasarkan NPM, nama, tanggal ujian, atau score',
            'sort-header': 'Klik untuk sort kolom, klik lagi untuk reverse',
        },
    },

    'score-test': {
        pageKey: 'score-test',
        title: 'Upload Score Test - Panduan',
        description: 'Upload data hasil ujian mahasiswa secara manual, satu per satu. Cocok untuk input data dari sistem ujian.',
        steps: [
            {
                id: 'step-1',
                title: 'Form Upload',
                description: 'Isi semua field: NPM mahasiswa, nama, jenis test (TOEIC/TOEFL), tipe (Prediction/Official), score, dan tanggal ujian.',
                element: '[data-help="form-container"]',
            },
            {
                id: 'step-2',
                title: 'Tanggal Ujian',
                description: 'Pilih tanggal menggunakan date picker. Ada dropdown untuk month/year selection yang lebih mudah.',
                element: '[data-help="date-picker"]',
            },
            {
                id: 'step-3',
                title: 'Submit Data',
                description: 'Klik "Simpan" untuk submit data. Invalid data akan ditampilkan di notifikasi error.',
                element: '[data-help="submit-btn"]',
            },
            {
                id: 'step-4',
                title: 'Status Submission',
                description: 'Lihat status, timestamp, dan detail dari setiap upload di tabel history.',
                element: '[data-help="history-table"]',
            },
        ],
        tooltips: {
            'npm-field': 'Nomor Pokok Mahasiswa - pastikan sesuai dengan data master',
            'jenis-test': 'Jenis test: TOEIC atau TOEFL',
            'tipe-test': 'Tipe: Prediction (simulasi) atau Official (ujian resmi)',
            'score-field': 'Nilai score test mahasiswa. Validasi: TOEIC 0-990, TOEFL 0-677',
            'submit-btn': 'Simpan data ke sistem. Data akan melalui validasi.',
        },
    },

    'upload-center': {
        pageKey: 'upload-center',
        title: 'Upload Center - Panduan Bulk Upload',
        description: 'Upload banyak data ujian sekaligus menggunakan file Excel. Ada 3 submenu untuk berbagai jenis data.',
        steps: [
            {
                id: 'step-1',
                title: 'Pilih Submenu',
                description: '3 pilihan upload: Upload Data Ujian, Upload Mahasiswa, Upload Template. Pilih sesuai kebutuhan.',
                element: '[data-help="submenu"]',
            },
            {
                id: 'step-2',
                title: 'Download Template',
                description: 'Download template Excel untuk mengetahui format yang benar. Jangan ubah nama kolom.',
                element: '[data-help="template-btn"]',
            },
            {
                id: 'step-3',
                title: 'Browse & Upload',
                description: 'Pilih file Excel yang sudah diisi. Sistem akan validate format dan field sebelum save.',
                element: '[data-help="file-input"]',
            },
            {
                id: 'step-4',
                title: 'Validasi & Konfirmasi',
                description: 'Review data yang akan diupload. Fix error jika ada sebelum final submit.',
                element: '[data-help="preview-table"]',
            },
        ],
        tooltips: {
            'download-template': 'Download template Excel dengan format kolom yang benar',
            'file-input': 'Pilih file Excel (.xlsx, .xls). Max 1000 rows per upload',
            'submit-bulk': 'Upload file ke sistem. Progress akan ditampilkan via notifikasi',
            'error-link': 'Lihat detail error untuk setiap baris yang gagal validasi',
        },
    },

    'management-user': {
        pageKey: 'management-user',
        title: 'Manajemen User - Panduan Admin',
        description: 'Kelola database user/staff. Create, edit, delete, dan assign ke usergroup.',
        steps: [
            {
                id: 'step-1',
                title: 'Search User',
                description: 'Gunakan search box untuk cari user berdasarkan nama, email, atau username.',
                element: '[data-help="search-box"]',
            },
            {
                id: 'step-2',
                title: 'User Cards',
                description: 'Setiap card menampilkan info user: nama, email, status, dan group. Hover untuk see actions.',
                element: '[data-help="user-card"]',
            },
            {
                id: 'step-3',
                title: 'Create Baru',
                description: 'Klik tombol "+ Tambah User" untuk membuka form create user baru dengan semua field required.',
                element: '[data-help="create-btn"]',
            },
            {
                id: 'step-4',
                title: 'Edit User',
                description: 'Klik icon edit di user card untuk modify data user. Update nama, email, status, atau group.',
                element: '[data-help="edit-btn"]',
            },
            {
                id: 'step-5',
                title: 'Delete User',
                description: 'Klik icon hapus untuk delete user. Ada confirmation dialog untuk prevent accidental delete.',
                element: '[data-help="delete-btn"]',
            },
        ],
        tooltips: {
            'search-input': 'Search berdasarkan nama, email, username, atau status aktif',
            'sort-header': 'Klik header untuk sort user list',
            'add-user': 'Form untuk create user baru dengan username unik dan password',
            'edit-icon': 'Edit detail user: nama, email, password, status, usergroup',
            'delete-icon': 'Hapus user dari sistem. Tidak bisa undo, hati-hati!',
        },
    },

    'management-modul': {
        pageKey: 'management-modul',
        title: 'Manajemen Modul - Panduan Admin',
        description: 'Kelola sidebar modules dan submenu items. Kontrol apa yang bisa diakses setiap user role.',
        steps: [
            {
                id: 'step-1',
                title: 'Modul Cards',
                description: 'Setiap card adalah 1 main module di sidebar. Tampilkan nama modul dan submenu di dalamnya.',
                element: '[data-help="modul-card"]',
            },
            {
                id: 'step-2',
                title: 'Create Modul',
                description: 'Klik "+ Tambah Modul" untuk create module baru. Isi nama, link, icon boxicon, dan urutan tampil.',
                element: '[data-help="create-btn"]',
            },
            {
                id: 'step-3',
                title: 'Icon Preview',
                description: 'Gunakan boxicon class (e.g., "bx-dashboard"). Preview akan langsung tampil. Cek boxicons.com untuk list.',
                element: '[data-help="icon-input"]',
            },
            {
                id: 'step-4',
                title: 'Main Menu Toggle',
                description: 'Checkbox "Main Menu" menentukan apakah modul tampil di sidebar utama atau hidden.',
                element: '[data-help="main-menu-toggle"]',
            },
            {
                id: 'step-5',
                title: 'Edit & Delete',
                description: 'Klik edit icon di card untuk modify. Delete icon untuk remove modul dari sistem.',
                element: '[data-help="action-btns"]',
            },
        ],
        tooltips: {
            'modul-name': 'Nama modul yang akan tampil di sidebar',
            'modul-link': 'URL path modul, e.g., /dashboard/management-data/user',
            'modul-icon': 'Boxicon class, e.g., "bx-users". Preview akan muncul real-time',
            'icon-hint': 'Cek https://boxicons.com untuk list icon yang tersedia',
            'main-menu': 'Centang untuk tampilkan di main sidebar menu',
        },
    },

    'management-usergroup': {
        pageKey: 'management-usergroup',
        title: 'Manajemen Usergroup - Panduan Admin',
        description: 'Setup role/group untuk user. Assign modul/permission ke setiap group.',
        steps: [
            {
                id: 'step-1',
                title: 'Usergroup Cards',
                description: 'Setiap card adalah 1 role. Tampilkan nama role, level (admin/staff), dan deskripsi.',
                element: '[data-help="group-card"]',
            },
            {
                id: 'step-2',
                title: 'Create Group',
                description: 'Klik "+ Tambah Usergroup" untuk create role baru. Isi nama, pilih level, dan deskripsi role.',
                element: '[data-help="create-btn"]',
            },
            {
                id: 'step-3',
                title: 'Level Admin vs Staff',
                description: 'Admin: akses penuh management data. Staff: akses terbatas sesuai modul yang di-assign.',
                element: '[data-help="level-select"]',
            },
            {
                id: 'step-4',
                title: 'Assign Modul',
                description: 'Klik card → "Set Modul" untuk assign module apa saja yang bisa diakses group ini.',
                element: '[data-help="set-modul-btn"]',
            },
            {
                id: 'step-5',
                title: 'Edit & Delete',
                description: 'Modify role detail atau delete jika sudah tidak digunakan.',
                element: '[data-help="action-btns"]',
            },
        ],
        tooltips: {
            'group-name': 'Nama role/group, e.g., "Admin", "Staff Upload", "Staff View Only"',
            'group-level': 'Admin = Full access. Staff = Limited based on modul assignment',
            'description': 'Penjelasan role untuk referensi. Siapa saja yang seharusnya jadi role ini.',
            'set-modul': 'Pilih modul/permission yang diberikan ke role ini di sidebar',
            'delete-group': 'Delete group. Pastikan tidak ada user yang masih terpakai group ini',
        },
    },
};

export const getPageHelp = (pageKey: string): PageHelp | undefined => {
    return HELP_CONTENT[pageKey];
};

export const getAllPageKeys = (): string[] => {
    return Object.keys(HELP_CONTENT);
};
