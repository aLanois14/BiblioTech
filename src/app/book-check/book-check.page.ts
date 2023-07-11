import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/services/store.service';

@Component({
  selector: 'app-book-check',
  templateUrl: './book-check.page.html',
  styleUrls: ['./book-check.page.scss'],
})
export class BookCheckPage implements OnInit {
	public cover;

	constructor(
		private router: Router,
		private store: StoreService
	) {}

	ngOnInit() {
		this.cover = this.store.get('cover');

		if(!this.cover) {
			this.store.clear();
			this.router.navigate(['home']);
		}
	}


	public validateCover(result: boolean) {
		if(result) {
			this.router.navigate(['book']);
		} else {
			this.router.navigate(['home']);
		}

	}
}
