import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InventoryResolver} from "./resolver/inventory/inventory.resolver";
import {LocationsResolver} from "./resolver/locations/locations.resolver";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inventory',
    pathMatch: 'full'
  },
  {
    path:'inventory',
    loadComponent: () => import('./components/inventory/inventory.component').then(m => m.InventoryComponent),
    resolve: { inventories: InventoryResolver, locations: LocationsResolver },
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-inventory/add-inventory.component').then(m => m.AddInventoryComponent),
    resolve: { locations: LocationsResolver }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
