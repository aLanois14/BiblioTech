import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class GoogleCloudVisionServiceService {
  constructor(public http: HttpClient) {}
  getLabels(base64Image, feature) {
    const body = {
      requests: [
        {
          features: [
            {
              type: feature,
              maxResults: 10,
            },
          ],
          image: {
            content: base64Image,
          },
		  imageContext: {
			productSearchParams: {
				productSet: 'projects/vision-367913/locations/europe-west1/productSets/',
				productCategories: ['general-v1']
			}
		  }
        },
      ],
    };
    return this.http.post(
      'https://vision.googleapis.com/v1/images:annotate?key=' +
        environment.googleCloudVisionAPIKey,
      body
    );
  }

  getCover(image) {
    return this.http.get(
      'https://vision.googleapis.com/v1/' + image + '?key=' + environment.googleCloudVisionAPIKey
    );
  }
}
