import type { Lesson, Unit } from '../schema';
import { bd, ch, fl, fx, ls, mt, or, sp, tr } from '../helpers';

/* PRE-A1 · Unidad 4 · "Supervivientes": familia y posesivos, días y meses, saludos y frases sencillas. */

export const L_FAMILY: Lesson = {
  id: 'pre-a1-u4-l13', level: 'PRE_A1', unit: 'pre-a1-u4', category: 'vocabulary',
  title: 'La familia y los posesivos', room: 'Reencuentros',
  objectives: ['Nombrar a la familia', 'Usar my, your, his, her, our, their', 'Elegir his o her según de quién es'],
  prerequisites: ['pre-a1-u3-l12'],
  intro: 'Llegan supervivientes buscando a su familia: "This is my brother", "Ana and her son". Para presentar a alguien necesitas las palabras de la familia y los posesivos (mi, tu, su…).',
  meaning: 'Los posesivos dicen de quién es algo: my (mi), your (tu, vuestro), his (su, de él), her (su, de ella), its (su, de una cosa), our (nuestro), their (su, de ellos). This is… = Este/esta es…',
  when: ['Para presentar a alguien: This is my sister.', 'Para hablar de la familia de otra persona: Tom and his father.'],
  how: 'Posesivo + sustantivo: my mother, their parents. El posesivo no cambia en plural: my brothers. His o her depende de quién es el dueño, no de la cosa: Ana and her brother (el hermano de Ana) · Tom and his sister (la hermana de Tom).',
  table: {
    head: ['Pronombre', 'Posesivo', 'Ejemplo'],
    rows: [
      ['I', 'my', 'my mother'], ['you', 'your', 'your father'], ['he', 'his', 'his sister'],
      ['she', 'her', 'her brother'], ['it', 'its', 'its door'], ['we', 'our', 'our family'], ['they', 'their', 'their parents'],
    ],
  },
  examples: [
    { en: 'This is my brother.', es: 'Este es mi hermano.' },
    { en: 'Ana and her son.', es: 'Ana y su hijo.', note: 'her porque el hijo es de Ana.' },
    { en: 'Tom and his daughter.', es: 'Tom y su hija.', note: 'his porque la hija es de Tom.' },
    { en: 'Our family is safe.', es: 'Nuestra familia está a salvo.' },
    { en: 'Their parents are here.', es: 'Sus padres están aquí.' },
    { en: 'My mother is Spanish.', es: 'Mi madre es española.' },
  ],
  errors: [
    { wrong: 'Ana and his brother', right: 'Ana and her brother', why: 'El dueño es Ana (mujer): her. No importa que el hermano sea chico.' },
    { wrong: 'my brothers → mys brothers', right: 'my brothers', why: 'Los posesivos no cambian en plural.' },
    { wrong: 'parents = parientes', right: 'parents = padres', why: 'Falso amigo: parents son el padre y la madre.' },
  ],
  comparison: { title: '"Su" en español: cuatro opciones en inglés', body: 'En español "su" sirve para todo. En inglés hay que elegir: his (de él), her (de ella), its (de una cosa) o their (de ellos). Pregúntate siempre: ¿de quién es?' },
  simpler: [
    'Cada pronombre tiene su posesivo: I → my, you → your, he → his, she → her, we → our, they → their. Para his o her, mira al dueño: si es un chico, his; si es una chica, her.',
    'Señala con el dedo al dueño, no a la cosa. "Ana and ___ brother": el dedo apunta a Ana, que es una mujer → her. "Tom and ___ sister": el dedo apunta a Tom → his.',
  ],
  vocab: ['v-mother', 'v-father', 'v-brother', 'v-sister', 'v-parents', 'v-son', 'v-daughter', 'v-family', 'v-my', 'v-your', 'v-his', 'v-her', 'v-our', 'v-their'],
  concepts: [
    { id: 'c-fam-mother', kind: 'vocab', prompt: 'madre', answers: ['mother'] },
    { id: 'c-fam-brother', kind: 'vocab', prompt: 'hermano', answers: ['brother'] },
    { id: 'c-fam-sister', kind: 'vocab', prompt: 'hermana', answers: ['sister'] },
    { id: 'c-fam-parents', kind: 'vocab', prompt: 'padres (padre y madre)', answers: ['parents'] },
    { id: 'c-fam-her', kind: 'expression', prompt: 'su hermano (de ella)', answers: ['her brother'] },
    { id: 'c-fam-his', kind: 'expression', prompt: 'su madre (de él)', answers: ['his mother'] },
    { id: 'c-fam-our', kind: 'expression', prompt: 'nuestra familia', answers: ['our family'] },
  ],
  guided: [
    ch('l13-g1', 'Completa (la hermana es de Tom)', 'Tom and ___ sister.', ['his', 'her'], 0, 'El dueño es Tom: his.', ['possessive'], '¿De quién es la hermana?'),
    ch('l13-g2', 'Completa (el hermano es de Ana)', 'Ana and ___ brother.', ['his', 'her'], 1, 'El dueño es Ana: her.', ['possessive']),
    mt('l13-g3', [['mother', 'madre'], ['father', 'padre'], ['sister', 'hermana'], ['parents', 'padres']], 'mother, father, sister, parents.'),
    or('l13-g4', ['is', 'This', 'brother.', 'my'], ['This is my brother'], 'Este es mi hermano.', 'This is my brother.'),
  ],
  independent: [
    tr('l13-i1', 'Mi madre está aquí.', ['My mother is here', "My mother's here"], 'My mother is here.'),
    fl('l13-i2', 'Escribe el posesivo (de ellos)', 'They are', 'parents.', ['their'], 'their = su, de ellos.', ['possessive'], 'Son sus padres.'),
    fx('l13-i3', 'This is Ana and his son.', ['This is Ana and her son'], 'El hijo es de Ana: her.', ['possessive']),
    ch('l13-i4', '"Parents" significa…', 'parents', ['parientes', 'padres (padre y madre)', 'hermanos'], 1, 'Falso amigo: parents = padres.'),
    ls('l13-i5', 'daughter', ['daughter', 'doctor', 'water'], 0, 'daughter = hija (la gh no suena).', ['sounds']),
  ],
  final: [
    ch('l13-f1', 'Completa (la madre es de Luis)', 'Luis and ___ mother.', ['his', 'her', 'their'], 0, 'his.', ['possessive']),
    tr('l13-f2', 'nuestra familia', ['our family'], 'our family.', ['possessive']),
    tr('l13-f3', 'Esta es mi hermana.', ['This is my sister'], 'This is my sister.'),
    fx('l13-f4', 'Kate and his father are here.', ['Kate and her father are here'], 'El padre es de Kate: her.', ['possessive']),
    tr('l13-f5', 'Sus padres (de ellos) están a salvo.', ['Their parents are safe'], 'Their parents are safe.', ['possessive']),
  ],
};

export const L_DAYS: Lesson = {
  id: 'pre-a1-u4-l14', level: 'PRE_A1', unit: 'pre-a1-u4', category: 'vocabulary',
  title: 'Días y meses', room: 'El calendario del búnker',
  objectives: ['Decir los días de la semana y los meses', 'Escribirlos con mayúscula', 'Usar on con días e in con meses'],
  prerequisites: ['pre-a1-u4-l13'],
  intro: 'En la pared del búnker hay un calendario: las patrullas salen el lunes, el suministro llega en mayo. Días y meses en inglés siempre van con mayúscula y con una preposición distinta.',
  meaning: 'Los días (Monday, Tuesday…) y los meses (January, February…) son nombres propios en inglés. Con días se usa on (el lunes = on Monday). Con meses se usa in (en mayo = in May).',
  when: ['Para decir qué día es: It\'s Monday today.', 'Para planes y fechas: on Friday, in August.'],
  how: 'Siempre mayúscula: Monday, May. Días: on + día (on Monday). Meses: in + mes (in May). ¿Qué día es hoy? It\'s + día (today). Fin de semana: weekend.',
  table: {
    head: ['Inglés', 'Español', 'Ojo'],
    rows: [
      ['Monday', 'lunes', 'MÁN-dei'], ['Tuesday', 'martes', 'TIÚS-dei / TÚS-dei'], ['Wednesday', 'miércoles', 'UÉNS-dei: la d no suena'],
      ['Thursday', 'jueves', 'th: ZÉRS-dei'], ['Friday', 'viernes', ''], ['Saturday', 'sábado', ''], ['Sunday', 'domingo', ''],
      ['January – June', 'enero – junio', 'January, February, March, April, May, June'],
      ['July – December', 'julio – diciembre', 'July, August, September, October, November, December'],
    ],
  },
  examples: [
    { en: 'It\'s Monday today.', es: 'Hoy es lunes.' },
    { en: 'on Friday', es: 'el viernes', note: 'Días con on.' },
    { en: 'in August', es: 'en agosto', note: 'Meses con in.' },
    { en: 'My birthday is in May.', es: 'Mi cumpleaños es en mayo.' },
    { en: 'Tuesday or Thursday?', es: '¿Martes o jueves?', note: 'Se confunden mucho: Tues- / Thurs-.' },
  ],
  errors: [
    { wrong: 'monday', right: 'Monday', why: 'Días y meses siempre con mayúscula.' },
    { wrong: 'in Monday', right: 'on Monday', why: 'Con días se usa on.' },
    { wrong: 'on May', right: 'in May', why: 'Con meses se usa in.' },
  ],
  comparison: { title: 'Tuesday y Thursday', body: 'Martes (Tuesday) empieza por t normal: TIÚS-dei. Jueves (Thursday) empieza por th: ZÉRS-dei. Escúchalos varias veces seguidos para notar la diferencia.' },
  simpler: [
    'Días y meses siempre con mayúscula. Para el día di on (on Monday). Para el mes di in (in May).',
    'Piensa que un día es un punto pequeño en el calendario: te pones "encima" de él, on. Un mes es una caja grande: estás "dentro", in.',
  ],
  vocab: ['v-monday', 'v-tuesday', 'v-wednesday', 'v-thursday', 'v-friday', 'v-saturday', 'v-sunday', 'v-january', 'v-february', 'v-march', 'v-april', 'v-may', 'v-june', 'v-july', 'v-august', 'v-september', 'v-october', 'v-november', 'v-december', 'v-today', 'v-weekend'],
  concepts: [
    { id: 'c-day-mon', kind: 'vocab', prompt: 'lunes', answers: ['Monday'] },
    { id: 'c-day-wed', kind: 'vocab', prompt: 'miércoles', answers: ['Wednesday'] },
    { id: 'c-day-thu', kind: 'vocab', prompt: 'jueves', answers: ['Thursday'] },
    { id: 'c-month-aug', kind: 'vocab', prompt: 'agosto', answers: ['August'] },
    { id: 'c-day-on', kind: 'expression', prompt: 'el lunes (preposición + día)', answers: ['on Monday'] },
    { id: 'c-month-in', kind: 'expression', prompt: 'en mayo', answers: ['in May'] },
  ],
  guided: [
    ch('l14-g1', 'Completa', '___ Friday', ['in', 'on'], 1, 'Días con on.', ['preposition-time'], '¿Es un día o un mes?'),
    ch('l14-g2', 'Completa', '___ July', ['in', 'on'], 0, 'Meses con in.', ['preposition-time']),
    ls('l14-g3', 'Thursday', ['Tuesday', 'Thursday'], 1, 'Con th: Thursday (jueves).', ['sounds']),
    ch('l14-g4', '¿Cuál está bien escrito?', 'lunes', ['monday', 'Monday'], 1, 'Mayúscula siempre.', ['capitals']),
  ],
  independent: [
    tr('l14-i1', 'Hoy es martes.', ["It's Tuesday today", 'It is Tuesday today', "It's Tuesday", 'It is Tuesday', 'Today is Tuesday'], "It's Tuesday today.", ['missing-subject']),
    mt('l14-i2', [['Monday', 'lunes'], ['Wednesday', 'miércoles'], ['Friday', 'viernes'], ['Sunday', 'domingo']], 'Monday, Wednesday, Friday, Sunday.'),
    fx('l14-i3', 'in Monday', ['on Monday'], 'Días con on.', ['preposition-time']),
    or('l14-i4', ['is', 'It', 'Wednesday.'], ['It is Wednesday'], 'Es miércoles.', 'It is Wednesday.'),
    ls('l14-i5', 'August', ['April', 'August'], 1, 'August = agosto.'),
  ],
  final: [
    tr('l14-f1', 'jueves', ['Thursday'], 'Thursday.'),
    fx('l14-f2', 'on December', ['in December'], 'Meses con in.', ['preposition-time']),
    ch('l14-f3', 'Completa', 'Mi cumpleaños es en marzo: My birthday is ___ March.', ['on', 'in', 'at'], 1, 'in March.', ['preposition-time']),
    tr('l14-f4', 'el sábado', ['on Saturday'], 'on Saturday.', ['preposition-time']),
    ch('l14-f5', '¿Cuál está bien escrito?', 'Fecha', ['in may', 'in May', 'on May'], 1, 'in May, con mayúscula.', ['capitals']),
  ],
};

export const L_GREETINGS: Lesson = {
  id: 'pre-a1-u4-l15', level: 'PRE_A1', unit: 'pre-a1-u4', category: 'communication',
  title: 'Saludos y presentaciones', room: 'Primer encuentro',
  objectives: ['Saludar y despedirte según la hora', 'Presentarte y preguntar el nombre', 'Decir de dónde eres'],
  prerequisites: ['pre-a1-u4-l14'],
  intro: 'Por fin te encuentras cara a cara con otro grupo de supervivientes. Las primeras palabras importan: saludar, decir tu nombre y de dónde eres.',
  meaning: 'Son expresiones fijas que se aprenden enteras, como bloques. No hace falta analizarlas palabra por palabra.',
  when: [
    'Hello / Hi: a cualquier hora (Hi es más informal).',
    'Good morning (mañana), Good afternoon (tarde), Good evening (al llegar por la noche).',
    'Good night: SOLO para despedirte por la noche o al irte a dormir.',
    'Goodbye / Bye: para despedirte.',
  ],
  how: 'Nombre: What\'s your name? — My name is Sandra. / I\'m Sandra. Al conocer a alguien: Nice to meet you. — Nice to meet you too. Estado: How are you? — I\'m fine, thanks. And you? Origen: Where are you from? — I\'m from Spain.',
  examples: [
    { en: "Hello! What's your name?", es: '¡Hola! ¿Cómo te llamas?' },
    { en: "My name's Sandra. Nice to meet you.", es: 'Me llamo Sandra. Encantada de conocerte.' },
    { en: 'Nice to meet you too.', es: 'Encantado de conocerte también.' },
    { en: "How are you? — I'm fine, thanks. And you?", es: '¿Qué tal? — Bien, gracias. ¿Y tú?' },
    { en: "Where are you from? — I'm from Spain.", es: '¿De dónde eres? — Soy de España.' },
    { en: 'Good night. See you tomorrow.', es: 'Buenas noches. Hasta mañana.' },
  ],
  errors: [
    { wrong: 'Good night! (al llegar a las 21:00)', right: 'Good evening!', why: 'Good night solo se usa para despedirse.' },
    { wrong: "I'm from Spanish.", right: "I'm from Spain.", why: 'Después de from va el país (Spain). Spanish es la nacionalidad: I\'m Spanish.' },
    { wrong: "My name's is Sandra.", right: "My name's Sandra. / My name is Sandra.", why: "name's ya incluye is." },
  ],
  comparison: { title: 'Good evening vs Good night', body: 'En español "buenas noches" vale para llegar y para irse. En inglés no: Good evening al llegar, Good night al irte.' },
  simpler: [
    'Cuatro bloques y ya te puedes presentar: Hello. / My name is… / I\'m from… / Nice to meet you.',
    'Imagina la escena por radio. Te dicen: "Hello! What\'s your name?" Tú: "Hi! I\'m Sandra." Ellos: "Nice to meet you, Sandra. Where are you from?" Tú: "I\'m from Spain." Repítela en voz alta hasta que salga sola.',
  ],
  vocab: ['v-hi', 'v-goodbye', 'v-good-morning', 'v-good-afternoon', 'v-good-evening', 'v-good-night', 'v-please', 'v-sorry', 'v-nice-meet', 'v-fine', 'v-from', 'v-spain', 'v-your'],
  concepts: [
    { id: 'c-greet-nice', kind: 'expression', prompt: 'Encantada de conocerte.', answers: ['Nice to meet you'] },
    { id: 'c-greet-name', kind: 'expression', prompt: '¿Cómo te llamas?', answers: ["What's your name", 'What is your name'] },
    { id: 'c-greet-from', kind: 'expression', prompt: 'Soy de España.', answers: ["I'm from Spain", 'I am from Spain'] },
    { id: 'c-greet-where', kind: 'expression', prompt: '¿De dónde eres?', answers: ['Where are you from'] },
    { id: 'c-greet-evening', kind: 'expression', prompt: 'Buenas noches (al llegar)', answers: ['Good evening'] },
    { id: 'c-greet-fine', kind: 'expression', prompt: 'Bien, gracias.', answers: ["I'm fine thanks", "I'm fine thank you", 'I am fine thank you', 'I am fine thanks', 'Fine thanks', 'Fine thank you'] },
  ],
  guided: [
    ch('l15-g1', 'Llegas al campamento a las 21:00. ¿Qué dices?', '21:00, al llegar', ['Good night!', 'Good evening!'], 1, 'Good night es solo para despedirse.', ['greetings']),
    ch('l15-g2', 'Te dicen "Nice to meet you." Respondes:', 'Nice to meet you.', ['Nice to meet you too.', 'Good night.', "I'm from Spain."], 0, 'Nice to meet you too.', ['greetings']),
    or('l15-g3', ['are', 'Where', 'from?', 'you'], ['Where are you from'], '¿De dónde eres?', 'Where are you from?', ['be-question-order']),
    ls('l15-g4', 'How are you?', ['¿Cómo estás?', '¿Cómo te llamas?', '¿De dónde eres?'], 0, 'How are you? = ¿Qué tal? / ¿Cómo estás?', ['greetings'], 'Escucha y elige qué significa'),
  ],
  independent: [
    tr('l15-i1', 'Me llamo Sandra.', ['My name is Sandra', "My name's Sandra", "I'm Sandra", 'I am Sandra'], 'My name is Sandra.', ['missing-subject']),
    fx('l15-i2', "I'm from Spanish.", ["I'm from Spain", 'I am from Spain'], 'from + país: Spain.', ['country-nationality']),
    tr('l15-i3', '¿Cómo te llamas?', ["What's your name", 'What is your name'], "What's your name?", ['be-question-order']),
    ch('l15-i4', 'Te vas a dormir. Dices:', 'Al irte a dormir', ['Good evening.', 'Good night.', 'Good morning.'], 1, 'Good night para despedirse.', ['greetings']),
    bd('l15-i5', ["I'm", 'fine,', 'thanks.', 'have', 'good'], ["I'm fine thanks"], 'Bien, gracias.', "I'm fine, thanks.", ['greetings']),
  ],
  final: [
    tr('l15-f1', 'Encantado de conocerte.', ['Nice to meet you'], 'Nice to meet you.', ['greetings']),
    tr('l15-f2', '¿De dónde eres?', ['Where are you from'], 'Where are you from?', ['be-question-order']),
    ch('l15-f3', 'Son las 10:00. Saludas:', '10:00', ['Good afternoon.', 'Good morning.', 'Good night.'], 1, 'Por la mañana: Good morning.', ['greetings']),
    fx('l15-f4', "My name's is Tom.", ["My name's Tom", 'My name is Tom'], "name's ya incluye is.", ['be-agreement']),
    tr('l15-f5', 'Soy de España.', ["I'm from Spain", 'I am from Spain'], "I'm from Spain.", ['country-nationality']),
  ],
};

export const L_SENTENCES: Lesson = {
  id: 'pre-a1-u4-l16', level: 'PRE_A1', unit: 'pre-a1-u4', category: 'grammar',
  title: 'Frases sencillas', room: 'El informe de la patrulla',
  objectives: ['Unir todo lo aprendido en frases completas', 'Usar and y but', 'Preguntar con where y what'],
  prerequisites: ['pre-a1-u4-l15'],
  intro: 'Al volver de patrulla hay que dar un informe por radio: quién eres, dónde está cada cosa, cómo estáis. Es el momento de juntar todas las piezas.',
  meaning: 'Una frase sencilla en inglés sigue casi siempre el orden: sujeto + verbo + resto. Con and (y) y but (pero) puedes unir dos frases. Con where (dónde) y what (qué) puedes preguntar.',
  when: ['Para informar: The map is in the red bag.', 'Para unir ideas: I\'m cold but I\'m safe.', 'Para preguntar por cosas y lugares: Where is the key?'],
  how: 'Afirmación: Sujeto + be + (a/an) + adjetivo + sustantivo → It\'s a blue bag. Pregunta con where/what: Where / What + be + sujeto? → Where is the map? What colour is it? Unir: frase + and / but + frase.',
  table: {
    head: ['Tipo', 'Estructura', 'Ejemplo'],
    rows: [
      ['Afirmativa', 'Sujeto + be + resto', 'The key is here.'],
      ['Descripción', 'It\'s + a/an + color + cosa', 'It\'s a red bag.'],
      ['Negativa', 'Sujeto + be + not + resto', 'The map isn\'t here.'],
      ['Pregunta sí/no', 'Be + sujeto + resto?', 'Is the door green?'],
      ['Pregunta where/what', 'Where/What + be + sujeto?', 'Where is the torch?'],
      ['Unir', 'Frase + and/but + frase', 'I\'m tired but I\'m happy.'],
    ],
  },
  examples: [
    { en: "Where is the key? — It's here.", es: '¿Dónde está la llave? — Está aquí.' },
    { en: "I'm cold but I'm safe.", es: 'Tengo frío pero estoy a salvo.' },
    { en: 'Ana and Tom are in the shelter.', es: 'Ana y Tom están en el refugio.' },
    { en: "What colour is your bag? — It's red.", es: '¿De qué color es tu mochila? — Es roja.' },
    { en: "The water isn't cold.", es: 'El agua no está fría.' },
  ],
  errors: [
    { wrong: 'Where the key is?', right: 'Where is the key?', why: 'En la pregunta, be va antes del sujeto.' },
    { wrong: 'Is a red bag.', right: "It's a red bag.", why: 'Falta el sujeto it.' },
    { wrong: 'The key where is?', right: 'Where is the key?', why: 'La palabra de pregunta va al principio.' },
  ],
  comparison: { title: '¿Dónde está? vs Where is it?', body: 'En español "¿Dónde está?" no necesita sujeto. En inglés sí: Where is it? Si hablas de algo concreto: Where is the map?' },
  simpler: [
    'Casi todas las frases son: quién + be + lo demás. Para preguntar, be se pone antes de quién. Y si quieres preguntar dónde o qué, pones where o what al principio de todo.',
    'Piensa en un tren de tres vagones: [The map] [is] [here]. Pregunta sí/no: [Is] [the map] [here]? Pregunta con dónde: [Where] [is] [the map]? Y para unir dos trenes: and o but en medio.',
  ],
  vocab: ['v-and', 'v-but', 'v-where', 'v-what'],
  concepts: [
    { id: 'c-sen-and', kind: 'vocab', prompt: 'y', answers: ['and'] },
    { id: 'c-sen-but', kind: 'vocab', prompt: 'pero', answers: ['but'] },
    { id: 'c-sen-where', kind: 'expression', prompt: '¿Dónde está la llave?', answers: ['Where is the key', "Where's the key"] },
    { id: 'c-sen-desc', kind: 'expression', prompt: 'Es una mochila azul.', answers: ["It's a blue bag", 'It is a blue bag'] },
    { id: 'c-sen-but2', kind: 'expression', prompt: 'Tengo frío pero estoy a salvo.', answers: ["I'm cold but I'm safe", 'I am cold but I am safe', "I'm cold but safe", 'I am cold but safe'] },
  ],
  guided: [
    or('l16-g1', ['the', 'Where', 'key?', 'is'], ['Where is the key'], '¿Dónde está la llave?', 'Where + is + the key?', ['be-question-order'], 'La palabra de pregunta va primero.'),
    ch('l16-g2', 'Completa', "I'm tired ___ I'm safe.", ['and', 'but'], 1, 'Contraste: but.'),
    fx('l16-g3', 'Is a red bag.', ["It's a red bag", 'It is a red bag'], 'Falta el sujeto it.', ['missing-subject']),
    ch('l16-g4', 'Completa', 'Ana ___ Tom are here.', ['and', 'but'], 0, 'Suma: and.'),
  ],
  independent: [
    tr('l16-i1', 'Es una mochila azul.', ["It's a blue bag", 'It is a blue bag'], "It's a blue bag.", ['adjective-order']),
    fx('l16-i2', 'Where the map is?', ['Where is the map', "Where's the map"], 'be antes del sujeto.', ['be-question-order']),
    bd('l16-i3', ['The', 'water', "isn't", 'cold.', 'not', 'is'], ["The water isn't cold"], 'El agua no está fría.', "The water isn't cold.", ['be-negative-order']),
    tr('l16-i4', 'Tengo frío pero estoy a salvo.', ["I'm cold but I'm safe", 'I am cold but I am safe', "I'm cold but safe", 'I am cold but safe'], "I'm cold but I'm safe.", ['be-age']),
    sp('l16-i5', 'Toca la palabra incorrecta', ['The', 'key', 'where', 'is?'], 2, 'where va al principio: Where is the key?', ['be-question-order']),
  ],
  final: [
    tr('l16-f1', '¿Dónde está la llave?', ['Where is the key', "Where's the key"], 'Where is the key?', ['be-question-order']),
    tr('l16-f2', 'Ana y Tom están en el refugio.', ['Ana and Tom are in the shelter'], 'Ana and Tom are in the shelter.', ['be-agreement']),
    fx('l16-f3', 'Is a green door.', ["It's a green door", 'It is a green door'], 'Falta it.', ['missing-subject']),
    or('l16-f4', ['colour', 'What', 'it?', 'is'], ['What colour is it'], '¿De qué color es?', 'What colour is it?', ['be-question-order']),
    tr('l16-f5', 'Estoy cansada pero estoy contenta.', ["I'm tired but I'm happy", 'I am tired but I am happy', "I'm tired but happy", 'I am tired but happy'], "I'm tired but I'm happy."),
  ],
};

export const UNIT4: Unit = {
  id: 'pre-a1-u4', level: 'PRE_A1', title: 'Supervivientes', building: 'El campamento',
  lessons: [L_FAMILY.id, L_DAYS.id, L_GREETINGS.id, L_SENTENCES.id],
  horde: {
    title: 'Horda del campamento', passPct: 80,
    exercises: [
      ch('h4-1', 'Completa (el hermano es de Ana)', 'Ana and ___ brother.', ['his', 'her'], 1, 'her.', ['possessive']),
      tr('h4-2', 'nuestra familia', ['our family'], 'our family.', ['possessive']),
      ch('h4-3', 'Completa', '___ Monday', ['in', 'on'], 1, 'on Monday.', ['preposition-time']),
      fx('h4-4', 'on June', ['in June'], 'Meses con in.', ['preposition-time']),
      ch('h4-5', 'Llegas a las 22:00. Saludas:', '22:00', ['Good night!', 'Good evening!'], 1, 'Good evening.', ['greetings']),
      tr('h4-6', 'Soy de España.', ["I'm from Spain", 'I am from Spain'], "I'm from Spain.", ['country-nationality']),
      tr('h4-7', '¿Cómo te llamas?', ["What's your name", 'What is your name'], "What's your name?", ['be-question-order']),
      fx('h4-8', 'Where the torch is?', ['Where is the torch', "Where's the torch"], 'Where is the torch?', ['be-question-order']),
      ls('h4-9', 'Wednesday', ['Wednesday', 'Thursday', 'Tuesday'], 0, 'Wednesday = miércoles.'),
      tr('h4-10', 'Tengo frío pero estoy a salvo.', ["I'm cold but I'm safe", 'I am cold but I am safe', "I'm cold but safe", 'I am cold but safe'], "I'm cold but I'm safe."),
    ],
  },
};

export const LESSONS_U4 = [L_FAMILY, L_DAYS, L_GREETINGS, L_SENTENCES];
