import styled from "styled-components";
import ProductItem from "../components/ProductItem";
import RecommendProductContainer from "./RecommendProductContainer";
import { useRecoilValue } from "recoil";
import { recommendProductState } from "../store/products"

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

  return (
    <ProductListWrapper>
      {productList.map((product, index) => (
        <>
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
          />
          {index === (recommendProducts.position - 1) &&  
            <RecommendProductContainer />
          }
        </>
      ))}
    </ProductListWrapper>
  );
};

export default PopularityOrderContainer;

const ProductListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;