// Navigation between pages
function goToPage(pageNumber) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show the selected page
    document.getElementById(`page${pageNumber}`).classList.add('active');
    
    // Scroll to top when changing pages
    window.scrollTo(0, 0);
}

// Create floating hearts
function createHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    const heartRain = document.querySelector('.heart-rain');
    const heartsBg = document.querySelector('.hearts-bg');
    
    const heartIcons = ['❤️', '💖', '💕', '💗', '💓', '💞', '💘', '💝'];
    
    // Create hearts for floating effect
    if (heartsContainer) {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.innerHTML = heartIcons[Math.floor(Math.random() * heartIcons.length)];
                
                // Random properties
                const left = Math.random() * 100;
                const size = Math.random() * 30 + 20;
                const duration = Math.random() * 8 + 8;
                const delay = Math.random() * 5;
                
                heart.style.left = `${left}vw`;
                heart.style.fontSize = `${size}px`;
                heart.style.animationDuration = `${duration}s`;
                heart.style.animationDelay = `${delay}s`;
                
                // Random color
                const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#db7093', '#ff66a3'];
                heart.style.color = colors[Math.floor(Math.random() * colors.length)];
                
                heartsContainer.appendChild(heart);
                
                // Remove heart after animation completes
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, (duration + delay) * 1000);
            }, i * 300);
        }
    }
    
    // Create hearts for heart rain
    if (heartRain) {
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤️';
            
            const left = Math.random() * 100;
            const size = Math.random() * 40 + 30;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;
            
            heart.style.left = `${left}vw`;
            heart.style.fontSize = `${size}px`;
            heart.style.animationDuration = `${duration}s`;
            heart.style.animationDelay = `${delay}s`;
            heart.style.color = '#ff0066';
            
            heartRain.appendChild(heart);
        }
    }
}

// No button functionality - moves when cursor approaches
function setupNoButton() {
    const noBtn = document.getElementById('noBtn');
    
    if (noBtn) {
        // Make button unclickable
        noBtn.addEventListener('click', function(e) {
            e.preventDefault();
            return false;
        });
        
        // Move button when mouse approaches
        noBtn.addEventListener('mouseover', function() {
            moveNoButton();
        });
        
        // Move button on touch for mobile
        noBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            moveNoButton();
        });
        
        // Move button when tapped on mobile
        noBtn.addEventListener('click', function(e) {
            e.preventDefault();
            moveNoButton();
            return false;
        });
    }
}

function moveNoButton() {
    const noBtn = document.getElementById('noBtn');
    if (!noBtn) return;
    
    const container = document.querySelector('.buttons');
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const buttonRect = noBtn.getBoundingClientRect();
    
    // Calculate new position
    const maxX = containerRect.width - buttonRect.width;
    const maxY = containerRect.height - buttonRect.height;
    
    let newX, newY;
    let attempts = 0;
    const maxAttempts = 10;
    
    // Try to find a position that's not too close to edges
    do {
        newX = Math.random() * maxX;
        newY = Math.random() * maxY;
        attempts++;
        
        // Check if position is reasonable (not too close to edges)
        const isGoodPosition = newX > 20 && newX < maxX - 20 && 
                              newY > 20 && newY < maxY - 20;
        
        if (isGoodPosition || attempts >= maxAttempts) {
            break;
        }
    } while (true);
    
    // Apply new position with smooth transition
    noBtn.style.transition = 'all 0.3s ease';
    noBtn.style.transform = `translate(${newX}px, ${newY}px)`;
    
    // Remove transition after movement for instant response next time
    setTimeout(() => {
        noBtn.style.transition = 'none';
    }, 300);
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Setup the no button
    setupNoButton();
    
    // Create initial hearts
    createHearts();
    
    // Create hearts periodically
    setInterval(createHearts, 5000);
    
    // Handle back button
    window.addEventListener('popstate', function() {
        // If user tries to go back from page 1, prevent it
        if (document.getElementById('page1').classList.contains('active')) {
            history.pushState(null, null, window.location.href);
        }
    });
    
    // Prevent context menu on the no button
    const noBtn = document.getElementById('noBtn');
    if (noBtn) {
        noBtn.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            moveNoButton();
            return false;
        });
    }
    
    // Push initial state
    history.pushState(null, null, window.location.href);
});

// Add sparkle effect to diamonds
function addDiamondSparkle() {
    const diamonds = document.querySelectorAll('.border-diamond');
    
    diamonds.forEach(diamond => {
        // Add sparkle animation
        diamond.style.animation = 'sparkle 2s infinite alternate';
        
        // Create sparkle particles
        setInterval(() => {
            if (Math.random() > 0.7) {
                createSparkle(diamond);
            }
        }, 1000);
    });
    
    // Add sparkle animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkle {
            0% { opacity: 0.7; transform: rotate(45deg) scale(1); }
            100% { opacity: 1; transform: rotate(45deg) scale(1.2); box-shadow: 0 0 20px #ffd700; }
        }
        
        .sparkle-particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 50%;
            pointer-events: none;
            z-index: 100;
            animation: float-up 1s ease-out forwards;
        }
        
        @keyframes float-up {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            100% { transform: translate(var(--tx), -30px) scale(0); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

function createSparkle(diamond) {
    const rect = diamond.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    for (let i = 0; i < 3; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle-particle');
        
        const tx = (Math.random() - 0.5) * 40;
        sparkle.style.setProperty('--tx', `${tx}px`);
        
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        sparkle.style.background = `radial-gradient(circle, white, #ffd700)`;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
}

// Call this function after page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add diamond sparkle effect
    setTimeout(addDiamondSparkle, 1000);
});

// ===========================================
// PAGE 3 SIMPLIFIED - NO FALLING HEARTS
// ===========================================

function setupPage3Interactions() {
    // Smooth scroll from hero section to photo gallery
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const gallerySection = document.querySelector('.photo-gallery-section');
            if (gallerySection) {
                gallerySection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Add hover effects to photo frames
    const photoFrames = document.querySelectorAll('.photo-frame');
    photoFrames.forEach(frame => {
        frame.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
        });
        
        frame.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
        });
    });
    
    // NO HEARTS - REMOVED createFallingHearts()
}

function checkActivePage() {
    if (document.getElementById('page3').classList.contains('active')) {
        setupPage3Interactions();
    }
}

// Call this when page loads and when switching pages
document.addEventListener('DOMContentLoaded', function() {
    // Check active page
    checkActivePage();
    
    // Add event listener for page changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                checkActivePage();
            }
        });
    });
    
    // Observe page3 for class changes
    const page3 = document.getElementById('page3');
    if (page3) {
        observer.observe(page3, {
            attributes: true
        });
    }
});
// Simple Lightbox for Page 3 Images
function setupImageLightbox() {
    // Get all images on page 3
    const images = document.querySelectorAll('#page3 .memory-photo');
    
    // Create lightbox container
    const lightbox = document.createElement('div');
    lightbox.id = 'imageLightbox';
    lightbox.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        z-index: 10000;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    `;
    
    // Create lightbox image
    const lightboxImg = document.createElement('img');
    lightboxImg.style.cssText = `
        max-width: 90%;
        max-height: 80%;
        object-fit: contain;
        border: 3px solid #ffd700;
        border-radius: 10px;
        box-shadow: 0 0 30px rgba(255,105,180,0.5);
    `;
    
    // Create caption
    const caption = document.createElement('p');
    caption.style.cssText = `
        color: white;
        margin-top: 20px;
        font-size: 1.2rem;
        font-family: 'Poppins', sans-serif;
        color: #ffd700;
    `;
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        font-size: 50px;
        color: white;
        background: none;
        border: none;
        cursor: pointer;
        z-index: 10001;
    `;
    closeBtn.onclick = () => lightbox.style.display = 'none';
    
    // Assemble lightbox
    lightbox.appendChild(closeBtn);
    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(caption);
    document.body.appendChild(lightbox);
    
    // Add click event to each image
    images.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            lightboxImg.src = this.src;
            // Get caption text from the photo-caption
            const card = this.closest('.photo-item');
            const title = card.querySelector('h3')?.textContent || '';
            const desc = card.querySelector('p')?.textContent || '';
            caption.textContent = title ? `${title} - ${desc}` : 'Our Beautiful Memory';
            lightbox.style.display = 'flex';
        });
    });
    
    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            lightbox.style.display = 'none';
        }
    });
}

// Call this when page 3 becomes active
document.addEventListener('DOMContentLoaded', function() {
    // Your existing code...
    
    // Setup lightbox when page 3 is active
    const page3 = document.getElementById('page3');
    if (page3 && page3.classList.contains('active')) {
        setupImageLightbox();
    }
    
    // Also setup when page changes to page 3
    const observer = new MutationObserver(function() {
        if (page3 && page3.classList.contains('active')) {
            setupImageLightbox();
        }
    });
    if (page3) {
        observer.observe(page3, { attributes: true, attributeFilter: ['class'] });
    }
});

// Page 4 Video Gallery Functions - WORKING VERSION
function setupPage4Gallery() {
    console.log("Setting up Page 4 gallery");
    
    const videos = document.querySelectorAll('.guitar-video');
    const playButtons = document.querySelectorAll('.play-btn');
    const playAllBtn = document.getElementById('playAllBtn');
    const pauseAllBtn = document.getElementById('pauseAllBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const trackTitle = document.querySelector('.track-title');
    const trackStatus = document.querySelector('.track-status');
    
    console.log("Found videos:", videos.length);
    
    let currentVideo = null;
    let currentVideoIndex = -1;
    
    // Setup individual video play buttons
    playButtons.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log("Button clicked:", index);
            toggleVideo(index);
        });
    });
    
    // Setup video click to play
    videos.forEach((video, index) => {
        video.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Video clicked:", index);
            toggleVideo(index);
        });
        
        video.addEventListener('play', function() {
            console.log("Video playing:", index);
            updatePlayerInfo(index);
            if (trackStatus) trackStatus.textContent = 'Playing';
            if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        });
        
        video.addEventListener('pause', function() {
            console.log("Video paused:", index);
            if (trackStatus) trackStatus.textContent = 'Paused';
            if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        });
        
        video.addEventListener('ended', function() {
            console.log("Video ended:", index);
            resetVideo(index);
        });
        
        video.addEventListener('error', function(e) {
            console.error("Video error at index", index, ":", video.error);
        });
        
        // Set initial volume
        if (volumeSlider) {
            video.volume = parseFloat(volumeSlider.value);
        } else {
            video.volume = 0.7;
        }
    });
    
    function toggleVideo(index) {
        console.log("Toggling video:", index);
        
        const video = videos[index];
        const btn = playButtons[index];
        const card = btn.closest('.video-card');
        
        if (!video) {
            console.error("Video not found at index:", index);
            return;
        }
        
        if (currentVideo && currentVideo !== video) {
            console.log("Pausing current video");
            currentVideo.pause();
            const currentIndex = Array.from(videos).indexOf(currentVideo);
            if (currentIndex !== -1) {
                const currentBtn = playButtons[currentIndex];
                const currentCard = currentBtn.closest('.video-card');
                currentCard.classList.remove('playing');
                currentBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        }
        
        if (video.paused) {
            console.log("Attempting to play video");
            const playPromise = video.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log("Play succeeded");
                        card.classList.add('playing');
                        currentVideo = video;
                        currentVideoIndex = index;
                        btn.innerHTML = '<i class="fas fa-pause"></i>';
                    })
                    .catch(error => {
                        console.error("Play failed:", error);
                        alert("Video could not play. Check that the file exists at: " + video.querySelector('source').src);
                    });
            }
        } else {
            console.log("Pausing video");
            video.pause();
            card.classList.remove('playing');
            btn.innerHTML = '<i class="fas fa-play"></i>';
            if (currentVideo === video) {
                currentVideo = null;
                currentVideoIndex = -1;
                if (trackTitle) trackTitle.textContent = 'Select a video to play';
                if (trackStatus) trackStatus.textContent = 'Paused';
            }
        }
    }
    
    function resetVideo(index) {
        const video = videos[index];
        const btn = playButtons[index];
        const card = btn.closest('.video-card');
        
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
        if (card) card.classList.remove('playing');
        if (btn) btn.innerHTML = '<i class="fas fa-play"></i>';
    }
    
    function updatePlayerInfo(index) {
        const card = playButtons[index].closest('.video-card');
        const title = card.querySelector('h3').textContent;
        if (trackTitle) trackTitle.textContent = title;
    }
    
    // Play All button
    if (playAllBtn) {
        playAllBtn.addEventListener('click', function() {
            console.log("Play all clicked");
            videos.forEach((video, index) => {
                video.play().catch(e => console.log("Error playing video", index, e));
                const card = playButtons[index].closest('.video-card');
                card.classList.add('playing');
                playButtons[index].innerHTML = '<i class="fas fa-pause"></i>';
            });
            if (videos.length > 0) {
                currentVideo = videos[0];
                currentVideoIndex = 0;
                updatePlayerInfo(0);
                if (trackStatus) trackStatus.textContent = 'Playing All';
                if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
        });
    }
    
    // Pause All button
    if (pauseAllBtn) {
        pauseAllBtn.addEventListener('click', function() {
            console.log("Pause all clicked");
            videos.forEach((video, index) => {
                video.pause();
                const card = playButtons[index].closest('.video-card');
                card.classList.remove('playing');
                playButtons[index].innerHTML = '<i class="fas fa-play"></i>';
            });
            currentVideo = null;
            currentVideoIndex = -1;
            if (trackTitle) trackTitle.textContent = 'Select a video to play';
            if (trackStatus) trackStatus.textContent = 'Paused';
            if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        });
    }
    
    // Volume control
    if (volumeSlider) {
        volumeSlider.addEventListener('input', function() {
            const volume = parseFloat(this.value);
            console.log("Volume changed:", volume);
            videos.forEach(video => {
                video.volume = volume;
            });
        });
    }
    
    // Play/Pause button
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function() {
            if (currentVideo) {
                if (currentVideo.paused) {
                    currentVideo.play();
                    this.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    currentVideo.pause();
                    this.innerHTML = '<i class="fas fa-play"></i>';
                }
            }
        });
    }
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentVideoIndex > 0) {
                toggleVideo(currentVideoIndex - 1);
            }
        });
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentVideoIndex < videos.length - 1) {
                toggleVideo(currentVideoIndex + 1);
            }
        });
    }
}

// Initialize when page 4 is active
function initPage4() {
    if (document.getElementById('page4').classList.contains('active')) {
        console.log("Page 4 active, setting up gallery");
        setTimeout(setupPage4Gallery, 100); // Small delay to ensure DOM is ready
        createFloatingMusicNotes();
    }
}

// Create floating music notes
function createFloatingMusicNotes() {
    const container = document.querySelector('.floating-notes');
    if (!container) return;
    
    const notes = ['♩', '♪', '♫', '♬', '🎵', '🎶'];
    container.innerHTML = '';
    
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const note = document.createElement('div');
            note.className = 'music-note';
            note.innerHTML = notes[Math.floor(Math.random() * notes.length)];
            
            note.style.left = Math.random() * 100 + 'vw';
            note.style.fontSize = (Math.random() * 20 + 15) + 'px';
            note.style.animationDuration = (Math.random() * 6 + 4) + 's';
            note.style.animationDelay = (Math.random() * 3) + 's';
            
            const colors = ['#ff69b4', '#8a2be2', '#ffd700', '#ff1493'];
            note.style.color = colors[Math.floor(Math.random() * colors.length)];
            
            container.appendChild(note);
        }, i * 300);
    }
}

// Watch for page changes
document.addEventListener('DOMContentLoaded', function() {
    initPage4();
    
    const page4 = document.getElementById('page4');
    if (page4) {
        const observer = new MutationObserver(function() {
            if (page4.classList.contains('active')) {
                console.log("Page 4 became active");
                setTimeout(setupPage4Gallery, 100);
                createFloatingMusicNotes();
            }
        });
        observer.observe(page4, { attributes: true, attributeFilter: ['class'] });
    }
});
// Page 4 Video Hero with Sound Control
function setupVideoHero() {
    const heroVideo = document.getElementById('heroVideo');
    const soundToggle = document.getElementById('soundToggle');
    
    if (!heroVideo || !soundToggle) return;
    
    // Start muted (required for autoplay)
    heroVideo.muted = true;
    soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    soundToggle.classList.remove('sound-on');
    
    // Toggle sound on button click
    soundToggle.addEventListener('click', function() {
        if (heroVideo.muted) {
            heroVideo.muted = false;
            soundToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            soundToggle.classList.add('sound-on');
            
            // Try to play if paused (browsers might pause when unmuting)
            if (heroVideo.paused) {
                heroVideo.play().catch(e => console.log("Play failed:", e));
            }
        } else {
            heroVideo.muted = true;
            soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            soundToggle.classList.remove('sound-on');
        }
    });
    
    // Ensure video plays when page becomes active
    if (document.getElementById('page4').classList.contains('active')) {
        heroVideo.play().catch(e => console.log("Initial play failed:", e));
    }
}

// Call this when page 4 is active
function initPage4Hero() {
    if (document.getElementById('page4').classList.contains('active')) {
        setTimeout(setupVideoHero, 200);
        
        // Also ensure video plays
        const heroVideo = document.getElementById('heroVideo');
        if (heroVideo) {
            heroVideo.play().catch(e => console.log("Play on active:", e));
        }
    }
}

// Add to your existing page observer
document.addEventListener('DOMContentLoaded', function() {
    // ... your existing code ...
    
    // Initialize hero when page 4 is active
    initPage4Hero();
    
    // Watch for page changes
    const page4 = document.getElementById('page4');
    if (page4) {
        const observer = new MutationObserver(function() {
            if (page4.classList.contains('active')) {
                initPage4Hero();
            }
        });
        observer.observe(page4, { attributes: true, attributeFilter: ['class'] });
    }
});
