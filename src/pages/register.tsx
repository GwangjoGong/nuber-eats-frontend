import { gql, useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { FormError } from '../components/form-error'

import EatsLogo from '../assets/eats_logo.svg'
import { Button } from '../components/button'
import { Link, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  createUserMutation,
  createUserMutationVariables
} from '../__generated__/createUserMutation'

import { UserRole } from '../__generated__/globalTypes'

const CREATE_USER_MUTATION = gql`
  mutation createUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      ok
      error
    }
  }
`

interface IForm {
  email: string
  password: string
  role: UserRole
}

const Register = () => {
  const {
    register,
    watch,
    errors,
    handleSubmit,
    formState: { isValid }
  } = useForm<IForm>({
    mode: 'onChange',
    defaultValues: {
      role: UserRole.Client
    }
  })

  const history = useHistory()

  const onCompleted = (data: createUserMutation) => {
    const {
      createUser: { ok }
    } = data
    if (ok) {
      alert('Successfully registered. Log in now.')
      history.push('/')
    }
  }

  const [createUserMutation, { data: createUserResult, loading }] = useMutation<
    createUserMutation,
    createUserMutationVariables
  >(CREATE_USER_MUTATION, {
    onCompleted
  })

  const onSubmit = () => {
    if (!loading) {
      createUserMutation({
        variables: {
          input: {
            email: watch().email,
            password: watch().password,
            role: watch().role
          }
        }
      })
    }
  }

  return (
    <div className='h-screen flex flex-col items-center'>
      <Helmet>
        <title>Register | Nuber Eats</title>
      </Helmet>
      <div className='bg-white w-full max-w-lg px-5'>
        <div className='w-full flex items-center justify-center lg:my-20 my-10'>
          <img className='w-52' src={EatsLogo} alt='uber_eats_logo' />
        </div>
        <h3 className='text-3xl font-normal mb-6'>Let's get started</h3>
        <span className='font-thin'>
          Enter your email and password (required)
        </span>
        <form className='grid gap-5 mt-3' onSubmit={handleSubmit(onSubmit)}>
          <input
            ref={register({
              required: 'Email is required',
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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
          {errors.email?.type === 'pattern' && (
            <FormError errorMessage='Invalid email pattern' />
          )}
          <input
            ref={register({
              required: 'Password is required'
            })}
            className='input'
            name='password'
            required
            type='password'
            placeholder='Password'
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          <select ref={register} name='role' className='input mb-2'>
            {Object.keys(UserRole).map((role) => (
              <option key={role}>{role}</option>
            ))}
          </select>
          <Button canClick={isValid} actionText='Register' loading={loading} />
          {createUserResult?.createUser.error && (
            <FormError errorMessage={createUserResult.createUser.error} />
          )}
        </form>
        <div className='w-full text-center mt-4'>
          Already have an account?{' '}
          <Link to='/' className='text-ubergreen hover:underline'>
            Log in now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
