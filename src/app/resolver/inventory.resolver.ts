import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {CrudService} from "../utils/crud/crud.service";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InventoryResolver implements Resolve<any> {

  constructor(private crudSrv: CrudService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.crudSrv.getInventories()
      .pipe(
        tap(res => console.log('res', res))
      );
  }
}
