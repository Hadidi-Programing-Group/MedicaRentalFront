export class RenterItemDto {
  constructor(
    public Id: string,
    public Name: string,
    public Description: string,
    public Serial: string,
    public Model: string,
    public Stock: boolean,
    public Rating: number,
    public Price: number,
    public Brand: { id: string; name: string; countryOfOrigin: string },
    public Category: { id: string; name: string },
    public SubCategory: { id: string; name: string },
    public Seller: { id: string; name: string; rating: number },
    public Reviews: {
      id: string;
      rating: number;
      clientReview: string;
      clientName: string;
    }[],
    public Image: string,
    public isAd: boolean
  ) {}
}
