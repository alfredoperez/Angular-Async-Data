import { Component, OnInit } from '@angular/core';
import {Product} from '../../product';

@Component({
  selector: 'pm-product-list-shell',
  templateUrl: './product-list-shell.component.html',
  styleUrls: ['./product-list-shell.component.css']
})
export class ProductListShellComponent implements OnInit {
  productsSelected: Product;
  constructor() { }

  ngOnInit() {
  }
  handleSelectionChange(product) {
    this.productsSelected = product;
  }

}
