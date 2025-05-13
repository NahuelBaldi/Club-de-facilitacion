function normalizarTextoParaJSON(textoOriginal) {
    return textoOriginal
      .replace(/\u00A0/g, ' ')                // Reemplaza espacios no separables
      .replace(/\r?\n/g, '\\n')              // Escapa saltos de línea
      .replace(/[“”]/g, '"')                 // Reemplaza comillas tipográficas por comillas rectas
      .replace(/…/g, '...')                  // Reemplaza elipsis tipográfica por tres puntos
      .trim();                               // Elimina espacios innecesarios al inicio/fin
  }
  
  // Ejemplo de uso
  const texto = `…Porque la  metodología LEGO® SERIOUS PLAY® no solo transforma la forma en que las empresas abordan la gestión de personas, sino que también fomenta un ambiente de colaboración, creatividad y comunicación abierta. Al permitir que los empleados expresen sus ideas y emociones a través de la construcción con bloques, se rompen las barreras tradicionales y se promueve un sentido de pertenencia y compromiso.
Implementar esta metodología puede ser un cambio de juego para las organizaciones que buscan innovar en su cultura laboral y mejorar la dinámica de equipo. 
El éxito de una empresa radica en su gente, y al invertir en su desarrollo y bienestar, se sientan las bases para un futuro más sólido y sostenible.
Así que, si estás buscando una forma de revitalizar la gestión de personas en tu empresa, considera darle una oportunidad a  la metodología LEGO® SERIOUS PLAY®. No solo estarás construyendo modelos físicos, sino también un entorno donde las ideas pueden florecer y las relaciones pueden fortalecerse. ¡Es hora de jugar en serio!`;
  console.log(normalizarTextoParaJSON(texto));