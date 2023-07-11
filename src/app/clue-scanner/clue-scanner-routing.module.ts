import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClueScannerPage } from './clue-scanner.page';

const routes: Routes = [
  {
    path: '',
    component: ClueScannerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClueScannerPageRoutingModule {}
