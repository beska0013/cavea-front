import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor( private http: HttpClient) { }

  getInventories(){
    return this.http.get('http://localhost:5000/api/inventory?location&page=1')
  }


}
