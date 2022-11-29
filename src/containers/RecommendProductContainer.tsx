import styled from "styled-components";
import RecommendProduct from "../components/RecommendProduct";
import { useRecoilValue } from "recoil";
import { recommendProductState } from "../store/products";

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

const RecommendProductContainer = () => {

  const recommendProducts = useRecoilValue<RecommendProductType>(recommendProductState);
  
  return (
    <Wrapper>
      <Divider />
      <Title>{recommendProducts.title}</Title>
      <Body>
        <RecommendProductWrapper>
          {recommendProducts.data.map((product) => (
            <RecommendProduct 
              key={product.id}
              id={product.id}
              name={product.name}
              reviewsCount={product.reviewsCount}
              price={product.price}
              discountRate={product.discountRate}
              isDiscounted={product.isDiscounted}
              brandId={product.brand.id}
              brandName={product.brand.name}
              pictureId={product.picture.id}
              badges={product.badges}
              reviews={product.reviews}
            />
          ))}
        </RecommendProductWrapper>
      </Body>
      <Divider />              
    </Wrapper>
  )
}

export default RecommendProductContainer;

const Title = styled.h3`
  padding: 5px;
`;

const Body = styled.div`
  width: 100%;
  overflow: auto;
  padding: 5px 0px;

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #D3D3D3;
  }
`;


const RecommendProductWrapper = styled.div`
  display: flex;
  width: 2400px;
`;

const Divider = styled.div`
  border-top: 1px solid #D3D3D3;
  margin: 30px 0px;
`;

const Wrapper = styled.div`
  grid-column: span 3;
`;