import React, { useState } from 'react';
import styled from 'styled-components';
import { Typography } from 'src/Theme/Typography';

const Item = styled.div<{
  highlighted: boolean;
}>`
  padding: ${props => `${props.theme.space[3]}px ${props.theme.space[2]}px`};
  border: 1px solid white;
  font-weight: ${props => (props.highlighted ? 600 : 400)};
  ${Typography.body}
`;

export const TechItem = ({ item }: { item: { [K: string]: string } }) => {
  const [highlight, setHighlight] = useState(false);

  return (
    <Item
      highlighted={highlight}
      onMouseEnter={() => setHighlight(true)}
      onMouseLeave={() => setHighlight(false)}
    >
      {item.name}
    </Item>
  );
};
