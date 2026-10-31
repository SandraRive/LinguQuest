import type { Lesson, Unit } from '../schema';
import { bd, ch, fl, fx, ls, mt, or, sp, tr } from '../helpers';

/* PRE-A1 · Unidad 2 · "Señales de radio": alfabeto, pronunciación, sonidos y números. */

export const L_ALPHABET: Lesson = {
  id: 'pre-a1-u2-l4', level: 'PRE_A1', unit: 'pre-a1-u2', category: 'pronunciation',
  title: 'El alfabeto y deletrear', room: 'Deletreo por radio',
  objectives: ['Decir las 26 letras en inglés', 'Deletrear tu nombre', 'Entender cuando alguien deletrea'],
  prerequisites: ['pre-a1-u1-l3'],
  intro: 'Por radio hay ruido y los nombres se confunden. Por eso los supervivientes deletrean: "My name is Kate. K-A-T-E." Las letras son las mismas que en español (sin ñ), pero se llaman distinto.',
  meaning: 'Deletrear (spell) es decir una palabra letra a letra. Para pedirlo se usa la pregunta fija "How do you spell it?" (¿cómo se deletrea?).',
  when: ['Al dar tu nombre o apellido por teléfono o radio.', 'Al apuntar direcciones, correos o códigos.', 'Cuando no entiendes una palabra y quieres asegurarte.'],
  how: 'Pregunta: How do you spell it? / How do you spell your name? Respuesta: las letras una a una, con una pequeña pausa. Si una letra va doble, se dice "double": Bella = B-E-double L-A.',
  table: {
    head: ['Letra', 'Se dice', 'IPA'],
    rows: [
      ['A', 'éi', '/eɪ/'], ['B', 'bi', '/biː/'], ['C', 'si', '/siː/'], ['D', 'di', '/diː/'], ['E', 'i', '/iː/'],
      ['F', 'ef', '/ef/'], ['G', 'yi', '/dʒiː/'], ['H', 'éich', '/eɪtʃ/'], ['I', 'ái', '/aɪ/'], ['J', 'yéi', '/dʒeɪ/'],
      ['K', 'kéi', '/keɪ/'], ['L', 'el', '/el/'], ['M', 'em', '/em/'], ['N', 'en', '/en/'], ['O', 'óu', '/əʊ/ · /oʊ/'],
      ['P', 'pi', '/piː/'], ['Q', 'kiú', '/kjuː/'], ['R', 'ar', '/ɑː/ · /ɑːr/'], ['S', 'es', '/es/'], ['T', 'ti', '/tiː/'],
      ['U', 'iú', '/juː/'], ['V', 'vi (dientes sobre el labio)', '/viː/'], ['W', 'dábliu', '/ˈdʌbljuː/'], ['X', 'eks', '/eks/'],
      ['Y', 'uái', '/waɪ/'], ['Z', 'zed (UK) · zi (US)', '/zed/ · /ziː/'],
    ],
  },
  examples: [
    { en: 'How do you spell it?', es: '¿Cómo se deletrea?' },
    { en: 'How do you spell your name? — S-A-N-D-R-A.', es: '¿Cómo se deletrea tu nombre? — S-A-N-D-R-A.' },
    { en: 'Bella: B-E-double L-A.', es: 'Bella: B-E-doble L-A.', note: 'Dos letras iguales seguidas: double.' },
    { en: 'My name is Kate. K-A-T-E.', es: 'Me llamo Kate. K-A-T-E.' },
  ],
  errors: [
    { wrong: 'E se dice «e»', right: 'E se dice «i»', why: 'Las vocales cambian mucho: A = éi, E = i, I = ái.' },
    { wrong: 'G se dice «ye» y J «jota»', right: 'G = «yi», J = «yéi»', why: 'Son las dos que más se confunden. Truco: G rima con B, C, D (bi, si, di, yi).' },
    { wrong: 'W = «uve doble»', right: 'W = «dábliu»', why: 'En inglés es "double u", no "doble v".' },
  ],
  comparison: { title: 'Las vocales, casi al revés', body: 'En español decimos a, e, i. En inglés: A suena «éi», E suena «i» e I suena «ái». Si al deletrear dices la letra a la española, te entenderán otra.' },
  simpler: [
    'Solo tienes que memorizar bien cinco letras traicioneras: A (éi), E (i), I (ái), G (yi) y J (yéi). El resto se parece bastante al español.',
    'Agrúpalas por cómo riman. Riman con «i»: B, C, D, E, G, P, T, V. Riman con «éi»: A, H, J, K. Riman con «e»: F, L, M, N, S, X, Z (UK). Sueltas: I y Y (ái/uái), O (óu), Q, U y W (con «iú»), R (ar).',
  ],
  vocab: ['v-spell', 'v-name', 'v-letter'],
  concepts: [
    { id: 'c-abc-i', kind: 'vocab', prompt: '¿Qué letra se pronuncia «ái»?', answers: ['I'] },
    { id: 'c-abc-e', kind: 'vocab', prompt: '¿Qué letra se pronuncia «i»?', answers: ['E'] },
    { id: 'c-abc-g', kind: 'vocab', prompt: '¿Qué letra se pronuncia «yi»?', answers: ['G'] },
    { id: 'c-abc-j', kind: 'vocab', prompt: '¿Qué letra se pronuncia «yéi»?', answers: ['J'] },
    { id: 'c-abc-a', kind: 'vocab', prompt: '¿Qué letra se pronuncia «éi»?', answers: ['A'] },
    { id: 'c-abc-spell', kind: 'expression', prompt: '¿Cómo se deletrea?', answers: ['How do you spell it'] },
  ],
  guided: [
    ch('l4-g1', '¿Qué letra suena «ái»?', '«ái»', ['E', 'I', 'A'], 1, 'I se pronuncia «ái».', ['letter-names'], 'Piensa en el pronombre I (yo).'),
    ch('l4-g2', '¿Qué letra suena «i»?', '«i»', ['I', 'E', 'Y'], 1, 'E se pronuncia «i».', ['letter-names']),
    mt('l4-g3', [['A', 'éi'], ['E', 'i'], ['I', 'ái'], ['O', 'óu']], 'A = éi, E = i, I = ái, O = óu.', ['letter-names'], 'Une cada letra con su sonido'),
    ls('l4-g4', 'G', ['G', 'J', 'E'], 0, 'Has oído «yi»: es la G.', ['letter-names']),
  ],
  independent: [
    ch('l4-i1', 'La letra J se dice…', 'J', ['«yi»', '«yéi»', '«jota»'], 1, 'J = «yéi». G = «yi».', ['letter-names']),
    ls('l4-i2', 'W', ['V', 'W', 'U'], 1, '«dábliu» es la W.', ['letter-names']),
    ch('l4-i3', 'Bella se deletrea…', 'B-E-___-A', ['two L', 'double L', 'L L'], 1, 'Dos letras iguales seguidas: double L.', ['letter-names']),
    tr('l4-i4', '¿Cómo se deletrea?', ['How do you spell it'], 'How do you spell it? Es una pregunta fija.', ['word-order']),
    ls('l4-i5', 'H', ['A', 'H', 'I'], 1, '«éich» es la H.', ['letter-names']),
  ],
  final: [
    ch('l4-f1', '¿Qué letra suena «éi»?', '«éi»', ['E', 'I', 'A'], 2, 'A se dice «éi».', ['letter-names']),
    ls('l4-f2', 'J', ['G', 'J', 'Y'], 1, '«yéi» es la J.', ['letter-names']),
    or('l4-f3', ['spell', 'How', 'it?', 'you', 'do'], ['How do you spell it'], '¿Cómo se deletrea?', 'How do you spell it?'),
    ch('l4-f4', 'Tu nombre por radio: «Emma». ¿Cómo lo deletreas?', 'Emma', ['E-double M-A', 'I-M-M-A', 'E-M-A'], 0, 'E (i) - double M - A (éi).', ['letter-names']),
    ls('l4-f5', 'E', ['A', 'E', 'I'], 1, '«i» es la E.', ['letter-names']),
  ],
};

export const L_PRONUN: Lesson = {
  id: 'pre-a1-u2-l5', level: 'PRE_A1', unit: 'pre-a1-u2', category: 'pronunciation',
  title: 'Pronunciación inicial', room: 'Afinando la frecuencia',
  objectives: ['Saber que el inglés no se lee como se escribe', 'Reconocer letras mudas', 'Poner la fuerza en la sílaba correcta'],
  prerequisites: ['pre-a1-u2-l4'],
  intro: 'Si lees el inglés como el español, la gente no te entenderá por radio. No hace falta un acento perfecto: basta con cuatro reglas que evitan los errores más típicos.',
  meaning: 'En inglés una misma letra puede sonar de varias formas y algunas no suenan. Además cada palabra tiene una sílaba más fuerte, y si la cambias la palabra cuesta de reconocer.',
  when: ['Siempre que aprendas una palabra nueva: escúchala antes de decirla.', 'Al hablar por radio: la sílaba fuerte es lo que más se oye entre el ruido.'],
  how: '1) Escucha antes de leer. 2) La e final casi nunca suena: safe = «séif». 3) Hay letras mudas: la k de know, la w de write, la h de hour. 4) Marca la sílaba fuerte: SHEL-ter, sur-VI-vor, RA-di-o. Y nunca pongas una e delante de s + consonante: Spanish, no «espánish».',
  table: {
    head: ['Palabra', 'Cómo NO', 'Cómo sí'],
    rows: [
      ['safe', 'sáfe', 'séif'],
      ['Spanish', 'espánish', 'SPÁ-nish'],
      ['they', 'téi', 'déi (lengua entre los dientes)'],
      ['hour', 'jáuer', 'áue (h muda)'],
      ['survivor', 'SUR-vivor', 'sur-VÁI-vor'],
      ['shelter', 'shel-TER', 'SHÉL-ter'],
    ],
  },
  examples: [
    { en: 'safe', es: 'a salvo', note: 'La e final no suena, pero hace que la a diga «éi».' },
    { en: 'Spanish', es: 'español', note: 'Empieza directamente con s.' },
    { en: 'radio', es: 'radio', note: 'RÉI-dio: la fuerza al principio y la a dice «éi».' },
    { en: 'survivor', es: 'superviviente', note: 'sur-VÁI-vor.' },
    { en: 'hour', es: 'hora', note: 'La h no suena: «áue».' },
  ],
  errors: [
    { wrong: 'safe → «sáfe»', right: 'safe → «séif»', why: 'La e final suele ser muda y alarga la vocal anterior.' },
    { wrong: 'Spanish → «espánish»', right: 'Spanish → «spánish»', why: 'En inglés las palabras pueden empezar por s + consonante sin e delante: Spain, school, stop.' },
    { wrong: 'hour → «jáuer»', right: 'hour → «áue»', why: 'En hour la h es muda (por eso se dice an hour).' },
  ],
  comparison: { title: 'Español: se lee como se escribe. Inglés: no', body: 'En español, si sabes leer una palabra sabes decirla. En inglés no: aprende cada palabra con su audio. Usa el botón de altavoz siempre que veas una palabra nueva.' },
  simpler: [
    'Regla de oro: escucha primero, lee después. Y vigila tres trampas: la e del final no suena, no pongas e antes de s (Spanish, no espánish) y algunas letras no suenan (la k de know).',
    'Piensa en el inglés como en un código secreto: la palabra escrita es solo una pista de cómo suena. Por eso cada palabra de esta app tiene su altavoz y su «suena como». Pulsa, escucha y repite en voz alta.',
  ],
  vocab: ['v-hour'],
  concepts: [
    { id: 'c-pron-safe', kind: 'vocab', prompt: '¿Suena la e final de "safe"? (yes / no)', answers: ['no'] },
    { id: 'c-pron-spanish', kind: 'vocab', prompt: 'Escribe "español" en inglés (sin e delante)', answers: ['Spanish'] },
    { id: 'c-pron-hour', kind: 'vocab', prompt: 'hora (con h muda)', answers: ['hour'] },
    { id: 'c-pron-stress', kind: 'vocab', prompt: 'Sílaba fuerte de "shelter": ¿la 1.ª o la 2.ª? (1 / 2)', answers: ['1'] },
  ],
  guided: [
    ch('l5-g1', '¿Cómo se pronuncia "safe"?', 'safe', ['«sáfe»', '«séif»', '«safé»'], 1, 'La e final no suena: «séif».', ['pronunciation']),
    ch('l5-g2', '¿Cómo empieza "Spanish"?', 'Spanish', ['«es-pánish»', '«spánish»'], 1, 'Sin e delante: «spánish».', ['pronunciation']),
    ls('l5-g3', 'shelter', ['SHÉL-ter', 'shel-TÉR'], 0, 'La fuerza va en la primera sílaba.', ['pronunciation'], 'Escucha: ¿dónde va la fuerza?'),
    ch('l5-g4', '¿Qué letra no suena en "hour"?', 'hour', ['h', 'o', 'r'], 0, 'La h de hour es muda.', ['pronunciation']),
  ],
  independent: [
    sp('l5-i1', 'Toca la palabra con la fuerza en la 2.ª sílaba', ['SHEL-ter', 'sur-VI-vor', 'RA-di-o'], 1, 'sur-VI-vor lleva la fuerza en el centro.', ['pronunciation']),
    ch('l5-i2', '¿Qué letra no suena en "know"?', 'know', ['k', 'n', 'o'], 0, 'La k delante de n no suena: know = «nóu».', ['pronunciation']),
    ls('l5-i3', 'survivor', ['sur-VÁI-vor', 'SÚR-vi-vor'], 0, 'sur-VÁI-vor.', ['pronunciation'], 'Escucha: ¿dónde va la fuerza?'),
    ch('l5-i4', '¿Cómo se pronuncia "they"?', 'they', ['«téi»', '«déi» con la lengua entre los dientes', '«dé»'], 1, 'th suave con la lengua entre los dientes: «déi».', ['sounds']),
  ],
  final: [
    ch('l5-f1', '¿Cómo se pronuncia "safe"?', 'safe', ['«séif»', '«sáfe»'], 0, 'e final muda.', ['pronunciation']),
    ls('l5-f2', 'radio', ['RÉI-dio', 'ra-DÍ-o'], 0, 'RÉI-dio.', ['pronunciation'], 'Escucha: ¿dónde va la fuerza?'),
    ch('l5-f3', '¿Cuál está bien pronunciado?', 'Spanish', ['«espánish»', '«spánish»', '«espaniós»'], 1, 'Sin e delante de s + consonante.', ['pronunciation']),
    ch('l5-f4', '"an hour" lleva an porque…', 'an hour', ['hour empieza por vocal escrita', 'la h no suena y empieza por sonido vocal', 'es una excepción sin motivo'], 1, 'Cuenta el sonido, no la letra.', ['pronunciation']),
    ch('l5-f5', '¿Qué hay que hacer con una palabra nueva?', 'Palabra nueva', ['Leerla como en español', 'Escucharla antes de decirla', 'Pronunciar todas las letras'], 1, 'Escucha primero, lee después.', ['pronunciation']),
  ],
};

export const L_SOUNDS: Lesson = {
  id: 'pre-a1-u2-l6', level: 'PRE_A1', unit: 'pre-a1-u2', category: 'pronunciation',
  title: 'Sonidos básicos', room: 'Ruido en la línea',
  objectives: ['Hacer el sonido th', 'Suavizar la h', 'Distinguir sh de ch y la i larga de la corta'],
  prerequisites: ['pre-a1-u2-l5'],
  intro: 'Algunos sonidos del inglés no existen en español. Si los cambias por el sonido español más parecido, a veces dices otra palabra. Estos son los cinco que más importan al principio.',
  meaning: 'Un sonido distinto puede cambiar el significado: three (tres) y tree (árbol) solo se diferencian en la th. Ship (barco) y sheep (oveja), en lo larga que es la i.',
  when: ['Siempre que hables: estos sonidos aparecen en palabras muy frecuentes (the, they, he, she, three, thank you).'],
  how: 'th: saca un poco la lengua entre los dientes. En the/they/this vibra (como una d muy suave); en three/thank you no vibra (como la z de España). h: un suspiro, mucho más suave que la j española. sh: como cuando pides silencio («shhh»), sin la t de ch. i larga (she, sheep) vs i corta (it, ship). v: dientes de arriba sobre el labio de abajo.',
  table: {
    head: ['Sonido', 'Ejemplos', 'Cómo hacerlo'],
    rows: [
      ['th /ð/', 'the, they, this, mother', 'Lengua entre los dientes, con vibración'],
      ['th /θ/', 'three, thank you, Thursday', 'Lengua entre los dientes, sin vibración'],
      ['h /h/', 'he, here, hello, happy', 'Un suspiro, sin raspar la garganta'],
      ['sh /ʃ/', 'she, shelter, Spanish', 'Como pedir silencio'],
      ['ch /tʃ/', 'child, chair', 'Como la ch de "chico"'],
      ['i larga /iː/', 'she, three, sheep', 'Sonrisa larga: «iii»'],
      ['i corta /ɪ/', 'it, this, ship', 'Corta y relajada, entre i y e'],
    ],
  },
  examples: [
    { en: 'three', es: 'tres', note: 'th sin vibración. Si dices «tri» suena a tree (árbol).' },
    { en: 'they', es: 'ellos', note: 'th con vibración.' },
    { en: 'hello', es: 'hola', note: 'h suave, como un suspiro.' },
    { en: 'she', es: 'ella', note: 'sh + i larga.' },
    { en: 'thank you', es: 'gracias' },
    { en: 'ship / sheep', es: 'barco / oveja', note: 'i corta / i larga.' },
  ],
  errors: [
    { wrong: 'three → «tri»', right: 'three → «zri»', why: 'Sin la th, three se confunde con tree (árbol).' },
    { wrong: 'he → «je» con j fuerte', right: 'he → «ji» suave', why: 'La h inglesa es solo aire; la j española raspa la garganta.' },
    { wrong: 'she → «chi»', right: 'she → «shi»', why: 'sh no lleva el golpe de la t que tiene ch.' },
  ],
  comparison: { title: 'th: dos sonidos, ninguno es t ni d', body: 'En español no existe la th, y tendemos a cambiarla por t o d. En España ayuda pensar en la z de "zapato" para three o thank you. Para the y they, pon la lengua igual pero haciendo vibrar la voz.' },
  simpler: [
    'Para la th, saca un poquito la lengua entre los dientes. Para la h, sopla como si empañaras un cristal. Para sh, pide silencio.',
    'Practica con un espejo. th: tienes que ver la punta de la lengua. h: pon la mano delante de la boca y nota el aire. sh: labios hacia fuera, como para dar un beso.',
  ],
  vocab: ['v-hello', 'v-thank-you', 'v-the', 'v-three'],
  concepts: [
    { id: 'c-snd-three', kind: 'vocab', prompt: 'tres (con th)', answers: ['three'] },
    { id: 'c-snd-thanks', kind: 'expression', prompt: 'gracias', answers: ['thank you', 'thanks'] },
    { id: 'c-snd-hello', kind: 'vocab', prompt: 'hola (con h suave)', answers: ['hello'] },
    { id: 'c-snd-the', kind: 'vocab', prompt: 'el / la / los / las', answers: ['the'] },
  ],
  guided: [
    ls('l6-g1', 'three', ['tree', 'three'], 1, 'Con th: three (tres).', ['sounds']),
    ch('l6-g2', '¿Qué palabra tiene el sonido sh?', 'sh', ['she', 'see', 'he'], 0, 'she = «shi».', ['sounds']),
    ch('l6-g3', 'En "they", la th se hace…', 'they', ['como una t', 'con la lengua entre los dientes y vibrando', 'como una j'], 1, 'th con vibración.', ['sounds']),
    ls('l6-g4', 'sheep', ['ship', 'sheep'], 1, 'i larga: sheep.', ['sounds']),
  ],
  independent: [
    ls('l6-i1', 'ship', ['ship', 'sheep'], 0, 'i corta: ship.', ['sounds']),
    ch('l6-i2', 'La h de "hello" suena…', 'hello', ['como la j de "jamón"', 'como un suspiro suave', 'no suena'], 1, 'Solo aire.', ['sounds']),
    tr('l6-i3', 'gracias', ['thank you', 'thanks'], 'thank you (o thanks, más informal).', ['sounds']),
    ls('l6-i4', 'chair', ['chair', 'share'], 0, 'ch con golpe: chair (silla).', ['sounds']),
    mt('l6-i5', [['th', 'three'], ['sh', 'she'], ['h', 'hello'], ['ch', 'child']], 'Cada sonido con su ejemplo.', ['sounds'], 'Une cada sonido con una palabra que lo tenga'),
  ],
  final: [
    ls('l6-f1', 'three', ['three', 'tree', 'free'], 0, 'three.', ['sounds']),
    ch('l6-f2', '¿Cuál NO tiene th?', '¿th?', ['mother', 'thank you', 'tired'], 2, 'tired empieza por t normal.', ['sounds']),
    ls('l6-f3', 'she', ['see', 'she'], 1, 'sh: she.', ['sounds']),
    tr('l6-f4', 'tres', ['three'], 'three, con th.', ['sounds']),
    ch('l6-f5', 'Para hacer la th de "three"…', 'three', ['la lengua toca el paladar', 'la lengua sale un poco entre los dientes', 'los labios se cierran'], 1, 'Lengua entre los dientes.', ['sounds']),
  ],
};

export const L_NUMBERS: Lesson = {
  id: 'pre-a1-u2-l7', level: 'PRE_A1', unit: 'pre-a1-u2', category: 'vocabulary',
  title: 'Números del 0 al 100', room: 'Coordenadas',
  objectives: ['Contar de 0 a 100', 'Distinguir trece de treinta', 'Decir y preguntar la edad'],
  prerequisites: ['pre-a1-u2-l6'],
  intro: 'Coordenadas, frecuencias, cuántos sois, cuántos años tienes… Por radio todo son números. Hay un truco: a partir del 13 todo sigue un patrón.',
  meaning: 'Los números del 1 al 12 hay que aprenderlos de memoria. Del 13 al 19 terminan en -teen. Las decenas (20, 30…) terminan en -ty. Los compuestos se escriben con guion: twenty-one.',
  when: ['Edad: I\'m twenty-five.', 'Cantidades: three bottles.', 'Teléfonos y códigos: se dicen cifra a cifra; el 0 suele decirse "oh".'],
  how: '13–19: número + teen (thirteen, fourteen…). 20, 30… : número + ty (twenty, thirty…). 21–99: decena + guion + unidad (thirty-two). 100: a hundred. Edad: I\'m + número. Pregunta: How old are you?',
  table: {
    head: ['Número', 'Inglés', 'Ojo'],
    rows: [
      ['0–5', 'zero, one, two, three, four, five', 'one suena «uán»'],
      ['6–10', 'six, seven, eight, nine, ten', 'eight suena «éit»'],
      ['11–12', 'eleven, twelve', 'De memoria'],
      ['13–15', 'thirteen, fourteen, fifteen', 'Ojo: thir-, fif-'],
      ['16–19', 'sixteen, seventeen, eighteen, nineteen', 'Fuerza al final: -TEEN'],
      ['20–50', 'twenty, thirty, forty, fifty', 'forty sin u. Fuerza al principio'],
      ['60–90', 'sixty, seventy, eighty, ninety', ''],
      ['21, 47', 'twenty-one, forty-seven', 'Con guion, sin "and"'],
      ['100', 'a hundred / one hundred', ''],
    ],
  },
  examples: [
    { en: 'How old are you? — I\'m twenty-five.', es: '¿Cuántos años tienes? — Tengo veinticinco.' },
    { en: 'thirteen / thirty', es: 'trece / treinta', note: 'thir-TEEN (fuerza al final) / THIR-ty (fuerza al principio).' },
    { en: 'Three bottles.', es: 'Tres botellas.' },
    { en: 'My number is six, oh, two…', es: 'Mi número es seis, cero, dos…' },
  ],
  errors: [
    { wrong: 'fourty', right: 'forty', why: 'four tiene u, pero forty no.' },
    { wrong: 'twenty and one', right: 'twenty-one', why: 'Los compuestos van con guion, sin "and".' },
    { wrong: 'I have thirty years.', right: 'I\'m thirty.', why: 'La edad se dice con be (sala 2).' },
  ],
  comparison: { title: '-teen o -ty: escucha dónde va la fuerza', body: 'thirteen (13) y thirty (30) se parecen mucho. La pista es la fuerza: en -teen va al final (thir-TEEN), en -ty al principio (THIR-ty). Si dudas, pregunta: "One-three or three-zero?"' },
  simpler: [
    'Del 1 al 12, de memoria. Del 13 al 19: añade -teen. Para 20, 30, 40…: añade -ty. Para 21, 35…: decena + guion + número (twenty-one).',
    'Piensa en dos familias. Los "adolescentes" (-teen) van del 13 al 19, como teenager. Las decenas (-ty) son 20, 30, 40… Y para juntar: twenty + one = twenty-one. Nada más.',
  ],
  vocab: ['v-zero', 'v-one', 'v-two', 'v-four', 'v-five', 'v-ten', 'v-twelve', 'v-thirteen', 'v-fifteen', 'v-twenty', 'v-thirty', 'v-forty', 'v-fifty', 'v-hundred', 'v-old'],
  concepts: [
    { id: 'c-num-15', kind: 'vocab', prompt: 'quince', answers: ['fifteen', '15'] },
    { id: 'c-num-40', kind: 'vocab', prompt: 'cuarenta (en letras)', answers: ['forty'] },
    { id: 'c-num-21', kind: 'vocab', prompt: 'veintiuno (en letras)', answers: ['twenty-one', 'twenty one'] },
    { id: 'c-num-12', kind: 'vocab', prompt: 'doce', answers: ['twelve', '12'] },
    { id: 'c-num-age', kind: 'expression', prompt: '¿Cuántos años tienes?', answers: ['How old are you'] },
    { id: 'c-num-100', kind: 'vocab', prompt: 'cien', answers: ['a hundred', 'one hundred', '100'] },
  ],
  guided: [
    ch('l7-g1', '¿Cómo se escribe 40?', '40', ['fourty', 'forty', 'fourteen'], 1, 'forty, sin u.', ['numbers'], 'Uno de ellos es 14.'),
    ls('l7-g2', 'thirteen', ['13', '30'], 0, 'Fuerza al final: thir-TEEN = 13.', ['numbers']),
    tr('l7-g3', 'doce', ['twelve'], 'twelve.', ['numbers']),
    or('l7-g4', ['are', 'old', 'How', 'you?'], ['How old are you'], '¿Cuántos años tienes?', 'How + old + are + you?', ['be-question-order']),
  ],
  independent: [
    ls('l7-i1', 'fifty', ['15', '50'], 1, 'Fuerza al principio: FIF-ty = 50.', ['numbers']),
    ch('l7-i2', '¿Cómo se dice 21?', '21', ['twenty and one', 'twenty-one', 'one-twenty'], 1, 'Con guion: twenty-one.', ['numbers']),
    tr('l7-i3', 'Tengo treinta años.', ["I'm thirty", 'I am thirty', "I'm 30", 'I am 30'], 'I\'m thirty.', ['be-age']),
    fl('l7-i4', 'Escribe el número en letras', 'I\'m', '.', ['twenty-five', 'twenty five'], 'twenty-five.', ['numbers'], 'Tengo 25 años.'),
    ls('l7-i5', 'eighteen', ['18', '80'], 0, 'eigh-TEEN = 18.', ['numbers']),
  ],
  final: [
    tr('l7-f1', 'quince', ['fifteen'], 'fifteen.', ['numbers']),
    ls('l7-f2', 'forty', ['14', '40'], 1, 'FOR-ty = 40.', ['numbers']),
    fx('l7-f3', 'I have twenty years.', ["I'm twenty", 'I am twenty'], 'La edad va con be.', ['be-age']),
    ch('l7-f4', '¿Cuál es 13?', '13', ['thirty', 'thirteen', 'three-teen'], 1, 'thirteen.', ['numbers']),
    bd('l7-f5', ['How', 'old', 'are', 'you?', 'years', 'have'], ['How old are you'], '¿Cuántos años tienes?', 'How old are you? (years y have sobran).', ['be-question-order']),
  ],
};

export const UNIT2: Unit = {
  id: 'pre-a1-u2', level: 'PRE_A1', title: 'Señales de radio', building: 'La torre de radio',
  lessons: [L_ALPHABET.id, L_PRONUN.id, L_SOUNDS.id, L_NUMBERS.id],
  horde: {
    title: 'Horda del apagón', passPct: 80,
    exercises: [
      ls('h2-1', 'I', ['E', 'I', 'A'], 1, '«ái» es la I.', ['letter-names']),
      ch('h2-2', 'La letra G se dice…', 'G', ['«yi»', '«yéi»', '«ge»'], 0, 'G = «yi».', ['letter-names']),
      tr('h2-3', '¿Cómo se deletrea?', ['How do you spell it'], 'How do you spell it?', ['word-order']),
      ch('h2-4', '¿Cómo se pronuncia "Spanish"?', 'Spanish', ['«espánish»', '«spánish»'], 1, 'Sin e delante.', ['pronunciation']),
      ls('h2-5', 'three', ['tree', 'three'], 1, 'Con th: three.', ['sounds']),
      ch('h2-6', '¿Cómo se escribe 40?', '40', ['forty', 'fourty'], 0, 'forty.', ['numbers']),
      ls('h2-7', 'thirty', ['13', '30'], 1, 'THIR-ty = 30.', ['numbers']),
      tr('h2-8', 'Tengo veintiún años.', ["I'm twenty-one", 'I am twenty-one', "I'm twenty one", 'I am twenty one', "I'm 21", 'I am 21'], 'I\'m twenty-one.', ['be-age']),
      ch('h2-9', 'La h de "he" suena…', 'he', ['como la j española', 'como un suspiro', 'no suena'], 1, 'h suave.', ['sounds']),
      or('h2-10', ['old', 'is', 'How', 'she?'], ['How old is she'], '¿Cuántos años tiene ella?', 'How old is she?', ['be-question-order']),
    ],
  },
};

export const LESSONS_U2 = [L_ALPHABET, L_PRONUN, L_SOUNDS, L_NUMBERS];
