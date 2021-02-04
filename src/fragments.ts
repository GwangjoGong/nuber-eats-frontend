import { gql } from '@apollo/client';

export const RESTAURANT_FRAGEMENT = gql`
  fragment RestaurantFragment on Restaurant {
    id
    name
    coverImage
    category {
      name
    }
    address
    isPromoted
  }
`;
