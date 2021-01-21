import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import EatsLogo from '../assets/eats_logo.svg'
import { useMe } from '../hooks/useMe'

export const Header: React.FC = () => {
  const { data } = useMe()

  return (
    <>
      {!data?.me.verified && (
        <div className='bg-red-500 text-center text-xs p-3 text-white'>
          <span>Please verify your email.</span>
        </div>
      )}
      <header className='py-4'>
        <div className='container px-5 xl:px-0 flex justify-between items-center'>
          <img className='w-24' src={EatsLogo} alt='uber_eats_logo' />
          <span className='text-xs'>
            <Link to='/profile'>
              <FontAwesomeIcon className='text-lg' icon={faUser} />
            </Link>
          </span>
        </div>
      </header>
    </>
  )
}
