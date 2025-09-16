// Reserva
function reservar(horario) {
  if (!horario) return alert("Por favor, seleccioná un horario válido.");
  const modal = document.getElementById('reservaModal');
  const mensaje = document.getElementById('mensajeReserva');
  mensaje.textContent = `¡Reservaste turno para: ${horario}!\nNos contactaremos por WhatsApp 😉`;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function cerrarReserva() {
  document.getElementById('reservaModal').style.display = 'none';
  document.body.style.overflow = '';
}

// Fondo dinámico
const totalFondos = 22;
let actual = 1;
let fondoActual = `images/backgrounds/bg${actual}.jpg`;
const fondoLayer = document.createElement('style');
document.head.appendChild(fondoLayer);

for (let i = 1; i <= totalFondos; i++) {
  const img = new Image();
  img.src = `images/backgrounds/bg${i}.jpg`;
}

function aplicarFondo(imgUrl) {
  fondoLayer.innerHTML = `body::before { background-image: url('${imgUrl}'); }`;
}

aplicarFondo(fondoActual);

function cambiarFondo() {
  const nuevoFondo = `images/backgrounds/bg${actual}.jpg`;
  aplicarFondo(nuevoFondo);
  document.body.classList.add('fondo-fade');
  setTimeout(() => {
    fondoActual = nuevoFondo;
    document.body.classList.remove('fondo-fade');
  }, 1200);
  actual = actual < totalFondos ? actual + 1 : 1;
}

setInterval(cambiarFondo, 5000);

// Modal con carrusel
function mostrarImagenCarpeta(carpeta, cantidad, descripcion) {
  const imgs = [];
  for (let i = 1; i <= cantidad; i++) {
    imgs.push(`${carpeta}/img${i}.jpg`);
  }
  mostrarImagen(null, imgs[0], descripcion, imgs);
}

function mostrarImagen(_, ruta, descripcion = "Diseño de uñas", listaImgs = []) {
  const modal = document.getElementById('modalImagen');
  const img = document.getElementById('imagenModal');
  const carrusel = document.getElementById('carrusel');
  const titulo = document.getElementById('descripcionImagen');

  titulo.textContent = descripcion;
  img.src = ruta;
  img.alt = descripcion;

  carrusel.innerHTML = '';

  if (listaImgs.length > 1) {
    listaImgs.forEach((src, idx) => {
      const mini = document.createElement('img');
      mini.src = src;
      mini.alt = `${descripcion} ${idx + 1}`;
      mini.className = 'miniatura';
      if (src === ruta) mini.classList.add('activa');

      mini.addEventListener('click', () => {
        img.style.opacity = 0;
        setTimeout(() => {
          img.src = src;
          img.style.opacity = 1;
        }, 200);
        carrusel.querySelectorAll('.miniatura').forEach(el => el.classList.remove('activa'));
        mini.classList.add('activa');
      });

      carrusel.appendChild(mini);
    });
  }

  modal.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function cerrarModal() {
  const modal = document.getElementById('modalImagen');
  modal.classList.remove('visible');
  document.body.style.overflow = '';
}

// ESC cierra modales
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    cerrarModal();
    cerrarReserva();
    cerrarMensajeIG();
  }
});

// Cierre al tocar fuera del contenido del modal
document.getElementById("modalImagen").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    cerrarModal();
  }
});

// Mensaje flotante fijo con botón de cierre
window.addEventListener("DOMContentLoaded", () => {
  const mensaje = document.getElementById("mensajeIG");
  const cerrarIG = document.getElementById("cerrarMensajeIG");
  const cerrarModalBtn = document.getElementById("cerrarModalImagen");

  mensaje.classList.add("visible");

  if (cerrarIG) {
    cerrarIG.addEventListener("click", cerrarMensajeIG);
    cerrarIG.addEventListener("touchstart", cerrarMensajeIG);
  }

  if (cerrarModalBtn) {
    cerrarModalBtn.addEventListener("click", cerrarModal);
    cerrarModalBtn.addEventListener("touchstart", cerrarModal);
  }
});

function cerrarMensajeIG() {
  const mensaje = document.getElementById("mensajeIG");
  mensaje.classList.remove("visible");
}
