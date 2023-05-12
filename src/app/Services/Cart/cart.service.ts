import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {CartItemDto} from 'src/app/Dtos/Cart/CartItemDto';
import {StatusDto} from 'src/app/Dtos/StatusDto';
import {AddItemToCartDto} from 'src/app/Dtos/Cart/AddItemToCartDto';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private readonly httpClient: HttpClient) {}

  private baseUrl = `${environment.apiURL}/api/CartItems`; //API

  getCartItems(): Observable<CartItemDto[]> {
    return this.httpClient.get<CartItemDto[]>(`${this.baseUrl}`, {});
  }

  addToCart(addItemToCartDto: AddItemToCartDto): Observable<StatusDto> {
    return this.httpClient.post<StatusDto>(this.baseUrl, addItemToCartDto);
  }

  removeFromCart(itemId: string): Observable<StatusDto> {
    return this.httpClient.delete<StatusDto>(`${this.baseUrl}/${itemId}`);
  }

  isInCart(itemId: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}/IsInCart/${itemId}`);
  }
}
