import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authController } from '@/shared/api';

export const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEmail = email.trim();
    const newFirstName = firstName.trim();
    const newLastName = lastName.trim();
    const newPassword = password.trim();
    const newPasswordConfirm = passwordConfirm.trim();
    if (newEmail === '') {
      alert('Email is required');
      return;
    }
    if (newFirstName === '') {
      alert('First name is required');
      return;
    }
    if (newLastName === '') {
      alert('Last name is required');
      return;
    }
    if (newPassword === '') {
      alert('Password is required');
      return;
    }
    if (newPassword !== newPasswordConfirm) {
      alert('Passwords do not match');
      return;
    }

    const res = await authController.register({
      email: newEmail,
      firstName: newFirstName,
      lastName: newLastName,
      password: newPassword,
      confirmPassword: newPasswordConfirm,
    });

    if (res.type === 'error') {
      alert(res.message);
    } else {
      navigate('/login');
    }
  };
  return (
    <main className='form-signin w-100 m-auto'>
      <form onSubmit={submit}>
        <h1 className='h3 mb-3 fw-normal'>Please register</h1>

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
            type='text'
            className='form-control'
            id='firstNameInput'
            placeholder='First name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor='firstNameInput'>First name</label>
        </div>
        <div className='form-floating'>
          <input
            type='text'
            className='form-control'
            id='lastNameInput'
            placeholder='Last name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor='lastNameInput'>Last name</label>
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
        <div className='form-floating'>
          <input
            type='password'
            className='form-control'
            id='secondPassword'
            placeholder='Password confirm'
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <label htmlFor='secondPassword'>Password confirm</label>
        </div>

        <button className='btn btn-primary w-100 py-2' type='submit'>
          Submit
        </button>
      </form>
    </main>
  );
};
