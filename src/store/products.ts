import { atom } from "recoil";

type ProductType = {
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

export const popularProductState = atom<ProductType[]>({
  key: "popularProductState",
  default: undefined
});

export const newestProductState = atom<ProductType[]>({
  key: "newestProductState",
  default: undefined
})

// 위에랑 겹치나 ?
type RecommendDataType = {
  id: number,
  name: string,
  reviewsCount: number,
  price: number,
  discountRate: number,
  isDiscounted: boolean,
  brand: {id: number, name: string},
  picture: {id: string},
  badges: string[],
  reviews: {id: number, picture: {id: string}, authorUsername: string}[],
}

type RecommendProductType = {
  type: string,
  title: string,
  position: number, 
  data: RecommendDataType[],
}

export const recommendProductState = atom<RecommendProductType>({
  key: "recommendProductState",
  default: undefined,
})