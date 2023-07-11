import { EventEmitter, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root',
})
export class UtilitiesService {

    constructor(
        private toast: ToastController
    ) {}

    //*****************************************************
    //*******************     LODAER     ******************
    //*****************************************************

    /** Show loading indicator
     * Params:
     * type: string => "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "light" | "medium" | "dark"
     * message: string
     */
    async displayToast(type: string, message: string): Promise<void> {
        const toast = await this.toast.create({
            color: type,
            message,
            duration: 1000,
            position: 'top',
        });

        toast.present();
    }
}
