// Mainprofile.js
import React, { useState } from 'react';
import './Mainprofile.css';

function Mainprofile() {
  const [activeSection, setActiveSection] = useState('personal'); // 'personal' or 'password'

  return (
    <div className='mainprofile'>
      <div className='mainprofileimg'>
        <img
          src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK0AAACUCAMAAADWBFkUAAAAMFBMVEXk5ueutLeor7Le4OHn6erq7O2rsbWyt7rHy826v8HKztDV2NrY293EyMrS1de1ur27ewrDAAAECklEQVR4nO2c0ZqcIAxGBQIIor7/2xYdO6udnRkgmOhXztV2r85HfwJC2K5rNBqNRqPRaDQajUajkYTWoMIwDCEsP3LbfCC6Ke+MfGLGSa2/vh7QhX420ogd8Z/OB7icL+jJ2YPpX2FjXbhWJKAbflXdkHO4kC4oJ9+7rokY1VV8wX8a2M139prb84H76rr6uguMLqg5STam1/GnIdg01zUN3Loq2XXRtaxLBajPteAFqxht1ZwnG6cao21aNTjqchUyPWbmYEF6nujCUCAbYVqFc0P7gCe6MGaHdtOdGGxDmeuiSy9bPLTRtievC7nrwgFqWZ1fanf01GUB4SqEo12AwaNszUA7uKggCDOSymbsan+HUhYm1NDG3UKg1C0vtg/MSFlysUEQltIWszQ8BpewKAS8LV3FhR5vO5ENrsZOMkG5+OqyffiB8Va2dOdMGl3ASG3xss32ne29knCvWXavCjbibelWB/DotYxw5e0KT8B2kG7Hb7VjvNluHPfJS/ylc6+vSCg/YNwglI04lCvxiTP0OFvCaruQdav3wkx8bQaoqkC3SdhAnTaT30hiTvJJj5UeIG5JOC57SweX5TYSCjcLTBfTMJVNNOJT/KduSRWT5NXrSWpLzQ98N/5xc5MbXUO9ih1179Sp0sGQlQXD3CEIQ4arZW9njBvzxOHlbwfr0pvtJGe70o64Nf/edSmYun9egWH+UhukY4/sD9B588HXiOla3eOgvf09D0bM0wU7x7tptMYcjaWZx4uN61+gU4N3cveCwPlBXdN1I/6nh8lHFs8riy5ARG8sP3P7vAGWdy4qDFMc2H7F+2kIan0LcyXpZQiDH2drn2XgZ65ZO7s+XCO9cTiXmSXilPq0kMm1NvA6g1bT6Kw0aS8IpHCjDx3Pt4Pu/PxmQXhvLOzcK+pXOzEAk5Vl5wlGmp4yEsuqJTDHYMuyQbTXBYizCntfZuKsUxQJ7gsT8IJ0JwcCVI+KwBEj3XDewhF3sd+fZuX5ivGsXXr8vK3r+mA8Iw5f3+eVIm31DTBAXzkEO4yrqwvI+7FvurbqjdR0SmJ3yIrp7U92FfWeIQK6NTiJOodk6a80sUh8eEGdVwtedW8kG8GdlYE6uxgcMZi+K1BpHzH1wGRXYdtnCii/TSMpXf9QWsgq9LIXYGyZLL6hrky3pHu09NK5gm5JHWOYYRs2v1kM25+GoKAngCsHCzKzLmiCTeInMpPLK5s30YB5aPPa27L/ikNtcloHK/SFY21zygJfrX3qpkcB/zQPTXqzEPscW3VTz0trPBpCI5OjwB+E9JJb2kNXmcTGsRqvcCowp+VAn3pCl0zqJw/3QraRtpwpzs3ijqRpBmH3FxU5SVwf1EVIkm38l/wBrNQ3iC/pJbQAAAAASUVORK5CYII='
          width="100px"
          height="100px"
          alt="Profile"
        />
      </div>

      <div className='mainprofilebtn1'>
        <button onClick={() => setActiveSection('personal')}>Personal Detail</button>
        <button onClick={() => setActiveSection('password')}>Change Password</button>
      </div>

      {activeSection === 'personal' && (
        <>
          <div className='personaldetail'>
            <h2>Personal Detail</h2>
            <div className='fillpersonaldetail'>
              <div className='fullname'>
                <label>Fullname :</label>
                <input type='text' placeholder='Enter Fullname' />
              </div>
              <div className='emailid'>
                <label>Email Id :</label>
                <input type='text' placeholder='Enter email id' />
              </div>
            </div>
          </div>
          <div className='updatebtn'>
            <button>Update</button>
          </div>
        </>
      )}

      {activeSection === 'password' && (
        <div className='changepass'>
          <h2>Change Password</h2>
          <div className='passchange'>
            <div className='oldpass'>
              <label>Old Password</label>
              <input type='password' placeholder='Enter Old Password' />
            </div>
            <div className='newpass'>
              <label>New Password</label>
              <input type='password' placeholder='Enter New Password' />
            </div>
            <div className='confirmpass'>
              <label>Confirm Password</label>
              <input type='password' placeholder='Confirm Password' />
            </div>
          </div>
          <div className='update'>
            <button>Update</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mainprofile;
