import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/common/Theme.tsx';
import { DonneeProvider } from './components/common/donnee.tsx';
import Couleur from './components/layouts/Couleur.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DonneeProvider>
      <ThemeProvider>
        <Couleur>
          <Router>
            <Routes>
              <Route path='/*' element={ <App /> } />
            </Routes>
          </Router>
        </Couleur>
      </ThemeProvider>
    </DonneeProvider>
  </StrictMode>,
)
