import { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import Alert from '@mui/material/Alert';

import { Layout } from '@/shared/ui/Layout';
import { adminController } from '@/shared/api';

export const ProfilePage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');

  const getUser = async () => {
    const response = await adminController.user();
    if (response.type === 'error') {
      return;
    }

    setFirstName(response.payload.first_name);
    setLastName(response.payload.last_name);
    setEmail(response.payload.email);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getUser();
  }, []);

  const infoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
    };
    const res = await adminController.updateUser(data);
    if (res.type === 'error') {
      setError(res.message);
      return;
    }
    setError('');
  };

  const passwordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await adminController.updatePassword(password, passwordConfirm);
    if (res.type === 'error') {
      setError(res.message);
      return;
    }
    setError('');
  };

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
