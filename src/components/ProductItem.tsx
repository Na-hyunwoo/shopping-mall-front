import styled from "styled-components";
import { nanoid } from 'nanoid';
import { memo, RefObject, useRef, useState, forwardRef, ForwardedRef } from "react";
import { LineHeart, FillHeart } from "../assets/svgComponents/icon";

interface ProductItemProps {
  id: number,
  name: string,
  likeCount: number,
  reviewsCount: number,
  price: number,
  discountRate: number,
  isDiscounted: boolean, 
  brand: { id: number, name: string },
  pictureID: string,
  badges: string[],
  isLast: boolean
};

const ProductItem = (props: ProductItemProps, ref: ForwardedRef<HTMLDivElement>) => {

  const {id, name, likeCount, reviewsCount, price, discountRate, 
    isDiscounted, brand, pictureID, badges, isLast} = props;

  // like click될 때 컴포넌트 전부 랜더링 되는거 별론데. 방법이 없을까 ?
  const [isLiked, setIsLiked] = useState(false);

  const formatterToOneDecimalPoint = new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  });

  const formattedLikeCount = likeCount >= 1000 
    ? formatterToOneDecimalPoint.format(likeCount)
    : likeCount;

  const formattedReviewsCount = reviewsCount >= 1000
    ? formatterToOneDecimalPoint.format(reviewsCount)
    : reviewsCount;
  
  // switch 뭔가 구린데, object로 못바꾸나 ?
  const badgeKr = (name: string) => {
    switch (name) {
      case "free_delivery":
        return "무료배송";
      case "only_styleshare": 
        return "단독";
      case "new_arrival":
        return "신상";
      default:
        return "";
    }
  }

  return (
    <Wrapper ref={isLast ? ref : null}>
      <ImgWrapper>
        <Img 
          src={`https://usercontents-d.styleshare.io/images/${pictureID}/240x240`}
          alt={name}
        />
        {isLiked 
          ? <FillHeartIcon onClick={() => setIsLiked(!isLiked)}/>
          : <LineHeartIcon onClick={() => setIsLiked(!isLiked)}/>
        }
      </ImgWrapper>
      <Title>
        <BrandName>{brand.name}</BrandName>
        {name}
      </Title>
      <Price>
        {isDiscounted && (
          <DiscountRate>{`${discountRate}%`}</DiscountRate>
        )}
        {`${Intl.NumberFormat().format(price)}원`}
      </Price>
      {badges.map((badge) => (
        <BadgeName key={nanoid()}>
          {badgeKr(badge)}
        </BadgeName>
      ))}
      <ResponseWrapper>
        <ResponseName>{`좋아요 ${formattedLikeCount}`}</ResponseName>
        <ResponseName>{`리뷰 ${formattedReviewsCount}`}</ResponseName>
      </ResponseWrapper>
    </Wrapper>
  );
};

// 이렇게 forwardRef로 정의해서 쓰는거 맞냐? 
export default forwardRef(ProductItem);

const Wrapper = styled.div`
  padding: 5px;
`;

const ImgWrapper = styled.div`
  position: relative;
  border-radius: 10px;

  width: 240px;
`;

const Img = styled.img`
  border-radius: 10px;
`;

const FillHeartIcon = styled(FillHeart)`
  position: absolute; 
  bottom: 10px;
  right: 10px;

  cursor: pointer;
`;

const LineHeartIcon = styled(LineHeart)`
  position: absolute;
  bottom: 10px;
  right: 10px;

  cursor: pointer;
`;

const BrandName = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

const Title = styled.p`
  width: 240px;
  margin-bottom: 5px;

  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const DiscountRate = styled.span`
  color: #FF0000;
  font-weight: bold;
  margin-right: 5px;
`;

const Price = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
`;

const BadgeName = styled.span`
  margin-right: 5px;
  padding: 2px;
  background: #D3D3D3;
  border-radius: 5px;
`;

const ResponseWrapper = styled.div`
  margin-top: 5px;
  color: #808080;
`;

const ResponseName = styled.span`
  margin-right: 5px;
`;