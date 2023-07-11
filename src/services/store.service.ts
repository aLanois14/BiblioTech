import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root'
})
export class StoreService {

	constructor() { }

	//******************************
	//*******     Crypto     *******
	//******************************

	public salt: string = "SixMoN"

	//******************************
	//*******     Store     ********
	//******************************

	public set(key:string, value: any): void {
		localStorage.setItem(this._crypt(key), this._crypt(typeof value != "string" ? JSON.stringify(value) : value))
	}

	public get(key: string): string {
		return this._decrypt(localStorage.getItem(this._crypt(key)))
	}

	public clear(): void {
		localStorage.clear()
	}

	public clearItem(key: string): Promise<void> {
		return new Promise<void>(
			resolve => {
                resolve(localStorage.removeItem(this._crypt(key)))
            }
		)
	}

	private _crypt = (text) => {
		const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0))
		const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2)
		const applySaltToChar = (code) => textToChars(this.salt).reduce((a, b) => a ^ b, code)

		return text
			.split("")
			.map(textToChars)
			.map(applySaltToChar)
			.map(byteHex)
			.join("")
	}

	private _decrypt = (encoded) => {
		if(encoded) {
			const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0))
			const applySaltToChar = (code) => textToChars(this.salt).reduce((a, b) => a ^ b, code)

			return encoded
				.match(/.{1,2}/g)
				.map((hex) => parseInt(hex, 16))
				.map(applySaltToChar)
				.map((charCode) => String.fromCharCode(charCode))
				.join("")
		}
		else {
			return null
		}
	}
}
