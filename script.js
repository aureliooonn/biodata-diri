// ============ NAVBAR INTERACTIVE ============

// Mobile menu toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const navLinks = document.getElementById("navLinks");
const navLinkElements = document.querySelectorAll(".nav-link");

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
        mobileMenuToggle.classList.toggle("active");
        navLinks.classList.toggle("active");
    });
}

// Close mobile menu when link is clicked
navLinkElements.forEach((link) => {
    link.addEventListener("click", (e) => {
        // Get target before preventing default
        const targetId = link.getAttribute("href");

        // Only prevent default if it's an anchor link
        if (targetId.startsWith("#")) {
            e.preventDefault();

            // Update active link
            navLinkElements.forEach((l) => l.classList.remove("active"));
            link.classList.add("active");

            // Smooth scroll to target
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Close mobile menu before scrolling
                if (mobileMenuToggle.classList.contains("active")) {
                    mobileMenuToggle.classList.remove("active");
                    navLinks.classList.remove("active");
                }

                // Use a small delay to ensure mobile menu closes first
                setTimeout(() => {
                    targetSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }, 100);
            }
        }
    });
});

// Update active navbar link on scroll
window.addEventListener("scroll", () => {
    let current = "";

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    navLinkElements.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("data-section") === current) {
            link.classList.add("active");
        }
    });
});

// ============ BUTTON FUNCTIONS ============

// Smooth scroll untuk navigasi
function scrollToAbout() {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
    }
}

// Smooth scroll ke contact
function scrollToContact() {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
    }
}

// Interaksi form
const submitBtn = document.querySelector(".submit-btn");
if (submitBtn) {
    submitBtn.addEventListener("click", () => {
        const nameInput = document.querySelector(".form-input");
        const messageInput = document.querySelector(".form-textarea");

        if (nameInput && messageInput) {
            if (nameInput.value && messageInput.value) {
                alert(
                    `Terima kasih ${nameInput.value}! Pesanmu sudah diterima.`,
                );
                nameInput.value = "";
                messageInput.value = "";
            } else {
                alert("Mohon isi nama dan pesan terlebih dahulu.");
            }
        }
    });
}

// ============ PARALLAX & SCROLL BACKGROUND EFFECTS ============

// Parallax effect untuk background home section
document.addEventListener("mousemove", (e) => {
    const homeSection = document.querySelector(".home");
    if (homeSection) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        // Subtle parallax movement
        const xMove = mouseX * 30 - 15;
        const yMove = mouseY * 30 - 15;

        const homeAfter = homeSection.style;
        homeAfter.backgroundPosition = `${xMove}px ${yMove}px`;
    }
});

// Scroll-triggered background animation intensity
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const homeSection = document.querySelector(".home");
    const aboutSection = document.querySelector(".about");
    const contactSection = document.querySelector(".contact");

    // Home section - rotate pseudo elements faster when scrolling
    if (homeSection && scrollY < window.innerHeight) {
        const intensity = 1 + (scrollY / window.innerHeight) * 0.5;
        homeSection.style.filter = `brightness(${0.9 + intensity * 0.1})`;
    }

    // About section - animate blob movement based on scroll
    if (aboutSection) {
        const aboutRect = aboutSection.getBoundingClientRect();
        const aboutProgress = 1 - aboutRect.top / window.innerHeight;

        if (aboutProgress >= 0 && aboutProgress <= 1) {
            aboutSection.style.filter = `brightness(${0.95 + aboutProgress * 0.1})`;
        }
    }

    // Contact section - shift gradient animation
    if (contactSection) {
        const contactRect = contactSection.getBoundingClientRect();
        const contactProgress = 1 - contactRect.top / window.innerHeight;

        if (contactProgress >= 0 && contactProgress <= 1) {
            contactSection.style.filter = `brightness(${0.95 + contactProgress * 0.1})`;
        }
    }
});

// Add subtle mouse glow effect to background blobs
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Update cursor glow position for decorative elements
    const allDecorations = document.querySelectorAll(
        ".about-bg-decoration, .contact-bg-decoration, .home::before, .home::after",
    );

    allDecorations.forEach((decoration) => {
        const rect = decoration.getBoundingClientRect();
        const distance = Math.sqrt(
            Math.pow(mouseX - (rect.left + rect.width / 2), 2) +
                Math.pow(mouseY - (rect.top + rect.height / 2), 2),
        );

        // Add subtle glow when mouse is near (within 300px)
        if (distance < 300) {
            const intensity = 1 - distance / 300;
            decoration.style.opacity = Math.min(0.3 + intensity * 0.2, 0.5);
        }
    });
});

// ============ INTERACTIVE BACKGROUND PATTERNS ============

// Add click-to-trigger animation ripples on sections
document.querySelectorAll(".home, .about, .contact").forEach((section) => {
    section.addEventListener("click", (e) => {
        // Create temporary ripple effect
        const ripple = document.createElement("div");
        ripple.style.position = "absolute";
        ripple.style.width = "50px";
        ripple.style.height = "50px";
        ripple.style.background =
            "radial-gradient(circle, rgba(184, 23, 209, 0.5) 0%, transparent 70%)";
        ripple.style.borderRadius = "50%";
        ripple.style.pointerEvents = "none";
        ripple.style.left =
            e.clientX - section.getBoundingClientRect().left - 25 + "px";
        ripple.style.top =
            e.clientY - section.getBoundingClientRect().top - 25 + "px";
        ripple.style.animation = "ripple-expand 0.8s ease-out forwards";
        ripple.style.zIndex = "2";

        section.appendChild(ripple);

        setTimeout(() => ripple.remove(), 800);
    });
});

// Add ripple animation keyframe dynamically if not exists
if (!document.querySelector("style[data-ripple]")) {
    const style = document.createElement("style");
    style.setAttribute("data-ripple", "true");
    style.textContent = `
        @keyframes ripple-expand {
            0% {
                width: 50px;
                height: 50px;
                opacity: 1;
            }
            100% {
                width: 400px;
                height: 400px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ============ ABOUT SECTION INTERACTIVITY ============

// Animated skill progress bars on scroll visibility
const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px",
};

const observerCallback = (entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const skillProgress = entry.target.querySelector(".skill-progress");
            if (skillProgress) {
                const width = skillProgress.style.width;
                skillProgress.style.width = "0";
                setTimeout(() => {
                    skillProgress.style.width = width;
                }, 50);
            }
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
const skillItems = document.querySelectorAll(".skill-item");
skillItems.forEach((item) => observer.observe(item));

// Trait items tooltip enhancement
const traitItems = document.querySelectorAll(".trait-item");
traitItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;

    item.addEventListener("mouseenter", () => {
        item.style.zIndex = "100";
    });

    item.addEventListener("mouseleave", () => {
        item.style.zIndex = "auto";
    });
});

// Bio avatar hover effect enhancement
const bioAvatar = document.querySelector(".bio-avatar");
if (bioAvatar) {
    bioAvatar.addEventListener("mouseenter", () => {
        const avatarImg = bioAvatar.querySelector(".bio-avatar-img");
        if (avatarImg) {
            avatarImg.style.filter =
                "brightness(1.1) drop-shadow(0 0 20px rgba(184, 23, 209, 0.5))";
        }
    });

    bioAvatar.addEventListener("mouseleave", () => {
        const avatarImg = bioAvatar.querySelector(".bio-avatar-img");
        if (avatarImg) {
            avatarImg.style.filter =
                "brightness(1) drop-shadow(0 0 0px transparent)";
        }
    });
}

// Stat cards staggered animation
const statCards = document.querySelectorAll(".stat-card");
statCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;

    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(-6px) scale(1)";
    });
});

// Value cards click interaction
const valueCards = document.querySelectorAll(".value-card");
valueCards.forEach((card) => {
    card.addEventListener("click", () => {
        card.style.transform = "scale(0.98)";
        setTimeout(() => {
            card.style.transform = "translateY(-10px)";
        }, 100);
    });
});

// Hobby badges interactive effect
const hobbyBadges = document.querySelectorAll(".hobby-badge");
hobbyBadges.forEach((badge, index) => {
    badge.addEventListener("click", () => {
        badge.style.transform = "scale(1.1) rotate(5deg)";
        setTimeout(() => {
            badge.style.transform = "scale(1) rotate(0deg)";
        }, 200);
    });
});

// Add scroll animation for entire about section
const aboutSection = document.querySelector(".about");
if (aboutSection) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
            });
        },
        { threshold: 0.1 },
    );

    sectionObserver.observe(aboutSection);
}

// ===== CONTACT SECTION INTERACTIONS =====
const contactSectionEl = document.getElementById("contact");
if (contactSectionEl) {
    // Blob parallax
    contactSectionEl.addEventListener("mousemove", (e) => {
        const rect = contactSectionEl.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        document.querySelectorAll(".contact-bg .blob").forEach((blob, i) => {
            const moveX = x * (30 + i * 18);
            const moveY = y * (20 + i * 12);
            blob.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });
    });

    // Tilt cards
    const tiltCards = contactSectionEl.querySelectorAll("[data-tilt]");
    tiltCards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const rx = (dy / rect.height) * -8;
            const ry = (dx / rect.width) * 10;
            card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });

    // Form submit + validation + success overlay
    const contactForm = document.getElementById("contactForm");
    const formStatusEl = document.getElementById("formStatus");
    const successOverlay = document.getElementById("contactSuccess");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('[name="name"]');
            const email = contactForm.querySelector('[name="email"]');
            const message = contactForm.querySelector('[name="message"]');

            if (
                !name.value.trim() ||
                !email.value.trim() ||
                !message.value.trim()
            ) {
                if (formStatusEl) {
                    formStatusEl.textContent = "Mohon lengkapi semua kolom.";
                    formStatusEl.style.color = "#ffd1d1";
                }
                return;
            }

            if (formStatusEl) {
                formStatusEl.textContent = "Mengirim...";
                formStatusEl.style.color = "#fff";
            }

            // Simulate send
            setTimeout(() => {
                if (successOverlay) {
                    successOverlay.classList.add("show");
                    successOverlay.setAttribute("aria-hidden", "false");
                }
                contactForm.reset();
                if (formStatusEl) formStatusEl.textContent = "";

                setTimeout(() => {
                    if (successOverlay) {
                        successOverlay.classList.remove("show");
                        successOverlay.setAttribute("aria-hidden", "true");
                    }
                }, 2000);
            }, 900);
        });
    }
}

// ===== ABOUT SECTION: decorative parallax and bio-card tilt =====
(function () {
    const aboutEl = document.querySelector(".about");
    const decor = document.querySelector(".about-profile-decor");
    const bioCard = document.querySelector(".bio-card");

    if (aboutEl && decor) {
        aboutEl.addEventListener("mousemove", (e) => {
            const rect = aboutEl.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            // move decorative image slightly opposite for parallax
            decor.style.transform = `translate3d(${x * -18}px, ${y * -12}px, 0) rotate(${x * 3}deg) scale(1.01)`;
            decor.style.filter = `brightness(${1 + Math.abs(x) * 0.04}) saturate(${1 + Math.abs(x) * 0.06})`;
        });

        aboutEl.addEventListener("mouseleave", () => {
            decor.style.transform = "";
            decor.style.filter = "";
        });
    }

    // gentle tilt for bio card
    if (bioCard) {
        bioCard.addEventListener("mousemove", (e) => {
            const rect = bioCard.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const rx = (dy / rect.height) * -6;
            const ry = (dx / rect.width) * 8;
            bioCard.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        });
        bioCard.addEventListener("mouseleave", () => {
            bioCard.style.transform = "";
        });
    }
    // lightbox handling
    const lightbox = document.getElementById("profileLightbox");
    const lightboxClose = document.getElementById("lightboxClose");
    const lightboxImg = document.getElementById("lightboxImg");
    if (decor) {
        decor.addEventListener("click", (e) => {
            e.stopPropagation();
            if (lightbox) {
                lightbox.setAttribute("aria-hidden", "false");
            }
        });
    }
    if (lightboxClose) {
        lightboxClose.addEventListener("click", () => {
            if (lightbox) lightbox.setAttribute("aria-hidden", "true");
        });
    }
    if (lightbox) {
        lightbox.addEventListener("click", (ev) => {
            if (ev.target && ev.target.hasAttribute("data-close")) {
                lightbox.setAttribute("aria-hidden", "true");
            }
        });
        document.addEventListener("keydown", (k) => {
            if (
                k.key === "Escape" &&
                lightbox.getAttribute("aria-hidden") === "false"
            ) {
                lightbox.setAttribute("aria-hidden", "true");
            }
        });
    }
})();

// ============ ABOUT PROFILE DECORATOR INTERACTIVE EFFECTS ============
(function () {
    const aboutProfileFrame = document.querySelector(".about-profile-frame");
    const aboutProfileDecor = document.querySelector(".about-profile-decor");

    if (aboutProfileFrame && aboutProfileDecor) {
        let mouseX = 0;
        let mouseY = 0;
        let isHovering = false;

        // Mouse move tracking untuk efek subtle tilt
        aboutProfileFrame.addEventListener("mousemove", (e) => {
            if (!isHovering) return;

            const rect = aboutProfileFrame.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            mouseX = (e.clientX - centerX) / rect.width;
            mouseY = (e.clientY - centerY) / rect.height;

            const rotateX = mouseY * 8;
            const rotateY = mouseX * 8;
            const tiltX = mouseY * 3;
            const tiltY = mouseX * -3;

            aboutProfileFrame.style.transform = `
                perspective(1200px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(${tiltX}px)
            `;

            aboutProfileDecor.style.transform = `
                translateZ(50px)
                rotate(${tiltY}deg)
            `;
        });

        // Hover state
        aboutProfileFrame.addEventListener("mouseenter", () => {
            isHovering = true;
            aboutProfileFrame.style.animation = "none";
        });

        aboutProfileFrame.addEventListener("mouseleave", () => {
            isHovering = false;
            aboutProfileFrame.style.transform =
                "perspective(1200px) rotateX(0deg) rotateY(0deg)";
            aboutProfileDecor.style.transform = "translateZ(0) rotate(0deg)";
            aboutProfileFrame.style.animation =
                "float-tilt 6s ease-in-out infinite";
        });

        // Click untuk zoom dengan particle effect
        aboutProfileDecor.addEventListener("click", (e) => {
            if (aboutProfileDecor.style.opacity === "0.7") {
                // Reset jika sudah di-zoom
                aboutProfileDecor.style.opacity = "1";
                aboutProfileDecor.style.transform = "";
            } else {
                // Zoom effect dengan particle
                createDecorParticles(e);
                aboutProfileDecor.style.opacity = "0.7";
                aboutProfileDecor.style.transform =
                    "scale(1.1) translateZ(100px)";
            }
        });

        function createDecorParticles(e) {
            const rect = aboutProfileDecor.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            for (let i = 0; i < 6; i++) {
                const particle = document.createElement("div");
                particle.className = "decor-particle";
                particle.style.cssText = `
                    position: fixed;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, rgba(124, 77, 255, 0.8), rgba(255, 106, 149, 0.8));
                    pointer-events: none;
                    left: ${centerX}px;
                    top: ${centerY}px;
                    box-shadow: 0 0 8px rgba(255, 106, 149, 0.6);
                    animation: decorParticleFloat 1.2s ease-out forwards;
                    --angle: ${(360 / 6) * i}deg;
                `;

                document.body.appendChild(particle);
                setTimeout(() => particle.remove(), 1200);
            }
        }

        // Add animation keyframes for decor particles
        if (!document.getElementById("decor-particle-styles")) {
            const style = document.createElement("style");
            style.id = "decor-particle-styles";
            style.textContent = `
                @keyframes decorParticleFloat {
                    0% {
                        opacity: 1;
                        transform: translate(0, 0) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: 
                            translate(
                                calc(cos(var(--angle)) * 100px),
                                calc(sin(var(--angle)) * 100px)
                            ) 
                            scale(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Ambient light effect on frame
        aboutProfileFrame.addEventListener("mousemove", (e) => {
            if (!isHovering) return;

            const rect = aboutProfileFrame.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            aboutProfileFrame.style.setProperty("--mouse-x", `${x}px`);
            aboutProfileFrame.style.setProperty("--mouse-y", `${y}px`);
        });
    }
})();

// ============ BIO AVATAR INTERACTIVE EFFECTS ============
(function () {
    const bioAvatarImg = document.querySelector(".bio-avatar-img");
    const bioCard = document.querySelector(".bio-card");

    if (bioAvatarImg && bioCard) {
        let mouseX = 0;
        let mouseY = 0;
        let isHovering = false;

        // Mouse move tracking untuk efek 3D
        bioCard.addEventListener("mousemove", (e) => {
            if (!isHovering) return;

            const rect = bioCard.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;

            mouseX = e.clientX - cardCenterX;
            mouseY = e.clientY - cardCenterY;

            const rotateX = (mouseY / rect.height) * 15;
            const rotateY = (mouseX / rect.width) * 15;

            bioAvatarImg.style.transform = `
                scale(1.15) 
                rotateX(${5 + rotateX}deg) 
                rotateY(${-5 + rotateY}deg) 
                rotateZ(-3deg)
            `;
        });

        // Hover state
        bioCard.addEventListener("mouseenter", () => {
            isHovering = true;
        });

        bioCard.addEventListener("mouseleave", () => {
            isHovering = false;
            bioAvatarImg.style.transform =
                "scale(1.15) rotateZ(-3deg) rotateX(5deg) rotateY(-5deg)";
        });

        // Particle creation on click
        bioAvatarImg.addEventListener("click", (e) => {
            createParticles(e);
        });

        function createParticles(e) {
            const rect = bioAvatarImg.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            for (let i = 0; i < 8; i++) {
                const particle = document.createElement("div");
                particle.className = "avatar-particle";
                particle.style.cssText = `
                    position: fixed;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #ff006e, #b817d1);
                    pointer-events: none;
                    left: ${centerX}px;
                    top: ${centerY}px;
                    box-shadow: 0 0 10px rgba(255, 100, 255, 0.8);
                    animation: particleExplode 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                    --angle: ${(360 / 8) * i}deg;
                `;

                document.body.appendChild(particle);

                setTimeout(() => particle.remove(), 1000);
            }
        }

        // Add animation keyframes for particles
        if (!document.getElementById("avatar-particle-styles")) {
            const style = document.createElement("style");
            style.id = "avatar-particle-styles";
            style.textContent = `
                @keyframes particleExplode {
                    0% {
                        opacity: 1;
                        transform: translate(0, 0) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: 
                            translate(
                                calc(cos(var(--angle)) * 120px),
                                calc(sin(var(--angle)) * 120px)
                            ) 
                            scale(0);
                    }
                }

                @keyframes shimmer {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }

                .bio-avatar-img:hover::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    border-radius: 20px;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.2),
                        transparent
                    );
                    background-size: 200% 100%;
                    animation: shimmer 2s infinite;
                    pointer-events: none;
                }
            `;
            document.head.appendChild(style);
        }

        // Add subtle glow intensity on interact
        bioCard.addEventListener("mouseenter", () => {
            bioAvatarImg.style.filter = "brightness(1.1) saturate(1.15)";
        });

        bioCard.addEventListener("mouseleave", () => {
            bioAvatarImg.style.filter = "brightness(1) saturate(1)";
        });
    }
})();
// ============ END OF SCRIPT ============
