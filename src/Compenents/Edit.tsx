import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Swal from 'sweetalert2';
import './Create.css';

const Edit = () => {
    const { id }: any = useParams(); 
    const navigate = useNavigate(); // For navigation after update
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [prix, setPrix] = useState('');

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/edit/${id}`);
                
                const postData = response.data;
                console.log(postData);

                setTitle(postData.title);
                setBody(postData.body);
                setPrix(postData.prix);
            } catch (error) {
                console.error('Erreur lors de la récupération des données du post :', error);
                setError('Erreur lors de la récupération des données.');
            }
        };

        fetchPostData();
    }, [id]); 

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("id", id);
        formData.append("title", title);
        formData.append("body", body);
        formData.append("prix", prix);

        formData.append("_method", "POST");

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/update/${id}`, formData);

            console.log('Post updated:', response.data);

 // SweetAlert for success
 Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Your post has been updated!",
    showConfirmButton: false,
    timer: 1500
});
            setError('');


            // Hide the success message after 2 seconds and redirect
            setTimeout(() => {
                setMessage('');
                navigate('/Post'); // Redirect to the posts page
            }, 2000);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du post :', error);
            setError('Erreur lors de la mise à jour du post.');
            
             // SweetAlert for error
             Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "There was an error updating the post!",
                confirmButtonText: "OK"
            });
        }
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
                <label>Body:
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </label>
                <br /><br />
                <label>Prix:
                    <textarea
                        value={prix}
                        onChange={(e) => setPrix(e.target.value) }
                    />
                </label>
                <br /><br />
                <button   id='update ' className='btn btn-success' type='submit'>Update</button>
            </form>
        </div>
    );
};

export default Edit;
