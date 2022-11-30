import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { newestProductState, popularProductState, recommendProductState } from "../store/products";
import axios from "axios";
import { getProductsByNewest, getProductsByPopularity, getRecommendProducts } from "../services/api/product";

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

const AppFramework = () => {

  const [loading, setLoading] = useState<boolean>(false);

  const setPopularProducts = useSetRecoilState(popularProductState);
  const setNewestProducts = useSetRecoilState(newestProductState);
  const setRecommendProducts = useSetRecoilState(recommendProductState);

  const fetchPopularProducts = async () => {
    const url = "https://gist.githubusercontent.com/styleshare-frontend/18089356186790c942c75e6dd5f90b90/raw/40517fc4a027233a03c6b220a2b069e1be7c7c39/goods-response-1.json";

    const { data, status } = await getProductsByPopularity(url);

    if (status === 200) {
      setPopularProducts(data.data);
    }
  };

  const fetchNewestProducts = async () => {
    const url = "https://gist.githubusercontent.com/styleshare-frontend/1cd2be4351cd7efe64aab3d015f2bf27/raw/7bf95b3d4833a52cdb8fa78efe8b28f278891e30/goods-response-date-1.json";

    const { data, status } = await getProductsByNewest(url);

    if (status === 200) {
      setNewestProducts(data.data);
    }
  };

  const fetchRecommendProducts = async () => {
    const url = "https://gist.githubusercontent.com/styleshare-frontend/ddc456ec9b9486b6097b61d409edc534/raw/cca24042520fab95fd6e80412eee36cc87da5c2e/goods-review-components.json";

    const { data, status } = await getRecommendProducts(url);

    if (status === 200) {  
      setRecommendProducts(data.components[0]);
    }
  };

  const initData = async () => {
    await fetchPopularProducts();
    await fetchNewestProducts();
    await fetchRecommendProducts();
    setLoading(true);
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <>
      {loading && <Outlet />}
    </>
  )
};

export default AppFramework;