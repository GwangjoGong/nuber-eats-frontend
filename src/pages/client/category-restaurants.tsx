import { gql, useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { RESTAURANT_FRAGEMENT } from '../../fragments';
import {
  categoryRestaurant,
  categoryRestaurantVariables
} from '../../__generated__/categoryRestaurant';

interface IParams {
  slug: string;
}

const CATEGORY_RESTAURANT = gql`
  query categoryRestaurant($input: CategoryRestaurantInput!) {
    categoryRestaurant(input: $input) {
      ok
      error
      totalPages
      restaurants {
        ...RestaurantFragment
      }
    }
  }
  ${RESTAURANT_FRAGEMENT}
`;

export const CategoryRestaurants = () => {
  const { slug } = useParams<IParams>();
  const history = useHistory();
  const [categoryRestaurant, { data }] = useLazyQuery<
    categoryRestaurant,
    categoryRestaurantVariables
  >(CATEGORY_RESTAURANT);

  useEffect(() => {
    if (!slug) {
      return history.replace('/');
    }
    categoryRestaurant({
      variables: {
        input: {
          page: 1,
          slug
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2>CategoryRestaurants</h2>
      {JSON.stringify(data)}
    </div>
  );
};
