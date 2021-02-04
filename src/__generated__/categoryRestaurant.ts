/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoryRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: categoryRestaurant
// ====================================================

export interface categoryRestaurant_categoryRestaurant_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface categoryRestaurant_categoryRestaurant_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: categoryRestaurant_categoryRestaurant_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface categoryRestaurant_categoryRestaurant {
  __typename: "CategoryRestaurantOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  restaurants: categoryRestaurant_categoryRestaurant_restaurants[] | null;
}

export interface categoryRestaurant {
  categoryRestaurant: categoryRestaurant_categoryRestaurant;
}

export interface categoryRestaurantVariables {
  input: CategoryRestaurantInput;
}
