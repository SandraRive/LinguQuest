import type { Exercise } from './schema';
import { ch } from './helpers';
import type { LevelCode } from './curriculum';

/* ───────── Listening: transmisiones de radio ───────── */
export interface Transmission {
  id: string; level: LevelCode; title: string; caller: string; accent: 'en-GB' | 'en-US';
  requires: string; // id de la sala necesaria (nunca se usa lo no aprendido)
  lines: { en: string; es: string }[];
  questions: Exercise[];
}

export const TRANSMISSIONS: Transmission[] = [
  {
    id: 't1', level: 'PRE_A1', title: 'Primer contacto', caller: 'Tom · Radio Base', accent: 'en-GB', requires: 'pre-a1-u1-l3',
    lines: [
      { en: 'Hello. This is Radio Base.', es: 'Hola. Aquí Radio Base.' },
      { en: "I'm Tom. I'm a survivor.", es: 'Soy Tom. Soy superviviente.' },
      { en: "We're in the shelter.", es: 'Estamos en el refugio.' },
      { en: "We're safe, but we're hungry.", es: 'Estamos a salvo, pero tenemos hambre.' },
      { en: 'Are you safe?', es: '¿Estás a salvo?' },
    ],
    questions: [
      ch('t1-q1', '¿Cómo se llama?', '¿Nombre?', ['Tim', 'Tom', 'Tony'], 1, 'I\'m Tom.'),
      ch('t1-q2', '¿Dónde están?', '¿Dónde?', ['En el refugio', 'En casa', 'En la radio'], 0, 'We\'re in the shelter.'),
      ch('t1-q3', '¿Cómo están?', '¿Cómo?', ['Cansados y con frío', 'A salvo pero con hambre', 'Contentos'], 1, 'We\'re safe, but we\'re hungry.'),
    ],
  },
  {
    id: 't2', level: 'PRE_A1', title: 'Deletreo urgente', caller: 'Kate · Estación norte', accent: 'en-GB', requires: 'pre-a1-u2-l7',
    lines: [
      { en: 'Hello, Radio Base. My name is Kate.', es: 'Hola, Radio Base. Me llamo Kate.' },
      { en: 'K, A, T, E. Kate.', es: 'K, A, T, E. Kate.' },
      { en: "I'm thirty-four.", es: 'Tengo treinta y cuatro años.' },
      { en: 'We are fifteen people here.', es: 'Aquí somos quince personas.' },
      { en: 'Fifteen. One, five.', es: 'Quince. Uno, cinco.' },
    ],
    questions: [
      ch('t2-q1', '¿Cómo se deletrea su nombre?', 'Nombre', ['C-A-T-E', 'K-A-T-E', 'K-E-T-I'], 1, 'K, A, T, E.'),
      ch('t2-q2', '¿Cuántos años tiene?', 'Edad', ['24', '34', '43'], 1, "I'm thirty-four."),
      ch('t2-q3', '¿Cuántas personas son?', 'Personas', ['15', '50', '5'], 0, 'Fifteen. One, five.'),
    ],
  },
  {
    id: 't3', level: 'PRE_A1', title: 'Inventario del almacén', caller: 'Luis · Almacén sur', accent: 'en-US', requires: 'pre-a1-u3-l12',
    lines: [
      { en: 'Hi, this is Luis.', es: 'Hola, aquí Luis.' },
      { en: 'The food is in the green boxes.', es: 'La comida está en las cajas verdes.' },
      { en: 'The water is in the blue bottles.', es: 'El agua está en las botellas azules.' },
      { en: "The flashlight isn't here.", es: 'La linterna no está aquí.' },
      { en: 'The keys are in a red bag.', es: 'Las llaves están en una bolsa roja.' },
    ],
    questions: [
      ch('t3-q1', '¿Dónde está la comida?', 'Comida', ['En las cajas verdes', 'En las botellas azules', 'En la bolsa roja'], 0, 'The food is in the green boxes.'),
      ch('t3-q2', '¿Qué objeto NO está?', 'Falta', ['Las llaves', 'La linterna', 'El agua'], 1, "The flashlight isn't here."),
      ch('t3-q3', '¿De qué color es la bolsa de las llaves?', 'Color', ['Azul', 'Verde', 'Roja'], 2, 'a red bag.'),
    ],
  },
  {
    id: 't4', level: 'PRE_A1', title: 'Buscando a la familia', caller: 'Ana · Campamento', accent: 'en-US', requires: 'pre-a1-u4-l16',
    lines: [
      { en: "Good evening. I'm Ana. I'm from Chicago.", es: 'Buenas noches. Soy Ana. Soy de Chicago.' },
      { en: 'My brother is in Madrid. His name is Dani.', es: 'Mi hermano está en Madrid. Se llama Dani.' },
      { en: "He's twenty-two.", es: 'Tiene veintidós años.' },
      { en: 'Is he with you?', es: '¿Está con vosotros?' },
      { en: 'Please answer on Monday or Tuesday.', es: 'Por favor, responded el lunes o el martes.' },
    ],
    questions: [
      ch('t4-q1', '¿De dónde es Ana?', 'Origen', ['Madrid', 'Chicago', 'Londres'], 1, "I'm from Chicago."),
      ch('t4-q2', '¿A quién busca?', 'Busca a…', ['A su hermana', 'A su hermano', 'A su padre'], 1, 'My brother… His name is Dani.'),
      ch('t4-q3', '¿Cuándo hay que responder?', 'Cuándo', ['Lunes o martes', 'Jueves o viernes', 'El fin de semana'], 0, 'on Monday or Tuesday.'),
    ],
  },
  {
    id: 't5', level: 'A1', title: 'Rutina del lago', caller: 'Emma · Campamento del lago', accent: 'en-GB', requires: 'a1-u1-l20',
    lines: [
      { en: 'Good morning, this is Emma from the lake camp.', es: 'Buenos días, aquí Emma, del campamento del lago.' },
      { en: 'We get up at six every day.', es: 'Nos levantamos a las seis todos los días.' },
      { en: 'In the morning, my brother watches the river.', es: 'Por la mañana, mi hermano vigila el río.' },
      { en: "I don't watch the river. I cook breakfast.", es: 'Yo no vigilo el río. Hago el desayuno.' },
      { en: 'We never go to the city at night.', es: 'Nunca vamos a la ciudad de noche.' },
    ],
    questions: [
      ch('t5-q1', '¿A qué hora se levantan?', 'hora', ['A las 6', 'A las 7', 'A las 9'], 0, 'We get up at six.'),
      ch('t5-q2', '¿Quién vigila el río?', 'quién', ['Emma', 'Su hermano', 'Nadie'], 1, 'my brother watches the river.'),
      ch('t5-q3', '¿Qué no hacen nunca?', 'nunca', ['Cocinar', 'Ir a la ciudad de noche', 'Levantarse pronto'], 1, 'We never go to the city at night.'),
    ],
  },
  {
    id: 't6', level: 'A1', title: '¡Que vienen!', caller: 'Jack · Torre del camino', accent: 'en-US', requires: 'a1-u3-l27',
    lines: [
      { en: 'Hello? This is Jack.', es: '¿Hola? Aquí Jack.' },
      { en: "I'm in the tower next to the river.", es: 'Estoy en la torre al lado del río.' },
      { en: 'Look! Five zombies are coming to the camp.', es: '¡Mirad! Cinco zombis vienen hacia el campamento.' },
      { en: "Ana and Tom aren't in the camp. They're swimming in the river.", es: 'Ana y Tom no están en el campamento. Están nadando en el río.' },
      { en: 'Where are you? Can you help us?', es: '¿Dónde estáis? ¿Nos podéis ayudar?' },
    ],
    questions: [
      ch('t6-q1', '¿Dónde está Jack?', 'lugar', ['En la torre', 'En el río', 'En el campamento'], 0, "I'm in the tower."),
      ch('t6-q2', '¿Cuántos zombis vienen?', 'número', ['3', '5', '15'], 1, 'Five zombies.'),
      ch('t6-q3', '¿Qué están haciendo Ana y Tom?', 'ahora', ['Durmiendo', 'Nadando en el río', 'Cocinando'], 1, "They're swimming in the river."),
    ],
  },
];

/* ───────── Reading: diarios encontrados ───────── */
export interface ReadingText {
  id: string; level: LevelCode; title: string; kind: string; requires: string;
  sentences: { en: string; es: string; structure?: string }[];
  questions: Exercise[];
}

export const READINGS: ReadingText[] = [
  {
    id: 'r1', level: 'PRE_A1', title: 'Diario de Sandra, día 1', kind: 'Diario', requires: 'pre-a1-u2-l7',
    sentences: [
      { en: 'My name is Sandra.', es: 'Me llamo Sandra.', structure: 'TO BE' },
      { en: "I'm twenty-five.", es: 'Tengo veinticinco años.', structure: 'Edad con be' },
      { en: "I'm Spanish.", es: 'Soy española.', structure: 'TO BE' },
      { en: "I'm in a shelter.", es: 'Estoy en un refugio.', structure: 'TO BE' },
      { en: "It's cold and I'm tired.", es: 'Hace frío y estoy cansada.', structure: 'It para el tiempo' },
      { en: "But I'm safe.", es: 'Pero estoy a salvo.' },
    ],
    questions: [
      ch('r1-q1', '¿Cuántos años tiene Sandra?', 'Edad', ['15', '25', '35'], 1, "I'm twenty-five."),
      ch('r1-q2', '¿Dónde está?', 'Lugar', ['En casa', 'En un refugio', 'En la radio'], 1, "I'm in a shelter."),
      ch('r1-q3', '¿Qué frase usa "it" para hablar del tiempo?', 'it', ["It's cold.", "I'm tired.", "I'm safe."], 0, "It's cold."),
    ],
  },
  {
    id: 'r2', level: 'PRE_A1', title: 'Nota en la puerta del almacén', kind: 'Nota', requires: 'pre-a1-u3-l12',
    sentences: [
      { en: 'Hello!', es: '¡Hola!' },
      { en: 'We are three survivors: Ana, Tom and Luis.', es: 'Somos tres supervivientes: Ana, Tom y Luis.', structure: 'Plural' },
      { en: 'The food is in the green boxes.', es: 'La comida está en las cajas verdes.', structure: 'Color + sustantivo' },
      { en: 'The water is in the yellow bottles.', es: 'El agua está en las botellas amarillas.', structure: 'Color + sustantivo' },
      { en: 'The torch is on the table.', es: 'La linterna está en la mesa.' },
      { en: 'Are you a survivor? You are safe here.', es: '¿Eres superviviente? Aquí estás a salvo.', structure: 'Pregunta con be' },
    ],
    questions: [
      ch('r2-q1', '¿Cuántos supervivientes hay?', 'Número', ['2', '3', '4'], 1, 'We are three survivors.'),
      ch('r2-q2', '¿De qué color son las botellas de agua?', 'Color', ['Verdes', 'Amarillas', 'Azules'], 1, 'yellow bottles.'),
      ch('r2-q3', 'En "the green boxes", ¿qué palabra está en plural?', 'Plural', ['the', 'green', 'boxes'], 2, 'Solo el sustantivo lleva plural.'),
    ],
  },
  {
    id: 'r3', level: 'PRE_A1', title: 'Ficha de superviviente', kind: 'Formulario', requires: 'pre-a1-u4-l16',
    sentences: [
      { en: 'Name: Kate Wilson.', es: 'Nombre: Kate Wilson.' },
      { en: "I'm from London. I'm English.", es: 'Soy de Londres. Soy inglesa.', structure: 'País / nacionalidad' },
      { en: 'My family: my mother and my two brothers.', es: 'Mi familia: mi madre y mis dos hermanos.', structure: 'Posesivos' },
      { en: 'Their names are Jack and Harry.', es: 'Se llaman Jack y Harry.', structure: 'Posesivos' },
      { en: 'My birthday is in March.', es: 'Mi cumpleaños es en marzo.', structure: 'in + mes' },
      { en: "Today is Friday and we're happy.", es: 'Hoy es viernes y estamos contentos.' },
    ],
    questions: [
      ch('r3-q1', '¿De dónde es Kate?', 'Origen', ['Madrid', 'Londres', 'Chicago'], 1, "I'm from London."),
      ch('r3-q2', '¿Cuántos hermanos tiene?', 'Hermanos', ['1', '2', '3'], 1, 'my two brothers.'),
      ch('r3-q3', '"Their names" se refiere a los nombres de…', 'their', ['su madre', 'sus hermanos', 'Kate'], 1, 'their = de ellos (los hermanos).'),
    ],
  },
  {
    id: 'r4', level: 'A1', title: 'El diario de Tom', kind: 'Diario', requires: 'a1-u1-l20',
    sentences: [
      { en: 'I live in the forest camp with my sister.', es: 'Vivo en el campamento del bosque con mi hermana.', structure: 'Present Simple' },
      { en: 'I get up at six every day.', es: 'Me levanto a las seis todos los días.', structure: 'Rutinas' },
      { en: 'In the morning, I watch the gate.', es: 'Por la mañana vigilo la puerta.', structure: 'in the morning' },
      { en: 'My sister cooks and studies English.', es: 'Mi hermana cocina y estudia inglés.', structure: '-s de he/she' },
      { en: "She doesn't like coffee, but I always drink it.", es: 'A ella no le gusta el café, pero yo siempre lo bebo.', structure: "doesn't / always" },
      { en: 'At night, we usually sleep next to the fire.', es: 'Por la noche normalmente dormimos junto al fuego.', structure: 'Frecuencia' },
    ],
    questions: [
      ch('r4-q1', '¿A qué hora se levanta Tom?', 'hora', ['A las 6', 'A las 7', 'A las 8'], 0, 'I get up at six.'),
      ch('r4-q2', '¿Qué hace su hermana?', 'hermana', ['Vigila la puerta', 'Cocina y estudia inglés', 'Conduce'], 1, 'My sister cooks and studies English.'),
      ch('r4-q3', '¿A quién no le gusta el café?', 'café', ['A Tom', 'A su hermana', 'A los dos'], 1, "She doesn't like coffee."),
    ],
  },
  {
    id: 'r5', level: 'A1', title: 'Cartel de la puerta del pueblo', kind: 'Cartel', requires: 'a1-u3-l28',
    sentences: [
      { en: 'Hello, survivors! This is the safe town.', es: '¡Hola, supervivientes! Esto es el pueblo seguro.' },
      { en: "There's a shop next to the river. Ana works there in the morning.", es: 'Hay una tienda al lado del río. Ana trabaja allí por la mañana.', structure: 'There is' },
      { en: 'There are three tents behind the shop for new survivors.', es: 'Hay tres tiendas detrás de la tienda para supervivientes nuevos.', structure: 'There are + preposición' },
      { en: "Can you cook or drive? Please help us!", es: '¿Sabes cocinar o conducir? ¡Ayúdanos, por favor!', structure: 'Can' },
      { en: 'Right now we are waiting for more survivors.', es: 'Ahora mismo estamos esperando a más supervivientes.', structure: 'Present Continuous' },
      { en: 'Questions? Tom is at the gate.', es: '¿Preguntas? Tom está en la puerta.' },
    ],
    questions: [
      ch('r5-q1', '¿Dónde está la tienda?', 'tienda', ['Detrás de las tiendas de campaña', 'Al lado del río', 'En la puerta'], 1, 'next to the river.'),
      ch('r5-q2', '¿Cuántas tiendas de campaña hay para recién llegados?', 'número', ['2', '3', '4'], 1, 'There are three tents.'),
      ch('r5-q3', '¿Qué están haciendo ahora?', 'ahora', ['Esperando a más supervivientes', 'Cocinando', 'Durmiendo'], 0, 'we are waiting for more survivors.'),
    ],
  },
];

/* ───────── Writing guiado ───────── */
export interface WritingTask {
  id: string; level: LevelCode; title: string; requires: string;
  prompt: string; example: string;
  /** Regex (en texto) que debe cumplir una respuesta correcta. */
  accept: string;
  acceptFlags?: string;
  help: string;
}

export const WRITING_TASKS: WritingTask[] = [
  { id: 'w1', level: 'PRE_A1', title: 'Tu nombre', requires: 'pre-a1-u1-l2', prompt: 'Escribe tu nombre en una frase completa.', example: 'My name is Sandra.', accept: "^(my name is|my name's|i'm|i am) [\\p{L}' -]+$", acceptFlags: 'iu', help: 'Empieza con My name is… o I\'m…' },
  { id: 'w2', level: 'PRE_A1', title: 'Tu edad', requires: 'pre-a1-u2-l7', prompt: 'Escribe cuántos años tienes. Usa letras o cifras.', example: "I'm twenty-five.", accept: "^(i'm|i am) ([0-9]{1,3}|[a-z]+(-[a-z]+)?)( years old)?$", acceptFlags: 'i', help: 'Recuerda: la edad va con be, no con have.' },
  { id: 'w3', level: 'PRE_A1', title: 'De dónde eres', requires: 'pre-a1-u4-l15', prompt: 'Escribe de qué país eres.', example: "I'm from Spain.", accept: "^(I'm|I am) from [A-Z][\\p{L} ]+$", acceptFlags: 'u', help: 'I\'m from + país, con mayúscula.' },
  { id: 'w4', level: 'PRE_A1', title: 'Un objeto de tu mochila', requires: 'pre-a1-u3-l12', prompt: 'Describe un objeto de tu mochila con su color.', example: "It's a red bottle.", accept: "^(it's|it is) (a|an) [a-z]+ [a-z]+$", acceptFlags: 'i', help: 'It\'s a/an + color + objeto.' },
  { id: 'w5', level: 'PRE_A1', title: 'Presenta a un familiar', requires: 'pre-a1-u4-l13', prompt: 'Presenta a un familiar: "This is my…".', example: 'This is my brother.', accept: "^this is my (mother|father|brother|sister|son|daughter|family|friend)$", acceptFlags: 'i', help: 'This is my + familiar.' },
  { id: 'w6', level: 'PRE_A1', title: 'Qué día es hoy', requires: 'pre-a1-u4-l14', prompt: 'Escribe qué día de la semana es hoy.', example: "It's Monday today.", accept: "^(([Ii]t's|[Ii]t is) (Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)( today)?|[Tt]oday is (Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday))$", acceptFlags: '', help: 'It\'s + día (con mayúscula).' },
  { id: 'w7', level: 'A1', title: 'Tu rutina', requires: 'a1-u1-l20', prompt: 'Escribe a qué hora te levantas.', example: 'I get up at seven.', accept: "^I (usually |always |often |sometimes )?get up at [a-z0-9:]+( o'clock)?( in the morning)?$", acceptFlags: '', help: 'I get up at + hora.' },
  { id: 'w8', level: 'A1', title: 'Lo que hace alguien', requires: 'a1-u1-l17', prompt: 'Escribe qué hace un familiar o amigo cada día (usa he o she).', example: 'My sister works in a shop.', accept: "^([Hh]e|[Ss]he|[Mm]y [a-z]+|[A-Z][a-z]+) (works|lives|studies|cooks|watches|goes|gets up|has|eats|drinks|sleeps|plays|walks|reads|likes)\\b.+$", acceptFlags: '', help: 'He/She + verbo con -s: works, studies, goes…' },
  { id: 'w9', level: 'A1', title: 'Lo que hay en tu habitación', requires: 'a1-u2-l23', prompt: 'Escribe una cosa que hay en tu habitación y dónde está.', example: "There's a bag under the bed.", accept: "^(there's|there is|there are) .+ (in|on|under|next to|behind|in front of|between) (the|my) [a-z ]+$", acceptFlags: 'i', help: "There's a… + preposición + the…" },
  { id: 'w10', level: 'A1', title: 'Algo que sabes hacer', requires: 'a1-u3-l25', prompt: 'Escribe algo que sabes hacer y algo que no.', example: "I can swim but I can't drive.", accept: "^I can [a-z]+( [a-z]+)* but I can't [a-z]+( [a-z]+)*$", acceptFlags: '', help: "I can… but I can't…" },
];

/* ───────── Speaking ───────── */
export interface SpeakingSituation {
  id: string; level: LevelCode; title: string; requires: string;
  turns: { say: string; es: string; expect: string; model: string; tip: string }[];
}

export const SPEAKING: SpeakingSituation[] = [
  {
    id: 's1', level: 'PRE_A1', title: 'Presentarte por radio', requires: 'pre-a1-u4-l15',
    turns: [
      { say: "Hello! What's your name?", es: '¡Hola! ¿Cómo te llamas?', expect: "\\b(my name is|my name's|i'm|i am)\\b", model: 'My name is Sandra.', tip: 'Empieza con "My name is…".' },
      { say: 'Nice to meet you. Where are you from?', es: 'Encantado. ¿De dónde eres?', expect: "\\b(i'm|i am) from\\b", model: "I'm from Spain.", tip: 'I\'m from + país.' },
      { say: 'How old are you?', es: '¿Cuántos años tienes?', expect: "\\b(i'm|i am)\\b", model: "I'm twenty-five.", tip: 'I\'m + número. Sin "have".' },
      { say: 'Are you safe?', es: '¿Estás a salvo?', expect: '\\b(yes|no)\\b', model: 'Yes, I am.', tip: 'Yes, I am. / No, I\'m not.' },
    ],
  },
  {
    id: 's2', level: 'PRE_A1', title: 'Pedir un objeto', requires: 'pre-a1-u4-l16',
    turns: [
      { say: 'Hi! What colour is your bag?', es: '¡Hola! ¿De qué color es tu mochila?', expect: "\\b(it's|it is)\\b", model: "It's blue.", tip: 'It\'s + color.' },
      { say: 'Where is the torch?', es: '¿Dónde está la linterna?', expect: "\\b(it's|it is|in the|here)\\b", model: "It's in the bag.", tip: 'It\'s here / It\'s in the bag.' },
      { say: 'Are the keys in the box?', es: '¿Están las llaves en la caja?', expect: '\\b(yes|no)\\b', model: "No, they aren't.", tip: 'Yes, they are. / No, they aren\'t.' },
    ],
  },
  {
    id: 's3', level: 'A1', title: 'Tu día en el campamento', requires: 'a1-u1-l20',
    turns: [
      { say: 'What time do you get up?', es: '¿A qué hora te levantas?', expect: '\\bget up\\b|\\bat\\b', model: 'I get up at seven.', tip: 'I get up at + hora.' },
      { say: 'Do you like coffee?', es: '¿Te gusta el café?', expect: '\\b(yes|no)\\b', model: "Yes, I do. / No, I don't.", tip: "Respuesta corta: Yes, I do. / No, I don't." },
      { say: 'What do you usually do in the morning?', es: '¿Qué haces normalmente por la mañana?', expect: '\\bi\\b', model: 'I usually study English.', tip: 'I usually + verbo.' },
    ],
  },
  {
    id: 's4', level: 'A1', title: 'En el mercado del pueblo', requires: 'a1-u3-l28',
    turns: [
      { say: 'Hello! Can I help you?', es: '¡Hola! ¿Le puedo ayudar?', expect: '\\bcan i have\\b|\\bplease\\b', model: 'Can I have a bottle of water, please?', tip: 'Can I have…, please?' },
      { say: 'Here you are.', es: 'Aquí tiene.', expect: '\\bhow much\\b|\\bthank', model: 'Thank you. How much is it?', tip: 'How much is it?' },
      { say: "It's two euros. Anything else?", es: 'Son dos euros. ¿Algo más?', expect: '\\b(no|yes|thank)', model: 'No, thank you.', tip: 'No, thank you. / Yes, please.' },
      { say: 'Where are you going now?', es: '¿Adónde vas ahora?', expect: "\\b(i'm|i am) going\\b|\\bto the\\b", model: "I'm going to the river.", tip: "I'm going to + lugar (Present Continuous)." },
    ],
  },
];

export const REPEAT_PHRASES = [
  { en: "Hello. I'm a survivor.", es: 'Hola. Soy superviviente.', requires: 'pre-a1-u3-l9' },
  { en: 'Thank you. Nice to meet you.', es: 'Gracias. Encantada de conocerte.', requires: 'pre-a1-u4-l15' },
  { en: 'They are three survivors.', es: 'Son tres supervivientes.', requires: 'pre-a1-u2-l6' },
  { en: "She's Spanish. She's from Spain.", es: 'Es española. Es de España.', requires: 'pre-a1-u4-l15' },
  { en: 'Where is the red bag?', es: '¿Dónde está la mochila roja?', requires: 'pre-a1-u4-l16' },
  { en: 'I get up at seven and I have breakfast at eight.', es: 'Me levanto a las siete y desayuno a las ocho.', requires: 'a1-u1-l20' },
  { en: "There's a river next to the camp.", es: 'Hay un río al lado del campamento.', requires: 'a1-u2-l23' },
  { en: 'Can you help me, please?', es: '¿Me puedes ayudar, por favor?', requires: 'a1-u3-l25' },
  { en: 'Excuse me, how much is it?', es: 'Perdone, ¿cuánto es?', requires: 'a1-u3-l28' },
];
