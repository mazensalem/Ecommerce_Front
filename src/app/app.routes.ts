import { Routes } from '@angular/router';
import { Front } from './front/front';
import { Home } from './front/home/home'
import { Dashboard } from './dashboard/dashboard';
import { Report } from './dashboard/report/report';
import { Login } from './dashboard/login/login';
import { NotFound } from './not-found/not-found';
import { Orders } from './dashboard/orders/orders';
import { adminGuard } from './core/guards/admin-guard';
import { Products } from './dashboard/products/products';
import { Catagories } from './dashboard/catagories/catagories';
import { Admins } from './dashboard/admins/admins';
import { Pages } from './dashboard/pages/pages';
import { Testimonials } from './dashboard/testimonials/testimonials';
import { Profile } from './front/users/profile/profile';
import { Search } from './front/products/search/search';
import { Cart } from './front/users/cart/cart';
import { Categories } from './front/home/categories/categories';
import { ProductPage } from './front/products/product-page/product-page';
import { Login as UserLogin } from './front/users/login/login';
import { Signup } from './front/users/signup/signup';

export const routes: Routes = [
    {path: '', component: Front, children: [
        {path: '',  redirectTo: '/home', pathMatch: 'full'},
        {path: 'home', component: Home},
        {path: 'profile', component: Profile},
        {path: 'search/:title', component: Search},
        {path: 'cart', component: Cart},
        {path: 'category/:slug', component: Categories},
        {path: 'product/:slug', component: ProductPage},
        {path: 'login', component: UserLogin},
        {path: 'signup', component: Signup}

    ]},
    {path: 'admin/login', component: Login},
    {path: 'admin',canActivate: [adminGuard],  component: Dashboard, children: [
        {path: '', redirectTo: 'report', pathMatch: 'full'},
        {path: 'report', component: Report},
        {path: 'orders', component: Orders},
        {path: 'products', component: Products},
        {path: 'categories', component: Catagories},
        {path: 'admins', component: Admins},
        {path: 'pages', component: Pages},
        {path: 'Testimonial', component: Testimonials}

    ]},
    {path: '**', component: NotFound}
];
