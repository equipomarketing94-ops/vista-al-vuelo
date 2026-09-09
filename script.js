/* ============================================================
   VISTA AL VUELO — script.js
   Todo el comportamiento de la página en un solo archivo.
   ============================================================ */

/* -------- 0. CONFIGURACIÓN (cámbialo aquí una sola vez) --------
   Igual que en Cordomatic: pones el número de WhatsApp acá y
   se actualizan TODOS los botones de WhatsApp de la página.
   Formato: código de país + número, sin +, sin espacios.
   Colombia = 57. Ejemplo: 573001234567 */
const WHATSAPP_NUMBER = "573007177542"; // REEMPLAZAR por el número real
const WHATSAPP_MENSAJE = "¡Hola! Quiero hacer una reserva en Vista al Vuelo.";


/* Espera a que el HTML esté cargado antes de tocar los elementos */
document.addEventListener("DOMContentLoaded", () => {

  /* -------- 1. MENÚ MÓVIL (hamburguesa) -------- */
  const navToggle = document.getElementById("navToggle");
  const navMenu   = document.getElementById("navMenu");

  navToggle.addEventListener("click", () => {
    const abierto = navMenu.classList.toggle("open"); // abre/cierra
    navToggle.classList.toggle("open", abierto);      // anima la "X"
    // aria-expanded: le dice a lectores de pantalla si el menú está abierto
    navToggle.setAttribute("aria-expanded", abierto ? "true" : "false");
    navToggle.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
  });

  // Al tocar un link del menú, ciérralo (en celular)
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });


  /* -------- 2. SOMBRA/FONDO DEL HEADER AL HACER SCROLL -------- */
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", onScroll);
  onScroll(); // ejecuta una vez por si la página abre ya scrolleada


  /* -------- 3. WHATSAPP CENTRALIZADO -------- */
  // Construye el link con el número y el mensaje definidos arriba
  const whatsappURL =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MENSAJE)}`;
  // Aplica ese link a TODOS los elementos con la clase .js-whatsapp
  document.querySelectorAll(".js-whatsapp").forEach((el) => {
    el.setAttribute("href", whatsappURL);
  });


  /* -------- 4. FORMULARIO DE RESERVAS (Fase 1: aún no envía) --------
     En la Fase 2 aquí conectamos el envío a Google Apps Script
     (para que llegue al correo y quede en el Excel). Por ahora,
     validamos y mostramos un aviso. */
  const form = document.getElementById("reservaForm");
  const feedback = document.getElementById("formFeedback");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // evita que la página se recargue

    // Validación básica del navegador (campos required)
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Mensaje temporal mientras conectamos el envío real en la Fase 2
    feedback.textContent =
      "¡Gracias! El envío automático se activa en la Fase 2. Por ahora, reserva por WhatsApp 👉";
    feedback.className = "form-feedback info";
  });


  /* -------- 5. AÑO AUTOMÁTICO EN EL FOOTER -------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

});
