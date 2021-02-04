import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Category } from '../../components/category';
import { Restaurant } from '../../components/restaurant';
import { RESTAURANT_FRAGEMENT } from '../../fragments';
import { usePagination } from '../../hooks/usePagination';
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables
} from '../../__generated__/restaurantsPageQuery';

interface IFormProps {
  searchTerm: string;
}

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImage
        slug
        restaurantCount
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      results {
        ...RestaurantFragment
      }
    }
  }
  ${RESTAURANT_FRAGEMENT}
`;

export const Restaurants = () => {
  const [totalPages, setTotalPages] = useState(1);
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const { page, Pagination } = usePagination(totalPages);
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page
      }
    },
    onCompleted: ({ restaurants: { totalPages } }) => {
      setTotalPages(totalPages!);
    }
  });

  const history = useHistory();

  const onSubmit = () => {
    const { searchTerm } = getValues();
    history.push({
      pathname: '/search',
      search: `term=${searchTerm}`
    });
  };

  return (
    <div>
      <Helmet>
        <title>Restaurants | Nuber Eats</title>
      </Helmet>
      <form
        className='bg-gray-800 w-full py-40 flex items-center justify-center'
        onSubmit={handleSubmit(onSubmit)}>
        <input
          ref={register({
            required: true,
            min: 3
          })}
          name='searchTerm'
          className='input w-3/12 rounded-md border-0'
          type='search'
          placeholder='Search Restaurants...'
        />
      </form>
      {!loading && (
        <div className='container'>
          <div className='flex justify-center py-5 border-b border-gray-200'>
            {data?.allCategories.categories?.map((category) => (
              <Category
                key={category.id}
                slug={category.slug}
                coverImage={category.coverImage!}
                name={category.name}
              />
            ))}
          </div>
          <div className='py-5 grid md:grid-cols-2 xl:grid-cols-3 gap-7'>
            {data?.restaurants.results?.map((restaurant) => (
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
      )}
    </div>
  );
};
