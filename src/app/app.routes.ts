import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { RollComponent } from './roll/roll.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { PicksComponent } from './picks/picks.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'about',
    component: AboutComponent
  }, {
    path: 'users',
    component: UsersComponent
  }, {
    path: 'picks',
    component: PicksComponent
  }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);
