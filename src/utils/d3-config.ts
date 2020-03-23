import { baseTheme } from '../Theme/index';

export const d3Config = {
  svg_id: 'radar',
  colors: {
    background: 'none',
    grid: '#bbb',
    inactive: '#ddd',
  },
  quadrants: [
    {
      route: 'frameworks-and-lang',
      name: 'Frameworks, CMS & Programmeertalen',
      color: baseTheme.pallet.green,
    },
    {
      route: 'tooling-and-testing',
      name: 'Tooling en testing',
      color: baseTheme.pallet.cyan,
    },
    {
      route: 'platforms-infra-and-data',
      name: 'Platforms, infrastructure & Data',
      color: baseTheme.pallet.orange,
    },
    { route: 'technique', name: 'Technieken', color: baseTheme.pallet.purple },
  ],
  tooltips: {
    Adopt : 'We feel strongly that the industry should be adopting these items. We use them when appropriate on our projects.',
    Trial: 'Worth pursuing. It is important to understand how to build up this capability. Enterprises should try this technology on a project that can handle the risk.',
    Assess: 'Worth exploring with the goal of understanding how it will affect your enterprise.',
    Hold: 'Proceed with caution.',
  },
  rings: [
    { name: 'Adopt', color: '#17a2b8', backgroundColor: '#BFC0BF' } as const,
    { name: 'Trial', color: '#17a2b8', backgroundColor: '#CBCCCB' } as const,
    { name: 'Assess', color: '#17a2b8', backgroundColor: '#D7D8D6' } as const,
    { name: 'Hold', color: '#17a2b8', backgroundColor: '#E4E5E4' } as const,
  ],
};
