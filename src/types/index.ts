export interface ProductItem {
  id?: string;
  name: string;
  handle: string;
  price: string;
  priceNumeric: number;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface SearchScenario {
  keyword: string;
  expectedMinResults: number;
  expectedProductName?: string;
}
