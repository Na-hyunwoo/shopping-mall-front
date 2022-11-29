import styled from "styled-components";

type RecommendProductType = {
  id: number,
  name: string,
  reviewsCount: number,
  price: number,
  discountRate: number,
  isDiscounted: boolean,
  brandId: number,
  brandName: string,
  pictureId: string,
  badges: string[],
  reviews: {id: number, picture: {id: string}, authorUsername: string}[],
}

const RecommendProduct = (props : RecommendProductType) => {

  const {id, name, reviewsCount, price, discountRate, isDiscounted, 
    brandId, brandName, pictureId, badges, reviews} = props;

  const formatterToOneDecimalPoint = new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  });

  const formattedReviewsCount = reviewsCount >= 1000 
    ? formatterToOneDecimalPoint.format(reviewsCount)
    : reviewsCount;

  return (
    <Wrapper>
      <Top>
        <TitleImg 
          src={`https://usercontents-d.styleshare.io/images/${pictureId}/90x90`}
          alt={name}
        />
        <Title>
          <Name>
            <BrandName>{brandName}</BrandName>
            {name}
          </Name>
          <Price>
            <DiscountRate>{`${discountRate}%`}</DiscountRate>
            {`${Intl.NumberFormat().format(price)}원`}
          </Price>
        </Title>
      </Top>
      <Bottom>
        {reviews.map((review) => (
          <ReviewImg 
            key={review.id}
            src={`https://usercontents-d.styleshare.io/images/${review.picture.id}/110x110`}
          />
        ))}
        <ReviewsCount>{`+${formattedReviewsCount}`}</ReviewsCount>
      </Bottom>
    </Wrapper>
  );
};

export default RecommendProduct;

const Wrapper = styled.div`
  width: 390px;
  height: 240px;

  margin: 0px 5px;
  
  border-radius: 5px;
  overflow: hidden;
`;

const Top = styled.div`
  height: 110px;
  background: #E2E2E2;

  padding: 10px;
  display: flex;
`;

const TitleImg = styled.img`
  border-radius: 5px;
`;

const Title = styled.div`
  padding: 5px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Name = styled.p`
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BrandName = styled.span`
  font-weight: bold;
`;

const Price = styled.span`
  font-weight: bold;
`;

const DiscountRate = styled.span`
  margin-right: 5px;

  color: #FF0000;
`;

const Bottom = styled.div`
  height: 130px;

  display: flex;
  position: relative;
`;

const ReviewImg = styled.img`
`;

const ReviewsCount = styled.div`
  border-radius: 20px;
  padding: 2.5px 5px;

  position: absolute;
  bottom: 5px;
  right: 5px;

  background-color: #000;
  opacity: 0.7;
  color: #FFF;

  display: flex;
  align-items: center;
  justify-content: center;
`;