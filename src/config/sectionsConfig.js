// src/config/sectionsConfig.js
import Header from '../components/sections/Header';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Customers from '../components/sections/Customers';
import Footer from '../components/sections/Footer';

export const sections = [
  { id: 'header', name: 'Header', component: Header },
  { id: 'hero', name: 'Hero', component: Hero },
  { id: 'about', name: 'About', component: About },
  { id: 'services', name: 'Services', component: Services },
  { id: 'customers', name: 'Customers', component: Customers },
  { id: 'footer', name: 'Footer', component: Footer },
];