export default function Home() {
  return (
    <div className='container'>
      <main>
        <div className='py-5 text-center'>
          <h2>Welcome</h2>
          <p className='lead'>has invited you to buy our products.</p>
        </div>

        <div className='row g-5'>
          <div className='col-md-5 col-lg-4 order-md-last'>
            <h4 className='d-flex justify-content-between align-items-center mb-3'>
              <span className='text-primary'>Products</span>
              {/* <span className='badge bg-primary rounded-pill'>3</span> */}
            </h4>
            <ul className='list-group mb-3'>
              <li className='list-group-item d-flex justify-content-between lh-sm'>
                <div>
                  <h6 className='my-0'>Product name</h6>
                  <small className='text-body-secondary'>Brief description</small>
                </div>
                <span className='text-body-secondary'>$12</span>
              </li>

              <li className='list-group-item d-flex justify-content-between'>
                <span>Total (USD)</span>
                <strong>$20</strong>
              </li>
            </ul>
          </div>
          <div className='col-md-7 col-lg-8'>
            <h4 className='mb-3'>Personal info</h4>
            <form className='needs-validation'>
              <div className='row g-3'>
                <div className='col-6'>
                  <label htmlFor='username' className='form-label'>
                    First Name
                  </label>
                  <div className='input-group has-validation'>
                    <span className='input-group-text'>@</span>
                    <input type='text' className='form-control' id='username' placeholder='Your Name' required />
                    <div className='invalid-feedback'>Your name is required.</div>
                  </div>
                </div>
                <div className='col-6'>
                  <label htmlFor='lastname' className='form-label'>
                    Last Name
                  </label>
                  <div className='input-group has-validation'>
                    <span className='input-group-text'>@</span>
                    <input type='text' className='form-control' id='lastname' placeholder='Your Name' required />
                    <div className='invalid-feedback'>Your last name is required.</div>
                  </div>
                </div>

                <div className='col-12'>
                  <label htmlFor='email' className='form-label'>
                    Email
                  </label>
                  <input type='email' className='form-control' id='email' placeholder='you@example.com' />
                </div>

                <div className='col-12'>
                  <label htmlFor='address' className='form-label'>
                    Address
                  </label>
                  <input type='text' className='form-control' id='address' placeholder='1234 Main St' required />
                  <div className='invalid-feedback'>Please enter your shipping address.</div>
                </div>

                <div className='col-md-5'>
                  <label htmlFor='country' className='form-label'>
                    Country
                  </label>
                  <input type='text' className='form-control' id='country' placeholder='Your country' />
                  <div className='invalid-feedback'>Please select a valid country.</div>
                </div>

                <div className='col-md-3'>
                  <label htmlFor='city' className='form-label'>
                    City
                  </label>
                  <input type='text' className='form-control' id='city' placeholder='Your city' />
                  <div className='invalid-feedback'>Please enter city name.</div>
                </div>

                <div className='col-md-3'>
                  <label htmlFor='zip' className='form-label'>
                    Zip
                  </label>
                  <input type='text' className='form-control' id='zip' placeholder='' />
                </div>
              </div>

              <hr className='my-4' />

              <button className='w-100 btn btn-primary btn-lg' type='submit'>
                Checkout
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
