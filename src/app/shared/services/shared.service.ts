import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private httpClient: HttpClient) {
  }

  async sendGetReq<T, Y>(url: string, defaultVal: any, params: any = {}): Promise<T | Y> {

    try {
      return await lastValueFrom(this.httpClient.get<T>(environment.baseApiUrl + url));
    } catch (error) {
      return defaultVal;
    }

  }

  async sendPostReq<T, Y>(url: string, defaultVal: any, params: any = {}): Promise<T | Y> {

    try {
      return await lastValueFrom(this.httpClient.get<T>(environment.baseApiUrl + url));
    } catch (error) {
      return defaultVal;
    }

  }

}
