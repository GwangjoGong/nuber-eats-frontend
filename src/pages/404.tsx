import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export const NotFound = () => (
  <div className='h-screen flex flex-col items-center justify-center'>
    <Helmet>
      <title>Not Found | Nuber Eats</title>
    </Helmet>
    <h2 className='text-3xl font-bold mb-3'>404 Not Found</h2>
    <h4 className='mb-5'>
      The page you are looking for does not exists or has moved
    </h4>
    <Link to='/' className='text-ubergreen hover:underline'>
      Go to Home
    </Link>
  </div>
);
