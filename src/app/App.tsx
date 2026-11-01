import { useRoute } from '../lib/router';
import { slugToLevel } from '../engine/gamification/progress';
import { Layout } from './Layout';
import { RefugioPage } from '../features/refugio/RefugioPage';
import { TallerPage } from '../features/taller/TallerPage';
import { LessonPage } from '../features/taller/LessonPage';
import { HordePage } from '../features/taller/HordePage';
import { SaqueoPage } from '../features/saqueo/SaqueoPage';
import { MantenimientoPage } from '../features/mantenimiento/MantenimientoPage';
import { ManualPage } from '../features/manual/ManualPage';
import { DiarioPage } from '../features/diario/DiarioPage';
import { EncargosPage } from '../features/encargos/EncargosPage';
import { TrofeosPage } from '../features/trofeos/TrofeosPage';
import { FichaPage } from '../features/ficha/FichaPage';
import { RadioPage } from '../features/destrezas/RadioPage';
import { DiariosPage } from '../features/destrezas/DiariosPage';
import { FabricacionPage } from '../features/destrezas/FabricacionPage';
import { WalkiePage } from '../features/destrezas/WalkiePage';
import { ArbolPage } from '../features/trofeos/ArbolPage';
import { TaquillaPage } from '../features/trofeos/TaquillaPage';
import { ExamPage } from '../features/taller/ExamPage';
import { ComparacionesPage } from '../features/taller/ComparacionesPage';


function Page({ route }: { route: string }) {
  if (route.startsWith('sala-')) return <LessonPage id={route.slice(5)} />;
  if (route.startsWith('horda-')) return <HordePage unitId={route.slice(6)} />;
  if (route.startsWith('jefe-')) { const lv = slugToLevel(route.slice(5)); if (lv === 'PRE_A1' || lv === 'A1') return <ExamPage level={lv} />; }
  switch (route) {
    case 'taller': return <TallerPage />;
    case 'saqueo': return <SaqueoPage />;
    case 'mantenimiento': return <MantenimientoPage />;
    case 'manual': return <ManualPage />;
    case 'diario': return <DiarioPage />;
    case 'encargos': return <EncargosPage />;
    case 'trofeos': return <TrofeosPage />;
    case 'ficha': return <FichaPage />;
    case 'radio': return <RadioPage />;
    case 'diarios': return <DiariosPage />;
    case 'fabricacion': return <FabricacionPage />;
    case 'walkie': return <WalkiePage />;
    case 'arbol': return <ArbolPage />;
    case 'taquilla': return <TaquillaPage />;
    case 'comparaciones': return <ComparacionesPage />;
    default: return <RefugioPage />;
  }
}

export function App() {
  const route = useRoute();
  return <Layout route={route}><Page key={route} route={route} /></Layout>;
}
