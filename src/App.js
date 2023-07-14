import './App.scss';
import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import Dashboard from './routes/dashboard/dashboard.component';
import Children from './routes/children/children.component';
import Cadres from './routes/cadres/cadres.component';
import Activities from './routes/activities/activities.component';
import Projects from './routes/projects/projects.component';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Dashboard />} />
        <Route path='/children' element={<Children />} />
        <Route path='/cadres' element={<Cadres />} />
        <Route path='/activities' element={<Activities />} />
        <Route path='/projects' element={<Projects />} />
      </Route>
    </Routes>
  );
}

export default App;
