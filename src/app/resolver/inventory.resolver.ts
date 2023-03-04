import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {CrudService} from "../utils/crud/crud.service";

@Injectable({
  providedIn: 'root'
})
export class InventoryResolver implements Resolve<any> {

  constructor(private crudSrv: CrudService){
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.crudSrv.getInventories();
  }
}
