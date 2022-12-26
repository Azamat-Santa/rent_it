import { IImageAd } from "./IImageAd";
import { ILocation } from "./ILocation";
import { IUserDatailsAd } from "./IUserDatailsAd";



export interface IAdDatails {
  productId: number;
  title: string;
  description: string;
  clickNumber: number;
  price: number;
  likedNum: number;
  rating: string;
  reviewNum: number;
  minimumBookingNumberDay: number;
  location: ILocation;
  ownerId: number;
  categoryId: number;
  categoryName: string;
  images:IImageAd[];
  characteristics: any;
  userDetails: IUserDatailsAd;
  active: true;
  favorite: true;
  blocked: true;
}
