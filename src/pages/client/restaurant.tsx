import { gql, useQuery } from '@apollo/client';
import { useHistory, useParams } from 'react-router-dom';
import { RESTAURANT_FRAGEMENT } from '../../fragments';
import {
  restaurant,
  restaurantVariables
} from '../../__generated__/restaurant';

interface IParams {
  id: string;
}

const RESTAURANT = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantFragment
        menu {
          id
          name
          price
          photo
          description
          options {
            name
            choices {
              item
              cost
            }
            cost
          }
        }
      }
    }
  }
  ${RESTAURANT_FRAGEMENT}
`;

export const Restaurant = () => {
  const { id } = useParams<IParams>();
  const history = useHistory();

  const { data } = useQuery<restaurant, restaurantVariables>(RESTAURANT, {
    variables: {
      input: {
        restaurantId: +id
      }
    },
    onCompleted: (data) => {
      if (!data.restaurant.ok) {
        history.replace('/');
      }
    }
  });

  return (
    <div>
      <div
        className='bg-gray-800 bg-center bg-cover py-48'
        style={{
          backgroundImage: `url(${data?.restaurant.restaurant?.coverImage})`
        }}>
        <div className='bg-white w-3/12 py-6 pl-44'>
          <h4 className='text-3xl mb-3'>{data?.restaurant.restaurant?.name}</h4>
          <h5 className='text-sm font-light mb-3'>
            {data?.restaurant.restaurant?.category?.name}
          </h5>
          <h5 className='text-sm font-light'>
            {data?.restaurant.restaurant?.address}
          </h5>
        </div>
      </div>
    </div>
  );
};
