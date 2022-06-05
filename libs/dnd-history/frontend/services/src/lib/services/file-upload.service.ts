import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environment/environment';

const url = 'https://api.imgbb.com/1/upload';

@Injectable({
  providedIn: 'root',
})
/**
 * wrapper around httpClient that can only upload files to imgbb
 */
export class FileUploadService {
  constructor(private readonly http: HttpClient) {}
  /**
   * @param file a file from the user that will be uploaded to Imgbb
   * @returns the url of the uploaded file
   */
  async upload(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);
    const { data } = await lastValueFrom(
      this.http.post<{ data: { url: string }}>(url, formData, {
        params: {
          key: environment.imgBBApiKey,
        },
      })
    );
    return data.url;
  }
}
