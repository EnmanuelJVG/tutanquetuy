/* Configuración rápida: este es el único número que debes actualizar si el contacto cambia. */
const BUSINESS_PHONE_DIGITS = "584129775362"; // País +58, sin el 0 inicial
const BUSINESS_PHONE_DISPLAY = "0412-9775362";

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

function makeWhatsAppLink(message) {
  return `https://wa.me/${BUSINESS_PHONE_DIGITS}?text=${encodeURIComponent(message)}`;
}
function specsMarkup(product) {
  if (!product.dimensions) return `<div class="specs no-specs">Medidas disponibles por consulta. Escríbenos y te orientamos.</div>`;
  const specs = product.dimensions.map(([label,value]) => `<div class="spec"><small>${label}</small><strong>${value}</strong></div>`).join("");
  return `<div class="specs">${specs}</div>`;
}
function productMarkup(product, index) {
  const img = product.type === "conico" ? "tank-conico.svg" : "tank-cilindrico.svg";
  const imgAlt = product.type === "conico" ? "Ilustración de un tanque cónico" : "Ilustración de un tanque cilíndrico";
  const msg = `Hola, Tu Tanque Tuy. Quiero consultar precio, disponibilidad y entrega del tanque ${product.kind.toLowerCase()} de ${product.liters.toLocaleString("es-VE")} litros.`;
  return `<article class="product-card" style="animation-delay:${Math.min(index*55,280)}ms">
    <div class="product-art"><div class="art-glow"></div><span class="product-type">Línea ${product.kind}</span><img src="assets/${img}" alt="${imgAlt}" loading="lazy"></div>
    <div class="product-body">
      <div class="product-title-row"><div><h3 class="product-title">${product.title}</h3><p class="product-subtitle">${product.description}</p></div><span class="volume-mark">${product.liters.toLocaleString("es-VE")} L</span></div>
      ${specsMarkup(product)}
      <div class="product-meta"><span class="meta-dot"></span> Consulta precio y disponibilidad</div>
      <a class="product-cta" href="${makeWhatsAppLink(msg)}" target="_blank" rel="noopener noreferrer"><span>Consultar este modelo</span><span aria-hidden="true">→</span></a>
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

// Configure WhatsApp destinations from the phone number above for all CTAs.
document.querySelectorAll(".js-whatsapp").forEach(link => {
  const message = link.dataset.message || "Hola, Tu Tanque Tuy. Quiero información sobre sus tanques.";
  link.href = makeWhatsAppLink(message);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});
const phoneDisplay = document.querySelector("#phoneDisplay");
if (phoneDisplay) { phoneDisplay.textContent = BUSINESS_PHONE_DISPLAY; phoneDisplay.href = `tel:+${BUSINESS_PHONE_DIGITS}`; }

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
