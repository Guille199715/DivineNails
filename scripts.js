// Reserva
function reservar(horario) {
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

// Cambio de fondo con transición suave
const totalFondos = 40;
let actual = 1;
let fondoActual = `images/backgrounds/bg${actual}.jpg`;

// Crea un <style> para controlar el ::before dinámicamente
const fondoLayer = document.createElement('style');
document.head.appendChild(fondoLayer);

// Precarga de imágenes
for (let i = 1; i <= totalFondos; i++) {
  const img = new Image();
  img.src = `images/backgrounds/bg${i}.jpg`;
}

// Aplica fondo a ::before con CSS dinámico
function aplicarFondo(imgUrl) {
  fondoLayer.innerHTML = `body::before { background-image: url('${imgUrl}'); }`;
}

// Primer fondo
aplicarFondo(fondoActual);

// Cambio cada 5s con fade
function cambiarFondo() {
  const nuevoFondo = `images/backgrounds/bg${actual}.jpg`;

  aplicarFondo(nuevoFondo);
  document.body.classList.add('fondo-fade');

  setTimeout(() => {
    fondoActual = nuevoFondo;
    document.body.classList.remove('fondo-fade');
  }, 1200); // debe coincidir con el transition del CSS

  actual = actual < totalFondos ? actual + 1 : 1;
}

setInterval(cambiarFondo, 5000);

// Mostrar/ocultar calendario
document.getElementById('mostrarCalendario')?.addEventListener('click', function () {
  const calendario = document.getElementById('calendarioContenedor');
  if (calendario) {
    calendario.style.display = calendario.style.display === 'none' ? 'block' : 'none';
  }
});

// Modal imagen con carrusel
function mostrarImagenCarpeta(carpeta, cantidad, descripcion) {
  const imgs = [];
  for(let i = 1; i <= cantidad; i++) {
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

  // Limpiar carrusel
  carrusel.innerHTML = '';

  if(listaImgs.length > 1){
    listaImgs.forEach((src, idx) => {
      const mini = document.createElement('img');
      mini.src = src;
      mini.alt = descripcion + ' ' + (idx+1);
      mini.className = 'miniatura';
      if(src === ruta) mini.classList.add('activa');

      mini.addEventListener('click', () => {
        img.src = src;
        // actualizar activa
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
  if(e.key === 'Escape'){
    cerrarModal();
    cerrarReserva();
  }
});
