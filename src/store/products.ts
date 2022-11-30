import { atom } from "recoil";

interface ProductType {
  id: number,
  name: string,
  likeCount: number,
  reviewsCount: number,
  price: number,
  discountRate: number,
  isDiscounted: boolean, 
  brand: { id: number, name: string },
  picture: { id: string },
  badges: string[],
}

interface ProductStateType {
  data: ProductType[],
  nextUrl : string
}

interface RecommendDataType extends ProductType{
  reviews: {id: number, picture: {id: string}, authorUsername: string}[],
}

interface RecommendProductType {
  type: string,
  title: string,
  position: number, 
  data: RecommendDataType[],
}

export const popularProductState = atom<ProductStateType>({
  key: "popularProductState",
  default: undefined
});

export const newestProductState = atom<ProductStateType>({
  key: "newestProductState",
  default: undefined
})

export const recommendProductState = atom<RecommendProductType>({
  key: "recommendProductState",
  default: undefined,
})