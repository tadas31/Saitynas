import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalDelete } from './modals/delete/modal-delete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PartsComponent } from './components/parts/parts.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { PartComponent } from './components/part/part.component';
import { ComputersComponent } from './components/computers/computers.component';
import { ComputerComponent } from './components/computer/computer.component';
import { CommentsComponent } from './components/comments/comments.component';
import { AddComputerComponent } from './components/add-computer/add-computer.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { EditComputerComponent } from './components/edit-computer/edit-computer.component';
import { AddPartComponent } from './components/add-part/add-part.component';
import { EditPartComponent } from './components/edit-part/edit-part.component';
import { ViewUsersComponent } from './components/user/view-users/view-users.component';
import { FooterComponent } from './components/layout/footer/footer.component';

import { RouterExtService } from './services/router-ext.service';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PartsComponent,
    HeaderComponent,
    PartComponent,
    ComputersComponent,
    ComputerComponent,
    CommentsComponent,
    AddComputerComponent,
    LoginComponent,
    RegisterComponent,
    EditComputerComponent,
    AddPartComponent,
    EditPartComponent,
    ViewUsersComponent,
    FooterComponent,

    NgbdModalDelete,

    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private routerExtService: RouterExtService){}
}
