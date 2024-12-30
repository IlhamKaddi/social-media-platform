import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Create.css';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [title, setTitle] = useState('');
    const [photo, setPhoto] = useState(null);
    const [body, setBody] = useState('');
    const [prix, setPrix] = useState(''); 
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("body", body);
        formData.append("prix", prix);
        if (photo) {
            formData.append("photo", photo); 
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/create', formData);
            console.log('Post created:', response.data);
            
            setError('');
             // for success
             Swal.fire({ 
                position: "top-end",
                icon: "success",
                title: "Your post has been created!",
                showConfirmButton: false,
                timer: 1500
            });

            setTimeout(() => {
                setMessage('');
                navigate('/Post'); // Redirect to the posts page
            }, 2000);
        } catch (error) {
            console.error('There was an error creating the post:', error);
           
            // SweetAlert for error
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "There was an error creating the post!",
                confirmButtonText: "OK"
            });
        }
    };
    const handleImage = (e:any) => {
        
        const file =  e.target.files[0] 
        setPhoto(file); 
    };



     

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {message && (
                    <div className="alert alert-success" role="alert">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <label>Title:
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <br /><br />
                <label>Image:
                <input type='file' onChange={handleImage} />

                </label>
                <br /><br />
                <label>Body:
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </label>
                <br /><br />
                <label>Price:
                    <input
                        type='number' 
                        value={prix}
                        onChange={(e) => setPrix(e.target.value)}
                    />
                </label> <br /> <br />
                <button    id='create'  className='btn btn-success' type='submit'>Create</button>
            </form>
        </div>
    );
}
export default Create;
