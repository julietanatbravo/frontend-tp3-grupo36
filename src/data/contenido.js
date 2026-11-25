// Todo el contenido de la landing vive acá, separado de los componentes.
// origen: 'sentencia' = lo establece la regla original · 'grupo' = decisión de diseño de la propuesta

export const startup = {
  nombre: 'Soulless Catcher',
  rubro: 'Verificación de contenido digital',
  objetivo:
    'Asistente para revisar imágenes y videos sospechosos de haber sido generados con IA.',
  necesidad:
    'Cada vez circulan más imágenes y videos que parecen reales y no lo son. Quien los recibe necesita saber de dónde salen y qué tiene de sospechoso cada uno, sin que una herramienta lo acuse en falso.',
  logo: '/soulless-catcher-logo.png',
  codigo: 'S04-B',
  bloque: 'Fuentes e indicios',
  origen: 'Startup creada por estudiantes del IFTS 16, que expresaron sus reglas de funcionamiento con lógica proposicional.',
}

export const equipo = {
  grupo: 'Grupo 36',
  instituto: 'IFTS 29 · Desarrollo de Sistemas Web · Frontend 2026',
  integrantes: ['Julieta Natalia Bravo'],
  modalidad: 'Entrega individual',
}

export const propuestas = [
  {
    id: 'fuente',
    regla: 'R3',
    numero: '01',
    sentencia:
      'Si el usuario aporta un enlace de origen accesible, el sistema incorpora al informe los datos de esa fuente y distingue lo comprobado de lo no comprobado.',
    ficha: {
      datos: [
        'El enlace de origen que aporta el usuario',
        'Si ese enlace se puede abrir (accesible)',
        'Los datos de la fuente: sitio, autor, fecha y publicación',
        'El informe de revisión en curso',
      ],
      condicion: 'El usuario aporta un enlace de origen Y ese enlace es accesible.',
      consecuencia:
        'Se incorporan al informe los datos de la fuente Y se distingue lo comprobado de lo no comprobado.',
      conectores: 'Una condición compuesta: la palabra «accesible» exige las dos cosas a la vez, que haya enlace y que se pueda abrir.',
    },
    titulo: 'Rastreador de origen',
    bajada: 'Un agente que sigue el enlace hasta la fuente y la suma al informe sin mezclar certezas con suposiciones.',
    beneficio:
      'El usuario deja de tener que investigar la fuente por su cuenta: el informe le muestra quién publicó el material, cuándo y dónde. Al separar lo comprobado de lo no comprobado, nadie confunde «esto dice la página» con «esto es verdad».',
    flujo: {
      inicio: { texto: 'El usuario sube un material para revisar', origen: null },
      pasos: [
        { tipo: 'dato', texto: 'El agente revisa si el usuario escribió un enlace de origen', origen: 'sentencia' },
        { tipo: 'herramienta', texto: 'Si lo hay, intenta abrirlo con una herramienta de navegación', origen: 'grupo' },
      ],
      decision: { texto: '¿Hay un enlace de origen Y es accesible?', origen: 'sentencia' },
      si: [
        { tipo: 'herramienta', texto: 'Lee los datos de la fuente: sitio, autor, fecha y publicación', origen: 'grupo' },
        { tipo: 'accion', texto: 'Incorpora los datos de la fuente al informe', origen: 'sentencia' },
        { tipo: 'accion', texto: 'Separa en dos columnas: comprobado y no comprobado', origen: 'sentencia' },
        { tipo: 'fin', texto: 'Informe con la sección «Fuente»', origen: 'sentencia' },
      ],
      no: [
        { tipo: 'accion', texto: 'Informa que la fuente no se incorporó y por qué: no hubo enlace o no se pudo abrir', origen: 'grupo' },
        { tipo: 'humano', texto: 'Ofrece aportar otro enlace o pedir la revisión de una persona', origen: 'grupo' },
        { tipo: 'fin', texto: 'Informe sin datos de fuente', origen: 'grupo' },
      ],
    },
    detalles: [
      {
        titulo: 'Qué datos entran',
        texto: [
          'El material a revisar (imagen o video) y el enlace que el usuario indica como origen. Al abrirlo, el agente obtiene el nombre del sitio, el autor o cuenta que publicó, la fecha de publicación y el material publicado en esa página.',
        ],
      },
      {
        titulo: 'Qué se decide',
        texto: [
          'Una sola pregunta con dos partes: ¿el usuario aportó un enlace y ese enlace es accesible? Las dos tienen que cumplirse. Un enlace roto, privado o que pide iniciar sesión cuenta como no accesible.',
        ],
      },
      {
        titulo: 'Qué acción propone el agente',
        texto: [
          'Consultar el enlace con una herramienta de navegación, leer los datos de la fuente y escribirlos en el informe en dos columnas. «Comprobado»: lo que se ve directamente en la página (por ejemplo, que el sitio publicó la imagen en tal fecha). «No comprobado»: lo que la página afirma pero no se puede verificar (por ejemplo, quién tomó la foto).',
          'En este TP la acción solo se describe y se dibuja: la landing no abre enlaces ni se conecta a ningún servicio.',
        ],
      },
      {
        titulo: 'Resultado esperado',
        texto: [
          'Un informe con una sección «Fuente» que muestra de dónde viene el material y deja claro qué está verificado y qué no.',
        ],
      },
      {
        titulo: 'Excepciones e intervención humana',
        texto: [
          'La regla no dice qué pasa si no hay enlace o no se puede abrir. Decisión del grupo: el informe avisa que la fuente no se incorporó y explica el motivo, y el usuario puede aportar otro enlace o pedir que lo revise una persona. Que la condición no se cumpla no significa que el material sea falso.',
        ],
      },
      {
        titulo: 'Caso límite',
        texto: [
          'El enlace abre bien, pero la página muestra otro material o una versión recortada del que subió el usuario. Decisión del grupo: los datos se incorporan igual, porque la regla lo pide, pero todos van a la columna «No comprobado», con la nota «la fuente no coincide con el material». El agente deriva el caso a una persona para que compare las dos versiones.',
        ],
      },
    ],
    casos: [
      {
        rama: 'si',
        titulo: 'Se cumple',
        texto: 'El usuario sube una foto de una inundación y aporta el enlace a la nota de un diario que abre sin problemas.',
        resultado: 'El informe suma el diario, la fecha y la firma. Comprobado: el diario publicó la foto ese día. No comprobado: que la foto sea de esa ciudad.',
      },
      {
        rama: 'no',
        titulo: 'No se cumple',
        texto: 'El usuario aporta un enlace a una publicación privada que pide iniciar sesión.',
        resultado: 'No se incorporan datos de fuente. El informe explica que el enlace no es accesible y ofrece aportar otro o pedir una revisión humana.',
      },
    ],
  },
  {
    id: 'indicios',
    regla: 'R4',
    numero: '02',
    sentencia:
      'Si la revisión encuentra inconsistencias visuales, el sistema las describe como indicios que requieren comprobación, sin afirmar por eso que el contenido fue generado por IA.',
    ficha: {
      datos: [
        'La imagen o el video que se revisa',
        'Las inconsistencias visuales que encuentra la revisión',
        'Dónde aparece cada una: zona de la imagen o minuto del video',
      ],
      condicion: 'La revisión encuentra al menos una inconsistencia visual.',
      consecuencia:
        'Se describen como indicios que requieren comprobación Y NO se afirma, por eso, que el contenido fue generado por IA.',
      conectores: 'La consecuencia tiene una negación: describir los indicios está permitido, sacar una conclusión a partir de ellos no.',
    },
    titulo: 'Lector de indicios',
    bajada: 'Un agente que señala lo que no cierra en una imagen o un video, con un lenguaje prudente y sin acusar.',
    beneficio:
      'El usuario recibe una lista concreta de qué mirar y dónde, en vez de un veredicto de «es IA» o «no es IA» que puede estar equivocado. Además sabe por dónde circuló el material, por ejemplo qué portal lo difundió primero, y así tiene a quién consultar o a quién no creerle.',
    flujo: {
      inicio: { texto: 'Llega una imagen o un video para revisar', origen: null },
      pasos: [
        { tipo: 'herramienta', texto: 'El agente lo analiza con una herramienta visual: manos, sombras, reflejos, texto y continuidad entre cuadros', origen: 'grupo' },
      ],
      decision: { texto: '¿La revisión encontró inconsistencias visuales?', origen: 'sentencia' },
      si: [
        { tipo: 'accion', texto: 'Describe cada inconsistencia como indicio que requiere comprobación, con su ubicación', origen: 'sentencia' },
        { tipo: 'herramienta', texto: 'Rastrea el material en la web con búsqueda inversa: dónde apareció primero y qué portales o cuentas lo difundieron', origen: 'grupo' },
        { tipo: 'control', texto: 'Control de redacción: el informe no afirma que el contenido fue generado por IA', origen: 'sentencia' },
        { tipo: 'humano', texto: 'Si el usuario necesita una conclusión, deriva el caso a una persona revisora', origen: 'grupo' },
        { tipo: 'fin', texto: 'Informe con indicios, rastro de difusión y cómo comprobarlos', origen: 'sentencia' },
      ],
      no: [
        { tipo: 'accion', texto: 'Informa que no encontró inconsistencias visuales', origen: 'grupo' },
        { tipo: 'accion', texto: 'Aclara que eso no prueba que el contenido sea auténtico', origen: 'grupo' },
        { tipo: 'fin', texto: 'Informe sin indicios visuales', origen: 'grupo' },
      ],
    },
    detalles: [
      {
        titulo: 'Qué datos entran',
        texto: [
          'El material (imagen o video) y el resultado de la revisión visual: cada inconsistencia encontrada, de qué tipo es (anatomía, luz y sombras, reflejos, texto deformado, bordes, saltos entre cuadros) y en qué lugar o minuto aparece.',
          'Si hay indicios, también entran los resultados de la búsqueda inversa: las páginas donde aparece el material, con su fecha de publicación.',
        ],
      },
      {
        titulo: 'Qué se decide',
        texto: [
          '¿La revisión encontró al menos una inconsistencia visual? Si hay una o más, se sigue por el camino «Sí».',
        ],
      },
      {
        titulo: 'Qué acción propone el agente',
        texto: [
          'Redactar cada inconsistencia como un indicio: qué se ve, dónde y qué habría que comprobar. Por ejemplo: «La mano izquierda muestra seis dedos (zona inferior derecha). Indicio que requiere comprobación».',
          'Después, el agente rastrea el material en la web con una herramienta de búsqueda inversa de imágenes (en un video, con algunos cuadros clave). Informa dónde apareció primero y quién lo difundió. Por ejemplo: «La imagen aparece por primera vez el 12/11 en un portal de noticias y después la compartieron tres cuentas en redes sociales». Es una decisión del grupo: la regla no lo pide, pero ayuda a comprobar los indicios.',
          'El rastro de difusión se informa como dato, no como prueba: que un portal haya difundido la imagen no confirma que sea real ni que sea IA.',
          'Antes de entregar, un control de redacción revisa que el informe no tenga frases como «fue generado por IA» o «es falso». Si encuentra una, el agente la reescribe como indicio. Este control cuida la parte negativa de la regla.',
        ],
      },
      {
        titulo: 'Resultado esperado',
        texto: [
          'Un informe con la lista de indicios, su ubicación y una comprobación sugerida para cada uno, más una sección «Dónde circuló» con la primera aparición encontrada y los portales que lo difundieron. No incluye ningún veredicto sobre si el contenido fue generado por IA.',
        ],
      },
      {
        titulo: 'Excepciones e intervención humana',
        texto: [
          'Si el usuario necesita una conclusión, por ejemplo para publicar una nota, el agente no la da: deriva el caso a una persona revisora. Es una decisión del grupo, porque la regla solo prohíbe afirmar que es IA.',
          'Si la búsqueda inversa no encuentra apariciones, el informe lo dice («no se encontraron publicaciones previas») sin sacar conclusiones: puede ser un material nuevo o que circula por canales privados.',
          'Si no hay inconsistencias, la regla no dice nada. Decisión del grupo: informarlo y aclarar que no encontrar indicios no prueba que el material sea auténtico. Que la condición no se cumpla no implica lo contrario de la consecuencia.',
        ],
      },
      {
        titulo: 'Caso límite',
        texto: [
          'La imagen tiene bordes borrosos y colores raros, pero puede deberse a la compresión de una red social o a un filtro. Decisión del grupo: se describe igual como indicio y se agrega la posible explicación alternativa («puede deberse a compresión»), para no inducir a una conclusión equivocada.',
        ],
      },
    ],
    casos: [
      {
        rama: 'si',
        titulo: 'Se cumple',
        texto: 'Un video donde las agujas de un reloj de pared saltan entre cuadros y una persona aparece con seis dedos.',
        resultado: 'El informe describe dos indicios con su minuto y una comprobación sugerida para cada uno, e informa que el video circuló primero en un portal de noticias el 12/11 y después en tres cuentas de redes. No dice que el video sea IA.',
      },
      {
        rama: 'no',
        titulo: 'No se cumple',
        texto: 'Una foto de un paisaje en la que la revisión no encuentra nada fuera de lugar.',
        resultado: 'El informe dice que no hubo inconsistencias visuales y aclara que eso no prueba que la foto sea auténtica.',
      },
    ],
  },
]
