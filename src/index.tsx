// Import deps
import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx';

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find root element");

createRoot(rootElement).render(
    <App />
);