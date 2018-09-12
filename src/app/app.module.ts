import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DimensionsService } from './services/dimensions.service';
import { TemplateRenderer } from './renderers/template-renderer';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    DimensionsService,
    TemplateRenderer
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
