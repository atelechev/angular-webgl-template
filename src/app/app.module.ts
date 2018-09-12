import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DimensionsService } from './services/dimensions.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    DimensionsService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
