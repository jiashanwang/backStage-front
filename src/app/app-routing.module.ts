import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProductComponent} from './product/product.component';
import {DynamicComponent} from './dynamic/dynamic.component';
import {AppComponent} from './app.component';

const routes:Routes = [
  // {path:"",redirectTo:"/home",pathMatch:"full"},
  {
    path:"",component:AppComponent
  },
  {path:"home",component:HomeComponent,children:[
      // {path:"dynamic",component:DynamicComponent},
      {path:"need",component:DynamicComponent},
      {path:"promotion",component:DynamicComponent}

    ]},
  {
    path:"product",component:ProductComponent
  }


]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)

  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }
