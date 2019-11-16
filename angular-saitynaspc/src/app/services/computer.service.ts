import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Computer } from '../models/Computer';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
   })
}

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  computersUrl: string = 'http://localhost:90/saitynaspc/public/api/computers';
  computerUrl: string = 'http://localhost:90/saitynaspc/public/api/computer';

  constructor(private http: HttpClient) { }

  getComputers(): Observable<Computer[]> {
    return this.http.get<Computer[]>(this.computersUrl);
  }

  getComputerById(id: string): Observable<Computer> {
    return this.http.get<Computer>(this.computerUrl + '/' + id);
  }

  getComputerByUserId(userId: string): Observable<Computer[]> {
    return this.http.get<Computer[]>(this.computersUrl + '/' + userId);
  }

  addComputer(computer: Computer): Observable<Computer> {

    if (localStorage.getItem('Token')){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('Token')

         })
      }

      return this.http.post<Computer>(this.computerUrl, computer, httpOptions);
    }

    return null;
  }

  editComputer(computer: Computer): Observable<Computer>{
    if (localStorage.getItem('Token')){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('Token')
         })
      }
      return this.http.put<Computer>(this.computerUrl + '/' + computer.id, computer, httpOptions);
    }

    return null;
  }

  deleteComputer(computerId: string): Observable<Computer> {
    if (localStorage.getItem('Token')){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('Token')

         })
      }
      return this.http.delete<Computer>(this.computerUrl + '/' + computerId, httpOptions);
    }
    return null;
  }


}
