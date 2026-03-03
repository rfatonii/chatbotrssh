const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { 
        headless: true, // Ubah ke false kalau mau liat browsernya
        args: ['--no-sandbox'] 
    }
});

// Generate QR (Konfigurasi WA)
client.on('qr', (qr) => {
    console.log('Scan QR Code ini:');
    qrcode.generate(qr, { small: true });
});

// Log Kalo Bot Sudah Siap
client.on('ready', () => {
    console.log('✅ Bot Ready...');
});

// Logic Pesan Masuk
client.on('message', async msg => {
    // FILTER
    if (msg.fromMe) return; // pesan dari bot itu sendiri
    if (msg.from === 'status@broadcast') return; // pesan dari status broadcast
    if (msg.from.includes('@g.us')) return; // pesan dari grup

    // --- MULAI LOGIC BOT ---
    const pesan = msg.body.toLowerCase(); // lowercase semua input user

    // Kalo User input '1'
    if (pesan === '1') {
        msg.reply(`
📝 Silahkan daftar melalui link berikut:
https://daftaronline.rssyarifhidayatullah.com/

Ketik *0* untuk kembali.
            `);
    }

    // Kalo User input '2'
    else if (pesan === '2') {
        msg.reply(`
📅 Silahkan cek Jadwal Dokter melalui link berikut:
https://www.rssyarifhidayatullah.com/jadwal-dokter

Ketik *0* untuk kembali.
            `);
    }

    // Kalo User input '0' ataupun random input, bakal output in ini
    else {
        msg.reply(`
Terima kasih telah menggunakan layanan Rumah Sakit UIN Syarif Hidayatullah Jakarta.

No. Gawat Darurat:
📞 _nomor_

No. Call Center
📞 _nomor_

📍 Lokasi google maps:
https://maps.app.goo.gl/xLQ5TYDorSzSsnoT8

Silahkan pilih layanan yang Anda butuhkan:
1️⃣ Daftar Online
2️⃣ Jadwal Dokter atau Poli
Ketik angka sesuai menu (Misal: 1)
        `);
    }
});

// Client Bot Activation
client.initialize();