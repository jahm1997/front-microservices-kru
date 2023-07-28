// routes.jsx
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import Home from './components/Home';
// import About from './components/About';
// import Contact from './components/Contact';
import App from './App';
import Agradecimiento from "./components/Agradecimiento"
import Registro from "./components/Registro"

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/agradecimiento" element={<Agradecimiento />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </Router>
  );
}
