import { createRef, Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import FilterToggle from "../components/FilterToggle";
import ProductItem from "../components/ProductItem";
import { getProductsByNewest } from "../services/api/product";
import { newestProductState } from "../store/products";

const filterList = ["무료배송", "단독"];

interface NewestOrderContainerType {
  filterState: string[],
  setFilterState: Dispatch<SetStateAction<string[]>>,
  searchParams: URLSearchParams,
  setSearchParams: Dispatch<SetStateAction<URLSearchParams>>,
}

const NewestOrderContainer = (props : NewestOrderContainerType) => {
  
  const { filterState, setFilterState, searchParams, setSearchParams } = props;

  const [newestProducts, setNewestProducts] = useRecoilState(newestProductState);

  const handleClickFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const eventTarget = e.target as HTMLElement;
    const clickedText = eventTarget.innerText;

    if (filterState.includes(clickedText)) {
      setFilterState((prev) => prev.filter((value) => value !== clickedText));

      // 필터 삭제시 query 변경 로직
      const filteredValues = searchParams.getAll("filter")
        .filter((val) => val !== clickedText);
      
      searchParams.delete("filter");
      filteredValues.forEach((val) => searchParams.append("filter", val));
      setSearchParams(searchParams);
    } else {
      setFilterState((prev) => [...prev, eventTarget.innerText]);

      searchParams.append("filter", clickedText);
      setSearchParams(searchParams);
    }
  };

  const productWrapperRef = createRef<HTMLDivElement>();

  const option = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const updatePopularProducts = async () => {
    const { data, status } = await getProductsByNewest(newestProducts.nextUrl);

    if (status === 200) {
      setNewestProducts((prev) => ({
        ...prev,
        data: [...prev.data, ...data.data],
      }));
    }
  }

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
    <>
      <FilterWrapper>
        {filterList.map(filter => (
          <FilterToggle
            key={filter}
            title={filter}
            isSelected={filterState.includes(filter)}
            onClick={handleClickFilter}
          />
        ))}
      </FilterWrapper>
      <ProductListWrapper>
        {newestProducts.data.map((product, index) => (
          <ProductItem 
            key={product.id}
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
            isLast={newestProducts.data.length - 1 === index}
            ref={productWrapperRef}
          />
        ))}
      </ProductListWrapper>
    </>
  );
};

export default NewestOrderContainer;

const FilterWrapper = styled.div`
  width: 100vw;
  display: flex;

  gap: 10px;

  padding: 10px;
`;

const ProductListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;