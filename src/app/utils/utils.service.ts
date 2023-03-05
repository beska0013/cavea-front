import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  setSessionStrorageItem(key:string, value:any){
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getSessionStorageItem(key:string){
    return JSON.parse(sessionStorage.getItem(key) || 'null');
  }

  trackByFn = (index: number, item: any) => item;
  updateInventoryQueryParam(location:string = '', page:number = 1) {
    const queryParams = { ...this.activeRoute.snapshot.queryParams } as { location: string, page: number };
    queryParams.page = page;
    queryParams.location = location;
    return this.router.navigate([], { queryParams, replaceUrl: true });
  }



}
