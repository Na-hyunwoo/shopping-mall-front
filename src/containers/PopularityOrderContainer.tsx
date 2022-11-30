import styled from "styled-components";
import ProductItem from "../components/ProductItem";
import RecommendProductContainer from "./RecommendProductContainer";
import { useRecoilState, useRecoilValue } from "recoil";
import { popularProductState, recommendProductState } from "../store/products"
import React, { useEffect, useRef } from "react";
import { getProductsByPopularity } from "../services/api/product";

interface RecommendProductDataType extends ProductType{
  reviews: {id: number, picture: {id: string}, authorUsername: string}[],
}

interface RecommendProductType {
  type: string,
  title: string,
  position: number, 
  data: RecommendProductDataType[],
}

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

const PopularityOrderContainer = () => {

  const [popularProducts, setPopularProducts] = useRecoilState<ProductStateType>(popularProductState);
  const recommendProducts = useRecoilValue<RecommendProductType>(recommendProductState);

  const ref = useRef<HTMLDivElement>(null);

  const updatePopularProducts = async () => {
    const { data, status } = await getProductsByPopularity(popularProducts.nextUrl);

    if (status === 200) {
      setPopularProducts((prev) => ({
        ...prev,
        data: [...prev.data, ...data.data],
      }));
    }
  };

  const option = {
    root: null,
    rootMargin: '0px',
    threshold: 0.01
  };

  const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) await updatePopularProducts();
    })
  };

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(callback, option);
    observer.observe(ref.current);

    return () => observer.disconnect()
  }, []);

  return (
    <ProductListWrapper>
      {popularProducts.data.map((product, index) => (
        <React.Fragment key={product.id}>
          <ProductItem 
            id={product.id}
            name={product.name}
            likeCount={product.likeCount}
            reviewsCount={product.reviewsCount}
            price={product.price}
            discountRate={product.discountRate}
            isDiscounted={product.isDiscounted}
            brand={product.brand}
            pictureID={product.picture.id}
            badges={product.badges}
          />
          {index === (recommendProducts.position - 1) &&  
            <RecommendProductContainer/>
          }
        </React.Fragment>
      ))}
      <MockElement ref={ref}/>
    </ProductListWrapper>
  );
};

export default PopularityOrderContainer;

const ProductListWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const MockElement = styled.div``;