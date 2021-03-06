import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectedDataSetSelector } from 'redux/selectors/filters';
import { filtersActions } from 'redux/actions/filters';
import { dateFormat } from 'utils';
import { useClickAway } from 'hooks/useClickAway';
import {
  Container,
  Selected,
  Text,
  Triangle,
  Option,
  DropDown,
} from './styled';

export const DataSetFilter = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const { availableDates, selected } = useSelector(selectedDataSetSelector);
  const dispatch = useDispatch();
  const filterContainer = useClickAway(setOpened);
  const toggleOpened = (opened: boolean) => setOpened.bind(null, opened);

  return (
    <Container data-testid="dataSetFilter-container" ref={filterContainer}>
      <Selected
        data-testid="dataSetFilter-anchor"
        onClick={toggleOpened(!opened)}
      >
        <Text data-testid="dataSetFilter-text">{dateFormat(selected)}</Text>
        <Triangle
          opened={opened}
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
          role="presentation"
        >
          <path d="M7 10l5 5 5-5z" />
        </Triangle>
      </Selected>
      {opened && (
        <DropDown opened={opened} data-testid="dataSetFilter-dropdown">
          {availableDates.map(date => (
            <Option
              key={date}
              data-testid={`dataSetFilter-dropdown-option-${date}`}
              selected={selected === date}
              onClick={() => {
                dispatch(filtersActions.selectDataSet(date));
                setOpened(false);
              }}
            >
              {dateFormat(date)}
            </Option>
          ))}
        </DropDown>
      )}
    </Container>
  );
};
