import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Upload{
  url:string
  key:string
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http:HttpClient) { }

  BASE_URL='http://34.235.155.29/upload'

  getUrl():Observable<Upload>{
    return this.http.get<Upload>(this.BASE_URL)
  }

  uploadImage(url:string, file:File){
    return this.http.put(url,file, {
      headers:{
        "Content-Type":file.type
      }
    })
  }
}
