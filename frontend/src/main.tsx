import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log('✓ main.tsx loaded');
console.log('✓ root element:', document.getElementById('root'));

const root = document.getElementById('root');
if (!root) {
  console.error('✗ Root element not found!');
  throw new Error('Root element not found');
}

console.log('✓ Creating React root...');
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

console.log('✓ React app mounted');
