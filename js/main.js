const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebar-overlay");
const menuToggle = document.getElementById("menu-toggle");
const sidebarLinks = sidebar.querySelectorAll("a");

function setMenuState(isOpen) {
    sidebar.classList.toggle("active", isOpen);
    sidebarOverlay.classList.toggle("active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    sidebarOverlay.setAttribute("aria-hidden", String(!isOpen));

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
}

function toggleMenu() {
    const isOpen = sidebar.classList.contains("active");
    setMenuState(!isOpen);
}

function closeMenu() {
    setMenuState(false);
}

sidebarOverlay.addEventListener("click", closeMenu);

sidebarLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});

        const languageToggle = document.getElementById("language-toggle");
        const englishOption = languageToggle.querySelector(".language-en");
        const chineseOption = languageToggle.querySelector(".language-zh");

        function applyLanguage(language) {
            const isChinese = language === "zh";

            document.documentElement.lang = language;
            localStorage.setItem("language", language);

            document.querySelectorAll("[data-en][data-zh]").forEach(element => {
                // 保留含有子元素的內容，避免清除打字動畫的 span
                if (element.children.length > 0) {
                    return;
                }

                element.textContent = element.getAttribute(
                    isChinese ? "data-zh" : "data-en"
                );
            });

            englishOption.classList.toggle("active", !isChinese);
            chineseOption.classList.toggle("active", isChinese);

            languageToggle.setAttribute(
                "aria-label",
                isChinese ? "Switch to English" : "切換為中文"
            );
        }

        languageToggle.addEventListener("click", function () {
            const nextLanguage =
                document.documentElement.lang === "en" ? "zh" : "en";

            applyLanguage(nextLanguage);
        });

        applyLanguage(localStorage.getItem("language") || "en");

        document.querySelectorAll(".contact-icons a").forEach(icon => {
            icon.addEventListener("mouseenter", function () {
                let particleContainer = this.querySelector(".particle-container");

                for (let i = 0; i < 15; i++) {
                    let particle = document.createElement("div");
                    particle.classList.add("particle");

                    let size = Math.random() * 5 + 3;
                    let angle = Math.random() * 2 * Math.PI;
                    let speed = Math.random() * 30 + 10;
                    let x = Math.cos(angle) * speed;
                    let y = Math.sin(angle) * speed;
                    let duration = Math.random() * 0.5 + 0.3;

                    particle.style.width = `${size}px`;
                    particle.style.height = `${size}px`;
                    particle.style.setProperty("--x", `${x}px`);
                    particle.style.setProperty("--y", `${y}px`);
                    particle.style.animationDuration = `${duration}s`;

                    particleContainer.appendChild(particle);

                    setTimeout(() => {
                        particle.remove();
                    }, duration * 1000);
                }
            });
        });

        document.addEventListener("DOMContentLoaded", function () {
            const text = "SimoneYC";
            const typingElement = document.getElementById("typing-text");
            let index = 0;

            function typeWriter() {
                if (index < text.length) {
                    typingElement.innerHTML += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, 150);
                } else {
                    typingElement.classList.remove("typing-cursor");
                }
            }

            typingElement.classList.add("typing-cursor");
            typeWriter();
        });
        
        const themeToggle = document.getElementById("theme-toggle");
        const themeIcon = themeToggle.querySelector("i");
        const particlesContainer = document.getElementById("particles-js");

        function applyTheme(theme) {
            const isLight = theme === "light";

            document.body.classList.toggle("light-mode", isLight);
            particlesContainer.style.display = isLight ? "none" : "block";

            themeIcon.classList.toggle("fa-sun", isLight);
            themeIcon.classList.toggle("fa-moon", !isLight);

            themeToggle.setAttribute(
                "aria-label",
                isLight ? "切換為深色模式" : "切換為淺色模式"
            );

            localStorage.setItem("theme", theme);
        }

        themeToggle.addEventListener("click", function () {
            const nextTheme = document.body.classList.contains("light-mode")
                ? "dark"
                : "light";

            applyTheme(nextTheme);
        });

        const savedTheme = localStorage.getItem("theme");
        const preferredTheme = window.matchMedia("(prefers-color-scheme: light)").matches
            ? "light"
            : "dark";

        applyTheme(savedTheme || preferredTheme);

        document.addEventListener("DOMContentLoaded", function () {
            const fadeElements = document.querySelectorAll(".fade-in");

            if (
                !("IntersectionObserver" in window) ||
                window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ) {
                fadeElements.forEach(element => element.classList.add("show"));
                return;
            }

            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.01,
                rootMargin: "0px 0px -8% 0px"
            });

            fadeElements.forEach(el => observer.observe(el));
        });
        
        function loadParticles() {
            if (!document.body.classList.contains("light-mode")) {
                particlesJS("particles-js", {
                    "particles": {
                        "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                        "color": { "value": "#ffffff" },
                        "shape": { "type": "circle" },
                        "opacity": { "value": 0.5, "random": false },
                        "size": { "value": 3, "random": true },
                        "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
                        "move": { "enable": true, "speed": 3, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
                    },
                    "interactivity": {
                        "detect_on": "canvas",
                        "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                        "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "repulse": { "distance": 100, "duration": 0.4 } }
                    },
                    "retina_detect": true
                });
            }
        }

        document.addEventListener("DOMContentLoaded", function () {
            loadParticles();
        });

        document.addEventListener("DOMContentLoaded", function () {
            const copyrightYear = document.getElementById("copyright-year");
        
            if (copyrightYear) {
                copyrightYear.textContent = new Date().getFullYear();
            }
        });
