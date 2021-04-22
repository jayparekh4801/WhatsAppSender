import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { LogInComponent } from './Components/log-in/log-in.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignUpComponent,
    LogInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
