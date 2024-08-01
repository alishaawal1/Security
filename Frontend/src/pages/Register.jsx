import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserApi } from '../apis/Api';
import { toast } from 'react-toastify';
import PasswordStrengthBar from 'react-password-strength-bar';
import '../style/Register.css';

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [fnameError, setFnameError] = useState('');
  const [lnameError, setLnameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [cpasswordError, setCpasswordError] = useState('');

  const validate = () => {
    let isValid = true;

    setFnameError('');
    setLnameError('');
    setPhoneNumberError('');
    setEmailError('');
    setPasswordError('');
    setCpasswordError('');

    if (firstName.trim() === "") {
      setFnameError("Firstname is required");
      isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(firstName.trim())) {
      setFnameError("Firstname should only contain letters");
      isValid = false;
    }

    if (lastName.trim() === "") {
      setLnameError("Lastname is required");
      isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(lastName.trim())) {
      setLnameError("Lastname should only contain letters");
      isValid = false;
    }

    if (phoneNumber.trim() === "") {
      setPhoneNumberError("Phone number is required");
      isValid = false;
    } else if (!/^\d{10}$/.test(phoneNumber.trim())) {
      setPhoneNumberError("Phone number must be exactly 10 digits");
      isValid = false;
    }

    if (email.trim() === "") {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError("Email format is invalid");
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter");
      isValid = false;
    } else if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter");
      isValid = false;
    } else if (!/[0-9]/.test(password)) {
      setPasswordError("Password must contain at least one digit");
      isValid = false;
    } else if (!/[!@#$%^&*]/.test(password)) {
      setPasswordError("Password must contain at least one special character");
      isValid = false;
    }

    if (confirmPassword.trim() === "") {
      setCpasswordError("Confirm Password is required");
      isValid = false;
    } else if (password.trim() !== confirmPassword.trim()) {
      setCpasswordError("Password and Confirm Password must be the same");
      isValid = false;
    }

    return isValid;
  }

  const changeFirstname = (e) => {
    setFirstName(e.target.value);
    if (e.target.value.trim() !== "" && /^[a-zA-Z]+$/.test(e.target.value.trim())) {
      setFnameError('');
    }
  }

  const changeLastname = (e) => {
    setLastName(e.target.value);
    if (e.target.value.trim() !== "" && /^[a-zA-Z]+$/.test(e.target.value.trim())) {
      setLnameError('');
    }
  }

  const changePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
    if (/^\d{10}$/.test(e.target.value.trim())) {
      setPhoneNumberError('');
    }
  }

  const changeEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.value.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value.trim())) {
      setEmailError('');
    }
  }

  const changePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value.trim() !== "" && 
        e.target.value.length >= 8 && 
        /[A-Z]/.test(e.target.value) && 
        /[a-z]/.test(e.target.value) && 
        /[0-9]/.test(e.target.value) && 
        /[!@#$%^&*]/.test(e.target.value)) {
      setPasswordError('');
    }
  }

  const changeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value.trim() !== "" && e.target.value.trim() === password.trim()) {
      setCpasswordError('');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) {
      return;
    }

    const data = {
      firstName,
      lastName,
      phoneNumber,
      email,
      password
    }

    createUserApi(data).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        navigate('/login');
      }
    }).catch(err => {
      toast.error("Server Error");
      console.log(err.message);
    });
  }

  return (
    <div className="register-container">
      <div className="left-content-register"></div>
      <div className="right-content-register">
        <form className='register-form'>
          <h1 className='m-4'>Create your Account!</h1>
          <label>Firstname</label>
          <input onChange={changeFirstname} type="text" className='form-control mb-2' placeholder='Enter your firstname' />
          {fnameError && <p className='text-danger'>{fnameError}</p>}
          <label>Lastname</label>
          <input onChange={changeLastname} type="text" className='form-control mb-2' placeholder='Enter your lastname' />
          {lnameError && <p className='text-danger'>{lnameError}</p>}
          <label>Phone Number</label>
          <input onChange={changePhoneNumber} type="tel" className='form-control mb-2' placeholder='Enter your phone number' value={phoneNumber} />
          {phoneNumberError && <p className='text-danger'>{phoneNumberError}</p>}
          <label>Email Address</label>
          <input onChange={changeEmail} type="email" className='form-control mb-2' placeholder='Enter your email' />
          {emailError && <p className='text-danger'>{emailError}</p>}
          <label>Password</label>
          <input onChange={changePassword} type="password" className='form-control mb-2' placeholder='Enter your password' value={password} />
          {password && <PasswordStrengthBar password={password} />} {/* Conditionally render strength bar */}
          {passwordError && <p className='text-danger'>{passwordError}</p>}
          <label>Confirm Password</label>
          <input onChange={changeConfirmPassword} type="password" className='form-control mb-2' placeholder='Enter your password' />
          {cpasswordError && <p className='text-danger'>{cpasswordError}</p>}
          <button onClick={handleSubmit} className='btn btn-danger w-100'>Create an Account</button>
          <Link to="/login" className='account'>Already have an account?</Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
