/**
 * 20/10 Couple Love Story & Memory Keepsake - Main Application Script
 * Dành tặng: Bé Iu Trương Ngọc Linh ❤️ Từ: Anh Người Dev Nguyễn Thành Luân
 */

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize Lucide icons if available
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* ==========================================================================
     TOAST NOTIFICATION UTILITY
     ========================================================================== */
  function showToast(message, icon = '💖') {
    const toast = document.getElementById('love-toast');
    const msgEl = document.getElementById('toast-message');
    const iconEl = document.getElementById('toast-icon');
    if (!toast) return;

    if (msgEl) msgEl.textContent = message;
    if (iconEl) iconEl.textContent = icon;

    toast.classList.add('toast-show');
    if (window._toastTimeout) clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => {
      toast.classList.remove('toast-show');
    }, 3800);
  }

  /* ==========================================================================
     ADMIN / DEV MODE: CHẾ ĐỘ XEM AN TOÀN (GIFT MODE) VS QUẢN TRỊ DEV
     - Khách hoặc Bé Linh xem: Chế độ an toàn tuyệt đối, khóa mọi nút sửa/xóa.
     - Chàng Dev (Luân) sửa: Mở khóa bằng URL ?admin=true hoặc nhấp 3 lần vào logo.
     ========================================================================== */
  const ADMIN_PASSCODES = ['1705', '17052026', 'luan', '2010'];

  function checkIsAdmin() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('admin') || urlParams.has('edit') || urlParams.has('dev') || urlParams.get('key') === '1705') {
      sessionStorage.setItem('love_is_admin', 'true');
      return true;
    }
    return sessionStorage.getItem('love_is_admin') === 'true';
  }

  let isAdminMode = checkIsAdmin();

  function updateAdminModeUI() {
    const adminElements = document.querySelectorAll('.admin-only');
    const badge = document.getElementById('admin-badge-indicator');

    adminElements.forEach((el) => {
      if (isAdminMode) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });

    if (badge) {
      if (isAdminMode) {
        badge.classList.remove('hidden');
        badge.classList.add('flex');
      } else {
        badge.classList.add('hidden');
        badge.classList.remove('flex');
      }
    }

    if (typeof renderPhotos === 'function') {
      renderPhotos();
    }
  }

  function unlockAdminMode() {
    const code = prompt('🔑 Nhập mật mã của Chàng Dev (Luân) để mở quyền chỉnh sửa:');
    if (!code) return;
    if (ADMIN_PASSCODES.includes(code.trim().toLowerCase())) {
      isAdminMode = true;
      sessionStorage.setItem('love_is_admin', 'true');
      updateAdminModeUI();
      if (typeof fireLoveConfetti === 'function') fireLoveConfetti();
      showToast('🎉 Đã mở khóa quyền chỉnh sửa của Chàng Dev! 👑', '🔓');
    } else {
      showToast('❌ Mật mã chưa đúng! Web tiếp tục ở chế độ xem an toàn. 🛡️', '🔒');
    }
  }

  function lockAdminMode() {
    isAdminMode = false;
    sessionStorage.removeItem('love_is_admin');
    const url = new URL(window.location);
    url.searchParams.delete('admin');
    url.searchParams.delete('edit');
    url.searchParams.delete('dev');
    url.searchParams.delete('key');
    window.history.replaceState({}, '', url.pathname + (url.search || ''));
    updateAdminModeUI();
    showToast('🔒 Đã khóa lại! Web ở chế độ xem an toàn dành cho Bé Linh. 💖', '🛡️');
  }

  // Secret Dev Trigger: Nhấp 3 lần vào logo thương hiệu để mở/khóa quyền Admin
  const brandLogo = document.querySelector('a[href="#hero"]');
  let logoClickCount = 0;
  let logoClickTimer = null;
  if (brandLogo) {
    brandLogo.addEventListener('click', (e) => {
      logoClickCount++;
      clearTimeout(logoClickTimer);
      if (logoClickCount >= 3) {
        e.preventDefault();
        logoClickCount = 0;
        if (!isAdminMode) {
          unlockAdminMode();
        } else {
          lockAdminMode();
        }
      } else {
        logoClickTimer = setTimeout(() => {
          logoClickCount = 0;
        }, 1200);
      }
    });
  }

  // Nút Khóa lại trên floating badge
  const exitAdminBtn = document.getElementById('exit-admin-btn');
  if (exitAdminBtn) {
    exitAdminBtn.addEventListener('click', lockAdminMode);
  }

  /* ==========================================================================
     1. COUPLE PROFILE & CONFIGURATION (Stored in LocalStorage)
     ========================================================================== */
  const defaultCoupleData = {
    boyName: 'Nguyễn Thành Luân',
    girlName: 'Trương Ngọc Linh',
    coupleTitle: 'Nguyễn Thành Luân ❤️ Trương Ngọc Linh',
    anniversaryDate: '2026-05-17', // Default anniversary date (YYYY-MM-DD)
    heroSubtitle: 'Chúc bé iu Trương Ngọc Linh một ngày 20/10 thật hạnh phúc, rạng rỡ và luôn là cô công chúa nhỏ được anh Luân yêu thương, chiều chuộng nhất trên đời!',
    letterContent: `Gửi bé iu Trương Ngọc Linh của anh,\n\nNhân ngày Phụ Nữ Việt Nam 20/10, anh - chàng Dev của em muốn gửi đến em tất cả sự yêu thương, trân trọng và biết ơn sâu sắc nhất từ tận đáy lòng.\n\nNgười ta thường bảo dân lập trình viên khô khan, suốt ngày chỉ cặm cụi bên màn hình đen và những dòng code phức tạp. Nhưng từ ngày gặp được Linh, thế giới của anh bỗng trở nên ngập tràn màu sắc và những giai điệu dịu dàng nhất. Cảm ơn em vì đã đến bên anh, cùng anh sẻ chia những niềm vui nho nhỏ, những bữa cơm ấm áp và cho anh một mái ấm bình yên sau những giờ làm việc mệt mỏi.\n\nVới anh, nụ cười rạng rỡ và đôi mắt trong veo của Linh là điều quý giá nhất trên đời. Anh chúc cô gái nhỏ của anh ngày 20/10 thật nhiều niềm vui, luôn an yên, xinh đẹp và mãi là cô công chúa được anh Luân cưng chiều hết mực.\n\nDù ngoài kia cuộc sống có bao nhiêu thử thách hay sóng gió, hãy luôn nhớ rằng anh sẽ mãi là điểm tựa vững chãi, luôn yêu thương và nắm chặt tay em trên mọi nẻo đường.\n\nThương và yêu Trương Ngọc Linh nhiều hơn mỗi ngày!\nAnh chàng Dev của em - Nguyễn Thành Luân ❤️`
  };

  function getCoupleData() {
    try {
      const stored = localStorage.getItem('couple_data_2010');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Migrate old default generic names to user's real names
        if (!parsed.boyName || parsed.boyName === 'Anh') parsed.boyName = 'Nguyễn Thành Luân';
        if (!parsed.girlName || parsed.girlName === 'Em Yêu') parsed.girlName = 'Trương Ngọc Linh';
        if (!parsed.anniversaryDate || parsed.anniversaryDate === '2023-10-20') parsed.anniversaryDate = '2026-05-17';
        parsed.coupleTitle = `${parsed.boyName} ❤️ ${parsed.girlName}`;
        return { ...defaultCoupleData, ...parsed };
      }
    } catch (e) {
      console.warn('Error reading couple data', e);
    }
    return defaultCoupleData;
  }

  function saveCoupleData(data) {
    try {
      localStorage.setItem('couple_data_2010', JSON.stringify(data));
    } catch (e) {
      console.warn('Error saving couple data', e);
    }
  }

  let coupleData = getCoupleData();

  function formatVietnameseDate(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const y = parts[0];
      const m = parseInt(parts[1], 10);
      const d = parseInt(parts[2], 10);
      return `${d.toString().padStart(2, '0')}/${m.toString().padStart(2, '0')}/${y}`;
    }
    return dateStr;
  }

  function applyCoupleData() {
    coupleData = getCoupleData();

    // Update names across UI
    const boyElements = document.querySelectorAll('.couple-boy-name');
    const girlElements = document.querySelectorAll('.couple-girl-name');
    const titleElements = document.querySelectorAll('.couple-title');
    const subtitleElements = document.querySelectorAll('.couple-hero-subtitle');
    const letterBody = document.getElementById('letter-content-display');
    const anniversaryDisplay = document.getElementById('anniversary-date-display');

    boyElements.forEach(el => el.textContent = coupleData.boyName);
    girlElements.forEach(el => el.textContent = coupleData.girlName);
    titleElements.forEach(el => el.textContent = `${coupleData.boyName} ❤️ ${coupleData.girlName}`);
    subtitleElements.forEach(el => el.textContent = coupleData.heroSubtitle);

    const navTitleElements = document.querySelectorAll('.couple-nav-title');
    navTitleElements.forEach(el => {
      const shortBoy = (coupleData.boyName || 'Luân').trim().split(' ').pop();
      const shortGirl = (coupleData.girlName || 'Linh').trim().split(' ').pop();
      el.textContent = `${shortBoy} ❤️ ${shortGirl}`;
    });

    if (anniversaryDisplay) {
      anniversaryDisplay.textContent = formatVietnameseDate(coupleData.anniversaryDate);
    }

    if (letterBody) {
      letterBody.innerHTML = escapeHtml(coupleData.letterContent).replace(/\n/g, '<br>');
    }

    // Update Settings Modal inputs
    const inputBoy = document.getElementById('setting-boy-name');
    const inputGirl = document.getElementById('setting-girl-name');
    const inputDate = document.getElementById('setting-anniversary-date');
    const inputSubtitle = document.getElementById('setting-hero-subtitle');
    const inputLetter = document.getElementById('setting-letter-content');

    if (inputBoy) inputBoy.value = coupleData.boyName;
    if (inputGirl) inputGirl.value = coupleData.girlName;
    if (inputDate) inputDate.value = coupleData.anniversaryDate;
    if (inputSubtitle) inputSubtitle.value = coupleData.heroSubtitle;
    if (inputLetter) inputLetter.value = coupleData.letterContent;
  }

  /* Quick edit anniversary date handler */
  const quickEditDateBtn = document.getElementById('quick-edit-date-btn');
  if (quickEditDateBtn) {
    quickEditDateBtn.addEventListener('click', () => {
      if (!isAdminMode) {
        unlockAdminMode();
        return;
      }
      const enteredDate = prompt(
        'Nhập ngày hai bạn bắt đầu yêu nhau (Định dạng YYYY-MM-DD, ví dụ: 2026-05-17):',
        coupleData.anniversaryDate
      );
      if (enteredDate && /^\d{4}-\d{2}-\d{2}$/.test(enteredDate.trim())) {
        coupleData.anniversaryDate = enteredDate.trim();
        saveCoupleData(coupleData);
        applyCoupleData();
        updateLoveCounter();
        fireLoveConfetti();
        showToast(`Đã lưu ngày yêu nhau: ${formatVietnameseDate(coupleData.anniversaryDate)} ❤️`);
      } else if (enteredDate) {
        alert('Định dạng chưa đúng. Vui lòng nhập dạng YYYY-MM-DD (Ví dụ: 2026-05-17).');
      }
    });
  }

  /* ==========================================================================
     2. AUDIO ENGINE (Romantic Tunes + Web Audio Ambient Synth Fallback)
     ========================================================================== */
  const AudioEngine = {
    ctx: null,
    isPlaying: false,
    currentTrackIndex: 0,
    volume: 0.35,
    synthInterval: null,
    htmlAudio: null,

    tracks: [
      {
        title: 'Melodic Piano Romance',
        artist: 'Chill Piano Love',
        url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3'
      },
      {
        title: 'Acoustic Sunset Moments',
        artist: 'Sweet Acoustic',
        url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=soft-acoustic-guitar-11099.mp3'
      },
      {
        title: 'Sweet Lofi Dreams',
        artist: 'Cozy Couple Lofi',
        url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=lofi-study-112191.mp3'
      }
    ],

    init() {
      const playBtn = document.getElementById('music-toggle-btn');
      const nextBtn = document.getElementById('music-next-btn');
      const disc = document.getElementById('music-disc');
      const trackTitle = document.getElementById('music-track-title');
      const trackArtist = document.getElementById('music-track-artist');

      if (trackTitle && trackArtist) {
        trackTitle.textContent = this.tracks[this.currentTrackIndex].title;
        trackArtist.textContent = this.tracks[this.currentTrackIndex].artist;
      }

      this.htmlAudio = new Audio();
      this.htmlAudio.crossOrigin = 'anonymous';
      this.htmlAudio.volume = this.volume;
      this.htmlAudio.src = this.tracks[this.currentTrackIndex].url;
      this.htmlAudio.loop = true;

      this.htmlAudio.addEventListener('error', () => {
        if (this.isPlaying) {
          this.startWebAudioSynth();
        }
      });

      if (playBtn) {
        playBtn.addEventListener('click', () => {
          this.togglePlay();
        });
      }

      if (disc) {
        disc.addEventListener('click', () => {
          this.togglePlay();
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          this.nextTrack();
        });
      }

      const unlockAudio = () => {
        if (!this.ctx) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (AudioContext) {
            this.ctx = new AudioContext();
          }
        }
        document.removeEventListener('click', unlockAudio);
      };
      document.addEventListener('click', unlockAudio);
    },

    togglePlay() {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    },

    play() {
      this.isPlaying = true;
      this.updateUI(true);

      if (this.htmlAudio) {
        this.htmlAudio.play().catch(() => {
          this.startWebAudioSynth();
        });
      } else {
        this.startWebAudioSynth();
      }
    },

    pause() {
      this.isPlaying = false;
      this.updateUI(false);
      if (this.htmlAudio) {
        this.htmlAudio.pause();
      }
      this.stopWebAudioSynth();
    },

    nextTrack() {
      this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
      const track = this.tracks[this.currentTrackIndex];
      const trackTitle = document.getElementById('music-track-title');
      const trackArtist = document.getElementById('music-track-artist');
      if (trackTitle && trackArtist) {
        trackTitle.textContent = track.title;
        trackArtist.textContent = track.artist;
      }

      if (this.htmlAudio) {
        this.htmlAudio.src = track.url;
        if (this.isPlaying) {
          this.htmlAudio.play().catch(() => {
            this.startWebAudioSynth();
          });
        }
      }
    },

    updateUI(playing) {
      const disc = document.getElementById('music-disc');
      const playIcon = document.getElementById('music-play-icon');
      const pauseIcon = document.getElementById('music-pause-icon');
      const eqBars = document.querySelectorAll('.eq-bar');

      if (disc) {
        if (playing) {
          disc.classList.remove('disc-paused');
          disc.classList.add('disc-spinning');
        } else {
          disc.classList.add('disc-paused');
        }
      }

      if (playIcon && pauseIcon) {
        if (playing) {
          playIcon.classList.add('hidden');
          pauseIcon.classList.remove('hidden');
        } else {
          playIcon.classList.remove('hidden');
          pauseIcon.classList.add('hidden');
        }
      }

      eqBars.forEach((bar) => {
        bar.style.animationPlayState = playing ? 'running' : 'paused';
      });
    },

    startWebAudioSynth() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      if (!this.ctx) return;

      this.stopWebAudioSynth();

      const frequencies = [261.63, 329.63, 392.00, 440.00, 523.25, 659.25];
      let step = 0;

      const playChime = () => {
        if (!this.isPlaying || !this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        const freq = frequencies[step % frequencies.length];
        step = (step + 1) % frequencies.length;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.08 * this.volume, now + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 2.5);
      };

      playChime();
      this.synthInterval = setInterval(playChime, 1800);
    },

    stopWebAudioSynth() {
      if (this.synthInterval) {
        clearInterval(this.synthInterval);
        this.synthInterval = null;
      }
    }
  };

  AudioEngine.init();

  /* ==========================================================================
     3. CELEBRATION CONFETTI & HEARTS EXPLOSION
     ========================================================================== */
  function fireLoveConfetti() {
    if (window.confetti) {
      window.confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#f472b6', '#ec4899', '#fbbf24']
      });
      setTimeout(() => {
        window.confetti({
          particleCount: 50,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors: ['#f43f5e', '#fb7185', '#fda4af']
        });
        window.confetti({
          particleCount: 50,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors: ['#f43f5e', '#fb7185', '#fda4af']
        });
      }, 200);
    }
  }

  /* ==========================================================================
     4. LOVE COUNTER: ĐẾM NGÀY YÊU NHAU (Our Journey Counter)
     ========================================================================== */
  function updateLoveCounter() {
    const daysEl = document.getElementById('love-days');
    const hoursEl = document.getElementById('love-hours');
    const minsEl = document.getElementById('love-mins');
    const secsEl = document.getElementById('love-secs');
    const totalDaysDisplay = document.getElementById('total-days-badge');

    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    const startDate = new Date(coupleData.anniversaryDate + 'T00:00:00');
    const now = new Date();

    let diff = now.getTime() - startDate.getTime();
    if (diff < 0) diff = 0;

    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = totalDays.toLocaleString();
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minsEl.textContent = mins.toString().padStart(2, '0');
    secsEl.textContent = secs.toString().padStart(2, '0');

    if (totalDaysDisplay) {
      totalDaysDisplay.textContent = `${totalDays.toLocaleString()} Ngày Yêu Nhau`;
    }
  }

  updateLoveCounter();
  setInterval(updateLoveCounter, 1000);

  /* ==========================================================================
     5. 3D LOVE GIFT BOX MODAL & SPECTACULAR UNBOXING SEQUENCE
     ========================================================================== */
  const heroGiftBox = document.getElementById('hero-gift-box');
  const loveModal = document.getElementById('love-modal');
  const closeLoveModal = document.getElementById('close-love-modal');
  const ctaOpenGift = document.getElementById('cta-open-gift');

  let isGiftOpening = false;

  function fireGiftCenterBurst() {
    if (!window.confetti) return;
    const box = document.getElementById('hero-gift-box');
    let ox = 0.5;
    let oy = 0.45;
    if (box) {
      const rect = box.getBoundingClientRect();
      ox = Math.min(Math.max((rect.left + rect.width / 2) / window.innerWidth, 0.1), 0.9);
      oy = Math.min(Math.max((rect.top + rect.height / 2) / window.innerHeight, 0.1), 0.9);
    }

    // Stage 1: Explosive 360-degree gold, ruby & rose starburst from the box center
    window.confetti({
      particleCount: 75,
      spread: 360,
      startVelocity: 42,
      origin: { x: ox, y: oy },
      colors: ['#f43f5e', '#fb7185', '#fbbf24', '#f59e0b', '#ffffff', '#ff80ab', '#f472b6'],
      ticks: 220,
      gravity: 0.85,
      scalar: 1.15
    });
  }

  function openLoveGift() {
    if (isGiftOpening) return;
    isGiftOpening = true;

    const heroGiftWrapper = document.getElementById('hero-gift-box');
    if (heroGiftWrapper) {
      heroGiftWrapper.classList.add('gift-opening');
    }

    // Sound / Audio Engine starts playing immediately
    if (!AudioEngine.isPlaying) {
      AudioEngine.play();
    }

    // Stage 1 (0ms): Center burst of golden hearts and stardust from inside the box
    fireGiftCenterBurst();

    // Stage 2 (300ms): Dual side cannons shooting celebratory confetti showers
    setTimeout(() => {
      fireLoveConfetti();
    }, 320);

    // Stage 3 (750ms): Modal card pops in with smooth 3D perspective transition
    setTimeout(() => {
      if (loveModal) {
        const modalCard = loveModal.querySelector('.glass-card');
        if (modalCard) {
          modalCard.classList.remove('modal-pop-in');
          void modalCard.offsetWidth; // Force CSS repaint
          modalCard.classList.add('modal-pop-in');
        }
        loveModal.classList.remove('hidden');
        loveModal.classList.add('flex');
      }
      isGiftOpening = false;
    }, 780);
  }

  function resetGiftBoxState() {
    if (loveModal) {
      loveModal.classList.add('hidden');
      loveModal.classList.remove('flex');
    }
    // Smoothly reset the lid and box so it can be opened again!
    const heroGiftWrapper = document.getElementById('hero-gift-box');
    if (heroGiftWrapper) {
      heroGiftWrapper.classList.remove('gift-opening');
    }
  }

  if (heroGiftBox) heroGiftBox.addEventListener('click', openLoveGift);
  if (ctaOpenGift) ctaOpenGift.addEventListener('click', openLoveGift);

  if (closeLoveModal && loveModal) {
    closeLoveModal.addEventListener('click', resetGiftBoxState);

    loveModal.addEventListener('click', (e) => {
      if (e.target === loveModal) {
        resetGiftBoxState();
      }
    });
  }

  /* ==========================================================================
     6. LOVE STORY TIMELINE (Dòng Thời Gian Kỷ Niệm Của Luân & Linh)
     ========================================================================== */
  const defaultMilestones = [
    {
      id: 'm-1',
      date: 'Khoảnh khắc đầu tiên',
      title: 'Lần Đầu Tiên Ta Gặp Gỡ',
      desc: 'Giữa hàng triệu người trên thế giới, ánh mắt của Luân đã vô tình chạm vào Linh. Ngay giây phút ấy, anh biết rằng cuộc đời mình sắp có một điều kỳ diệu xuất hiện.',
      badge: '👀 Ánh Mắt Đầu Tiên',
      color: 'bg-rose-100 text-rose-700'
    },
    {
      id: 'm-2',
      date: '17/05/2026',
      title: 'Ngày Bé Linh Đồng Ý Bên Anh',
      desc: 'Lời tỏ tình vụng về của chàng Dev nhưng chứa trọn sự chân thành đã được em mỉm cười gật đầu. Đó là ngày hạnh phúc nhất và là khởi đầu cho câu chuyện tình yêu ngọt ngào của hai đứa.',
      badge: '💖 Cột Mốc Yêu Nhau',
      color: 'bg-pink-100 text-pink-700'
    },
    {
      id: 'm-3',
      date: 'Chuyến đi đáng nhớ',
      title: 'Chuyến Đi Chơi Đầu Tiên Cùng Nhau',
      desc: 'Cùng Linh ngắm hoàng hôn buông, cùng nhau thưởng thức những món ăn ngon và ngắm nhìn nụ cười trong trẻo của em suốt dọc hành trình. Những cái nắm tay ấm áp xua tan mọi mỏi mệt.',
      badge: '✈️ Nắm Tay Đi Khắp Nơi',
      color: 'bg-amber-100 text-amber-700'
    },
    {
      id: 'm-4',
      date: 'Kỷ niệm khó quên',
      title: 'Những Giây Phút Bình Yên Giản Dị',
      desc: 'Không cần những điều quá lớn lao, chỉ cần những buổi chiều đón bé Linh tan ca, những ly trà sữa ngọt ngào hay cùng nhau trò chuyện cuối ngày cũng đủ làm lòng anh ấm lại.',
      badge: '☕ Bình Yên Bên Em',
      color: 'bg-emerald-100 text-emerald-700'
    },
    {
      id: 'm-5',
      date: '20 Tháng 10 Hôm Nay',
      title: '20/10 Bên Cạnh Bé Iu Trương Ngọc Linh',
      desc: 'Một mùa 20/10 nữa lại về, tình cảm của Luân dành cho Linh vẫn vẹn nguyên và sâu đậm hơn mỗi ngày. Mong em mãi luôn cười tươi và hạnh phúc trong vòng tay anh!',
      badge: '🌹 20/10 Yêu Thương',
      color: 'bg-purple-100 text-purple-700'
    }
  ];

  function getMilestones() {
    try {
      const stored = localStorage.getItem('love_milestones_2010');
      if (stored) {
        const milestones = JSON.parse(stored);
        const m2 = milestones.find(m => m.id === 'm-2');
        if (m2 && (m2.date === 'Cột mốc chính thức' || m2.date === '20/10/2023')) {
          m2.date = '17/05/2026';
          saveMilestones(milestones);
        }
        return milestones;
      }
    } catch (e) {
      console.warn('Error reading milestones', e);
    }
    return defaultMilestones;
  }

  function saveMilestones(data) {
    try {
      localStorage.setItem('love_milestones_2010', JSON.stringify(data));
    } catch (e) {
      console.warn('Error saving milestones', e);
    }
  }

  function renderTimeline() {
    const container = document.getElementById('timeline-items');
    if (!container) return;
    const items = getMilestones();

    container.innerHTML = items
      .map((item, idx) => {
        const isLeft = idx % 2 === 0;
        return `
        <div class="relative flex flex-col md:flex-row items-center mb-12 ${isLeft ? 'md:flex-row-reverse' : ''}">
          <!-- Content Box -->
          <div class="w-full md:w-5/12 pl-12 md:pl-0 ${isLeft ? 'md:pl-8' : 'md:pr-8'}">
            <div class="glass-card glass-card-hover p-6 rounded-3xl border border-rose-200/80 shadow-md">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold px-3 py-1 rounded-full ${item.color}">${item.badge}</span>
                <span class="text-xs font-semibold text-gray-500">${escapeHtml(item.date)}</span>
              </div>
              <h4 class="text-lg font-bold text-gray-900 mb-2">${escapeHtml(item.title)}</h4>
              <p class="text-sm text-gray-600 leading-relaxed">${escapeHtml(item.desc)}</p>
            </div>
          </div>

          <!-- Central Heart Node -->
          <div class="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 border-4 border-white shadow-md flex items-center justify-center text-white text-sm z-10 animate-heart-pulse">
            💖
          </div>

          <!-- Empty Spacer for desktop -->
          <div class="hidden md:block md:w-5/12"></div>
        </div>
      `;
      })
      .join('');
  }

  renderTimeline();

  // Add Milestone Form
  const addMilestoneForm = document.getElementById('add-milestone-form');
  if (addMilestoneForm) {
    addMilestoneForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!isAdminMode) {
        showToast('Chế độ xem an toàn: Chỉ Chàng Dev mới có quyền thêm cột mốc! 🛡️', '🔒');
        return;
      }
      const titleInput = document.getElementById('milestone-title');
      const dateInput = document.getElementById('milestone-date');
      const descInput = document.getElementById('milestone-desc');

      if (!titleInput.value.trim() || !descInput.value.trim()) return;

      const newMilestone = {
        id: 'm-' + Date.now(),
        date: dateInput.value.trim() || 'Cột mốc mới',
        title: titleInput.value.trim(),
        desc: descInput.value.trim(),
        badge: '✨ Kỷ Niệm Mới',
        color: 'bg-rose-100 text-rose-700'
      };

      const milestones = getMilestones();
      milestones.push(newMilestone);
      saveMilestones(milestones);
      renderTimeline();

      addMilestoneForm.reset();
      fireLoveConfetti();
      showToast('Đã thêm kỷ niệm mới vào dòng thời gian! 💖');
    });
  }

  /* ==========================================================================
     7. PHOTO STORAGE ENGINE (IndexedDB + Canvas Compression + LocalStorage)
     ========================================================================== */
  // Image Compression Utility: Canvas downscale to avoid localStorage/IndexedDB issues
  function compressImage(fileOrDataUrl, maxWidth = 1200, maxHeight = 1200, quality = 0.82) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        try {
          const compressed = canvas.toDataURL('image/jpeg', quality);
          resolve(compressed);
        } catch (err) {
          // If canvas tainted, return original string
          resolve(typeof fileOrDataUrl === 'string' ? fileOrDataUrl : '');
        }
      };

      img.onerror = () => {
        if (typeof fileOrDataUrl === 'string') resolve(fileOrDataUrl);
        else reject(new Error('Không thể tải ảnh'));
      };

      if (typeof fileOrDataUrl === 'string') {
        img.src = fileOrDataUrl;
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(fileOrDataUrl);
      }
    });
  }

  // IndexedDB Storage Wrapper for Photos
  const PhotoDB = {
    db: null,
    async init() {
      return new Promise((resolve) => {
        if (!window.indexedDB) {
          resolve(null);
          return;
        }
        try {
          const req = indexedDB.open('LovePhotosDB_2010', 1);
          req.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains('photos')) {
              db.createObjectStore('photos', { keyPath: 'id' });
            }
          };
          req.onsuccess = (e) => {
            this.db = e.target.result;
            resolve(this.db);
          };
          req.onerror = () => resolve(null);
        } catch (e) {
          resolve(null);
        }
      });
    },
    async getAll() {
      if (!this.db) return null;
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction('photos', 'readonly');
          const store = tx.objectStore('photos');
          const req = store.getAll();
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => resolve(null);
        } catch (e) {
          resolve(null);
        }
      });
    },
    async save(photo) {
      if (!this.db) return false;
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction('photos', 'readwrite');
          const store = tx.objectStore('photos');
          store.put(photo);
          tx.oncomplete = () => resolve(true);
          tx.onerror = () => resolve(false);
        } catch (e) {
          resolve(false);
        }
      });
    },
    async delete(id) {
      if (!this.db) return false;
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction('photos', 'readwrite');
          const store = tx.objectStore('photos');
          store.delete(id);
          tx.oncomplete = () => resolve(true);
          tx.onerror = () => resolve(false);
        } catch (e) {
          resolve(false);
        }
      });
    }
  };

  await PhotoDB.init();

  const defaultPhotos = [
    {
      id: 'p-1',
      url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
      caption: 'Nụ cười tỏa nắng của bé Linh làm tan chảy trái tim Luân',
      date: 'Khoảnh khắc ngọt ngào'
    },
    {
      id: 'p-2',
      url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
      caption: 'Cùng em đi qua những tháng ngày tuổi trẻ bình yên nhất',
      date: 'Bên nhau dịu êm'
    },
    {
      id: 'p-3',
      url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
      caption: 'Bàn tay nhỏ của Linh luôn được Luân nắm thật chặt',
      date: 'Ấm áp mỗi ngày'
    },
    {
      id: 'p-4',
      url: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
      caption: 'Những bông hoa đẹp nhất dành tặng cô công chúa của anh 20/10',
      date: '20/10 Rực rỡ'
    }
  ];

  async function getPhotos() {
    // 1. Try IndexedDB first
    const idbPhotos = await PhotoDB.getAll();
    if (idbPhotos && idbPhotos.length > 0) {
      return idbPhotos;
    }

    // 2. Fallback to LocalStorage
    try {
      const stored = localStorage.getItem('love_photos_2010');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Error reading photos from localStorage', e);
    }

    return defaultPhotos;
  }

  async function savePhotos(photos) {
    // Save to IndexedDB
    if (PhotoDB.db) {
      for (const p of photos) {
        await PhotoDB.save(p);
      }
    }
    // Also save metadata/thumbnails to localStorage if possible
    try {
      localStorage.setItem('love_photos_2010', JSON.stringify(photos));
    } catch (e) {
      console.warn('LocalStorage limit exceeded, photos safely stored in IndexedDB', e);
    }
  }

  async function renderPhotos() {
    const gallery = document.getElementById('photo-gallery');
    if (!gallery) return;
    const photos = await getPhotos();

    gallery.innerHTML = photos
      .map((photo, idx) => {
        const rotations = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2'];
        const rot = rotations[idx % rotations.length];
        return `
        <div class="polaroid-card ${rot} group relative cursor-pointer">
          <div class="aspect-[4/3] rounded-md overflow-hidden mb-3 bg-rose-50 relative" onclick="openLightbox('${photo.url}', '${escapeHtml(photo.caption)}')">
            <img src="${photo.url}" alt="${escapeHtml(photo.caption)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
              🔍 Xem ảnh
            </div>
          </div>
          
          ${isAdminMode ? `
          <!-- Delete button on hover (Admin only) -->
          <button class="polaroid-delete-btn absolute top-3 right-3 w-7 h-7 rounded-full bg-white/95 hover:bg-rose-100 text-rose-600 shadow-md flex items-center justify-center text-xs transition-transform hover:scale-110 z-20" title="Xóa ảnh này" onclick="window.deletePhoto('${photo.id}', event)">
            🗑️
          </button>` : ''}

          <div class="text-center px-1" onclick="openLightbox('${photo.url}', '${escapeHtml(photo.caption)}')">
            <p class="font-handwriting text-gray-800 text-lg leading-tight mb-1">"${escapeHtml(photo.caption)}"</p>
            <span class="text-[11px] font-semibold text-rose-500 uppercase tracking-wider">${escapeHtml(photo.date)}</span>
          </div>
        </div>
      `;
      })
      .join('');
  }

  await renderPhotos();

  // Delete Photo Global Handler
  window.deletePhoto = async function (id, event) {
    if (event) event.stopPropagation();
    if (!isAdminMode) {
      showToast('Chế độ xem an toàn: Chỉ Chàng Dev mới có quyền xóa ảnh! 🛡️', '🔒');
      return;
    }
    if (!confirm('Bạn có chắc muốn xóa ảnh này khỏi album kỷ niệm?')) return;

    await PhotoDB.delete(id);
    let photos = await getPhotos();
    photos = photos.filter((p) => p.id !== id);
    try {
      localStorage.setItem('love_photos_2010', JSON.stringify(photos));
    } catch (e) {}

    await renderPhotos();
    showToast('Đã xóa ảnh khỏi album kỷ niệm!', '🗑️');
  };

  // Lightbox Modal
  window.openLightbox = function (url, caption) {
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const cap = document.getElementById('lightbox-caption');
    if (modal && img) {
      img.src = url;
      if (cap) cap.textContent = caption || '';
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  };

  const closeLightbox = document.getElementById('close-lightbox');
  const lightboxModal = document.getElementById('lightbox-modal');
  if (closeLightbox && lightboxModal) {
    closeLightbox.addEventListener('click', () => {
      lightboxModal.classList.add('hidden');
      lightboxModal.classList.remove('flex');
    });
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.add('hidden');
        lightboxModal.classList.remove('flex');
      }
    });
  }

  // Dedicated Add Photo Modal Handlers
  const addPhotoModalBtn = document.getElementById('add-photo-modal-btn');
  const addPhotoModal = document.getElementById('add-photo-modal');
  const closePhotoModal = document.getElementById('close-photo-modal');
  const addPhotoForm = document.getElementById('add-photo-form');
  const modalPhotoFile = document.getElementById('modal-photo-file');
  const modalPhotoUrl = document.getElementById('modal-photo-url');
  const modalPreviewBox = document.getElementById('modal-photo-preview-box');
  const modalPreviewImg = document.getElementById('modal-photo-preview-img');
  const modalSaveBtn = document.getElementById('modal-save-photo-btn');

  let currentSelectedImageData = '';

  if (addPhotoModalBtn && addPhotoModal) {
    addPhotoModalBtn.addEventListener('click', () => {
      addPhotoModal.classList.remove('hidden');
      addPhotoModal.classList.add('flex');
      currentSelectedImageData = '';
      if (addPhotoForm) addPhotoForm.reset();
      if (modalPreviewBox) modalPreviewBox.classList.add('hidden');
    });
  }

  if (closePhotoModal && addPhotoModal) {
    closePhotoModal.addEventListener('click', () => {
      addPhotoModal.classList.add('hidden');
      addPhotoModal.classList.remove('flex');
    });
    addPhotoModal.addEventListener('click', (e) => {
      if (e.target === addPhotoModal) {
        addPhotoModal.classList.add('hidden');
        addPhotoModal.classList.remove('flex');
      }
    });
  }

  // Handle file selection preview & compression
  if (modalPhotoFile) {
    modalPhotoFile.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        if (modalSaveBtn) modalSaveBtn.disabled = true;
        const compressed = await compressImage(file, 1200, 1200, 0.82);
        currentSelectedImageData = compressed;
        if (modalPreviewImg && modalPreviewBox) {
          modalPreviewImg.src = compressed;
          modalPreviewBox.classList.remove('hidden');
        }
        if (modalPhotoUrl) modalPhotoUrl.value = '';
      } catch (err) {
        console.error('Lỗi nén ảnh:', err);
      } finally {
        if (modalSaveBtn) modalSaveBtn.disabled = false;
      }
    });
  }

  // Handle URL input preview
  if (modalPhotoUrl) {
    modalPhotoUrl.addEventListener('input', () => {
      const val = modalPhotoUrl.value.trim();
      if (val) {
        currentSelectedImageData = val;
        if (modalPreviewImg && modalPreviewBox) {
          modalPreviewImg.src = val;
          modalPreviewBox.classList.remove('hidden');
        }
      }
    });
  }

  // Save new photo
  if (addPhotoForm) {
    addPhotoForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!isAdminMode) {
        showToast('Chế độ xem an toàn: Chỉ Chàng Dev mới có quyền thêm ảnh! 🛡️', '🔒');
        return;
      }
      const caption = document.getElementById('modal-photo-caption').value.trim() || 'Khoảnh khắc đáng nhớ';
      const date = document.getElementById('modal-photo-date').value.trim() || 'Kỷ niệm yêu';

      if (!currentSelectedImageData) {
        alert('Vui lòng chọn một ảnh từ thiết bị hoặc nhập link ảnh trước nhé!');
        return;
      }

      const newPhoto = {
        id: 'p-' + Date.now(),
        url: currentSelectedImageData,
        caption: caption,
        date: date
      };

      // Save to storage
      await PhotoDB.save(newPhoto);
      const photos = await getPhotos();
      photos.unshift(newPhoto);
      await savePhotos(photos);
      await renderPhotos();

      // Close modal
      if (addPhotoModal) {
        addPhotoModal.classList.add('hidden');
        addPhotoModal.classList.remove('flex');
      }

      fireLoveConfetti();
      showToast('Đã lưu ảnh kỷ niệm vào album thành công! 💖', '📸');
    });
  }

  /* ==========================================================================
     8. BỨC THƯ TÌNH 20/10 (Wax Seal Envelope & Letter Opening)
     ========================================================================== */
  const waxSealBtn = document.getElementById('wax-seal-btn');
  const envelopeCover = document.getElementById('envelope-cover');
  const letterPaper = document.getElementById('letter-paper');
  const editLetterBtn = document.getElementById('edit-letter-btn');

  if (waxSealBtn) {
    waxSealBtn.addEventListener('click', () => {
      fireLoveConfetti();
      if (!AudioEngine.isPlaying) {
        AudioEngine.play();
      }

      if (envelopeCover && letterPaper) {
        envelopeCover.classList.add('hidden');
        letterPaper.classList.remove('hidden');
        letterPaper.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  if (editLetterBtn) {
    editLetterBtn.addEventListener('click', () => {
      if (!isAdminMode) {
        unlockAdminMode();
        return;
      }
      const settingsModal = document.getElementById('settings-modal');
      if (settingsModal) {
        settingsModal.classList.remove('hidden');
        settingsModal.classList.add('flex');
        const letterInput = document.getElementById('setting-letter-content');
        if (letterInput) letterInput.focus();
      }
    });
  }

  /* ==========================================================================
     9. NƠI ANH NÓI NHỮNG LỜI YÊU THƯƠNG VỚI EM (Dev Love Engine & Quotes)
     ========================================================================== */
  // 1. Dev Love Code Terminal Execution Simulation
  const runDevCodeBtn = document.getElementById('run-dev-code-btn');
  const devConsoleMsg = document.getElementById('dev-console-msg');

  if (runDevCodeBtn && devConsoleMsg) {
    runDevCodeBtn.addEventListener('click', () => {
      runDevCodeBtn.disabled = true;
      devConsoleMsg.textContent = '⏳ Đang biên dịch thuật toán tình yêu của Luân...';

      setTimeout(() => {
        devConsoleMsg.innerHTML = '<span class="text-rose-400 font-bold">[SUCCESS]:</span> Biên dịch 100%! Không có lỗi nào. Trương Ngọc Linh mãi là công chúa trong tim Nguyễn Thành Luân! 💖';
        fireLoveConfetti();
        showToast('Thuật toán chạy thành công: Anh Luân yêu Bé Linh trọn đời! 🥰', '💻❤️');
        runDevCodeBtn.disabled = false;
        if (!AudioEngine.isPlaying) {
          AudioEngine.play();
        }
      }, 700);
    });
  }

  // 2. Love Quotes Carousel & Random Generator
  const defaultLoveQuotes = [
    "Thế giới có 8 tỷ người, nhưng với anh chỉ cần một nụ cười rạng rỡ của Trương Ngọc Linh là đủ làm sáng bừng cả thế giới!",
    "Code của anh có thể có bug, nhưng tình yêu anh dành cho bé iu Trương Ngọc Linh là tuyệt đối không một lỗi lầm.",
    "Anh không hứa sẽ mang cho em cả thế giới xa hoa, nhưng anh hứa sẽ làm tất cả để thế giới của Linh luôn ngập tràn tiếng cười và bình yên.",
    "Mỗi buổi sáng thức dậy, điều tuyệt vời nhất là biết rằng mình đang có một cô người yêu vừa xinh đẹp vừa đáng yêu tên là Linh.",
    "Nếu cuộc đời là một chương trình máy tính, thì gặp được em là đoạn code kỳ diệu và may mắn nhất cuộc đời anh.",
    "Em cứ việc làm công chúa nhỏ đáng yêu, mọi giông bão hay âu lo ngoài kia cứ để anh Luân gánh vác!",
    "Dù là 20/10 hay bất kỳ ngày nào trong năm, em vẫn luôn là người phụ nữ quan trọng nhất trong trái tim anh.",
    "Cảm ơn em vì đã luôn lắng nghe, thấu hiểu và cùng anh đi qua những ngày tháng tuổi trẻ tuyệt đẹp này.",
    "Mỗi lần nhìn vào mắt Linh, anh lại thấy cả bầu trời bình yên mà anh muốn che chở suốt cuộc đời.",
    "Yêu Trương Ngọc Linh hôm nay nhiều hơn hôm qua, và chắc chắn sẽ ít hơn ngày mai! ❤️",
    "Dù ngoài kia có bao nhiêu điều phức tạp, về bên Linh, mọi thứ trong lòng anh đều hóa dịu dàng.",
    "Anh thích ngắm em cười, thích nắm bàn tay nhỏ của em và thích cùng em già đi theo năm tháng."
  ];

  function getLoveQuotes() {
    try {
      const stored = localStorage.getItem('custom_love_quotes_2010');
      if (stored) {
        return [...defaultLoveQuotes, ...JSON.parse(stored)];
      }
    } catch (e) {}
    return defaultLoveQuotes;
  }

  let allLoveQuotes = getLoveQuotes();
  let currentQuoteIndex = 0;

  const currentQuoteEl = document.getElementById('current-love-quote');
  const quoteCounterEl = document.getElementById('love-quote-counter');
  const nextQuoteBtn = document.getElementById('next-love-quote-btn');

  function updateQuoteDisplay(index) {
    if (!currentQuoteEl) return;
    currentQuoteEl.style.opacity = '0';
    setTimeout(() => {
      currentQuoteEl.textContent = allLoveQuotes[index];
      currentQuoteEl.style.opacity = '1';
      if (quoteCounterEl) {
        quoteCounterEl.textContent = `${index + 1} / ${allLoveQuotes.length}`;
      }
    }, 200);
  }

  if (nextQuoteBtn) {
    nextQuoteBtn.addEventListener('click', () => {
      currentQuoteIndex = (currentQuoteIndex + 1) % allLoveQuotes.length;
      updateQuoteDisplay(currentQuoteIndex);
      fireLoveConfetti();
    });
  }

  // 3. Toggle Custom Love Note Form
  const toggleAddNoteBtn = document.getElementById('toggle-add-note-btn');
  const addNoteContainer = document.getElementById('add-note-container');
  const addLoveNoteForm = document.getElementById('add-love-note-form');

  if (toggleAddNoteBtn && addNoteContainer) {
    toggleAddNoteBtn.addEventListener('click', () => {
      addNoteContainer.classList.toggle('hidden');
    });
  }

  if (addLoveNoteForm) {
    addLoveNoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!isAdminMode) {
        showToast('Chế độ xem an toàn: Chỉ Chàng Dev mới có quyền lưu lời nhắn mới! 🛡️', '🔒');
        return;
      }
      const textInput = document.getElementById('custom-love-note-text');
      const val = textInput.value.trim();
      if (!val) return;

      allLoveQuotes.push(val);
      try {
        const storedCustom = JSON.parse(localStorage.getItem('custom_love_quotes_2010') || '[]');
        storedCustom.push(val);
        localStorage.setItem('custom_love_quotes_2010', JSON.stringify(storedCustom));
      } catch (e) {}

      currentQuoteIndex = allLoveQuotes.length - 1;
      updateQuoteDisplay(currentQuoteIndex);
      addLoveNoteForm.reset();
      addNoteContainer.classList.add('hidden');
      fireLoveConfetti();
      showToast('Đã gửi thêm lời yêu thương đến bé Linh thành công! 💖', '💌');
    });
  }

  // Mobile Navigation Drawer Toggle Handler
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeMenuIcon = document.getElementById('close-menu-icon');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.toggle('hidden');
      if (hamburgerIcon && closeMenuIcon) {
        hamburgerIcon.classList.toggle('hidden', !isHidden);
        closeMenuIcon.classList.toggle('hidden', isHidden);
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        if (hamburgerIcon && closeMenuIcon) {
          hamburgerIcon.classList.remove('hidden');
          closeMenuIcon.classList.add('hidden');
        }
      });
    });
  }

  /* ==========================================================================
     10. BẢNG ĐIỀU KHIỂN TÙY CHỈNH NHANH (Couple Settings Modal)
     ========================================================================== */
  const openSettingsBtn = document.getElementById('open-settings-btn');
  const closeSettingsBtn = document.getElementById('close-settings-modal');
  const settingsModal = document.getElementById('settings-modal');
  const settingsForm = document.getElementById('settings-form');

  if (openSettingsBtn && settingsModal) {
    openSettingsBtn.addEventListener('click', () => {
      if (!isAdminMode) {
        unlockAdminMode();
        return;
      }
      applyCoupleData();
      settingsModal.classList.remove('hidden');
      settingsModal.classList.add('flex');
    });
  }

  if (closeSettingsBtn && settingsModal) {
    closeSettingsBtn.addEventListener('click', () => {
      settingsModal.classList.add('hidden');
      settingsModal.classList.remove('flex');
    });

    settingsModal.addEventListener('click', (e) => {
      if (e.target === settingsModal) {
        settingsModal.classList.add('hidden');
        settingsModal.classList.remove('flex');
      }
    });
  }

  if (settingsForm) {
    settingsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!isAdminMode) {
        showToast('Chế độ xem an toàn: Chỉ Chàng Dev mới có quyền cập nhật cài đặt! 🛡️', '🔒');
        return;
      }
      const boy = document.getElementById('setting-boy-name').value.trim() || 'Nguyễn Thành Luân';
      const girl = document.getElementById('setting-girl-name').value.trim() || 'Trương Ngọc Linh';
      const date = document.getElementById('setting-anniversary-date').value || '2026-05-17';
      const subtitle = document.getElementById('setting-hero-subtitle').value.trim() || defaultCoupleData.heroSubtitle;
      const letter = document.getElementById('setting-letter-content').value.trim() || defaultCoupleData.letterContent;

      const updated = {
        boyName: boy,
        girlName: girl,
        coupleTitle: `${boy} ❤️ ${girl}`,
        anniversaryDate: date,
        heroSubtitle: subtitle,
        letterContent: letter
      };

      saveCoupleData(updated);
      applyCoupleData();
      updateLoveCounter();

      if (settingsModal) {
        settingsModal.classList.add('hidden');
        settingsModal.classList.remove('flex');
      }

      fireLoveConfetti();
      showToast('Đã cập nhật thông tin kỷ niệm thành công! ✨', '💾');
    });
  }

  // Initial apply & Admin UI state
  applyCoupleData();
  updateAdminModeUI();

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});
