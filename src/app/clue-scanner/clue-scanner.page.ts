import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { Platform } from '@ionic/angular';

import { GoogleCloudVisionServiceService } from '../../services/google-cloud-vision-service.service';
import { UtilitiesService } from 'src/services/utilities.service';
import { ThreeComponent } from '../three/three.component';

@Component({
  selector: 'app-clue-scanner',
  templateUrl: './clue-scanner.page.html',
  styleUrls: ['./clue-scanner.page.scss'],
})
export class ClueScannerPage implements OnInit, OnDestroy {
	@ViewChild('stream', { static: false }) videoEle: ElementRef;
	@ViewChild('scenegraph')
  sceneGraph: ThreeComponent;


	public video: HTMLVideoElement;
	public canvas;
	public videoReady = false;
	public clue;
	public textFound = false;

	private backButtonSubscription;

	constructor(
		private vision: GoogleCloudVisionServiceService,
		private platform: Platform,
		private route: ActivatedRoute,
		private router: Router,
		private clipboard: Clipboard,
		private utilities: UtilitiesService
	) {
		this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(10, () => {
			this.router.navigate(['book'], { replaceUrl: true });
		  });
	}

	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			if(params && params.clue) {
				this.clue = JSON.parse(params.clue);
			}
		});

		this.platform.ready().then(() => {
			this.startCamera();
		});
	}

	ngOnDestroy() {
		this.backButtonSubscription.unsubscribe();
	}

	async startCamera() {
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
				requestAnimationFrame(this.tick);
			})
			.catch((err) => console.log(err));
	}

	/* Copy team url link to clipboard */
	public copyToClipboard(): void {
		this.clipboard.copy(this.clue.content);
		this.utilities.displayToast('success', 'Copié dans le presse papier.');
	}

	private tick = async () => {
		this.canvas = document.createElement('canvas');

		this.canvas.width = 720;
		this.canvas.height = 1080;

		const ctx = this.canvas.getContext('2d');
		ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
		const dataURL = this.canvas.toDataURL('image/png');
		const base64 = dataURL.replace('data:image/png;base64,', '');
		this.vision.getLabels(base64, 'TEXT_DETECTION').subscribe(
			async (result: any) => {
				if (result.responses[0] && result.responses[0].fullTextAnnotation) {

					if(result.responses[0].fullTextAnnotation.text.includes(this.clue.content)) {
						this.textFound = true;
						this.sceneGraph.startAnimation();
					} else {
						setTimeout(() => requestAnimationFrame(this.tick), 500);
					}
				} else {
					setTimeout(() => requestAnimationFrame(this.tick), 500);
				}

			},
			(err) => {
				console.log(err);
			}
		);
	};
}
