export class SellerItemDto {
  constructor(
    public id : string,
    public name :string,
    public description :string,
    public serial :string,
    public model :string,
    public  stock : boolean,
    public  rating : Number,
    public  price : Number,
    public  brand : {id: string, name: string, countryOfOrigin: string},
    public  category : {id: string, name: string},
    public  subCategory : {id: string, name: string},
    public  seller : {id: string, name: string,rating:Number},
    public reviews : {id: string, rating: number,clientReview: string,clientName: string;}[],
    public image :string ) {}
}
