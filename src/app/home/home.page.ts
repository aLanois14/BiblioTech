import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { GoogleCloudVisionServiceService } from '../../services/google-cloud-vision-service.service';

import { DATAS } from 'src/assets/data/books-data';
import { StoreService } from 'src/services/store.service';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
	@ViewChild('stream', { static: false }) videoEle: ElementRef;

	video: HTMLVideoElement;
	public canvas;
	public videoReady = false;

	constructor(
		private vision: GoogleCloudVisionServiceService,
		public loadingController: LoadingController,
		public alertController: AlertController,
		private platform: Platform,
		private router: Router,
		private store: StoreService
	) {}

	ngOnInit() {
		this.platform.ready().then(() => {
			this.startCamera();
		});
	}

	/*
    Start Camera
  */
	async startCamera() {
		await AndroidPermissions.requestPermissions([
			AndroidPermissions.PERMISSION.CAMERA,
		]);
		this.video = this.videoEle.nativeElement;
		const constraints = {
			video: {
				facingMode: {
					exact: 'environment',
				},
			},
			audio: false,
		};
		this.video.setAttribute('autoplay', '');
		this.video.setAttribute('muted', '');
		this.video.setAttribute('playsinline', '');
		navigator.mediaDevices
			.getUserMedia(constraints)
			.then(async (stream: MediaStream) => {
				this.video.srcObject = stream;
				await this.video.play();
				this.videoReady = true;
			})
			.catch((err) => console.log(err));
	}

	async scannCover() {
		const loading = await this.loadingController.create({
			message: 'Getting Results...',
			translucent: true,
		});

		await loading.present();

		this.canvas = document.createElement('canvas');

		this.canvas.width = 720;
		this.canvas.height = 1080;

		const ctx = this.canvas.getContext('2d');
		ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
		const dataURL = this.canvas.toDataURL('image/png');
		const base64 = dataURL.replace('data:image/png;base64,', '');

		this.vision.getLabels(base64, 'PRODUCT_SEARCH').subscribe(
			async (result: any) => {
				if(result.responses[0].productSearchResults) {
					const productSearchResults = result.responses[0].productSearchResults;
					const bookData = DATAS.datas.find(x => x.bookId === productSearchResults.results[0].product.name);
					this.vision.getCover(productSearchResults.results[0].image)
						.subscribe(
							async (imageResult: any) => {
								const cover = imageResult.uri.replace('gs://', 'https://storage.googleapis.com/');
								await loading.dismiss();

								this.store.set('cover', cover);
								this.store.set('bookData', JSON.stringify(bookData));

								this.router.navigate(['book-check']);
							}
						);
				}
			},
			(err) => {
				console.log(err);
			}
		);
	}
}
