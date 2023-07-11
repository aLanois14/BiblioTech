import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClueScannerPageRoutingModule } from './clue-scanner-routing.module';

import { ClueScannerPage } from './clue-scanner.page';
import { ThreeComponent } from '../three/three.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClueScannerPageRoutingModule
  ],
  declarations: [ClueScannerPage, ThreeComponent]
})
export class ClueScannerPageModule {}
