import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/productService';
import { Product } from '../models/Product';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  constructor(private productService: ProductService) { }

  public products: Product[];
  public imageURL: string;
  errorMessage: string;

  ngOnInit() {
    this.productService.getAll()
      .subscribe(
        products => this.products = products,
        error => this.errorMessage = error,
    );   
  }
}
