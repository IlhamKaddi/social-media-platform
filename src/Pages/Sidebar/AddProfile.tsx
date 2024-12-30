import React, { useState } from 'react';
import axios from 'axios';
// import './Register.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye';

function AddProfile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type,setType]=useState('password');
    const [icon,setIcon]=useState(eyeOff);
    const [nohash, setNohash] = useState('');
    const [number, setNumber] = useState('');
    const [genre, setGenre] = useState('');

    const handeleToggle=()=>{
      if(type==='password'){
        setIcon(eye);
        setType('text')
      }else{
        setIcon(eyeOff);
        setType('password')
      }
    };
    
    const navigate = useNavigate();
    const [errors, setErrors] = useState<{ [key: string]: string }>({}); // For holding error messages

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!name) newErrors.name = 'Name is required';
      
        if (!email) newErrors.email = 'Email is required';
        else if (!/^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@gmail\.com$/.test(email)) {
            newErrors.email = 'Email invalid';
        }
        if (!password) newErrors.password = 'Password is required';
        else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        
        // Phone number is optional but must be exactly 10 digits if provided
        if (number && !/^\d{10}$/.test(number)) {
            newErrors.number = 'Phone number must be exactly 10 digits';
        }

        if (!genre) newErrors.genre = 'Genre is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if there are no errors
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // Stop submission if validation fails
        }

        const formData = {
            name,
            email,
            password,
            nohash,
            number,
            genre,

        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/admin-add-profile', formData, {
                headers: {
                    'Content-Type': 'application/json'            
                }
            });
            console.log('User registered:', response.data);

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Registration successful!",
                showConfirmButton: false,
                timer: 1500
            });

            setTimeout(() => {
                navigate('/users'); // Login PAGE
            }, 2000);
        } catch (error: any) {
            console.error('Error:', error);

            // Handle email-specific error
            if (error.response && error.response.data.errors?.email) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: 'Email already exists',
                }));

                // SweetAlert for email exists error
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Email already exists!",
                    confirmButtonText: "OK"
                });
            } else {
                // SweetAlert for general error
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "There was an error during registration!",
                    confirmButtonText: "OK"
                });
            }
        }
    };

    return (
        <div className='container-C'>
            <h1>Add  New User</h1>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                {errors.name && <p className="error">{errors.name}</p>} <br /><br />
                <label>Email:</label>
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {errors.email && <p className="error">{errors.email}</p>} <br /><br />

                <label>Password:</label>
                <input type={type} name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <span className='icon'> <Icon onClick={handeleToggle} icon={icon}/></span>
                {errors.password && <p className="error">{errors.password}</p>} <br /><br />
                <label>Nohash:</label>
                <input type="password" name="nohash" value={nohash} onChange={(e) => setNohash(e.target.value)} />
                {errors.password && <p className="error">{errors.password}</p>} <br /><br />

            <label>Phone:</label>
                <input type="tel" name="number" value={number} onChange={(e) => setNumber(e.target.value)} /> 
                {errors.number && <p className="error">{errors.number}</p>} 
                <br /><br /> 

                <label>Genre:</label>
                <label>
                    <input type="radio" name="genre" value="male" onChange={(e) => setGenre(e.target.value)}  /> Male
                </label>
                <label>
                    <input type="radio" name="genre" value="female" onChange={(e) => setGenre(e.target.value)}  /> Female
                </label>
                {errors.genre && <p className="error">{errors.genre}</p>} <br /><br />

                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default AddProfile;
