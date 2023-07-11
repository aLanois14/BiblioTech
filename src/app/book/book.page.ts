import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { StoreService } from 'src/services/store.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit, OnDestroy {
	public cover;
	public bookData;

	private backButtonSubscription;

	constructor(
		private router: Router,
		private platform: Platform,
		private store: StoreService
	) {
		this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(10, () => {
			this.store.clear();
			this.router.navigate(['home']);
		});
	}

	ngOnInit() {
		this.cover = this.store.get('cover');
		this.bookData = JSON.parse(this.store.get('bookData'));

		if(!this.cover || !this.bookData) {
			this.store.clear();
			this.router.navigate(['home']);
		}
	}

	ngOnDestroy() {
		this.backButtonSubscription.unsubscribe();
	}

	scannClue(text: string) {
		const navigationExtras: NavigationExtras = {
			queryParams: {
				clue: JSON.stringify(this.bookData.clues.find(x => x.question === text))
			}
		};
		this.router.navigate(['clue-scanner'], navigationExtras);
	}

}
