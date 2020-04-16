/// <reference types="Cypress" />

import { dataTestId, hexToRgb } from 'helpers';
import { d3Config } from '../../src/utils/d3-config';

describe('Home', () => {
  beforeEach(() => {
    //go to home page
    cy.visit('/');
  });

  it('renders page skeleton when request is in progress', () => {
    dataTestId('home-skeleton').should('be.visible');
  });

  it('renders page elements', () => {
    dataTestId('home-intro').should('be.visible');

    dataTestId('home-intro-title')
      .should('be.visible')
      .contains('Whats this all about?');

    dataTestId('home-intro-content')
      .should('be.visible')
      .contains('Consequat incididunt');

    dataTestId('graph')
      .should('be.visible')
      .should('have.attr', 'viewBox', '0 0 800 800');
  });

  d3Config.quadrants.forEach((quadrant, i) => {
    it(`renders quadrant ${i} and redirects to proper quadrant on link click`, () => {
      dataTestId(`home-quadrant-${i}-container`).should('be.visible');

      dataTestId(`home-quadrant-${i}-title`).contains(quadrant.name);

      dataTestId(`home-quadrant-${i}-content`).contains('Ex tempor nulla est');

      dataTestId(`home-quadrant-${i}-link`)
        .contains('look at ' + quadrant.name)
        .click();

      cy.url().should('include', `/${quadrant.route}`);
    });
  });

  d3Config.quadrants.forEach((quadrant, i) => {
    it(`highlights quadrant on ${i} on hover and redirects to proper page on click`, () => {
      dataTestId('graph')
        .wait(500)
        .get(`[data-testid=quadrant-${i}]`)
        .should('have.css', 'opacity', '0')
        .trigger('mouseover', 'center');

      d3Config.quadrants
        .map((_, index) => index)
        .filter(index => i !== index)
        .forEach(otherQuadrantIndex => {
          dataTestId('graph')
            .get(`[data-testid=quadrant-${otherQuadrantIndex}]`)
            .should('have.css', 'opacity', '0.3');
        });

      dataTestId(`quadrant-${i}`).click();
      cy.url().should('include', `/${d3Config.quadrants[(2 + i) % 4].route}`);
    });
  });

  d3Config.quadrants.forEach((quadrant, i) => {
    it(`shows quadrant ${i} tooltip on hover`, () => {
      dataTestId('graph')
        .get(`[data-testid=quadrant-${i}]`)
        .trigger('mouseover', 'center');

      dataTestId(`graph-tooltip`)
        .should('be.visible')
        .should(
          'have.css',
          'background-color',
          hexToRgb(d3Config.quadrants[(2 + i) % 4].color),
        )
        .should('have.text', d3Config.quadrants[(2 + i) % 4].name);
    });
  });
});
