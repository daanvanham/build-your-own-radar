import styled from 'styled-components';
import { Typography } from 'Theme/Typography';
import { MediaQueries } from 'Theme/Helpers';

export const ContentTitle = styled.h2`
  ${Typography.header};
  font-size: ${props => props.theme.fontSize[1]}em;

  @media (${MediaQueries.phablet}) {
    font-size: ${props => props.theme.fontSize[1]}em;
    margin-top: 0;
    margin-bottom: ${props => props.theme.space[3]}px;
  }
`;
