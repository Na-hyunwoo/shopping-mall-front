import styled from "styled-components";
import ProductItem from "../components/ProductItem";
import RecommendProductContainer from "./RecommendProductContainer";
import { useRecoilState, useRecoilValue } from "recoil";
import { popularProductState, recommendProductState } from "../store/products"
import React, { useEffect, createRef } from "react";
import { getProductsByPopularity } from "../services/api/product";

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

type ProductStateType = {
  data: ProductType[],
  nextUrl : string
}

const PopularityOrderContainer = () => {

  const [popularProducts, setPopularProducts] = useRecoilState<ProductStateType>(popularProductState);
  const recommendProducts = useRecoilValue<RecommendProductType>(recommendProductState);

  const productWrapperRef = createRef<HTMLDivElement>();

  const option = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };


  // 왜 nextUrl이 빈스트링으로 안나오지 ? 빈 스트링으로 나와야 하는 것 아닌가 당연히도 ? 
  const updatePopularProducts = async () => {
    const { data, status } = await getProductsByPopularity(popularProducts.nextUrl);

    if (status === 200) {
      setPopularProducts((prev) => ({
        ...prev,
        data: [...prev.data, ...data.data],
      }));
    }
  };

  const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        await updatePopularProducts();
      }
    })
  };

  useEffect(() => {
    if (!productWrapperRef.current) return;

    const observer = new IntersectionObserver(callback, option);

    observer.observe(productWrapperRef.current);

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
            isLast={popularProducts.data.length - 1 === index}
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