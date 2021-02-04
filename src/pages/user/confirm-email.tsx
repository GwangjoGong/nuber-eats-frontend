import { gql, useApolloClient, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  verifyEmail,
  verifyEmailVariables
} from '../../__generated__/verifyEmail';
import * as queryString from 'query-string';
import { useMe } from '../../hooks/useMe';
import { Helmet } from 'react-helmet-async';

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

export const ConfirmEmail = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const history = useHistory();
  const { search } = useLocation();
  const params = queryString.parse(search);

  const onCompleted = (data: verifyEmail) => {
    const {
      verifyEmail: { ok, error }
    } = data;
    if (ok && userData?.me.id) {
      client.writeFragment({
        id: `User:${userData.me.id}`,
        fragment: gql`
          fragment VerifiedUser on User {
            verified
          }
        `,
        data: {
          verified: true
        }
      });
    } else {
      alert(error);
    }
    history.push('/');
  };

  const [verifyEmail] = useMutation<verifyEmail, verifyEmailVariables>(
    VERIFY_EMAIL_MUTATION,
    { onCompleted }
  );

  useEffect(() => {
    if (!params.code) {
      alert('Invalid Access');
      history.push('/');
    }

    verifyEmail({
      variables: {
        input: {
          code: String(params.code)
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <div className='mt-52 flex flex-col items-center justify-center'>
      <Helmet>
        <title>Confirm Email | Nuber Eats</title>
      </Helmet>
      <h2 className='text-lg mb-2 font-medium'> Confirming email...</h2>
      <h4 className='text-gray-700 text-sm'>
        Please wait, don't close this page...
      </h4>
    </div>
  );
};
