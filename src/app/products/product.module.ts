import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductListAsyncPipeComponent } from './product-list/product-list-asyncPipe.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListCategoryComponent } from './product-list/product-list-category.component';
import { ProductSuppliersComponent } from './product-suppliers/product-suppliers.component';

import { ProductResolver } from './product-detail/product-resolver.service';
import { ProductEditGuard } from './product-edit/product-edit.guard';
import { ProductListOneAtATimeComponent } from './product-list/product-list-one.component';

import { SharedModule } from '../shared/shared.module';
import { ProductListShellComponent } from './product-list/product-list-shell/product-list-shell.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductListShellComponent
      },
      {
        path: 'asyncPipe',
        component: ProductListAsyncPipeComponent
      },
      {
        path: 'category',
        component: ProductListCategoryComponent
      },
      {
        path: 'oneAtATime',
        component: ProductListOneAtATimeComponent
      },
      {
        path: ':id',
        component: ProductDetailComponent,
        resolve: { resolvedData: ProductResolver }
      },
      {
        path: ':id/suppliers',
        component: ProductSuppliersComponent
      },
      {
        path: ':id/edit',
        component: ProductEditComponent,
        canDeactivate: [ProductEditGuard]
      }
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductListAsyncPipeComponent,
    ProductListCategoryComponent,
    ProductListOneAtATimeComponent,
    ProductDetailComponent,
    ProductSuppliersComponent,
    ProductEditComponent,
    ProductListShellComponent
  ]
})
export class ProductModule { }
