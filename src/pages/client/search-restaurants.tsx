import { useHistory, useLocation } from 'react-router-dom';
import * as queryString from 'query-string';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { RESTAURANT_FRAGEMENT } from '../../fragments';
import {
  searchRestaurants,
  searchRestaurantsVariables
} from '../../__generated__/searchRestaurants';
import { Restaurant } from '../../components/restaurant';
import { usePagination } from '../../hooks/usePagination';

const SEARCH_RESTAURANTS = gql`
  query searchRestaurants($input: SearchRestaurantInput!) {
    searchRestaurants(input: $input) {
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

export const SearchRestaurants = () => {
  const history = useHistory();
  const [totalPages, setTotalPages] = useState(1);
  const { search } = useLocation();
  const { term } = queryString.parse(search);
  const { page, Pagination } = usePagination(totalPages);

  const [searchRestaurant, { data }] = useLazyQuery<
    searchRestaurants,
    searchRestaurantsVariables
  >(SEARCH_RESTAURANTS, {
    onCompleted: ({ searchRestaurants: { totalPages } }) => {
      setTotalPages(totalPages!);
    }
  });

  useEffect(() => {
    if (!term) {
      return history.replace('/');
    }

    searchRestaurant({
      variables: {
        input: {
          query: String(term),
          page
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container'>
      <Helmet>
        <title>Search | Nuber Eats</title>
      </Helmet>
      <div className='py-5 grid md:grid-cols-2 xl:grid-cols-3 gap-7'>
        {data?.searchRestaurants.restaurants?.map((restaurant) => (
          <Restaurant
            key={restaurant.id}
            id={restaurant.id + ''}
            coverImage={restaurant.coverImage}
            name={restaurant.name}
            category={restaurant.category?.name!}
          />
        ))}
      </div>
      <Pagination />
    </div>
  );
};
