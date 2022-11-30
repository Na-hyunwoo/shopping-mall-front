import { createRef, Dispatch, SetStateAction, useEffect, useRef } from "react";
import styled from "styled-components";
import FilterToggle from "../components/FilterToggle";
import ProductItem from "../components/ProductItem";

const filterList = ["무료배송", "단독"];

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

interface NewestOrderContainerProps {
  filterState: string[],
  setFilterState: Dispatch<SetStateAction<string[]>>,
  searchParams: URLSearchParams,
  setSearchParams: Dispatch<SetStateAction<URLSearchParams>>,
  productList: ProductType[],
}

const NewestOrderContainer = (props : NewestOrderContainerProps) => {
  
  const { filterState, setFilterState, searchParams, setSearchParams, productList } = props;

  const handleClickFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const eventTarget = e.target as HTMLElement;
    const clickedText = eventTarget.innerText;

    if (filterState.includes(clickedText)) {
      setFilterState((prev) => prev.filter((value) => value !== clickedText));

      // 필터 삭제시 query 변경 로직
      const filterValues = searchParams.getAll("filter");
      const filteredValues = filterValues.filter((val) => val !== clickedText);
      
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
        {productList.map((product, index) => (
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
            isLast={productList.length - 1 === index}
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