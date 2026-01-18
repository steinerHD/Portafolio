import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes'; // Asegúrate de que esta ruta sea correcta

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled', // Esta es la clave para el scroll suave
        scrollPositionRestoration: 'enabled'
      })
    ),
    provideBrowserGlobalErrorListeners()
  ]
};