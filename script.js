const input = document.querySelector('.chat-input input');
const chatWindow = document.querySelector('.chat-window');
const welcomeMessageDiv = document.getElementById('welcome-message');

// Fungsi untuk menambahkan chat bubble
const addChatBubble = (message, type) => {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', type, 'animate__animated', 'animate__fadeInUp');

  // Tambahkan pesan ke dalam bubble
  messageDiv.innerHTML = `
        <div class="message-bubble">${message}</div>
    `;

  chatWindow.appendChild(messageDiv);

  // Scroll otomatis ke bagian bawah setiap kali pesan baru ditambahkan
  chatWindow.scrollTop = chatWindow.scrollHeight;
};

// Fungsi untuk menampilkan ucapan selamat sesuai waktu
const displayWelcomeMessage = () => {
  const now = new Date();
  const hour = now.getHours();
  let greeting = '';
  let imageUrl = '';
  let quote = '';

  // Tentukan ucapan dan gambar berdasarkan waktu
  if (hour >= 4 && hour < 12) {
    greeting = 'Selamat Pagi!';
    quote = 'Welcome to ChatBot OkoAi on official website, found a problem? Contact the owner via Gmail: prks.adiiw@gmail.com';
    imageUrl = 'logo.jpg'; // Ganti dengan path gambar yang sesuai
  } else if (hour >= 12 && hour < 17) {
    greeting = 'Selamat Siang!';
    quote = 'Welcome to ChatBot OkoAi on official website, found a problem? Contact the owner via Gmail: prks.adiiw@gmail.com';
    imageUrl = 'logo.jpg'; // Ganti dengan path gambar yang sesuai
  } else if (hour >= 17 && hour < 21) {
    greeting = 'Selamat Sore!';
    quote = 'Welcome to ChatBot OkoAi on official website, found a problem? Contact the owner via Gmail: prks.adiiw@gmail.com';
    imageUrl = 'logo.jpg'; // Ganti dengan path gambar yang sesuai
  } else {
    greeting = 'Selamat Malam!';
    quote = 'Welcome to ChatBot OkoAi on official website, found a problem? Contact the owner via Gmail: prks.adiiw@gmail.com';
    imageUrl = 'logo.jpg'; // Ganti dengan path gambar yang sesuai
  }

  // Tambahkan ucapan dan gambar ke div
  welcomeMessageDiv.innerHTML = `
        <div class="welcome-bubble">
            <img src="${imageUrl}" alt="Greeting Image" class="welcome-image">
            <p>${greeting}<br>${quote}</p>
        </div>
    `;
};

// Panggil fungsi untuk menampilkan ucapan saat halaman dimuat
displayWelcomeMessage();

// Event listener untuk tombol kirim
document.querySelector('.fa-paper-plane').addEventListener('click', async () => {
  const userInputValue = input.value.trim();

  if (userInputValue) {
    // Tampilkan pesan pengguna
    addChatBubble(userInputValue, 'user');
    input.value = ''; // Bersihkan input

    // Cek respon dari bot
    let botResponse = '';

    // Respons bot berdasarkan pesan pengguna
    if (userInputValue.toLowerCase().includes("makan")) {
      botResponse = "Sudah makan belum? Jangan lupa makan yang sehat ya!";
    } else if (userInputValue.toLowerCase().includes("hari ini")) {
      botResponse = "Bagaimana hari kamu? Ada yang menyenangkan hari ini?";
    } else if (userInputValue.toLowerCase().includes("nama kamu") || userInputValue.toLowerCase().includes("siapa namamu")) {
      botResponse = "Nama saya adalah OkoAi, yang dikembangkan oleh Koo (Prakoso). Pemilik saya adalah Prakoso Adi Wibowo.";
    } else if (userInputValue.toLowerCase().includes("nama owner") || userInputValue.toLowerCase().includes("siapa ownermu")) {
      botResponse = "Nama pemilik/Developer dari OkoAi adalah Prakoso (Koo-Dev).";
    } else {
      // Menggunakan API untuk mendapatkan respons
      try {
        const response = await fetch(`https://widipe.com/openai?text=${encodeURIComponent(userInputValue)}`);
        const data = await response.json();

        // Proses respons dan ubah menjadi kasual
        botResponse = data.result
          .replace(/Anda/g, 'kamu')
          .replace(/Apakah/g, 'apa')
          .replace(/dapat/g, 'bisa')
          .replace(/merupakan/g, 'adalah')
          .replace(/terima kasih/g, 'thanks')
          .replace(/saya/g, 'OkoAi');
      } catch (error) {
        botResponse = `Error ditemukan: ${error.message}`;
      }
    }

    // Tambahkan respons bot ke chatbox
    addChatBubble(botResponse, 'bot');
  }
});

// Fungsi untuk memutar audio saat tombol diklik
const playButton = document.getElementById('playButton');
const audio = document.getElementById('audio');
const playIcon = document.getElementById('playIcon');

// Tambahkan event listener untuk tombol play/pause
playButton.addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause'); // Ganti ikon menjadi pause (garis dua)
    } else {
        audio.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play'); // Ganti ikon menjadi play (segitiga)
    }
});
