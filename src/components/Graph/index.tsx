import React, { useEffect, useRef } from 'react';
import { radar_visualization, showBubble, hideBubble } from 'src/utils/d3';
import { d3Config } from 'src/utils/d3-config';
import styled from 'styled-components';
import { MediaQueries } from 'src/Theme/Helpers';

const GraphContainer = styled.div`
  width: 100%;
  max-width: 440px;
  min-width: 280px;
  height: auto;
  pointer-events: none;
  margin: auto;

  @media ${MediaQueries.phablet} {
    pointer-events: all;

  }
  @media ${MediaQueries.desktop} {
    margin: 0;
    margin-left: auto;

    .sticky {
      position: sticky;
      top: 0;
    }
  }


`;
interface TechnologiesListProps {
  technologies: Technology[];
  highlighted: string | null;
  setHighlighted: (a: string | null) => void;
  setSelected: (a: string | null) => void;
  quadrant: number;
  className?: string | undefined;
}

export const Graph: React.FC<TechnologiesListProps> = ({
  highlighted,
  quadrant,
  technologies,
  setHighlighted,
  setSelected,
  className: StylesFromParent,
}) => {
  const d3Container = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (d3Container.current) {
      radar_visualization(
        d3Container.current,
        technologies,
        d3Config,
        setHighlighted,
        setSelected,
        {
          width: 460,
          height: 460,
          quadrant,
        },
      );
    }
  }, [technologies, quadrant, setHighlighted]);

  useEffect(() => {
    const technology = technologies?.find(t => t.name === highlighted);
    if (technology) {
      showBubble(technology);
    } else {
      hideBubble();
    }
  }, [highlighted, technologies]);

  return (
    <GraphContainer className={StylesFromParent}>
      <div className="sticky"><svg ref={d3Container} /></div>
    </GraphContainer>
  );
};
