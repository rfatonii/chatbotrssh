const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Setup Client
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { 
        headless: true, // Ubah ke false kalau mau liat browsernya
        args: ['--no-sandbox'] 
    }
});

// Event 1: Generate QR (PENTING: Jangan dihapus)
client.on('qr', (qr) => {
    console.log('Scan QR Code ini:');
    qrcode.generate(qr, { small: true });
});

// Event 2: Bot Sudah Siap
client.on('ready', () => {
    console.log('✅ Bot RS SYAHID Siap Melayani!');
});

// Event 3: Logic Pesan Masuk
client.on('message', async msg => {
    // 1. Filter biar Bot GAK ngebales pesannya sendiri
    if (msg.fromMe) return;

    // 2. [FILTER PENTING] Biar Bot GAK ngebales Status orang
    if (msg.from === 'status@broadcast') return;

    // --- MULAI LOGIC ---
    const pesan = msg.body.toLowerCase();

    // --- BAGIAN A: PEMICU MENU (TRIGGER) ---
    // Menu cuma keluar kalau user mengetik kata kunci ini:
    if (pesan === 'menu' || pesan === 'halo' || pesan === 'p' || pesan === 'info') {
        msg.reply(`
🏥 *SELAMAT DATANG DI RS SYAHID* 🏥
_Layanan Pendaftaran Mandiri via WhatsApp_

Silakan pilih layanan di bawah ini:
1. 📝 Daftar Poli Umum
2. 🦷 Daftar Poli Gigi
3. 🗓️ Cek Jadwal Dokter
4. 🚑 Info Darurat

_Ketik angkanya saja. Contoh: 1_
        `);
    }

    // --- BAGIAN B: RESPON PILIHAN ANGKA ---
    else if (pesan === '1') {
        const noAntrian = Math.floor(Math.random() * 50) + 1;
        msg.reply(`✅ *PENDAFTARAN BERHASIL*\nPoli: *Umum*`);
    }

    else if (pesan === '2') {
        const noAntrian = Math.floor(Math.random() * 20) + 1;
        msg.reply(`✅ *PENDAFTARAN BERHASIL*\nPoli: *Gigi*`);
    }

    else if (pesan === '3') {
        msg.reply(`🗓️ *JADWAL DOKTER*\nDr. Budi (Umum): 08.00 - 14.00\nDrg. Siti (Gigi): 09.00 - 15.00`);
    }

    else if (pesan === '4') {
        msg.reply(`🚑 *DARURAT*\nHubungi Ambulans: 118`);
    }

    // --- BAGIAN C: RESPON DEFAULT (JIKA INPUT TIDAK DIKENAL) ---
    // Kalau user ngetik curhat atau kata lain selain di atas
    else {
        msg.reply('Halo, dengan RS SYAHID di sini\nSilakan ketik _"menu"_ untuk memulai layanan.');
    }
});

// Nyalakan Bot
client.initialize();