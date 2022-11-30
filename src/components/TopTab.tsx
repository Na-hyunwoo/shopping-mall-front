import React from "react";
import styled from "styled-components";

interface TobTabTypes {
  title: string,
  isSelected: boolean,
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void,
}

const TopTab = (props: TobTabTypes) => {

  const {title, isSelected, onClick} = props;

  return (
    <Wrapper 
      onClick={onClick}
      isSelected={isSelected}
    >
      <Title isSelected={isSelected}>{title}</Title>
    </Wrapper>
  );
};

export default TopTab;

const Wrapper = styled.div<{ isSelected: boolean }>`
  width: 100%;

  border-bottom: ${({ isSelected }) => isSelected 
    ? `1px solid`
    : ``
  }
`;

const Title = styled.p<{ isSelected: boolean }>`
  padding: 10px 0px;

  text-align: center;
`;