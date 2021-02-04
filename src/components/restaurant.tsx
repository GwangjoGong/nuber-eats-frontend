import { Link } from 'react-router-dom';

interface IProps {
  id: string;
  coverImage: string;
  name: string;
  category: string;
}

export const Restaurant: React.FC<IProps> = ({
  id,
  coverImage,
  name,
  category
}) => {
  return (
    <Link to={`/restaurant/${id}`}>
      <div
        style={{ backgroundImage: `url(${coverImage})` }}
        className='bg-red-500 bg-cover bg-center mb-3 py-32'></div>
      <h3 className='text-lg pb-3 font-medium border-b border-gray-300'>
        {name}
      </h3>
      <div className='py-2 w-full opacity-50 text-xs'>{category}</div>
    </Link>
  );
};
