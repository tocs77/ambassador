import { useNavigate } from 'react-router-dom';
import { authController } from '@/shared/api';
import { useState } from 'react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEmail = email.trim();
    const newPassword = password.trim();
    if (newEmail === '') {
      alert('Email is required');
      return;
    }
    if (newPassword === '') {
      alert('Password is required');
      return;
    }

    const res = await authController.login(newEmail, newPassword);
    if (res.type === 'error') {
      alert(res.message);
    }
    navigate('/');
  };

  return (
    <main className='form-signin w-100 m-auto'>
      <form onSubmit={loginHandler}>
        <h1 className='h3 mb-3 fw-normal'>Please sign in</h1>

        <div className='form-floating'>
          <input
            type='email'
            className='form-control'
            id='floatingInput'
            placeholder='name@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='floatingInput'>Email address</label>
        </div>
        <div className='form-floating'>
          <input
            type='password'
            className='form-control'
            id='floatingPassword'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor='floatingPassword'>Password</label>
        </div>

        <button className='btn btn-primary w-100 py-2' type='submit'>
          Sign in
        </button>
      </form>
    </main>
  );
};
