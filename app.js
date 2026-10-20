/*
 * CONTACTOS DE WHATSAPP
 * Puedes cambiar los nombres y números desde este único bloque.
 * Escribe los números en formato internacional, solo dígitos y sin el +.
 * Edita los nombres y números aquí si el cliente necesita actualizarlos.
 */
const CONTACTS = [
  { id: "adolfo", name: "Aillan", phoneDigits: "584129775362", phoneDisplay: "0412-9775362" },
  { id: "ailan", name: "Adolfo", phoneDigits: "584241253309", phoneDisplay: "0424-1253309" }
];

const products = [
  { id:"conico-1000", type:"conico", kind:"Cónico", liters:1000, title:"Cónico 1.000 L", dimensions:null, description:"Formato compacto para espacios optimizados." },
  { id:"conico-1650", type:"conico", kind:"Cónico", liters:1650, title:"Cónico 1.650 L", dimensions:[["Altura","1,40 m"],["Ancho arriba","1,45 m"],["Ancho abajo","1,15 m"]], description:"Más capacidad para las necesidades de tu hogar." },
  { id:"conico-2200", type:"conico", kind:"Cónico", liters:2200, title:"Cónico 2.200 L", dimensions:[["Altura","1,60 m"],["Ancho arriba","1,58 m"],["Ancho abajo","1,15 m"]], description:"Una opción de gran capacidad." },
  { id:"conico-3300", type:"conico", kind:"Cónico", liters:3300, title:"Cónico 3.300 L", dimensions:[["Altura","1,75 m"],["Ancho arriba","1,84 m"],["Ancho abajo","1,45 m"]], description:"Máxima capacidad dentro de la línea cónica." },
  { id:"cilindrico-650", type:"cilindrico", kind:"Cilíndrico", liters:650, title:"Cilíndrico 650 L", dimensions:[["Altura","1,90 m"],["Ancho","63 cm"]], description:"Ideal para espacios más reducidos." },
  { id:"cilindrico-1050", type:"cilindrico", kind:"Cilíndrico", liters:1050, title:"Cilíndrico 1.050 L", dimensions:[["Altura","2,10 m"],["Ancho","75 cm"]], description:"Diseño vertical para aprovechar el espacio." },
  { id:"cilindrico-1320", type:"cilindrico", kind:"Cilíndrico", liters:1320, title:"Cilíndrico 1.320 L", dimensions:[["Altura","2,12 m"],["Ancho","81 cm"]], description:"Almacenamiento vertical de alta capacidad." }
];

const grid = document.querySelector("#productGrid");
const search = document.querySelector("#modelSearch");
const filterButtons = [...document.querySelectorAll(".filter-chip")];
let activeFilter = "todos";

function makeWhatsAppLink(phoneDigits, message) {
  return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;
}
function specsMarkup(product) {
  if (!product.dimensions) return `<div class="specs no-specs">Medidas disponibles por consulta. Escríbenos y te orientamos.</div>`;
  const specs = product.dimensions.map(([label,value]) => `<div class="spec"><small>${label}</small><strong>${value}</strong></div>`).join("");
  return `<div class="specs">${specs}</div>`;
}
function productMarkup(product, index) {
  const img = product.type === "conico" ? "tank-conico.svg" : "tank-cilindrico.svg";
  const imgAlt = product.type === "conico" ? "Ilustración de un tanque cónico" : "Ilustración de un tanque cilíndrico";
  const msg = `Hola, TanqueTuy. Quiero consultar precio, disponibilidad y entrega del tanque ${product.kind.toLowerCase()} de ${product.liters.toLocaleString("es-VE")} litros.`;
  return `<article class="product-card" style="animation-delay:${Math.min(index*55,280)}ms">
    <div class="product-art"><div class="art-glow"></div><span class="product-type">Línea ${product.kind}</span><img src="assets/${img}" alt="${imgAlt}" loading="lazy"></div>
    <div class="product-body">
      <div class="product-title-row"><div><h3 class="product-title">${product.title}</h3><p class="product-subtitle">${product.description}</p></div><span class="volume-mark">${product.liters.toLocaleString("es-VE")} L</span></div>
      ${specsMarkup(product)}
      <div class="product-meta"><span class="meta-dot"></span> Consulta precio y disponibilidad</div>
      <a class="product-cta js-whatsapp" data-message="${msg}" href="#contacto"><span>Consultar este modelo</span><span aria-hidden="true">→</span></a>
    </div>
  </article>`;
}
function renderProducts() {
  const term = (search.value || "").trim().toLocaleLowerCase("es").replace(/[.,]/g,"");
  const candidates = products.filter(p => activeFilter === "todos" || p.type === activeFilter);
  let filtered = candidates.filter(p => {
    const searchMatch = !term || `${p.title} ${p.kind} ${p.liters}`.toLocaleLowerCase("es").replace(/[.,]/g,"").includes(term);
    return searchMatch;
  });
  // Si escriben una capacidad exacta (por ejemplo, 650), priorizamos ese modelo sobre coincidencias como 1.650.
  const numericTerm = term.replace(/\D/g, "");
  if (numericTerm && /^\d+$/.test(numericTerm)) {
    const exactMatches = candidates.filter(p => String(p.liters) === numericTerm);
    if (exactMatches.length) filtered = exactMatches;
  }
  if (!filtered.length) {
    grid.innerHTML = `<div class="empty-state"><strong>No encontramos ese modelo.</strong>Prueba con otra capacidad o selecciona otra categoría.</div>`;
    return;
  }
  grid.innerHTML = filtered.map(productMarkup).join("");
}
filterButtons.forEach(button => button.addEventListener("click", () => {
  activeFilter = button.dataset.filter;
  filterButtons.forEach(b => { const active = b === button; b.classList.toggle("active",active); b.setAttribute("aria-pressed",String(active)); });
  renderProducts();
}));
search.addEventListener("input", renderProducts);
renderProducts();

// Selector de asesor: conserva el mensaje contextual (incluido el modelo seleccionado).
const contactPicker = document.querySelector("#contactPickerModal");
const contactPickerOptions = document.querySelector("#contactPickerOptions");
const contactPickerClose = document.querySelector("#contactPickerClose");
let pendingWhatsAppMessage = "Hola, TanqueTuy. Quiero información sobre sus tanques.";
let previousFocus = null;

contactPickerOptions.innerHTML = CONTACTS.map(contact => `
  <button type="button" class="contact-option" data-contact-id="${contact.id}">
    <span class="contact-option-avatar" aria-hidden="true">${contact.name.charAt(0).toLocaleUpperCase("es")}</span>
    <span class="contact-option-copy"><strong>Hablar con ${contact.name}</strong><small>${contact.phoneDisplay}</small></span>
    <span class="contact-option-arrow" aria-hidden="true">↗</span>
  </button>
`).join("");

function openContactPicker(message) {
  pendingWhatsAppMessage = message || "Hola, TanqueTuy. Quiero información sobre sus tanques.";
  previousFocus = document.activeElement;
  contactPicker.hidden = false;
  contactPicker.setAttribute("aria-hidden", "false");
  document.body.classList.add("contact-picker-open");
  requestAnimationFrame(() => {
    contactPicker.classList.add("is-open");
    contactPickerClose.focus();
  });
}
function closeContactPicker() {
  contactPicker.classList.remove("is-open");
  contactPicker.setAttribute("aria-hidden", "true");
  contactPicker.hidden = true;
  document.body.classList.remove("contact-picker-open");
  if (previousFocus && typeof previousFocus.focus === "function") previousFocus.focus();
}

document.addEventListener("click", event => {
  const trigger = event.target.closest(".js-whatsapp, .js-contact-picker");
  if (trigger) {
    event.preventDefault();
    openContactPicker(trigger.dataset.message);
    return;
  }

  const closeTrigger = event.target.closest("[data-close-contact-picker]");
  if (closeTrigger) {
    closeContactPicker();
    return;
  }

  const contactOption = event.target.closest("[data-contact-id]");
  if (contactOption && contactPicker.contains(contactOption)) {
    const contact = CONTACTS.find(item => item.id === contactOption.dataset.contactId);
    if (!contact) return;
    const url = makeWhatsAppLink(contact.phoneDigits, pendingWhatsAppMessage);
    closeContactPicker();
    window.open(url, "_blank", "noopener,noreferrer");
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !contactPicker.hidden) closeContactPicker();
});

// Mobile navigation
const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
function closeMenu() {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded","false");
  menuToggle.setAttribute("aria-label","Abrir menú");
  document.body.classList.remove("menu-open");
}
menuToggle.addEventListener("click", () => {
  const willOpen = !mainNav.classList.contains("open");
  mainNav.classList.toggle("open",willOpen);
  menuToggle.setAttribute("aria-expanded",String(willOpen));
  menuToggle.setAttribute("aria-label",willOpen ? "Cerrar menú" : "Abrir menú");
  document.body.classList.toggle("menu-open",willOpen);
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click",closeMenu));
window.addEventListener("resize", () => { if (window.innerWidth > 780) closeMenu(); });

// Scroll-triggered reveal animations with a graceful fallback.
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries,obs) => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("is-visible"); obs.unobserve(entry.target); }
  }), {threshold:0.12,rootMargin:"0px 0px -35px 0px"});
  revealElements.forEach(el => observer.observe(el));
} else revealElements.forEach(el => el.classList.add("is-visible"));

const topButton = document.querySelector("#backToTop");
const stickyCta = document.querySelector(".mobile-sticky-cta");
function onScroll() {
  const scrolled = window.scrollY > 450;
  topButton.classList.toggle("visible",scrolled);
  stickyCta.classList.toggle("show",window.innerWidth <= 780 && window.scrollY > 230);
}
window.addEventListener("scroll",onScroll,{passive:true});
window.addEventListener("resize",onScroll);
onScroll();
topButton.addEventListener("click",() => window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"}));
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
