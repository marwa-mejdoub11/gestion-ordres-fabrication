/**
 * Configuration de l'URL de l'API
 * 
 * En développement local : utilise http://localhost:8080
 * En production (Docker) : utilise des URLs relatives qui passent par Nginx
 */

export const API_CONFIG = {
  // Détecte automatiquement l'environnement
  baseUrl: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8080/api'  // Développement local
    : '/api'                         // Production (Docker avec Nginx)
};
