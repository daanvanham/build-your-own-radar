import React from 'react';
import { Link } from 'react-router-dom';
import { MainContentSlot } from '../shared/PageSlots';
import styled from 'styled-components';
import { MediaQueries } from 'Theme/Helpers';
import { ContentTitle } from 'components/shared/ContentTitle';
import { d3Config } from 'utils/d3-config';
import { Typography } from 'Theme/Typography';
import { Graph } from 'components/Graph';
import { useSelector } from 'react-redux';
import {
  selectedTechnologyDataSetSelector,
  technologiesLoadingStateSelector,
} from 'redux/selectors/technologies';

const Intro = styled.div`
  margin: auto;
  margin-bottom: ${props => props.theme.space[2]}px;
  max-width: 48em;

  @media ${MediaQueries.phablet} {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
  @media ${MediaQueries.desktop} {
    margin-bottom: ${props => props.theme.space[5]}px;
  }
`;

const Quads = styled.div`
  display: grid;
  grid-template-columns: repeat(1fr);
  grid-gap: ${props => props.theme.space[4]}px;

  @media ${MediaQueries.tablet} {
    grid-template-columns: repeat(auto-fit, minmax(25em, 1fr));
  }
`;

const Quadrant = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: ${props => props.theme.space[2]}px;

  @media ${MediaQueries.tablet} {
    width: 100%;
    margin-bottom: ${props => props.theme.space[4]}px;
  }
`;

const Content = styled.p`
  ${Typography.body};
  margin: 0;
  margin-bottom: ${props => props.theme.space[3]}px;
`;

const StyledLinks = styled(Link)`
  margin-top: auto;
  text-decoration: none;
  font-weight: 700;
  color: ${props => props.theme.pallet.primary};
`;

export const Home: React.FC = () => {
  const quads = d3Config.quadrants;
  const { initialized, loading, error, errorMessage } = useSelector(
    technologiesLoadingStateSelector,
  );
  const technologies = useSelector(selectedTechnologyDataSetSelector);
  const showLoader = !initialized || loading;

  if (showLoader) {
    //TODO: replace this with component loading skeleton
    return <div> LOADING </div>;
  }

  if (error) {
    //TODO: replace this with component error state
    return <div>Unexpected error occured: {errorMessage}</div>;
  }

  if (technologies === null) {
    //TODO: define the state when no technologies from API
    return null;
  }

  return (
    <MainContentSlot>
      <Intro>
        <ContentTitle data-testid="home-title">
          Whats this all about?
        </ContentTitle>
        <Content>
          Consequat incididunt in occaecat reprehenderit culpa elit. Est
          cupidatat ex dolore duis do aliquip magna ullamco anim. Fugiat non eu
          laboris ut ea aute.
        </Content>
      </Intro>
      <Graph highlighted={null} technologies={technologies} fullSize />
      <Quads>
        {quads.map((quad, i) => (
          <Quadrant key={i} data-testid={`quadrant-container-${i}`}>
            <ContentTitle>{quad.name}</ContentTitle>
            <Content>
              Ex tempor nulla est nostrud non consectetur enim commodo. Elit
              aute ex pariatur commodo aute. Adipisicing eu dolore fugiat culpa
              deserunt id reprehenderit. Reprehenderit eiusmod exercitation
              labore sint enim.
            </Content>
            <StyledLinks to={`/${quad.route}`}>look at {quad.name}</StyledLinks>
          </Quadrant>
        ))}
      </Quads>
    </MainContentSlot>
  );
};
