import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookCheckPageRoutingModule } from './book-check-routing.module';

import { BookCheckPage } from './book-check.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookCheckPageRoutingModule
  ],
  declarations: [BookCheckPage]
})
export class BookCheckPageModule {}
