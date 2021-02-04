import { Link } from 'react-router-dom';

interface IProps {
  coverImage: string;
  name: string;
  slug: string;
}

export const Category: React.FC<IProps> = ({ slug, coverImage, name }) => {
  return (
    <Link
      to={`/category/${slug}`}
      className='flex flex-col group align-center cursor-pointer'>
      <div
        className='w-16 h-16 rounded-full mx-5 bg-cover bg-red-800 group-hover:bg-gray-200'
        style={{
          backgroundImage: `url(${coverImage})`
        }}></div>
      <span className='text-sm text-center font-medium mt-2'>{name}</span>
    </Link>
  );
};
