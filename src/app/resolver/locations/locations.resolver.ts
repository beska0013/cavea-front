import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of, tap} from 'rxjs';
import {CrudService} from "../../utils/crud/crud.service";
import {UtilsService} from "../../utils/utils.service";

@Injectable({
  providedIn: 'root'
})
export class LocationsResolver implements Resolve<string []> {
  constructor(
    private crudSrv: CrudService,
    private utilSrv: UtilsService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string []> {
    const locations = this.utilSrv.getSessionStorageItem('locations');
    return !!locations && locations.length > 0 ?
      of(locations) :
      this.crudSrv.getAllLocations()
      .pipe(
        tap(res => this.utilSrv.setSessionStrorageItem('locations', res))
      )
  }
}
