import { NgxLetterImageAvatarModule } from 'ngx-letter-image-avatar';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxLetterImageAvatarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
