import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

//import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UiModule } from './ui/ui.module';
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';

import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { FeedbackComponent } from './ui/feedback/feedback.component';

import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductComponent } from './pages/product/product.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '../../assets/i18n/', '.json');
}

const appRoutes: Routes = [
  // { path: 'crisis-center', component: CrisisListComponent },
  // { path: 'hero/:id',      component: HeroDetailComponent },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  // {
  //   path: 'service',
  //   component: ServiceComponent,
  //   data: { title: 'Services' }
  // },
    {
    path: 'products',
    component: ProductComponent,
    data: { title: 'Products' }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { title: 'Contact Us' }
  },
  { path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent,
    // FooterComponent,
    // HomeComponent,
    // ContactComponent,
    // PortfolioComponent,
    //ServiceComponent,
    // FeedbackComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}),
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyCTdBBGnv3QEyPeGKc0aRhH9Z_wc-Qcd18'
    // }),
    // AgmSnazzyInfoWindowModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    NgbModule.forRoot(),
    HttpClientModule,
    FormsModule,
    UiModule,
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
