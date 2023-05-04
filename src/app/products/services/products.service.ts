import {Injectable} from '@angular/core';
import {ProductListItem} from "../../types/ProductListItem";
import {SharedService} from "../../shared/services/shared.service";

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends SharedService{

  async getAllProducts(): Promise<ProductListItem[] | []> {
    return await this.sendGetReq<ProductListItem[], []>("products", []);
  }

  async getAllCategories(): Promise<string[] | []> {
    return await this.sendGetReq<string[], []>("products/categories", []);
  }

  async filterWithCategory(catName: string): Promise<ProductListItem[] | []> {
    return await this.sendGetReq<ProductListItem[], []>(`products/category/${catName}`, []);
  }

  async getProduct(proId: number): Promise<ProductListItem | null> {
    return await this.sendGetReq<ProductListItem, null>(`products/${proId}`, null);
  }


}
