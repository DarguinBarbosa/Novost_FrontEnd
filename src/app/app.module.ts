
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbButtonModule,
  NbCardModule,
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbMenuModule,
    NbStepperModule,
    NbToastrModule,  	
  NbTooltipModule,
  NbTreeGridModule,
  NbWindowModule,
} from '@nebular/theme';
import { NbThemeModule, NbLayoutModule, NbSidebarModule } from '@nebular/theme'
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { InterceptorService } from './@core/interceptor/interceptor.service';
import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';
import { CommonModule } from '@angular/common';



@NgModule({
    declarations: [AppComponent,LoginComponent, Error404Component, Error500Component],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbTooltipModule,  
    NbIconModule,
    NbLayoutModule,
    NbThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbCardModule, 
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NbDialogModule.forRoot(),
    CommonModule,
    NbInputModule,
    NbDialogModule.forChild(),
    NbIconModule,
   FormsModule,
    ReactiveFormsModule,
    NbFormFieldModule,
    NbCardModule,
    NbButtonModule,
    ThemeModule,
    NbTreeGridModule,
    NbStepperModule,
  ],
  providers:[
    {provide:CookieService},
      { provide: HTTP_INTERCEPTORS, 
        useClass:InterceptorService,
         multi: true },
    
   /* ,{
    provide:HTTP_INTERCEPTORS,
useClass:SessionInterceptor
  }*/
],
  bootstrap: [AppComponent],
})
export class AppModule {
}
