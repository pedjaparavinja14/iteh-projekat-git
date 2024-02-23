import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
    'Accesss-Control-Allow-Origin': '*',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http:HttpClient) { }

  //connect frontend to backend

  apiUrl = 'http://localhost:81/api/user/';

  //get all data
  getAllData():Observable<any>{
    return this._http.get(`${this.apiUrl}`, httpOptions);
  }


  //create data
  createData(data:any):Observable<any>
  {
    console.log(data,'createapi=>')
    return this._http.post(`${this.apiUrl}save`, data, httpOptions);
  }

  //delete
  deleteData(id:any):Observable<any>
  {
    let ids = id;
    return this._http.delete(`${this.apiUrl}${ids}`, httpOptions)
  }

  updateData(data:any, id:any):Observable<any>
  {
    let ids = id;

    return this._http.put(`${this.apiUrl}save/${ids}`, data, httpOptions);
  }

  getSingleData(id:any):Observable<any>{
    let ids = id;
    return this._http.get(`${this.apiUrl}${ids}`, httpOptions);
  }



}
