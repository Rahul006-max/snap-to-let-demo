/**
 * SnapToLet - Main Application Script
 * Preserves 100% of the original business logic, validation, QR generation,
 * high-res canvas rendering, and exports.
 */

(function () {
  'use strict';

  // --- Constants & Data ---
  const CANVAS_WIDTH = 1240;
  const CANVAS_HEIGHT = 1754;
  const CENTER_X = CANVAS_WIDTH / 2;
  const COLOR_BRAND_GREEN = '#0F6B52';
  const COLOR_BLACK = '#000000';
  const COLOR_BORDER = '#E5E7EB';
  const COLOR_PLACEHOLDER = '#9CA3AF';
  const FONT_FAMILY = '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif';

  // Complete, valid base64 images for canvas rendering
  const IMG_HOME_BASE64 = "data:image/png;base64,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";

  const IMG_WORDMARK_BASE64 = "data:image/png;base64,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";

  // Languages verbatim data
  const LANGUAGES = [
    { value: "", label: "Select Language", nativeText: "" },
    { value: "assamese", label: "Assamese", nativeText: "এই ঘৰটো খালী আছে" },
    { value: "bengali", label: "Bengali", nativeText: "এই বাড়িটি খালি" },
    { value: "bhojpuri", label: "Bhojpuri", nativeText: "ई घर खाली बा" },
    { value: "bodo", label: "Bodo", nativeText: "बे नोखा खाली दं" },
    { value: "chattisgarhi", label: "Chattisgarhi", nativeText: "ये घर खाली हे" },
    { value: "dogri", label: "Dogri", nativeText: "ये घर खाली ऐ" },
    { value: "english", label: "English", nativeText: "This house is empty" },
    { value: "gujarati", label: "Gujarati", nativeText: "આ ઘર ખાલી છે" },
    { value: "hindi", label: "Hindi", nativeText: "यह घर खाली है" },
    { value: "kannada", label: "Kannada", nativeText: "ಈ ಮನೆ ಖಾಲಿ ಇದೆ" },
    { value: "kashmiri", label: "Kashmiri", nativeText: "یہ گھر خالی چھُ" },
    { value: "konkani", label: "Konkani", nativeText: "हे घर रिकामे आसा" },
    { value: "maithili", label: "Maithili", nativeText: "ई घर खाली अछि" },
    { value: "malayalam", label: "Malayalam", nativeText: "ഈ വീട് ശൂന്യമാണ്" },
    { value: "manipuri", label: "Manipuri", nativeText: "ꯃꯁꯤꯒꯤ ꯌꯨꯝ ꯑꯁꯤ ꯈꯥꯡꯗꯦ" },
    { value: "marathi", label: "Marathi", nativeText: "हे घर रिकामे आहे" },
    { value: "marwari", label: "Marwari", nativeText: "यो घर खाली है" },
    { value: "mizoram", label: "Mizoram", nativeText: "he in hi a ruak a ni" },
    { value: "nepali", label: "Nepali", nativeText: "यो घर खाली छ" },
    { value: "odia", label: "Odia", nativeText: "ଏହି ଘର ଖାଲି ଅଛି" },
    { value: "punjabi", label: "Punjabi", nativeText: "ਇਹ ਘਰ ਖਾਲੀ ਹੈ" },
    { value: "sanskrit", label: "Sanskrit", nativeText: "एतत् गृहं रिक्तम् अस्ति" },
    { value: "santali", label: "Santali", nativeText: "ᱱᱚᱶᱟ ᱚᱲᱟᱜ ᱫᱚ ᱠᱷᱟᱞᱤ ᱢᱮᱱᱟᱜᱼᱟ" },
    { value: "sindhi", label: "Sindhi", nativeText: "هي گهر خالي آهي" },
    { value: "tamil", label: "Tamil", nativeText: "இந்த வீடு காலியாக உள்ளது" },
    { value: "tulu", label: "Tulu", nativeText: "ಈ ಮನೆ ಖಾಲಿ ಇದೆ" },
    { value: "telugu", label: "Telugu", nativeText: "ఈ ఇల్లు ఖాళీగా ఉంది" },
    { value: "urdu", label: "Urdu", nativeText: "یہ گھر خالی ہے" }
  ];

  // Property types
  const PROPERTY_TYPES = [
    { value: "", label: "Select Property Type" },
    { value: "1 RK", label: "1 RK" },
    { value: "1 BHK", label: "1 BHK" },
    { value: "2 BHK", label: "2 BHK" },
    { value: "3 BHK", label: "3 BHK" },
    { value: "4 BHK", label: "4 BHK" },
    { value: "5 BHK", label: "5 BHK" }
  ];

  // Floor options
  const FLOORS = [
    { value: "", label: "Select Floor" },
    { value: "Ground Floor", label: "Ground Floor" },
    ...Array.from({ length: 50 }, (_, i) => {
      const n = i + 1;
      const suffix = n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
      return { value: `${n}${suffix} Floor`, label: `${n}${suffix} Floor` };
    })
  ];

  // --- Sticky Header Scroll Effect ---
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // --- Smooth Scroll for CTA ---
  const generateSignboardBtn = document.getElementById('btn-header-generate');
  const generatorSection = document.getElementById('tolet-generator');
  if (generateSignboardBtn && generatorSection) {
    generateSignboardBtn.addEventListener('click', (e) => {
      e.preventDefault();
      generatorSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // --- Multi-Role Carousel ---
  const roleTabs = document.querySelectorAll('.role-tab-btn');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  let currentSlideIndex = 0;

  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentSlideIndex = index;

    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentSlideIndex);
    });

    roleTabs.forEach((tab, idx) => {
      tab.classList.toggle('active', idx === currentSlideIndex);
      tab.setAttribute('aria-selected', idx === currentSlideIndex ? 'true' : 'false');
    });
  }

  roleTabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => showSlide(idx));
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => showSlide(currentSlideIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => showSlide(currentSlideIndex + 1));
  }

  // Keyboard Navigation for Carousel
  document.addEventListener('keydown', (e) => {
    if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'SELECT')) {
      return;
    }
    if (e.key === 'ArrowLeft') {
      showSlide(currentSlideIndex - 1);
    } else if (e.key === 'ArrowRight') {
      showSlide(currentSlideIndex + 1);
    }
  });

  // Touch Swipe for Carousel
  let touchStartX = 0;
  let touchEndX = 0;
  const carouselWrapper = document.querySelector('.carousel-wrapper');
  if (carouselWrapper) {
    carouselWrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselWrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        showSlide(currentSlideIndex + 1);
      } else if (touchEndX - touchStartX > 50) {
        showSlide(currentSlideIndex - 1);
      }
    }, { passive: true });
  }

  // --- Populate Generator Selects ---
  const langSelect = document.getElementById('gen-language');
  const propSelect = document.getElementById('gen-property');
  const floorSelect = document.getElementById('gen-floor');
  const phoneInput = document.getElementById('gen-phone');

  LANGUAGES.forEach((lang) => {
    const opt = document.createElement('option');
    opt.value = lang.value;
    opt.textContent = lang.label;
    langSelect.appendChild(opt);
  });

  PROPERTY_TYPES.forEach((prop) => {
    const opt = document.createElement('option');
    opt.value = prop.value;
    opt.textContent = prop.label;
    propSelect.appendChild(opt);
  });

  FLOORS.forEach((floor) => {
    const opt = document.createElement('option');
    opt.value = floor.value;
    opt.textContent = floor.label;
    floorSelect.appendChild(opt);
  });

  // --- Live Signboard Preview Elements ---
  const previewTagline = document.getElementById('preview-tagline');
  const previewProperty = document.getElementById('preview-property');
  const previewFloor = document.getElementById('preview-floor');
  const previewPhone = document.getElementById('preview-phone');
  const previewQrContainer = document.getElementById('preview-qr-box');

  let currentQrDataUrl = null;

  // Text formatting helper: highlights specific token in emerald
  function formatTokens(text, fallback, highlightIndex) {
    if (!text || !text.trim()) {
      return `<span class="text-placeholder">${fallback}</span>`;
    }
    const words = text.trim().split(/\s+/);
    return words.map((w, idx) => {
      const cls = idx === highlightIndex ? 'text-emerald' : 'text-black';
      return `<span class="${cls}">${w}</span>`;
    }).join(' ');
  }

  // Update Live Preview
  async function updateLivePreview() {
    const langVal = langSelect.value;
    const propVal = propSelect.value;
    const floorVal = floorSelect.value;
    const phoneVal = phoneInput.value.trim();

    // 1. Tagline
    const langObj = LANGUAGES.find(l => l.value === langVal);
    const nativeText = langObj ? langObj.nativeText : '';
    previewTagline.innerHTML = formatTokens(nativeText, 'Select language', 2);

    // 2. Property Type
    previewProperty.innerHTML = formatTokens(propVal, 'Property Type', 0);

    // 3. Floor
    previewFloor.innerHTML = formatTokens(floorVal, 'Floor', 0);

    // 4. Phone
    if (phoneVal) {
      previewPhone.innerHTML = `<span class="text-black">+91 </span><span class="text-emerald tracking-widest">${phoneVal}</span>`;
    } else {
      previewPhone.innerHTML = `<span class="text-placeholder">+91 XXXXXXXXXX</span>`;
    }

    // 5. Dynamic QR Code
    if (/^[0-9]{10}$/.test(phoneVal)) {
      try {
        const rooms = (propVal.match(/\d+/) || [propVal])[0];
        const floor = floorVal.toLowerCase() === "ground floor" ? "0" : (floorVal.match(/\d+/) || [floorVal])[0];
        const payload = JSON.stringify({
          phone_number: `91${phoneVal}`,
          rooms: rooms || "1",
          floor: floor || "0"
        }, null, 2);

        const qrGen = window.QRCode;
        if (qrGen && typeof qrGen.toDataURL === 'function') {
          currentQrDataUrl = await qrGen.toDataURL(payload, {
            width: 520,
            margin: 1,
            color: { dark: "#000000", light: "#FFFFFF" }
          });
          previewQrContainer.innerHTML = `<img src="${currentQrDataUrl}" alt="QR Code" class="signboard-qr-img" />`;
        }
      } catch (err) {
        console.error("QR Code generation error:", err);
      }
    } else {
      currentQrDataUrl = null;
      previewQrContainer.innerHTML = `
        <div class="text-placeholder text-xs font-bold flex items-center justify-center w-full h-full">
          QR
        </div>
      `;
    }
  }

  langSelect.addEventListener('change', updateLivePreview);
  propSelect.addEventListener('change', updateLivePreview);
  floorSelect.addEventListener('change', updateLivePreview);
  phoneInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
    updateLivePreview();
  });

  // --- High-Resolution Canvas Rendering & Generator ---
  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Failed to load image: ' + src.slice(0, 32)));
      img.src = src;
    });
  }

  function drawRoundedRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function setFont(ctx, weight, size) {
    ctx.font = `${weight} ${size}px ${FONT_FAMILY}`;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
  }

  function measureParts(ctx, parts, gap = 0) {
    return parts.reduce((acc, part, idx) => {
      const w = ctx.measureText(part.text).width;
      return acc + w + (idx > 0 ? gap : 0);
    }, 0);
  }

  function drawCenteredParts(ctx, cx, y, parts, gap = 0) {
    const totalW = measureParts(ctx, parts, gap);
    let startX = cx - totalW / 2;
    parts.forEach((part, idx) => {
      if (idx > 0) startX += gap;
      ctx.fillStyle = part.color;
      ctx.fillText(part.text, startX, y);
      startX += ctx.measureText(part.text).width;
    });
  }

  function wrapCenteredLines(ctx, cx, y, parts, maxW, lineH) {
    const spaceW = ctx.measureText(" ").width;
    const lines = [];
    let currentLine = [];
    let currentW = 0;

    parts.forEach((p) => {
      const textW = ctx.measureText(p.text).width;
      const testW = currentLine.length === 0 ? textW : currentW + spaceW + textW;
      if (currentLine.length > 0 && testW > maxW) {
        lines.push(currentLine);
        currentLine = [p];
        currentW = textW;
      } else {
        currentLine.push(p);
        currentW = testW;
      }
    });

    if (currentLine.length > 0) lines.push(currentLine);
    lines.forEach((line, idx) => {
      drawCenteredParts(ctx, cx, y + idx * lineH, line, spaceW);
    });
    return lines.length;
  }

  function fitFontSize(ctx, parts, weight, maxFs, minFs, maxW, gap = 0) {
    for (let fs = maxFs; fs >= minFs; fs -= 2) {
      setFont(ctx, weight, fs);
      const g = gap === "space" ? ctx.measureText(" ").width : gap;
      if (measureParts(ctx, parts, g) <= maxW) return fs;
    }
    return minFs;
  }

  function getColoredParts(text, fallback, highlightIdx) {
    if (!text || !text.trim()) {
      return [{ text: fallback, color: COLOR_PLACEHOLDER }];
    }
    return text.trim().split(/\s+/).map((word, idx) => ({
      text: word,
      color: idx === highlightIdx ? COLOR_BRAND_GREEN : COLOR_BLACK
    }));
  }

  // Render high-res signboard canvas (1240x1754 A4 at 150 DPI)
  async function renderHighResCanvas(qrDataUrl) {
    const canvas = document.createElement("canvas");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D context unavailable");

    // Crisp white background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // 1. Logos & Brand Name Lockup
    const [homeImg, qrImg] = await Promise.all([
      loadImage(IMG_HOME_BASE64),
      qrDataUrl ? loadImage(qrDataUrl) : Promise.resolve(null)
    ]);

    const iconSize = 92;
    const iconY = 40;
    ctx.drawImage(homeImg, CENTER_X - iconSize / 2, iconY, iconSize, iconSize);

    // Prominent Brand Name Text: Snap (Green) + ToLet (Black)
    setFont(ctx, 800, 52);
    drawCenteredParts(ctx, CENTER_X, 146, [
      { text: "Snap", color: COLOR_BRAND_GREEN },
      { text: "ToLet", color: COLOR_BLACK }
    ]);

    // 2. Bilingual Tagline
    const langObj = LANGUAGES.find(l => l.value === langSelect.value);
    const nativeText = langObj ? langObj.nativeText : '';
    const taglineParts = getColoredParts(nativeText, "Select language", 2);
    setFont(ctx, 700, 94);
    wrapCenteredLines(ctx, CENTER_X, 305, taglineParts, 1040, 102);

    // 3. "TO-LET"
    setFont(ctx, 800, 248);
    drawCenteredParts(ctx, CENTER_X, 530, [
      { text: "TO-", color: COLOR_BLACK },
      { text: "LET", color: COLOR_BRAND_GREEN }
    ]);

    // 4. QR Code Box
    const qrBoxSize = 420;
    const qrPadding = 20;
    const qrBoxX = CENTER_X - qrBoxSize / 2;
    const qrBoxY = 790;

    drawRoundedRect(ctx, qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 28);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = COLOR_BORDER;
    ctx.stroke();

    if (qrImg) {
      ctx.drawImage(qrImg, qrBoxX + qrPadding, qrBoxY + qrPadding, qrBoxSize - qrPadding * 2, qrBoxSize - qrPadding * 2);
    }

    // 5. Property Type
    const propVal = propSelect.value;
    const propParts = getColoredParts(propVal, "Property Type", 0);
    const propFs = fitFontSize(ctx, propParts, 700, 92, 68, 1040, "space");
    setFont(ctx, 700, propFs);
    const spaceW1 = ctx.measureText(" ").width;
    drawCenteredParts(ctx, CENTER_X, 1295, propParts, spaceW1);

    // 6. Floor
    const floorVal = floorSelect.value;
    const floorParts = getColoredParts(floorVal, "Floor", 0);
    const floorFs = fitFontSize(ctx, floorParts, 700, 86, 64, 1040, "space");
    setFont(ctx, 700, floorFs);
    const spaceW2 = ctx.measureText(" ").width;
    drawCenteredParts(ctx, CENTER_X, 1410, floorParts, spaceW2);

    // 7. Phone
    const phoneVal = phoneInput.value.trim();
    const phoneParts = [
      { text: "+91 ", color: COLOR_BLACK },
      { text: phoneVal || "XXXXXXXXXX", color: phoneVal ? COLOR_BRAND_GREEN : COLOR_PLACEHOLDER }
    ];
    const phoneFs = fitFontSize(ctx, phoneParts, 800, 78, 58, 1040);
    setFont(ctx, 800, phoneFs);
    drawCenteredParts(ctx, CENTER_X, 1530, phoneParts);

    // 8. Brand Name & Website Footer on Downloadable Signboard
    setFont(ctx, 700, 32);
    ctx.fillStyle = COLOR_BRAND_GREEN;
    const brandFooterText = "SnapToLet  •  snaptolet.com  •  Download SnapToLet App";
    const brandFooterW = ctx.measureText(brandFooterText).width;
    ctx.fillText(brandFooterText, CENTER_X - brandFooterW / 2, 1645);

    return canvas;
  }

  // Helper to trigger direct browser file download
  function triggerDownload(url, filename) {
    const a = document.createElement("a");
    a.download = filename;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
    }, 100);
  }

  // --- Board Generator Action Handler ---
  async function handleGenerate(format) {
    const langVal = langSelect.value;
    const propVal = propSelect.value;
    const floorVal = floorSelect.value;
    const phoneVal = phoneInput.value.trim();

    if (!langVal || !propVal || !floorVal || !phoneVal) {
      alert("Please fill in all fields before generating.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phoneVal)) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    const buttons = document.querySelectorAll('.btn-generate');
    buttons.forEach(b => {
      b.disabled = true;
      b.textContent = "Generating...";
    });

    try {
      // 1. Generate QR Payload
      const rooms = (propVal.match(/\d+/) || [propVal])[0];
      const floor = floorVal.toLowerCase() === "ground floor" ? "0" : (floorVal.match(/\d+/) || [floorVal])[0];
      const qrPayload = JSON.stringify({
        phone_number: `91${phoneVal}`,
        rooms: rooms || "1",
        floor: floor || "0"
      }, null, 2);

      let qrDataUrl = currentQrDataUrl;
      const qrGen = window.QRCode;
      if (!qrDataUrl && qrGen && typeof qrGen.toDataURL === 'function') {
        qrDataUrl = await qrGen.toDataURL(qrPayload, {
          width: 520,
          margin: 1,
          color: { dark: "#000000", light: "#FFFFFF" }
        });
      }

      if (qrDataUrl) {
        previewQrContainer.innerHTML = `<img src="${qrDataUrl}" alt="QR Code" class="signboard-qr-img" />`;
      }

      // 2. Render Final High-Resolution Canvas with Brand Header and Footer
      const finalCanvas = await renderHighResCanvas(qrDataUrl);
      const jpgData = finalCanvas.toDataURL("image/jpeg", 0.95);
      const pngData = finalCanvas.toDataURL("image/png");

      // 3. Non-blocking Backend API Upload (preserved in background)
      try {
        finalCanvas.toBlob(blob => {
          if (blob) {
            const formData = new FormData();
            formData.append("image", blob, "board.jpg");
            formData.append("language", langVal);
            formData.append("propertyType", propVal);
            formData.append("floor", floorVal);
            formData.append("phone", phoneVal);

            fetch("https://snap-to-let-api-5xpy.vercel.app/api/board/upload", {
              method: "POST",
              body: formData,
              signal: AbortSignal.timeout ? AbortSignal.timeout(4000) : undefined
            }).catch(e => console.warn("Background upload notice:", e.message));
          }
        }, "image/jpeg", 0.95);
      } catch (uploadErr) {
        console.warn("Background upload dispatch:", uploadErr.message);
      }

      // 4. Trigger Download with Brand Name in Filename and Metadata
      if (format === "PDF") {
        const jsPdfLib = window.jspdf && window.jspdf.jsPDF ? window.jspdf.jsPDF : window.jsPDF;
        if (!jsPdfLib) {
          throw new Error("jsPDF library not available");
        }
        const doc = new jsPdfLib({
          orientation: "portrait",
          unit: "mm",
          format: "a4"
        });
        doc.setProperties({
          title: `SnapToLet Signboard - ${phoneVal}`,
          subject: 'SnapToLet Property To-Let Signboard',
          author: 'SnapToLet',
          keywords: 'SnapToLet, To-Let, Real Estate, Signboard',
          creator: 'SnapToLet (snaptolet.com)'
        });
        doc.addImage(pngData, "PNG", 0, 0, 210, 297);
        const pdfBlob = doc.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);
        triggerDownload(pdfUrl, `SnapToLet_Signboard_${phoneVal}.pdf`);
        setTimeout(() => URL.revokeObjectURL(pdfUrl), 60000);
      } else if (format === "JPG") {
        triggerDownload(jpgData, `SnapToLet_Signboard_${phoneVal}.jpg`);
      } else if (format === "PNG") {
        triggerDownload(pngData, `SnapToLet_Signboard_${phoneVal}.png`);
      }

    } catch (err) {
      console.error("Error generating board:", err);
      alert("Failed to generate board. Please try again.");
    } finally {
      buttons.forEach(b => {
        b.disabled = false;
        b.textContent = b.getAttribute('data-original-text');
      });
    }
  }

  // Bind Generate Buttons
  const btnPdf = document.getElementById('btn-generate-pdf');
  const btnJpg = document.getElementById('btn-generate-jpg');
  const btnPng = document.getElementById('btn-generate-png');

  if (btnPdf) btnPdf.addEventListener('click', () => handleGenerate("PDF"));
  if (btnJpg) btnJpg.addEventListener('click', () => handleGenerate("JPG"));
  if (btnPng) btnPng.addEventListener('click', () => handleGenerate("PNG"));

  // Initial render
  updateLivePreview();

})();
