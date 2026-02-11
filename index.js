const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Setup Client
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: false, // FALSE = Browser Chrome bakal MUNCUL (Enak buat pantau error)
        args: ['--no-sandbox']
    }
});

// Event 1: Generate QR Code
client.on('qr', (qr) => {
    console.log('Scan pake WA Linked Device sekarang:');
    qrcode.generate(qr, { small: true });
});

// Event 2: Kalau udah berhasil connect
client.on('ready', () => {
    console.log('✅ Bot ACTIVE! Siap menerima perintah.');
});

// Event 3: Logic Pesan
client.on('message', async msg => {
    // [PENTING] Filter biar Bot GAK ngebales pesannya sendiri
    if (msg.fromMe) return;

    const pesan = msg.body.toLowerCase();

    // --- LOGIC MENU ---
    if (pesan === 'menu') {
        msg.reply(`
🤖 *Pilih aja Mas, nanti gua sampein ke Hasbi* 🤖
1. Ada kerjaan buat Hasbi!
2. Hasbi dicariin Pak Apip!
3. Hasbi dateng ke RS Sekarang!

_Ketik angkanya aja. Contoh: 1_
        `);
    }
    else if (pesan === '1') {
        msg.reply('Sip Mas, nanti gua kerjain. (Auto-Reply)');
    }
    else if (pesan === '2') {
        msg.reply('Waduh, tolong bilangin Mas, Hasbi lagi seminar. (Auto-Reply)');
    }
    else if (pesan === '3') {
        msg.reply('OTW Mas! (Auto-Reply)');
    }
    
    // --- LOGIC SAPU JAGAT (ELSE) ---
    // Hati-hati, ini bakal ngebales SEMUA chat yang masuk (termasuk grup kalau bot masuk grup)
    else {
        msg.reply('Halo Mas! 👋 Gua Bot-nya Hasbi. Hasbi lagi slow respon.\n\nSilakan ketik *menu* untuk opsi cepat.');
    }
});

// [WAJIB ADA] Nyalakan Bot
client.initialize();