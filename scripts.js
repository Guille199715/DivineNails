function reservar(horario) {
  const modal = document.getElementById('reservaModal');
  const mensaje = document.getElementById('mensajeReserva');
  mensaje.textContent = `¡Reservaste turno para: ${horario}!
Nos contactaremos por WhatsApp 😉`;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function cerrarReserva() {
  document.getElementById('reservaModal').style.display = 'none';
  document.body.style.overflow = '';
}

const totalFondos = 40;
let actual = 1;

function cambiarFondo() {
  const imagen = `images/backgrounds/bg${actual}.jpg`;
  document.body.style.backgroundImage = `url('${imagen}')`;
  actual = actual < totalFondos ? actual + 1 : 1;
}

for (let i = 1; i <= totalFondos; i++) {
  const img = new Image();
  img.src = `images/backgrounds/bg${i}.jpg`;
}

cambiarFondo();
setInterval(cambiarFondo, 5000);

document.getElementById('mostrarCalendario')?.addEventListener('click', function () {
  const calendario = document.getElementById('calendarioContenedor');
  if (calendario) {
    calendario.style.display = calendario.style.display === 'none' ? 'block' : 'none';
  }
});

function mostrarImagen(_, ruta, descripcion = "Diseño de uñas") {
  const modal = document.getElementById('modalImagen');
  const img = document.getElementById('imagenModal');
  img.src = ruta;
  img.alt = descripcion;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function cerrarModal() {
  document.getElementById('modalImagen').style.display = 'none';
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    cerrarModal();
    cerrarReserva();
  }
});