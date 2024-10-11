import { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import Alert from '@mui/material/Alert';

import { Layout } from '@/shared/ui/Layout';
import { useGetUserAdmin, useUpdatePasswordAdmin, useUpdateUserAdmin } from '@/entities/User';

export const ProfilePage = () => {
  const { data: user, isLoading, error: loadError } = useGetUserAdmin();
  const [updateUser, { error: updateUserError }] = useUpdateUserAdmin();
  const [updatePassword, { error: updatePasswordError }] = useUpdatePasswordAdmin();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setEmail(user.email);
  }, [user]);

  useEffect(() => {
    if (loadError) {
      setError(loadError as string);
    }
    if (updateUserError) {
      setError(updateUserError as string);
    }
    if (updatePasswordError) {
      setError(updatePasswordError as string);
    }
  }, [loadError, updateUserError, updatePasswordError]);

  const infoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
    };
    setError('');
    updateUser(data);
  };

  const passwordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    updatePassword({ password, password_confirm: passwordConfirm });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Layout>
      {error && (
        <Alert severity='error' className='mb-3'>
          {error}
        </Alert>
      )}
      <h3>Profile info</h3>
      <form className='mb-3' onSubmit={infoSubmit}>
        <div className='mb-3'>
          <TextField label='First name' variant='standard' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className='mb-3'>
          <TextField label='Last name' variant='standard' value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className='mb-3'>
          <TextField label='Email' variant='standard' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <Button type='submit' variant='contained'>
          Save
        </Button>
      </form>
      <h3> Change Password</h3>
      <form onSubmit={passwordSubmit}>
        <div className='mb-3'>
          <TextField
            label='New password'
            variant='standard'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <TextField
            label='Confirm new password'
            variant='standard'
            type='password'
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <Button type='submit' variant='contained'>
          Save
        </Button>
      </form>
    </Layout>
  );
};
