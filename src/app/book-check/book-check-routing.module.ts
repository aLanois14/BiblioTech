import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookCheckPage } from './book-check.page';

const routes: Routes = [
  {
    path: '',
    component: BookCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookCheckPageRoutingModule {}
