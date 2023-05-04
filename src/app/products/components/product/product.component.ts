import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {ProductListItem} from "../../../types/ProductListItem";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

  @Input('product-item') item: ProductListItem | null = null;
  showQuantityDiv: boolean = false;
  requestQuantity: number = 0;

  constructor() {
  }

  ngOnInit(): void {

  }

  addToCard() {

    if (this.item == null) {
      return;
    }

    let cartItems: any[] = [];
    let oldItems = localStorage.getItem('cartItems');

    if (oldItems != null) {
      cartItems = JSON.parse(oldItems);
    }

    let exist: ProductListItem = cartItems.find(item => item.id == this.item?.id)

    //this.item
    this.item.requestQuantity = this.requestQuantity;

    if (exist) {
      this.item.requestQuantity += (exist.requestQuantity ?? 0);

      cartItems = cartItems.filter(item => item.id != this.item?.id)
    }

    cartItems.push(this.item);
    localStorage.setItem('cartItems', JSON.stringify(cartItems))

    Swal.fire('Success', 'Added successfully!', 'success');
    this.showQuantityDiv = false;

  }

}
