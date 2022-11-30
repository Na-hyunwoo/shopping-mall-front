import styled from "styled-components";
import React, { useEffect, useState } from "react";
import TopTab from "../components/TopTab";
import { useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { newestProductState, popularProductState } from "../store/products";
import NewestOrderContainer from "../containers/NewestOrderContainer";
import PopularityOrderContainer from "../containers/PopularityOrderContainer";

const tabList = ["인기순", "최신순"];

const ProductListPage = () => {

  const [tabState, setTabState] = useState<string>("인기순");
  const [filterState, setFilterState] = useState<string[]>([]);

  const [searchParams, setSearchParams] = useSearchParams({});
  
  const handleClickTab = (e: React.MouseEvent<HTMLDivElement>) => {
    const eventTarget = e.target as HTMLElement;
    const clickedText = eventTarget.innerText;

    setTabState(clickedText);
  };

  useEffect(() => {
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
          />
        }
        {tabState === "인기순" && 
          <PopularityOrderContainer />
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