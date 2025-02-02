// App.js
import { Route, Routes } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import Home from './pages/Home';
import Error404 from './pages/Error404';
import ComingSoon from './pages/ComingSoon';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/coming-soon" element={<ComingSoon />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;
