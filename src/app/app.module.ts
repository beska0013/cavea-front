import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {AppNavUiComponent} from "./component-ui/app-nav-ui/app-nav-ui.component";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppNavUiComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
