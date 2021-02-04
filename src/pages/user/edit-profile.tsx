import { gql, useApolloClient, useMutation } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/button';
import { FormError } from '../../components/form-error';
import { useMe } from '../../hooks/useMe';
import {
  editProfile,
  editProfileVariables
} from '../../__generated__/editProfile';

interface IForm {
  email?: string;
  password?: string;
}

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

export const EditProfile = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const onCompleted = (data: editProfile) => {
    const {
      editProfile: { ok }
    } = data;
    if (ok) {
      const { email: newEmail } = getValues();
      const {
        me: { email: prevEmail, id }
      } = userData!;
      if (newEmail !== prevEmail) {
        client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment EditedUser on User {
              email
              verified
            }
          `,
          data: {
            email: newEmail,
            verified: false
          }
        });
      }
    }
  };
  const [editProfile, { data: editProfileResult, loading }] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE_MUTATION, { onCompleted });
  const {
    register,
    handleSubmit,
    getValues,
    errors,
    formState: { isValid }
  } = useForm<IForm>({
    mode: 'onChange',
    defaultValues: {
      email: userData?.me.email
    }
  });

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      editProfile({
        variables: {
          input: {
            email,
            ...(password !== '' && { password })
          }
        }
      });
    }
  };

  return (
    <div className='mt-52 flex flex-col justify-center items-center'>
      <Helmet>
        <title>Edit Profile | Nuber Eats</title>
      </Helmet>
      <h4 className='font-semibold mb-3 text-2xl'>Edit Profile</h4>
      <form
        className='grid gap-5 mt-3 w-full max-w-screen-sm'
        onSubmit={handleSubmit(onSubmit)}>
        <input
          ref={register({
            required: 'Email is required',
            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          })}
          name='email'
          className='input'
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
          ref={register}
          name='password'
          className='input'
          type='password'
          placeholder='Password'
        />
        <Button
          loading={loading}
          canClick={isValid}
          actionText='Save Profile'
        />
        {editProfileResult?.editProfile.error && (
          <FormError errorMessage={editProfileResult.editProfile.error} />
        )}
      </form>
    </div>
  );
};
