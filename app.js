/* ==========================================================================
   UDAN ENTERPRISES - APP.JS
   Core Interactive Scripts & Cinematic Skyline Footer Animation Engine
   ========================================================================== */

(function () {
  "use strict";

  // --- 1. MODAL & BOOKING HANDLERS ---
  const modal = document.querySelector("#modal");
  const content = document.querySelector("#modal-content");

  function show(html) {
    if (content && modal) {
      content.innerHTML = html;
      modal.showModal();
    }
  }

  const closeBtn = document.querySelector(".close");
  if (closeBtn && modal) {
    closeBtn.onclick = () => modal.close();
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        const r = modal.getBoundingClientRect();
        if (
          e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom
        ) {
          modal.close();
        }
      }
    });
  }

  function booking(model = "Zuboo Z1") {
    show(`
      <p class="eyebrow">YOUR NEXT CHAPTER</p>
      <h2>EXPERIENCE THE RIDE.</h2>
      <p>Plan your visit. This preview prepares a test ride request on your device; it does not send a booking.</p>
      <form id="booking">
        <label>Your name<input name="name" autocomplete="name" required></label>
        <label>Phone number<input name="phone" type="tel" autocomplete="tel" required></label>
        <label>Choose your bike
          <select name="model">
            ${["Zuboo Z1", "Zuboo Z3", "Zuboo X1", "Zuboo T3", "Zuboo GT", "Zuboo The Tank", "Zuboo Paris", "Zuboo T11", "Zuboo Mini", "Zuboo KB1"]
              .map((m) => `<option ${m === model ? "selected" : ""}>${m}</option>`)
              .join("")}
          </select>
        </label>
        <label>Preferred date<input name="date" type="date" min="${new Date().toLocaleDateString("en-CA")}" required></label>
        <button class="btn dark" type="submit">Prepare request <span>→</span></button>
      </form>
    `);

    const bookingForm = document.querySelector("#booking");
    if (bookingForm) {
      bookingForm.onsubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const name = data.get("name");
        const phone = data.get("phone");
        const m = data.get("model");
        const d = data.get("date");
        const waUrl =
          "https://wa.me/94784969652?text=" +
          encodeURIComponent(
            `Hello Udan Enterprises, I would like to book a test ride for ${m} on ${d}. My name is ${name} (${phone}).`
          );
        if (content) {
          content.innerHTML = `
            <h2>YOUR RIDE REQUEST</h2>
            <p>${name}, your <strong>${m}</strong> test ride request for <strong>${d}</strong> is ready. Send it directly to our team via WhatsApp or call our Galle showroom to confirm your slot.</p>
            <div style="display:flex;gap:12px;margin-top:20px;flex-wrap:wrap">
              <a class="btn dark" href="${waUrl}" target="_blank" rel="noopener">Send via WhatsApp <span>→</span></a>
              <a class="btn" href="tel:0784969652">Call Showroom <span>→</span></a>
            </div>
          `;
        }
      };
    }
  }

  document.querySelectorAll("[data-book]").forEach((b) => (b.onclick = () => booking()));
  document.querySelectorAll("[data-model]").forEach((b) => (b.onclick = () => booking(b.dataset.model)));

  // --- 2. NAVIGATION & CAROUSEL ---
  const menu = document.querySelector(".menu");
  const nav = document.querySelector("nav");
  if (menu && nav) {
    menu.onclick = () => {
      const open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
    };
    nav.querySelectorAll("a,button").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        menu.setAttribute("aria-expanded", "false");
      })
    );
  }

  const track = document.querySelector(".bike-track");
  const nextBtn = document.querySelector("#next");
  const prevBtn = document.querySelector("#prev");
  if (track && nextBtn) nextBtn.onclick = () => track.append(track.firstElementChild);
  if (track && prevBtn) prevBtn.onclick = () => track.prepend(track.lastElementChild);

  const viewBikes = document.querySelector("#view-bikes");
  if (viewBikes) {
    viewBikes.onclick = () =>
      show(
        '<p class="eyebrow">THE COLLECTION</p><h2>FIND YOUR EVERYDAY.</h2><p>Select a model to prepare a test ride request.</p>' +
          ["Zuboo Z1", "Zuboo Z3", "Zuboo X1", "Zuboo T3", "Zuboo GT", "Zuboo The Tank"].map(
            (m) => `<button class="btn model-choice" data-choice="${m}">${m} →</button>`
          ).join("")
      );
  }

  if (content) {
    content.addEventListener("click", (e) => {
      const b = e.target.closest("[data-choice]");
      if (b) {
        if (modal) modal.close();
        booking(b.dataset.choice);
      }
    });
  }

  const featuresBtn = document.querySelector("#features");
  if (featuresBtn) {
    featuresBtn.onclick = () =>
      show(
        "<p class=\"eyebrow\">THOUGHTFULLY ENGINEERED</p><h2>MADE TO MOVE YOU.</h2><p>Removable lithium battery · High-torque electric motor · Smart console technology · Up to 100+ km range per charge.</p><p>Explore Zuboo T3, GT, The Tank, and Paris at our Galle showroom.</p>"
      );
  }

  const serviceInfoBtn = document.querySelector("#service-info");
  if (serviceInfoBtn) {
    serviceInfoBtn.onclick = () =>
      show(
        "<p class=\"eyebrow\">CARE FOR YOUR RIDE</p><h2>A SMOOTHER EVERYDAY.</h2><p>Regularly check your battery charge, tire pressure, and regenerative brake response. Follow your model's manual for maintenance intervals.</p><p>For certified inspection, genuine spare parts or technician support, visit Udan Enterprises showroom, Galle.</p>"
      );
  }

  // --- 3. CONTACT & SOCIAL PREVIEWS ---
  document.querySelectorAll("[data-contact]").forEach((b) => {
    b.onclick = () => {
      const type = b.dataset.contact;
      if (type === "call") {
        show(
          '<p class="eyebrow">HOTLINE</p><h2>CALL UDAN ENTERPRISES</h2><p>Speak directly with our showroom team in Galle for inquiries and pricing.</p><p><a class="btn dark" href="tel:0784969652">Call 078 496 9652 <span>→</span></a></p>'
        );
      } else if (type === "whatsapp") {
        show(
          '<p class="eyebrow">WHATSAPP INQUIRY</p><h2>CHAT ON WHATSAPP</h2><p>Connect with us instantly on WhatsApp for test ride inquiries, Zuboo catalog and details.</p><p><a class="btn dark" href="https://wa.me/94784969652?text=Hello%20Udan%20Enterprises,%20I%20would%20like%20to%20inquire%20about%20Zuboo%20electric%20bikes." target="_blank" rel="noopener">Open WhatsApp (078 496 9652) <span>→</span></a></p>'
        );
      } else {
        show(
          '<p class="eyebrow">SHOWROOM</p><h2>VISIT UDAN ENTERPRISES</h2><p><strong>Udugama Road, Kurunduwatta, Galle</strong></p><p>Official Zuboo Electric Bikes Dealership.<br>Email: <a href="mailto:Pibida17udan4131@gmail.com" style="text-decoration:underline">Pibida17udan4131@gmail.com</a><br>Phone: <a href="tel:0784969652">078 496 9652</a></p><p><strong>JOIN US &amp; CHARGE YOUR RIDE ⚡</strong></p>'
        );
      }
    };
  });

  document.querySelectorAll("[data-social]").forEach(
    (b) =>
      (b.onclick = () =>
        show(
          `<h2>FOLLOW THE JOURNEY.</h2><p>The official ${b.dataset.social} profile link is active on our official channels.</p>`
        ))
  );

  const newsletterForm = document.querySelector("#newsletter");
  const newsletterStatus = document.querySelector("#newsletter-status");
  if (newsletterForm) {
    newsletterForm.onsubmit = (e) => {
      e.preventDefault();
      if (newsletterStatus) {
        newsletterStatus.textContent = "Thank you! You are on the Udan Enterprises priority update list.";
        newsletterStatus.style.color = "#34d399";
      }
    };
  }

  const dots = document.querySelectorAll(".dots button");
  dots.forEach((b, i) => {
    b.onclick = () => {
      dots.forEach((x) => x.classList.remove("selected"));
      b.classList.add("selected");
      const space = document.querySelector(".reason-space>span");
      if (space) {
        space.innerHTML = [
          "RIDE<br>THE<br>FUTURE",
          "CLEANER<br>TOMORROW",
          "EVERYDAY<br>FREEDOM",
        ][i];
      }
    };
  });

  const searchBtn = document.querySelector(".search");
  if (searchBtn) {
    searchBtn.onclick = () => {
      show(
        '<h2>FIND YOUR RIDE.</h2><label>Search the collection<input id="bike-search" type="search" placeholder="Try T3, GT, Tank, Paris or Mini" style="width:100%;margin-top:15px"></label><div id="results"></div>'
      );
      const input = document.querySelector("#bike-search");
      if (input) {
        input.oninput = () => {
          const bikeList = [
            "Zuboo T3 (2000W)",
            "Zuboo GT (1800W)",
            "Zuboo The Tank (3000W)",
            "Zuboo Paris (Retro)",
            "Zuboo T11 (Sport)",
            "Zuboo Mini (Commuter)",
            "Zuboo KB1 (Heavy Duty)",
            "Zuboo Z1",
            "Zuboo Z3",
            "Zuboo X1",
          ];
          const matches = bikeList.filter((x) =>
            x.toLowerCase().includes(input.value.toLowerCase())
          );
          const resultsDiv = document.querySelector("#results");
          if (resultsDiv) {
            resultsDiv.innerHTML = matches.length
              ? matches
                  .map((m) => `<button class="btn" data-choice="${m}">${m} →</button>`)
                  .join("")
              : "<p>No matching bikes found. Visit our Galle showroom for customized advice.</p>";
          }
        };
        input.oninput();
        input.focus();
      }
    };
  }

  // =========================================================================
  // --- 4. GLOBAL BIDIRECTIONAL SCROLL ANIMATIONS ENGINE ---
  // =========================================================================
  function initGlobalScrollAnimations() {
    if (typeof window === "undefined") return;

    // Respect reduced-motion preferences
    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const elements = document.querySelectorAll(
      ".reveal-on-scroll, section:not(.hero-section)"
    );
    if (!elements || elements.length === 0) return;

    if (prefersReducedMotion) {
      elements.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              end: "bottom 12%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    } else if ("IntersectionObserver" in window) {
      // High-performance fallback when GSAP is not loaded
      elements.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translate3d(0, 30px, 0)";
        el.style.transition =
          "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
      });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translate3d(0, 0, 0)";
            } else {
              entry.target.style.opacity = "0";
              entry.target.style.transform = "translate3d(0, 30px, 0)";
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -12% 0px",
        }
      );

      elements.forEach((el) => observer.observe(el));
    }
  }

  // Expose globally
  window.initGlobalScrollAnimations = initGlobalScrollAnimations;

  // =========================================================================
  // --- 5. GSAP SCROLLTRIGGER FOR FOOTER REVEAL ---
  // =========================================================================
  function initFooterGSAP() {
    if (typeof window === "undefined") return;

    const footer = document.querySelector(".udan-skyline-footer, footer.oem-footer, #site-footer");
    if (!footer) return;

    if (typeof gsap !== "undefined") {
      if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        // Smooth scroll reveal for footer elements
        const elementsToAnimate = footer.querySelectorAll(
          ".skyline-canvas-wrapper, .skyline-stage, .footer-columns-grid, .udan-footer-grid, .udan-footer-col, .footer-col, .udan-footer-bottom, .footer-bottom, .footer-bottom-bar"
        );

        if (elementsToAnimate.length > 0) {
          gsap.fromTo(
            elementsToAnimate,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              stagger: 0.12,
              ease: "power2.out",
              scrollTrigger: {
                trigger: footer,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }
    }
  }

  // =========================================================================
  // --- 5. BACK-TO-TOP SMOOTH SCROLL HANDLER ---
  // =========================================================================
  function initBackToTop() {
    const bttButtons = document.querySelectorAll(
      ".footer-back-to-top, #footer-back-to-top, [data-back-to-top], .back-to-top-circle, #back-to-top-btn"
    );

    bttButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    });
  }

  // =========================================================================
  // --- 6. FLOATING LIGHT EMBERS PARTICLE SYSTEM (CANVAS) ---
  // =========================================================================
  function initEmbersCanvas() {
    let canvas = document.querySelector("#footer-embers-canvas, .footer-embers-canvas");
    if (!canvas) {
      const particleContainer = document.querySelector(
        "#skyline-particles, .skyline-particles, .skyline-canvas-wrapper, .skyline-stage"
      );
      if (particleContainer) {
        canvas = document.createElement("canvas");
        canvas.id = "footer-embers-canvas";
        canvas.className = "footer-embers-canvas";
        canvas.style.position = "absolute";
        canvas.style.inset = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = "3";
        particleContainer.appendChild(canvas);
      }
    }
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Respect reduced-motion preferences
    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let width = 0;
    let height = 0;
    let particles = [];
    const particleCount = 42;
    let animationFrameId = null;
    let isVisible = false;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = rect.width || window.innerWidth;
      height = canvas.height = rect.height || 220;
    }

    function createParticle(initial = false) {
      return {
        x: Math.random() * (width || 1200),
        y: initial ? Math.random() * (height || 220) : (height || 220) + Math.random() * 20,
        radius: Math.random() * 1.6 + 0.6,
        alpha: Math.random() * 0.7 + 0.2,
        speedY: -(Math.random() * 0.8 + 0.4),
        speedX: (Math.random() - 0.5) * 0.5,
        decay: Math.random() * 0.003 + 0.002,
        color:
          Math.random() > 0.45
            ? "rgba(255, 94, 20," // Vibrant Zuboo orange
            : Math.random() > 0.5
            ? "rgba(239, 68, 68," // Crimson red
            : "rgba(251, 191, 36,", // Amber gold
      };
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle(true));
      }
    }

    function draw() {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y < -10) {
          particles[i] = createParticle(false);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.alpha})`;
        ctx.shadowColor = p.color === "rgba(255, 94, 20," ? "#FF5E14" : "#ef4444";
        ctx.shadowBlur = 8;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    }

    // Performance Optimization: IntersectionObserver pauses RAF when offscreen
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              isVisible = true;
              resize();
              if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(draw);
              }
            } else {
              isVisible = false;
              if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
              }
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(canvas);
    } else {
      isVisible = true;
      resize();
      animationFrameId = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", () => {
      resize();
    });
  }

  // --- 10. EXCELLENT PRODUCTS SHOWCASE & SHOWROOM GALLERY ENGINE ---
  const showcaseBikesData = [
    {
      name: "Zuboo Mini",
      badge: "Compact City Commuter",
      power: "490W Eco Motor",
      speed: "35 km/h",
      range: "≥ 35 km",
      price: "LKR 195,000",
      image: "bikes/mini/mini.webp",
      desc: "Ultra-agile step-through commuter with deep front basket"
    },
    {
      name: "Zuboo Paris",
      badge: "European Retro Classic",
      power: "1200W Smooth Torque",
      speed: "60 km/h",
      range: "≥ 80 km",
      price: "LKR 330,000",
      image: "bikes/paris/paris.webp",
      desc: "Timeless European retro luxury with front windscreen and plush backrest"
    },
    {
      name: "Zuboo The Tank",
      badge: "Heavy-Duty Utility Flagship",
      power: "3000W Peak Performance",
      speed: "75 km/h",
      range: "≥ 80 km",
      price: "LKR 515,000",
      image: "bikes/tank/tank.webp",
      desc: "Reinforced steel crash bars & twin projector headlights for Southern terrain"
    },
    {
      name: "Zuboo T3",
      badge: "Sport Motorcycle Flagship",
      power: "2000W High Torque",
      speed: "65 km/h",
      range: "≥ 110 km",
      price: "LKR 480,000",
      image: "bikes/t3/t3.webp",
      desc: "Aggressive sport aerodynamics with smart LCD console and highway range"
    },
    {
      name: "Zuboo T11",
      badge: "Commercial Logistics Cargo",
      power: "1500W Commercial Motor",
      speed: "55 km/h",
      range: "≥ 90 km",
      price: "LKR 420,000",
      image: "bikes/t11/t11.webp",
      desc: "Heavy-duty extended cargo rack for enterprise delivery fleets"
    },
    {
      name: "Zuboo EX008",
      badge: "Modern Urban Commuter",
      power: "1000W Urban Motor",
      speed: "45 km/h",
      range: "≥ 60 km",
      price: "LKR 295,000",
      image: "bikes/ex008/ex008.webp",
      desc: "Streamlined aerodynamic styling with durable hydraulic suspension"
    }
  ];

  const galleryPhotosData = [
    { src: "media/gallery/gallery-1.jpg", title: "Opening Blessing Ceremony", desc: "Venerable Maha Sangha invoking auspicious pirith blessings for Udan Enterprises Galle." },
    { src: "media/gallery/gallery-2.jpg", title: "Traditional Oil Lamp Lighting", desc: "Inauguration ceremony marking the official launch of the Zuboo dealership in Galle." },
    { src: "media/gallery/gallery-3.jpg", title: "Showroom Launch & Community", desc: "Welcoming Southern Province riders to the premier electric mobility showroom." },
    { src: "media/gallery/gallery-4.jpg", title: "Official Showroom Entrance", desc: "Grand Zuboo branded archway and front motorcycle showcase on Udugama Road." },
    { src: "media/gallery/gallery-5.jpg", title: "Showroom Glass Facade & Display", desc: "Direct view into the modern air-conditioned Zuboo e-scooter showroom floor." },
    { src: "media/gallery/gallery-6.jpg", title: "Zuboo Fleet Lineup Presentation", desc: "Diverse range of Zuboo models ready for customer inspection and test rides." },
    { src: "media/gallery/gallery-7.jpg", title: "Grand Opening Celebration", desc: "Official dealership launch celebration at Kurunduwatta, Galle with guests and riders." },
    { src: "media/gallery/gallery-8.jpg", title: "Showroom Customer Experience Desk", desc: "Dedicated consultation area for test rides, leasing, and model guidance." },
    { src: "media/gallery/gallery-9.jpg", title: "Electric Fleet Ready for Delivery", desc: "Fully charged Zuboo motorcycles prepared for registration, handover, and delivery." },
    { src: "media/gallery/gallery-10.jpg", title: "Certified Service & Technical Support", desc: "Trained technician bay supporting battery warranty, diagnostics, and after-sales service." },
    { src: "media/gallery/gallery-11.jpg", title: "Zuboo Premium Showroom Showcase", desc: "Modern indoor display featuring top-tier electric models and original accessories." }
  ];

  let currentGalleryIndex = 0;
  let currentLightboxIndex = 0;

  function initShowcaseAndGallery() {
    renderGalleryThumbs();

    // Lightbox keyboard navigation
    document.addEventListener("keydown", (e) => {
      const modal = document.getElementById("showroom-lightbox");
      if (!modal || modal.style.display === "none") return;
      if (e.key === "Escape") {
        window.closeShowroomLightbox();
      } else if (e.key === "ArrowLeft") {
        window.navLightbox(-1);
      } else if (e.key === "ArrowRight") {
        window.navLightbox(1);
      }
    });
  }

  function renderGalleryThumbs() {
    const grid = document.getElementById("gallery-thumbs-grid");
    if (!grid) return;

    grid.innerHTML = "";
    const visiblePhotos = galleryPhotosData.slice(currentGalleryIndex, currentGalleryIndex + 4);

    visiblePhotos.forEach((photo, sliceIdx) => {
      const originalIdx = currentGalleryIndex + sliceIdx;
      const item = document.createElement("div");
      item.className = "gallery-thumb-item";
      item.title = photo.title;
      item.innerHTML = `
        <img src="${photo.src}" alt="${photo.title}" loading="lazy">
        <span class="gallery-thumb-badge">#${originalIdx + 1}</span>
      `;
      item.onclick = () => window.openShowroomLightbox(originalIdx);
      grid.appendChild(item);
    });

    const rangeLabel = document.getElementById("gallery-range-label");
    if (rangeLabel) {
      rangeLabel.textContent = `${currentGalleryIndex + 1}–${Math.min(currentGalleryIndex + 4, galleryPhotosData.length)}`;
    }

    const prevBtn = document.getElementById("gallery-prev-btn");
    const nextBtn = document.getElementById("gallery-next-btn");
    if (prevBtn) prevBtn.disabled = currentGalleryIndex === 0;
    if (nextBtn) nextBtn.disabled = currentGalleryIndex >= galleryPhotosData.length - 4;
  }

  window.switchShowcaseBike = function (idx) {
    const bike = showcaseBikesData[idx];
    if (!bike) return;

    const pills = document.querySelectorAll(".model-pill");
    pills.forEach((p, i) => {
      if (i === idx) p.classList.add("active");
      else p.classList.remove("active");
    });

    const badge = document.getElementById("showcase-badge");
    const title = document.getElementById("showcase-title");
    const desc = document.getElementById("showcase-desc");
    const power = document.getElementById("showcase-power");
    const img = document.getElementById("showcase-image");
    const speed = document.getElementById("showcase-speed");
    const range = document.getElementById("showcase-range");
    const price = document.getElementById("showcase-price");
    const inquireLink = document.getElementById("showcase-inquire-link");

    if (badge) badge.textContent = bike.badge;
    if (title) title.textContent = bike.name;
    if (desc) desc.textContent = bike.desc;
    if (power) power.textContent = bike.power;
    if (img) {
      img.src = bike.image;
      img.alt = bike.name;
    }
    if (speed) speed.innerHTML = `⚡ Speed: <strong>${bike.speed}</strong>`;
    if (range) range.innerHTML = `🔋 Range: <strong>${bike.range}</strong>`;
    if (price) price.innerHTML = `💰 <strong>${bike.price}</strong>`;
    if (inquireLink) {
      inquireLink.href = `https://wa.me/94784969652?text=${encodeURIComponent(
        `Hello Udan Enterprises, I would like to inquire about the ${bike.name} (${bike.power}) at your Galle showroom.`
      )}`;
    }
  };

  window.slideGallery = function (dir) {
    const maxIdx = galleryPhotosData.length - 4;
    currentGalleryIndex = Math.max(0, Math.min(maxIdx, currentGalleryIndex + dir));
    renderGalleryThumbs();
  };

  window.openShowroomLightbox = function (idx) {
    currentLightboxIndex = idx;
    const modal = document.getElementById("showroom-lightbox");
    if (!modal) return;

    const photo = galleryPhotosData[idx];
    const img = document.getElementById("lightbox-img");
    const title = document.getElementById("lightbox-title");
    const desc = document.getElementById("lightbox-desc");
    const waBtn = document.getElementById("lightbox-wa-btn");

    if (img) {
      img.src = photo.src;
      img.alt = photo.title;
    }
    if (title) {
      title.textContent = `${photo.title} (${idx + 1} of ${galleryPhotosData.length})`;
    }
    if (desc) {
      desc.textContent = photo.desc;
    }
    if (waBtn) {
      waBtn.href = `https://wa.me/94784969652?text=${encodeURIComponent(
        `Hello Udan Enterprises, I am inquiring regarding the showroom photo: ${photo.title}`
      )}`;
    }

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  };

  window.closeShowroomLightbox = function () {
    const modal = document.getElementById("showroom-lightbox");
    if (modal) modal.style.display = "none";
    document.body.style.overflow = "";
  };

  window.navLightbox = function (dir) {
    currentLightboxIndex = (currentLightboxIndex + dir + galleryPhotosData.length) % galleryPhotosData.length;
    window.openShowroomLightbox(currentLightboxIndex);
  };

  // --- INITIALIZE ON DOM READY ---
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initGlobalScrollAnimations();
      initFooterGSAP();
      initBackToTop();
      initEmbersCanvas();
      initShowcaseAndGallery();
    });
  } else {
    initGlobalScrollAnimations();
    initFooterGSAP();
    initBackToTop();
    initEmbersCanvas();
    initShowcaseAndGallery();
  }
})();
