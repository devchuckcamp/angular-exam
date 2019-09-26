import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './core/config.service';
import { UserService } from './services/user.service';
import { AppComponent } from './app.component';
import { UserComponent } from './dashboard/user/user.component';
import { UserDetailComponent } from './dashboard/user/user-detail/user-detail.component';
import { FormsModule,ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators, EmailValidator,
  FormGroupDirective, NgForm } from '@angular/forms';

// Route
import { AppRoutingModule } from './app.routing.module';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
  ],
  providers: [
    ConfigService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
