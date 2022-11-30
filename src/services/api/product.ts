import axios from "axios";
import { apiInstance } from ".";

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

interface GetProductsResponse {
  data: {data: ProductType[], paging: {next: string}},
  status: number,
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

interface getRecommendProductsResponse {
  data: { components: RecommendProductType[] }
  status: number,
}

// 이거 url도 다 인자로 받아야겠네 
export const getProductsByPopularity  = async (url : string) : Promise<GetProductsResponse>  => {

  return await apiInstance
    .get<GetProductsResponse>(url, {
      headers: {
        'Content-Type': 'text/plain',
      }
    })
    .then(({ data, status }) => {
      return { data, status };
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return error;
      }
    });
};

export const getProductsByNewest = async (url : string) : Promise<GetProductsResponse> => {

  return await apiInstance
    .get<GetProductsResponse>(url, {
      headers: {
        'Content-Type': 'text/plain',
      }
    })
    .then(({ data, status }) => {
      return { data, status };
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return error;
      }
    });
};

export const getRecommendProducts = async (url : string) : Promise<getRecommendProductsResponse> => {

  return await apiInstance
    .get<getRecommendProductsResponse>(url, {
      headers: {
        'Content-Type': 'text/plain',
      }
    })
    .then(({ data, status }) => {
      return { data, status };
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return error;
      }
    })
};