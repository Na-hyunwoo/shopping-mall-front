import styled from "styled-components";
import React, { useEffect, useState } from "react";
import TopTab from "../components/TopTab";
import { useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { newestProductState, popularProductState } from "../store/products";
import NewestOrderContainer from "../containers/NewestOrderContainer";
import PopularityOrderContainer from "../containers/PopularityOrderContainer";

const tabList = ["인기순", "최신순"];

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

const ProductListPage = () => {

  const popularProducts = useRecoilValue<ProductType[]>(popularProductState);
  const newestProducts = useRecoilValue<ProductType[]>(newestProductState);

  const [tabState, setTabState] = useState<string>("인기순");
  const [productList, setProductList] = useState<ProductType[]>(popularProducts);
  const [filterState, setFilterState] = useState<string[]>([]);

  const [searchParams, setSearchParams] = useSearchParams({});
  
  const handleClickTab = (e: React.MouseEvent<HTMLDivElement>) => {
    const eventTarget = e.target as HTMLElement;
    const clickedText = eventTarget.innerText;

    setTabState(clickedText);
  };

  useEffect(() => {
    tabState === "인기순"
      ? setProductList(popularProducts)
      : setProductList(newestProducts);

    setSearchParams({});
    setFilterState([]);
  }, [tabState]);

  return (
    <Wrapper>
      <InnerWrapper>
        <TabWrapper>
          {tabList.map(tab => (
            <TopTab
              key={tab}
              title={tab}
              isSelected={tab === tabState}
              onClick={handleClickTab}
            />
          ))}
        </TabWrapper>
        {tabState === "최신순" && 
          <NewestOrderContainer 
            filterState={filterState}
            setFilterState={setFilterState}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            productList={productList}
          />
        }
        {tabState === "인기순" && 
          <PopularityOrderContainer 
            productList={productList}
          />
        }
      </InnerWrapper>
    </Wrapper>
  );
};

export default ProductListPage;

const Wrapper = styled.div`
  width: 100vw;
`;

const InnerWrapper = styled.div`
  max-width: 768px;

  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 480px;
  }
`;

const TabWrapper = styled.div`
  width: 100%;
  display: flex;
`;