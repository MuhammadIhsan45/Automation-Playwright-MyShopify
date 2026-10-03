import { ProductItem, SearchScenario } from '../types/index.js';

export const TEST_PRODUCTS: Record<string, ProductItem> = {
  greyJacket: {
    name: 'Grey jacket',
    handle: 'grey-jacket',
    price: '£55.00',
    priceNumeric: 55.00
  },
  noirJacket: {
    name: 'Noir jacket',
    handle: 'noir-jacket',
    price: '£60.00',
    priceNumeric: 60.00
  },
  stripedTop: {
    name: 'Striped top',
    handle: 'striped-top',
    price: '£50.00',
    priceNumeric: 50.00
  }
};

export const SEARCH_SCENARIOS: SearchScenario[] = [
  {
    keyword: 'jacket',
    expectedMinResults: 1,
    expectedProductName: 'Grey jacket'
  },
  {
    keyword: 'sandals',
    expectedMinResults: 1,
    expectedProductName: 'sandals'
  },
  {
    keyword: 'non_existing_product_xyz_123',
    expectedMinResults: 0
  }
];

export const AUTH_SCENARIOS = {
  invalidEmailFormat: {
    email: 'not-an-email',
    password: 'password123'
  },
  unregisteredUser: {
    email: 'unregistered.qa.user@testdomain.io',
    password: 'WrongPassword99!'
  }
};
