import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { blankGuard } from './shared/guards/blank.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './components/auth-components/auth-layout/auth-layout.component'
      ).then((c) => c.AuthLayoutComponent),
    canActivate: [blankGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login', title:'E-Commerce Login',
        loadComponent: () =>
          import(
            './components/auth-components/login/login.component'
          ).then((c) => c.LoginComponent),
      },
      {
        path: 'register', title:'E-Commerce Register',
        loadComponent: () =>
          import(
            './components/auth-components/register/register.component'
          ).then((c) => c.RegisterComponent),
      },
      {
        path: 'forgetpassword', title:'E-Commerce Forgot Password',
        loadComponent: () =>
          import(
            './components/auth-components/forget-password/forget-password.component'
          ).then((c) => c.ForgetPasswordComponent),
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import(
        './components/blank-components/blank-layout/blank-layout.component'
      ).then((c) => c.BlankLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home', title:'E-Commerce Home',
        loadComponent: () =>
          import('./components/blank-components/home/home.component').then(
            (c) => c.HomeComponent
          ),
      },
      {
        path: 'products', title:'E-Commerce Products',
        loadComponent: () =>
          import(
            './components/blank-components/products/products.component'
          ).then((c) => c.ProductsComponent),
      },
      {
        path: 'cart', title:'E-Commerce Cart',
        loadComponent: () =>
          import('./components/blank-components/cart/cart.component').then(
            (c) => c.CartComponent
          ),
      },
      {
        path: 'wishlist', title:'E-Commerce Wishlist' ,
        loadComponent: () =>
          import('./components/blank-components/wish-list/wish-list.component').then(
            (c) => c.WishListComponent
          ),
      },
      {
        path: 'brands', title:'E-Commerce Brands',
        loadComponent: () =>
          import('./components/blank-components/brands/brands.component').then(
            (c) => c.BrandsComponent
          ),
      },
      {
        path: 'categories', title:'E-Commerce Categories',
        loadComponent: () =>
          import(
            './components/blank-components/categories/categories.component'
          ).then((c) => c.CategoriesComponent),
      },
      {
        path: 'details/:id', title:'E-Commerce Product Details', 
        loadComponent: () =>
          import('./components/blank-components/details/details.component').then(
            (c) => c.DetailsComponent
          ),
      },
      {
        path: 'category/:id', title:'E-Commerce Category Details',
        loadComponent: () =>
          import(
            './components/blank-components/category-details/category-details.component'
          ).then((c) => c.CategoryDetailsComponent),
      },
      {
        path: 'allorders', title:'E-Commerce AllOrders',
        loadComponent: () =>
          import('./components/allorders/allorders.component').then(
            (c) => c.AllordersComponent
          ),
      },
      {
        path: 'checkout/:id', title:'E-Commerce Checkout', 
        loadComponent: () =>
          import('./components/check-out/check-out.component').then(
            (c) => c.CheckOutComponent
          ),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import(
        './components/blank-components/not-found/not-found.component'
      ).then((c) => c.NotFoundComponent),
  },
];
