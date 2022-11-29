import { atom } from "recoil";

export const popularProductState = atom({
  key: "popularProductState",
  default: [],
});

export const newestProductState = atom({
  key: "newestProductState",
  default: [],
})

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
  default: {
    type: "",
    title: "",
    position: 0,
    data: []
  },
})