import { Injectable } from '@angular/core';
import {ProductListItem} from "../../types/ProductListItem";
import {SharedService} from "../../shared/services/shared.service";

@Injectable({
  providedIn: 'root'
})
export class CartsService extends SharedService{

  async checkout(checkoutData: any): Promise<ProductListItem | null> {
    return await this.sendPostReq<ProductListItem, null>(`carts`, checkoutData);
  }

}
