import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {ProductListItem} from "../../../types/ProductListItem";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  id: any;
  @Input() passedProductObj: ProductListItem | null = null
  product: ProductListItem | null = null;

  constructor(
    private route: ActivatedRoute,
    private service: ProductsService
  ) {

    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id == null) {
      this.id = 0;
    }
    this.id = parseInt(this.id);

  }

  async ngOnInit() {

    this.product = this.passedProductObj;
    if (this.product == null){
      this.product = await this.service.getProduct(this.id)
    }

  }

}
