import styled from "styled-components";
import ProductItem from "../components/ProductItem";
import RecommendProductContainer from "./RecommendProductContainer";
import { useRecoilValue } from "recoil";
import { recommendProductState } from "../store/products"
import React, { useRef, useEffect, createRef } from "react";


// TODO: brand, picture, badges type 이렇게 지정하는거 맞냐 ? 
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

interface PopularityOrderContainerProps {
  productList: ProductType[],
}

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

const PopularityOrderContainer = (props: PopularityOrderContainerProps) => {

  const { productList } = props;

  const recommendProducts = useRecoilValue<RecommendProductType>(recommendProductState);

  const productWrapperRef = createRef<HTMLDivElement>();

  const option = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) console.log(entry, observer);
    })
  };

  useEffect(() => {
    if (!productWrapperRef.current) return;

    const observer = new IntersectionObserver(callback, option);

    observer.observe(productWrapperRef.current);

    return () => observer.disconnect()
  }, [productWrapperRef, option, callback]);

  return (
    <ProductListWrapper>
      {productList.map((product, index) => (
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
            isLast={productList.length - 1 === index}
            ref={productWrapperRef}
          />
          {index === (recommendProducts.position - 1) &&  
            <RecommendProductContainer/>
          }
        </React.Fragment>
      ))}
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