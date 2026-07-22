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
import { SubCategories } from './front/home/sub-categories/sub-categories';
import { ProfileSkeleton } from './front/users/profile-skeleton/profile-skeleton';
import { Address } from './front/users/address/address';
import { Orders as UserOrder } from "./front/users/orders/orders"
import { ProfileEdit } from './front/users/profile-edit/profile-edit';

export const routes: Routes = [
    {path: '', component: Front, children: [
        {path: '',  redirectTo: '/home', pathMatch: 'full'},
        {path: 'home', component: Home},
        {path: 'search', component: Search},
        {path: 'cart', component: Cart},
        {path: 'category/:slug', component: Categories},
        {path: 'product/:slug', component: ProductPage},
        {path: 'login', component: UserLogin},
        {path: 'signup', component: Signup},
        {path: 'subcateogry/:slug', component: SubCategories},
        {path: '', component: ProfileSkeleton, children: [
            {path: 'profile', component: Profile},
            {path: 'profile/profileEdit', component: ProfileEdit},
            {path: 'orders', component: UserOrder},
            {path: 'address', component: Address}
        ]}

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
