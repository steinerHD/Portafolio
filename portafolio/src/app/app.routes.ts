import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		loadComponent: () => import('./features/home/home').then(m => m.Home)
	},
	{
		path: 'projects',
		loadComponent: () => import('./features/projects/projects').then(m => m.Projects)
	},
	{
		path: 'contact',
		loadComponent: () => import('./features/contact/contact').then(m => m.Contact)
	},
	{
		path: 'about-me',
		loadComponent: () => import('./features/about-me/about-me').then(m => m.AboutMe)
	},
	// Wildcard route - redirect to home
	{
		path: '**',
		redirectTo: '',
	}
];
