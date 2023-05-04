export class HomeItemDto {
  constructor(
    public id: string,
    public name: string,
    public model: string,
    public price: number,
    public rating: number,
    public sellerId: string,
    public sellerName: string,
    public brandName: string,
    public image: string,
    public isAd: boolean
  ) {}
}
