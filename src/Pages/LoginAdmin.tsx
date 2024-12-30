import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import {Link} from 'react-router-dom';
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye';



const LoginAdmin = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    // --------handelPassword
    const handeleToggle=()=>{
        if (type==='password'){
            setIcon(eye);
            setType('text');
        }else{
           setIcon(eyeOff);
           setType('password')
        }
    };
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
     event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login_admin', {
                email,
                password,
            });
            // console.log(response.data);

            const adminId = response.data.admin_id; // Get profile ID from the API response
            localStorage.setItem("admin_id", adminId); // Save it to localStorage          
            // If login is successful--------------------
            Swal.fire({
                icon: 'success',
                title: 'Login successful',
                text: `Welcome back, ${response.data.email}!`,
            });
            navigate('/Dashboard');

            // if (response.data.role === 'admin') {
            //     navigate('/Dashboard');  
            // } else {
            //     navigate(`/Profile/${profileId}`);
            // }
        } catch (error) {
            // If email or password is invalid
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid email or password.',
            });
        }
    };
    return (
        <div  className='container-R'>
            <h1 className='h1'> Admin Login</h1>

            <form onSubmit={handleSubmit} className='Form'>
                <label className='label'>Email</label>
                <span className='icon'  onClick={handeleToggle}><Icon  icon={icon}/></span> <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='input'   /> 
                  <label className='label'>Password</label>
                 <input
                    className='input-container'
                    type={type}
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}   /> 
                <input type="submit" value="Submit" className='submit' />
                {/* <Link to='/Registre'>Create account</Link> */}
            </form>
        </div>
    );
};

export default LoginAdmin;

