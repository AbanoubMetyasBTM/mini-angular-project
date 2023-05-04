import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {ProductListItem} from "../../../types/ProductListItem";

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  products: ProductListItem[] = [];
  categories: string[] = [];
  productsIsLoaded: boolean = false;

  constructor(
    private service: ProductsService
  ) {
  }

  async ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  async getProducts() {
    this.products          = await this.service.getAllProducts();
    this.productsIsLoaded  = true;
  }

  async getCategories() {
    this.categories = await this.service.getAllCategories();
  }

  async filterWithCategory(event: any) {
    this.productsIsLoaded  = false;

    if (event.target.value == "all") {
      this.getProducts();
      return;
    }

    this.products = await this.service.filterWithCategory(event.target.value);
    this.productsIsLoaded  = true;
  }


}
