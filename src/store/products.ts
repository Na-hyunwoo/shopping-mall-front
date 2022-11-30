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

type ProductStateType = {
  data: ProductType[],
  nextUrl : string
}

export const popularProductState = atom<ProductStateType>({
  key: "popularProductState",
  default: undefined
});

export const newestProductState = atom<ProductStateType>({
  key: "newestProductState",
  default: undefined
})

// 위에랑 겹치나 ?
// 전체적인 타입 네이밍 수정 필요. 굉장히 혼잡하다. 
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