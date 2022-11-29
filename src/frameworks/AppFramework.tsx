import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { newestProductState, popularProductState, recommendProductState } from "../store/products";
import axios from "axios";

const AppFramework = () => {

  const [loading, setLoading] = useState<boolean>(false);

  const setPopularProducts = useSetRecoilState(popularProductState);
  const setNewestProducts = useSetRecoilState(newestProductState);
  const setRecommendProducts = useSetRecoilState(recommendProductState);

  // TODO: RESTful하게 api 짜보자. 
  const getPopularProducts = async () => {
    const url = "https://gist.githubusercontent.com/styleshare-frontend/18089356186790c942c75e6dd5f90b90/raw/40517fc4a027233a03c6b220a2b069e1be7c7c39/goods-response-1.json";

    const response = axios.get(url, {
      headers: {
        "Content-Type": "text/plain"
      }
    });

    return response;
  };

  const getNewestProducts = async () => {
    const url = "https://gist.githubusercontent.com/styleshare-frontend/1cd2be4351cd7efe64aab3d015f2bf27/raw/7bf95b3d4833a52cdb8fa78efe8b28f278891e30/goods-response-date-1.json";

    const response = axios.get(url, {
      headers: {
        "Content-Type": "text/plain"
      }
    });

    return response;
  }

  const getRecommendProducts = async () => {
    const url = "https://gist.githubusercontent.com/styleshare-frontend/ddc456ec9b9486b6097b61d409edc534/raw/cca24042520fab95fd6e80412eee36cc87da5c2e/goods-review-components.json";

    const response = axios.get(url, {
      headers: {
        "Content-Type": "text/plain"
      }
    });

    return response;
  }

  useEffect(() => {
    const promises = [getPopularProducts(), getNewestProducts(), getRecommendProducts()];

    Promise.allSettled(promises)
      .then((results) => {
        if(results[0].status === "fulfilled") setPopularProducts(results[0].value.data.data);
        if(results[1].status === "fulfilled") setNewestProducts(results[1].value.data.data);
        if(results[2].status === "fulfilled") setRecommendProducts(results[2].value.data.components[0]);
      })
      .then(() => setLoading(true))

  }, []);

  return(
    <>
      {loading && <Outlet />}
    </>
  );
};

export default AppFramework;