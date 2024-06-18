import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from "@angular/common/http";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { appRoutingModule } from "./app.routes";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [],
  providers: [{
    provide: HttpClient,
    useFactory: (httpClient: HttpClient) => withFetch()
  },],
  bootstrap: [],
  imports: [LandingPageComponent, AppComponent, BrowserModule, ReactiveFormsModule, FormsModule, CommonModule,
    appRoutingModule,
    HeaderComponent, FooterComponent,
    //  ToastrModule.forRoot()
  ]
})

export class AppModule { }