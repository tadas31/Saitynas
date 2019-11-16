import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Part } from '../models/Part';


@Injectable({
  providedIn: 'root'
})
export class PartService {

  partsUrl:string = 'http://localhost:90/saitynaspc/public/api/parts';
  partUrl:string = 'http://localhost:90/saitynaspc/public/api/part';

  constructor(private http: HttpClient) { }

  getParts(): Observable<Part[]> {
    return this.http.get<Part[]>(this.partsUrl);
  }

  getsPartsByType(type: string): Observable<Part[]> {
    return this.http.get<Part[]>(this.partsUrl + '/' + type);
  }

  getsPartsById(id: string): Observable<Part> {
    return this.http.get<Part>(this.partUrl + '/' + id);
  }

  addPart(part: Part): Observable<Part> {

    if (localStorage.getItem('Token')){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('Token')
         })
      }
      return this.http.post<Part>(this.partUrl, part, httpOptions);
    }

    return null;
  }

  editPart(part: Part): Observable<Part>{
    if (localStorage.getItem('Token')){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('Token')
         })
      }
      return this.http.put<Part>(this.partUrl + '/' + part.id, part, httpOptions);
    }

    return null;
  }

  deletePart(partId: string): Observable<Part> {
    if (localStorage.getItem('Token')){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('Token')

         })
      }
      return this.http.delete<Part>(this.partUrl + '/' + partId, httpOptions);
    }
    return null;
  }
}
