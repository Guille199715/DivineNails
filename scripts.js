function reservar(horario) {
  alert(`¡Reservaste turno para: ${horario}!\nNos contactaremos por WhatsApp 😉`);
}

// Fondos dinámicos con transición
const totalFondos = 40; // Cambialo según tu cantidad de imágenes
let actual = 1;

function cambiarFondo() {
  const imagen = `images/backgrounds/bg${actual}.jpg`;
  document.body.style.backgroundImage = `url('${imagen}')`;
  actual = actual < totalFondos ? actual + 1 : 1;
}

cambiarFondo();
setInterval(cambiarFondo, 5000);

// Mostrar calendario al hacer clic
document.getElementById('mostrarCalendario')?.addEventListener('click', function () {
  const calendario = document.getElementById('calendarioContenedor');
  if (calendario) {
    calendario.style.display = calendario.style.display === 'none' ? 'block' : 'none';
  }
});

// Modal para imagen del catálogo
function mostrarImagen(_, ruta) {
  const modal = document.getElementById('modalImagen');
  const img = document.getElementById('imagenModal');
  img.src = ruta;
  modal.style.display = 'flex';
}

function cerrarModal() {
  document.getElementById('modalImagen').style.display = 'none';
}