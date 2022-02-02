import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbListModule, NbButton, NbButtonModule, NbInputModule, NbIconModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ReactiveFormsModule } from '@angular/forms';
import { ZlPipe } from './zl.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ZlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbEvaIconsModule,
	NbCardModule,
	NbListModule,
	NbButtonModule,
	NbInputModule,
	ReactiveFormsModule,
	NbIconModule
	
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
