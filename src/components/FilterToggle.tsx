import styled from "styled-components";
import React from "react";

// interface type 통합하기.
interface FilterToggleProps {
  title: string,
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
  isSelected: boolean,
}

const FilterToggle = (props: FilterToggleProps) => {

  const { title, onClick, isSelected } = props;

  return (
    <Button 
      onClick={onClick}
      isSelected={isSelected}
    >{title}</Button>
  );
};

export default FilterToggle;

const Button = styled.button<{ isSelected: boolean }>`
  padding: 5px;

  border: 1px solid;

  background-color: ${({isSelected}) => isSelected 
    ? `rgb(77, 0, 235)`
    : `#FFF`
  };
`;