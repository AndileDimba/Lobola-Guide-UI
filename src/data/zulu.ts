import type { NationData } from './types';

export const zuluData: NationData = {
  id: 'zulu',
  nationName: 'Zulu (AmaZulu)',
  theme: {
    primary: 'bg-yellow-600',
    primaryDark: 'bg-yellow-700',
    accent: 'text-yellow-700',
    border: 'border-yellow-500',
    ring: 'ring-yellow-200',
    button: 'bg-gray-900 hover:bg-gray-800',
  },
  steps: [
    {
      id: 'isicelo',
      title: 'Isicelo (The Proposal)',
      description: 'The formal opening of the marriage process where intent is declared.',
      details: [
        'The groom informs his parents of his intention.',
        'Drafting of the "Incwadi" (The Letter) to the bride\'s family.',
        'Selection of the "Omalume" (Uncles) who will act as negotiators.'
      ]
    },
    {
      id: 'imvula-mlomo',
      title: 'Imvula Mlomo',
      description: 'The "mouth opener" meeting to establish a relationship between families.',
      details: [
        'Payment of the initial fee to start talks.',
        'Formal introduction of the two families.',
        'Setting the date for the main negotiations.'
      ]
    },
    {
      id: 'lobolo-negotiations',
      title: 'Ukukhetha Izinkomo',
      description: 'The core negotiation of the bride price and traditional gifts.',
      details: [
        'Discussion of the number of cows (or monetary value).',
        'Agreement on "Imvulamlomo" and other specific gifts.',
        'Finalizing the payment terms and schedule.'
      ]
    },
    {
      id: 'umembeso',
      title: 'uMembeso',
      description: 'The groom\'s family brings gifts to thank the bride\'s family.',
      details: [
        'Gifts for the bride\'s parents, grandparents, and siblings.',
        'Traditional singing and dancing (Ukusina).',
        'Formal welcoming of the groom\'s family.'
      ]
    },
    {
      id: 'umabo',
      title: 'uMabo (Traditional Wedding)',
      description: 'The final ceremony where the bride is integrated into the groom\'s family.',
      details: [
        'The bride brings gifts to the groom\'s family.',
        'Slaughtering of a cow to signify the union.',
        'The bride receives a new name from her in-laws.'
      ]
    }
  ]
};