import type { VocabItem } from './schema';
import { VOCAB2 } from './vocab2';

/**
 * Vocabulario PRE-A1 enseñado en la Unidad 1.
 * IPA: británico (UK) y americano (US) cuando difieren.
 * La pronunciación orientativa es solo una ayuda: el audio es la referencia.
 */
const VOCAB1: VocabItem[] = [
  { id: 'v-i', en: 'I', es: 'yo', ipa: '/aɪ/', hint: 'ái', pos: 'pronombre', topic: 'Pronombres', example: "I'm Sandra.", exampleEs: 'Soy Sandra.' },
  { id: 'v-you', en: 'you', es: 'tú, usted, vosotros, ustedes', ipa: '/juː/', hint: 'iú', pos: 'pronombre', topic: 'Pronombres', example: 'You are safe.', exampleEs: 'Estás a salvo. / Estáis a salvo.' },
  { id: 'v-he', en: 'he', es: 'él', ipa: '/hiː/', hint: 'ji (h suave, como un suspiro)', pos: 'pronombre', topic: 'Pronombres', example: 'He is Spanish.', exampleEs: 'Él es español.' },
  { id: 'v-she', en: 'she', es: 'ella', ipa: '/ʃiː/', hint: 'shi (como cuando pides silencio)', pos: 'pronombre', topic: 'Pronombres', example: 'She is tired.', exampleEs: 'Ella está cansada.' },
  { id: 'v-it', en: 'it', es: 'eso (cosas, animales, el tiempo)', ipa: '/ɪt/', hint: 'it (i corta)', pos: 'pronombre', topic: 'Pronombres', example: "It's cold.", exampleEs: 'Hace frío.' },
  { id: 'v-we', en: 'we', es: 'nosotros, nosotras', ipa: '/wiː/', hint: 'uí', pos: 'pronombre', topic: 'Pronombres', example: 'We are in the shelter.', exampleEs: 'Estamos en el refugio.' },
  { id: 'v-they', en: 'they', es: 'ellos, ellas', ipa: '/ðeɪ/', hint: 'déi (lengua entre los dientes)', pos: 'pronombre', topic: 'Pronombres', example: 'They are safe.', exampleEs: 'Están a salvo.' },
  { id: 'v-be', en: 'be', es: 'ser, estar', ipa: '/biː/', hint: 'bi', pos: 'verbo', topic: 'Verbos básicos', example: 'I am here.', exampleEs: 'Estoy aquí.', variants: 'am, is, are' },
  { id: 'v-tired', en: 'tired', es: 'cansado, cansada', ipa: '/ˈtaɪəd/ (UK) · /ˈtaɪərd/ (US)', hint: 'táied (UK) · táierd (US)', pos: 'adjetivo', topic: 'Estados', example: "I'm tired.", exampleEs: 'Estoy cansada.' },
  { id: 'v-happy', en: 'happy', es: 'contento, feliz', ipa: '/ˈhæpi/', hint: 'jápi', pos: 'adjetivo', topic: 'Estados', example: 'She is happy.', exampleEs: 'Ella está contenta.' },
  { id: 'v-cold', en: 'cold', es: 'frío', ipa: '/kəʊld/ (UK) · /koʊld/ (US)', hint: 'kóuld', pos: 'adjetivo', topic: 'Estados', example: "It's cold. / I'm cold.", exampleEs: 'Hace frío. / Tengo frío.' },
  { id: 'v-hungry', en: 'hungry', es: 'con hambre', ipa: '/ˈhʌŋɡri/', hint: 'jángri', pos: 'adjetivo', topic: 'Estados', example: "I'm hungry.", exampleEs: 'Tengo hambre.' },
  { id: 'v-safe', en: 'safe', es: 'a salvo, seguro', ipa: '/seɪf/', hint: 'séif', pos: 'adjetivo', topic: 'Estados', example: 'We are safe here.', exampleEs: 'Aquí estamos a salvo.' },
  { id: 'v-spanish', en: 'Spanish', es: 'español, española', ipa: '/ˈspænɪʃ/', hint: 'spánish', pos: 'adjetivo', topic: 'Nacionalidades', example: 'I am Spanish.', exampleEs: 'Soy española.', variants: 'Siempre con mayúscula en inglés' },
  { id: 'v-survivor', en: 'survivor', es: 'superviviente', ipa: '/səˈvaɪvə/ (UK) · /sərˈvaɪvər/ (US)', hint: 'sevái-ve (UK) · servái-ver (US)', pos: 'sustantivo', topic: 'Personas', example: "I'm a survivor.", exampleEs: 'Soy superviviente.' },
  { id: 'v-shelter', en: 'shelter', es: 'refugio', ipa: '/ˈʃeltə/ (UK) · /ˈʃeltər/ (US)', hint: 'shélte (UK) · shélter (US)', pos: 'sustantivo', topic: 'Lugares', example: 'They are in the shelter.', exampleEs: 'Están en el refugio.' },
  { id: 'v-here', en: 'here', es: 'aquí', ipa: '/hɪə/ (UK) · /hɪr/ (US)', hint: 'jíe (UK) · jíer (US)', pos: 'adverbio', topic: 'Lugares', example: 'He is here.', exampleEs: 'Él está aquí.' },
  { id: 'v-radio', en: 'radio', es: 'radio', ipa: '/ˈreɪdiəʊ/ (UK) · /ˈreɪdioʊ/ (US)', hint: 'réidiou', pos: 'sustantivo', topic: 'Objetos', example: 'It is a radio.', exampleEs: 'Es una radio.' },
  { id: 'v-dog', en: 'dog', es: 'perro', ipa: '/dɒɡ/ (UK) · /dɑːɡ/ (US)', hint: 'dog (UK) · daag (US)', pos: 'sustantivo', topic: 'Animales', example: 'The dog is hungry.', exampleEs: 'El perro tiene hambre.' },
  { id: 'v-yes-no', en: 'yes / no', es: 'sí / no', ipa: '/jes/ · /nəʊ/ (UK) · /noʊ/ (US)', hint: 'iés · nóu', pos: 'expresión', topic: 'Respuestas', example: 'Yes, I am. / No, I\'m not.', exampleEs: 'Sí. / No.' },
];

export const VOCAB: VocabItem[] = [...VOCAB1, ...VOCAB2];

export const vocabById = (id: string) => VOCAB.find((v) => v.id === id);
