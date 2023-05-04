import {Component, OnInit} from '@angular/core';
import {ProductListItem} from "../../../types/ProductListItem";
import Swal, {SweetAlertOptions} from 'sweetalert2';
import {Router} from "@angular/router";
import {CartsService} from "../../services/carts.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: ProductListItem[] | null = null;
  totalCost: number = 0;

  constructor(
    private router: Router,
    private service: CartsService
  ) {
  }

  ngOnInit(): void {

    this.getCartItems();
    this.calculateTotalCost();

  }

  getCartItems() {

    let oldItems = localStorage.getItem('cartItems');

    if (oldItems != null) {
      this.cartItems = JSON.parse(oldItems);
    }

  }

  calculateTotalCost() {

    this.totalCost = 0;

    if (this.cartItems === null) {
      return;
    }

    this.cartItems.forEach(item => {
      // @ts-ignore
      this.totalCost += item.requestQuantity * item.price;
    });

    this.totalCost = Math.round(this.totalCost * 100) / 100;

  }

  clearAllItems() {

    const thisObj = this;

    let options: SweetAlertOptions = {
      title: "Are you sure?",
      text: "You will remove all items from your cart",
      showCancelButton: true,
      showConfirmButton: true,
      preConfirm(inputValue: any): any {
        if (!inputValue) {
          return;
        }

        localStorage.removeItem('cartItems');

        thisObj.router.navigate(['/products'])
      }
    };

    Swal.fire(options);
  }

  reSaveItems() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
    if (this.cartItems?.length == 0) {
      localStorage.removeItem('cartItems')
      this.router.navigate(['/products'])
    }

    this.calculateTotalCost();
  }

  increaseItem(itemIndex: number) {
    if (this.cartItems === null || this.cartItems[itemIndex] === undefined) {
      return;
    }

    // @ts-ignore
    this.cartItems[itemIndex].requestQuantity = this.cartItems[itemIndex].requestQuantity + 1;

    this.reSaveItems();
  }

  decreaseItem(itemIndex: number) {
    if (this.cartItems === null || this.cartItems[itemIndex] === undefined) {
      return;
    }

    // @ts-ignore
    this.cartItems[itemIndex].requestQuantity = this.cartItems[itemIndex].requestQuantity - 1;

    this.reSaveItems();
  }

  changeQuantity() {
    this.reSaveItems();
  }

  deleteItem(itemIndex: number) {

    const thisObj = this;

    let options: SweetAlertOptions = {
      title: "Are you sure?",
      text: "You will this item from your cart",
      showCancelButton: true,
      showConfirmButton: true,
      preConfirm(inputValue: any): any {
        if (!inputValue) {
          return;
        }

        thisObj.cartItems?.splice(itemIndex, 1);
        thisObj.reSaveItems();

      }
    };

    Swal.fire(options);

  }

  async checkout(){

    let products = this.cartItems?.map(item => {
      return {
        productId: item.id,
        quantity: item.requestQuantity,
      };
    });

    let checkoutData = {
      userId : 5,
      date: new Date(),
      products : products
    };

    await this.service.checkout(checkoutData);
    localStorage.removeItem('cartItems')

    Swal.fire('Success', 'Checkout is done successfully!', 'success');
    this.router.navigate(['/products'])

  }

}
