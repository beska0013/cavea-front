import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InventoryResolver} from "./resolver/inventory.resolver";

const routes: Routes = [
  {
    path:'',
    loadComponent: () => import('./components/inventory/inventory.component').then(m => m.InventoryComponent),
    resolve: { inventoreis: InventoryResolver },
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
