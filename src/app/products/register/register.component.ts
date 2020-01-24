import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { Product } from '../models/Product';
import { Provider } from '../models/provider';
import { ProductService } from '../services/productService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  productForm: FormGroup;
  product: Product;
  errors: any[] = [];
  providers: Provider[];
  imageForm: any;
  imageName: string;
  imageBase64: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private productService: ProductService) {

    this.productService.getProviders()
      .subscribe(
        providers => this.providers = providers,
        fail => this.errors = fail.error.errors
      );

    this.imageForm = new FormData();
  }

  ngOnInit(): void {

    this.productForm = this.fb.group({
      fornecedorId: '',
      nome: '',
      descricao: '',
      imagemUpload: '',
      imagem: '',
      valor: '0',
      ativo: new FormControl(false),
      nomeFornecedor: ''
    });
  }

  registerProduct() {
    if (this.productForm.valid && this.productForm.dirty) {

      let productForm = Object.assign({}, this.product, this.productForm.value);
      productForm.ativo = this.productForm.get('active').value

      this.productHandler(productForm)
        .subscribe(
          result => { this.onSaveComplete(result) },
          fail => { this.onError(fail) }
        );
    }
  }

  onSaveComplete(response: any) {
    this.router.navigate(['/products-list']);
  }

  onError(fail: any) {
    this.errors = fail.error.errors;
  }

  productHandleAlternative(product: Product): Observable<Product> {

    let formdata = new FormData();
    product.image = this.imageName;
    product.imageUpload = null;

    formdata.append('product', JSON.stringify(product));
    formdata.append('ImageUpload', this.imageForm, this.imageName);

    return this.productService.registerAlternativeProduct(formdata);
  }

  productHandler(product: Product): Observable<Product> {

    product.imageUpload = this.imageBase64;
    product.image = this.imageName;

    return this.productService.registerProduct(product);
  }

  upload(file: any) {
    // necessario para upload via IformFile
    this.imageForm = file[0];
    this.imageName = file[0].name;

    // necessario para upload via base64
    var reader = new FileReader();
    reader.onload = this.manipularReader.bind(this);
    reader.readAsBinaryString(file[0]);
  }

  manipularReader(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.imageBase64 = btoa(binaryString);
  } 
}


