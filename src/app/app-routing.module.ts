import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'home',
		loadChildren: () =>
			import('./home/home.module').then((m) => m.HomePageModule),
	},
	{
		path: 'book-check',
		loadChildren: () => import('./book-check/book-check.module').then( m => m.BookCheckPageModule)
	},
	{
		path: 'clue-scanner',
		loadChildren: () => import('./clue-scanner/clue-scanner.module').then( m => m.ClueScannerPageModule)
	},
	{
		path: 'book',
		loadChildren: () => import('./book/book.module').then( m => m.BookPageModule)
	},
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full',
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
