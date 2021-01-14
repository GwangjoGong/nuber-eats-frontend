import { gql, useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { FormError } from '../components/form-error'
import {
  loginMutation,
  loginMutationVariables
} from '../__generated__/loginMutation'
import EatsLogo from '../assets/eats_logo.svg'
import { Button } from '../components/button'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { isLoggedInVar, jwtTokenVar } from '../apollo'
import { LOCAL_STORAGE_TOKEN } from '../constants'

const LOGIN_MUTATION = gql`
  mutation loginMutation($input: LoginInput!) {
    login(input: $input) {
      ok
      error
      token
    }
  }
`

interface IForm {
  email: string
  password: string
}

const Login = () => {
  const {
    register,
    watch,
    errors,
    handleSubmit,
    formState: { isValid }
  } = useForm<IForm>({ mode: 'onChange' })

  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token }
    } = data
    if (ok && token) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN, token)
      jwtTokenVar(token)
      isLoggedInVar(true)
    }
  }

  const [loginMutation, { data: loginResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted
  })

  const onSubmit = () => {
    if (!loading) {
      loginMutation({
        variables: {
          input: {
            email: watch().email,
            password: watch().password
          }
        }
      })
    }
  }

  return (
    <div className='h-screen flex flex-col items-center'>
      <Helmet>
        <title>Login | Nuber Eats</title>
      </Helmet>
      <div className='bg-white w-full max-w-lg px-5'>
        <div className='w-full flex items-center justify-center lg:my-20 my-10'>
          <img className='w-52' src={EatsLogo} alt='uber_eats_logo' />
        </div>
        <h3 className='text-3xl font-normal mb-6'>Welcome back</h3>
        <span className='font-thin'>
          Sign in with your email address and password.
        </span>
        <form className='grid gap-5 mt-3' onSubmit={handleSubmit(onSubmit)}>
          <input
            ref={register({
              required: 'Email is required'
            })}
            className='input'
            name='email'
            required
            type='email'
            placeholder='Email'
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <input
            ref={register({
              required: 'Password is required'
            })}
            className='input mb-2'
            name='password'
            required
            type='password'
            placeholder='Password'
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          <Button canClick={isValid} actionText='Log In' loading={loading} />
          {loginResult?.login.error && (
            <FormError errorMessage={loginResult.login.error} />
          )}
        </form>
        <div className='w-full text-center mt-4'>
          New to Nuber?{' '}
          <Link to='/register' className='text-ubergreen hover:underline'>
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
