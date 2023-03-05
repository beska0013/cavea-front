import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {CrudService} from "../../utils/crud/crud.service";


@Injectable({
  providedIn: 'root'
})
export class InventoryResolver implements Resolve<any> {

  constructor(private crudSrv: CrudService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const queryIsEmpty = Object.keys(route.queryParams).length === 0;
    return queryIsEmpty ?
      this.crudSrv.getInventories() :
      this.onNonEmptyQuery(route.queryParams)
  }


  private onNonEmptyQuery(queryParams:any){
    let  location = 'location' in queryParams ? queryParams.location : '';
    let  page = 'page' in queryParams && !isNaN(queryParams.page) ? queryParams.page : 1;
    return this.crudSrv.getInventories(location,page)
  }
}
