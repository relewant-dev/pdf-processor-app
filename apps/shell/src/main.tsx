import React from 'react';
import { createRoot } from 'react-dom/client';
import { ShellLayout } from './components/ShellLayout';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ShellLayout />
  </React.StrictMode>
);
