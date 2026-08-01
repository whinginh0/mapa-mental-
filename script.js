/* -------------------------------------------------------------
   COMPORTAMENTOS EM JAVASCRIPT (CLONADO E ADAPTADO)
   ------------------------------------------------------------- */
window.addEventListener("error", (event) => {
  const errorDiv = document.createElement("div");
  errorDiv.style.position = "fixed";
  errorDiv.style.top = "0";
  errorDiv.style.left = "0";
  errorDiv.style.width = "100%";
  errorDiv.style.background = "#ef4444";
  errorDiv.style.color = "white";
  errorDiv.style.padding = "12px";
  errorDiv.style.zIndex = "100000";
  errorDiv.style.fontSize = "11px";
  errorDiv.style.fontFamily = "monospace";
  errorDiv.innerHTML = `<strong>Erro no Script:</strong> ${event.message} <br> em ${event.filename}:${event.lineno}:${event.colno}`;
  document.body.appendChild(errorDiv);
});

const initPage = () => {
  try {
    // --- CONFIGURAÇÕES CENTRALIZADAS ---
    const CONFIG = {
      headlinePrincipal: "+100 Mapas Mentais <br> <span class='hl-pink'>Ilustrados para Saúde Capilar</span>",
      subheadlineDeApoio: "Prontos para consultar, revisar e aplicar, organizando os principais conteúdos da saúde capilar através de mapas mentais ilustrados, objetivos e de fácil compreensão.",
      nomeMaterialPrincipal: "+100 Mapas Mentais Ilustrados para Saúde Capilar",
      mockupPrincipal: "https://i.ibb.co/KzzSfzfM/capa-saude-capilar-site-aproximada-sem-tarja.png",
      capaBonus1: "https://i.ibb.co/LhhDT3VM/image.png",
      capaBonus2: "https://i.ibb.co/S4X5XbK4/image.png",
      capaBonus3: "https://i.ibb.co/G48G4wYH/image.png",
      nomeDoBonus1: "+30 Mapas Mentais de Cosmetologia Aplicada à Saúde Capilar",
      nomeDoBonus2: "+30 Fluxogramas Ilustrados de Avaliação Capilar",
      nomeDoBonus3: "Certificado de Conclusão",
      descricaoBreveDoBonus1: "Uma coleção visual abordando ativos, princípios ativos, veículos cosméticos, funções, indicações e associações utilizadas na saúde capilar.",
      descricaoBreveDoBonus2: "Fluxogramas visuais que organizam as principais etapas da avaliação capilar, identificação de alterações e direcionamento de condutas.",
      descricaoBreveDoBonus3: "Certificado digital para registrar a conclusão do material e complementar sua experiência de estudo.",
      valorBonus1: "R$ 27,90",
      valorBonus2: "R$ 27,90",
      valorBonus3: "R$ 19,90",
      valorTotalDosBonus: "R$ 75,70",
      precoDoPlanoCompleto: "R$ 37,90",
      linkCheckoutBasico990: "https://ggcheckout.app/checkout/v5/t0yw26q7vYxZjctYpXl7",
      linkCheckoutPromocional1790: "https://ggcheckout.app/checkout/v5/WjW4oJ7ItNEqH3UKufzJ",
      linkCheckoutPlanoCompleto: "https://ggcheckout.app/checkout/v5/PxU3ZFunactinajEbKzx",
      linkTermosDeUso: "#termos",
      linkPoliticaDePrivacidade: "#privacidade",
      linkContato: "#contato",
      linkSuporte: "mailto:suporte@exemplo.com"
    };

    // --- CRONÔMETRO REGRESSIVO (PERSISTENTE EM LOCALSTORAGE) ---
    const TIMER_SETTING = {
      isRelative: true,
      durationMinutes: 15,
      targetDate: "2026-07-30T23:59:59"
    };

    let endTime;
    if (TIMER_SETTING.isRelative) {
      const storageKey = "saude_capilar_offer_deadline";
      let storedDeadline;
      try {
        storedDeadline = localStorage.getItem(storageKey);
      } catch (e) {
        console.warn("Storage access blocked:", e);
      }

      const now = Date.now();
      if (!storedDeadline || parseInt(storedDeadline, 10) <= now) {
        storedDeadline = now + (TIMER_SETTING.durationMinutes * 60 * 1000);
        try {
          localStorage.setItem(storageKey, storedDeadline);
        } catch (e) {
          console.warn("Storage write blocked:", e);
        }
      }
      endTime = parseInt(storedDeadline, 10);
    } else {
      endTime = new Date(TIMER_SETTING.targetDate).getTime();
    }

    let timerId;
    const runTimer = () => {
      const now = Date.now();
      const diff = endTime - now;

      const setTimerText = (h, m, s) => {
        const th = document.getElementById("timer-h");
        const tm = document.getElementById("timer-m");
        const ts = document.getElementById("timer-s");
        if (th) th.textContent = h;
        if (tm) tm.textContent = m;
        if (ts) ts.textContent = s;

        const ph = document.getElementById("plans-timer-h");
        const pm = document.getElementById("plans-timer-m");
        const ps = document.getElementById("plans-timer-s");
        if (ph) ph.textContent = h;
        if (pm) pm.textContent = m;
        if (ps) ps.textContent = s;
      };

      if (diff <= 0) {
        setTimerText("00", "00", "00");
        if (timerId) clearInterval(timerId);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimerText(
        String(hours).padStart(2, "0"),
        String(minutes).padStart(2, "0"),
        String(seconds).padStart(2, "0")
      );
    };

    runTimer();
    timerId = setInterval(runTimer, 1000);

    // --- SUBSTITUIÇÃO DINÂMICA DE PLACEHOLDERS ---
    const replacePlaceholders = () => {
      document.querySelectorAll("a").forEach(a => {
        let href = a.getAttribute("href");
        if (href) {
          href = href.replace("[LINK_CHECKOUT_BASICO_9_90]", CONFIG.linkCheckoutBasico990)
            .replace("[LINK_CHECKOUT_PROMOCIONAL_17_90]", CONFIG.linkCheckoutPromocional1790)
            .replace("[LINK_CHECKOUT_PLANO_COMPLETO]", CONFIG.linkCheckoutPlanoCompleto)
            .replace("[LINK_TERMOS_DE_USO]", CONFIG.linkTermosDeUso)
            .replace("[LINK_POLITICA_DE_PRIVACIDADE]", CONFIG.linkPoliticaDePrivacidade)
            .replace("[LINK_CONTATO]", CONFIG.linkContato)
            .replace("[LINK_SUPORTE]", CONFIG.linkSuporte);
          a.setAttribute("href", href);
        }
      });

      const walkNode = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          let text = node.nodeValue;
          if (text.includes("[") && text.includes("]")) {
            text = text.replace(/\[NOME_DO_MATERIAL_PRINCIPAL\]/g, CONFIG.nomeMaterialPrincipal)
              .replace(/\[NOME_DO_BONUS_1\]/g, CONFIG.nomeDoBonus1)
              .replace(/\[NOME_DO_BONUS_2\]/g, CONFIG.nomeDoBonus2)
              .replace(/\[NOME_DO_BONUS_3\]/g, CONFIG.nomeDoBonus3)
              .replace(/\[DESCRICAO_BREVE_DO_BONUS_1\]/g, CONFIG.descricaoBreveDoBonus1)
              .replace(/\[DESCRICAO_BREVE_DO_BONUS_2\]/g, CONFIG.descricaoBreveDoBonus2)
              .replace(/\[DESCRICAO_BREVE_DO_BONUS_3\]/g, CONFIG.descricaoBreveDoBonus3)
              .replace(/\[VALOR_BONUS_1\]/g, CONFIG.valorBonus1)
              .replace(/\[VALOR_BONUS_2\]/g, CONFIG.valorBonus2)
              .replace(/\[VALOR_BONUS_3\]/g, CONFIG.valorBonus3)
              .replace(/\[VALOR_TOTAL_DOS_BONUS\]/g, CONFIG.valorTotalDosBonus)
              .replace(/\[PRECO_DO_PLANO_COMPLETO\]/g, CONFIG.precoDoPlanoCompleto);

            node.nodeValue = text;
          }
        } else {
          if (node.id !== "headline-p" && node.id !== "headline-s") {
            node.childNodes.forEach(walkNode);
          }
        }
      };

      const hl1 = document.querySelector(".hero-headline-1");
      if (hl1) hl1.innerHTML = CONFIG.headlinePrincipal;

      const hl2 = document.querySelector(".hero-headline-2");
      if (hl2) hl2.innerHTML = CONFIG.subheadlineDeApoio;

      walkNode(document.body);

      if (document.title.includes("[NOME_DO_MATERIAL_PRINCIPAL]") || document.title.includes("Bluey")) {
        document.title = CONFIG.nomeMaterialPrincipal;
      }
    };

    const passUtmParams = () => {
      try {
        const currentQueryParams = window.location.search;
        if (!currentQueryParams) return;

        const urlParams = new URLSearchParams(currentQueryParams);

        document.querySelectorAll("a").forEach(a => {
          const href = a.getAttribute("href");
          if (href && (href.startsWith("http://") || href.startsWith("https://"))) {
            try {
              const targetUrl = new URL(href);
              urlParams.forEach((value, key) => {
                targetUrl.searchParams.set(key, value);
              });
              a.setAttribute("href", targetUrl.toString());
            } catch (err) {
              console.warn("Error parsing URL: ", href, err);
            }
          }
        });
      } catch (e) {
        console.error("Error passing UTM parameters:", e);
      }
    };

    replacePlaceholders();
    passUtmParams();

    // --- PLACEHOLDERS SVG ESCUROS / ELEGANTES PARA DEMONSTRAÇÕES ---
    const drawSvgPlaceholders = () => {
      document.querySelectorAll("img").forEach(img => {
        const src = img.getAttribute("src");
        if (src && src.startsWith("[") && src.endsWith("]")) {
          const label = src.slice(1, -1).replace(/_/g, " ");
          const width = img.getAttribute("width") || 250;
          const height = img.getAttribute("height") || 180;

          const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
          <rect width="100%" height="100%" fill="#0B2341" rx="12"/>
          <rect width="calc(100% - 8px)" height="calc(100% - 8px)" x="4" y="4" fill="none" stroke="#178C8C" stroke-width="1.5" rx="8"/>
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">${label}</text>
        </svg>`;

          img.src = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
        }

        img.addEventListener("error", () => {
          const label = img.getAttribute("alt") || "Saúde Capilar";
          const width = img.getAttribute("width") || 260;
          const height = img.getAttribute("height") || 350;

          const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
          <rect width="100%" height="100%" fill="#0B2341" rx="12"/>
          <rect width="calc(100% - 8px)" height="calc(100% - 8px)" x="4" y="4" fill="none" stroke="#178C8C" stroke-width="1.5" stroke-dasharray="4,4" rx="8"/>
          <circle cx="${width/2}" cy="${height/2 - 16}" r="24" fill="#178C8C" opacity="0.2"/>
          <path d="M${width/2 - 10} ${height/2 - 16} l8 8 l12 -12" stroke="#178C8C" stroke-width="2.5" fill="none"/>
          <text x="50%" y="50%" dy="24" dominant-baseline="middle" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">${label}</text>
        </svg>`;
          img.src = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
        });
      });
    };

    drawSvgPlaceholders();

    // --- ACORDEÃO DO FAQ ---
    const faqTriggers = document.querySelectorAll(".faq-trigger");
    faqTriggers.forEach(trigger => {
      trigger.addEventListener("click", () => {
        const item = trigger.closest(".faq-item");
        const isAlreadyActive = item.classList.contains("active");

        document.querySelectorAll(".faq-item").forEach(other => {
          other.classList.remove("active");
          other.querySelector(".faq-trigger").setAttribute("aria-expanded", "false");
        });

        if (!isAlreadyActive) {
          item.classList.add("active");
          trigger.setAttribute("aria-expanded", "true");
        }
      });
    });

    // --- MODAL PROMOCIONAL DO PLANO BÁSICO REMOVIDO ---

    // --- ANO AUTOMÁTICO NO RODAPÉ ---
    const currentYearSpan = document.getElementById("current-year");
    if (currentYearSpan) {
      currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- INTERSECTION OBSERVER PARA FADE IN SCROLL ---
    const fadeElements = document.querySelectorAll(".fade-in-element");
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { root: null, threshold: 0, rootMargin: "0px 0px -50px 0px" });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // --- ARRASTE / TOUCH NOS CARROSSÉIS ---
    const setupMarqueeDrag = (container) => {
      const track = container.querySelector(".marquee-track");
      if (!track) return;
      let isDown = false;
      let startX;
      let initialTransform = 0;

      container.addEventListener("mousedown", (e) => {
        isDown = true;
        track.style.animationPlayState = "paused";
        startX = e.pageX;

        const style = window.getComputedStyle(track);
        const matrix = new WebKitCSSMatrix(style.transform);
        initialTransform = matrix.m41;
        container.style.cursor = "grabbing";
      });

      container.addEventListener("mouseleave", () => {
        if (isDown) {
          isDown = false;
          track.style.animationPlayState = "running";
          container.style.cursor = "grab";
        }
      });

      container.addEventListener("mouseup", () => {
        isDown = false;
        track.style.animationPlayState = "running";
        container.style.cursor = "grab";
      });

      container.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX;
        const walk = (x - startX);
        track.style.transform = `translate3d(${initialTransform + walk}px, 0, 0)`;
      });
    };

    document.querySelectorAll(".marquee-container").forEach(setupMarqueeDrag);

  } catch (err) {
    console.error("Erro na inicialização da página:", err);
  }
};

document.addEventListener("DOMContentLoaded", initPage);
