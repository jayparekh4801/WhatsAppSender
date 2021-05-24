import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { AuthGuardService } from './Services/routeGurdService/auth-guard.service';

const routes: Routes = [
  { path : '', component : SignUpComponent },
  { path : 'logIn', component : LogInComponent },
  { path : 'dashBoard', component : DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
