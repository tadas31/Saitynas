import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartsComponent } from './components/parts/parts.component';
import { PartComponent } from './components/part/part.component';
import { AddPartComponent } from './components/add-part/add-part.component';
import { EditPartComponent } from './components/edit-part/edit-part.component';

import { ComputersComponent } from './components/computers/computers.component';
import { ComputerComponent } from './components/computer/computer.component';
import { AddComputerComponent} from './components/add-computer/add-computer.component';
import { EditComputerComponent } from './components/edit-computer/edit-computer.component';

import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ViewUsersComponent } from './components/user/view-users/view-users.component';

import { NotFoundComponent } from './components/not-found/not-found.component';


const routes: Routes = [
  { path: '', component: ComputersComponent },
  { path: 'mycomputers/:userId', component: ComputersComponent },
  { path: 'computer/:id', component: ComputerComponent },
  { path: 'newcomputer', component: AddComputerComponent },
  { path: 'editcomputer/:id', component: EditComputerComponent },

  { path: 'parts/:type', component: PartsComponent },
  { path: 'part/:id', component: PartComponent },
  { path: 'addpart', component: AddPartComponent },
  { path: 'editpart/:id', component: EditPartComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: ViewUsersComponent},


  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
