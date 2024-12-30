import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import toastr from "toastr";
import Swal from 'sweetalert2';
import "./Delete.css";
import { Posts } from '../Types/types';
import PriceFilter from '../Compenents/PriceFilter';

function Post() {
    const [posts, setPosts] = useState<Posts[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Posts[]>([]);
    const [error, setError] = useState('');
    const [input, setInput] = useState('');
    const { id } = useParams<{ id: string }>();
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/test');
            setPosts(response.data);
            setFilteredPosts(response.data);
        } catch (err) {
            setError('Failed to fetch posts');
            console.error(err);
        }
    };
    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        const filtered = posts.filter(post => 
            post.prix >= minPrice && post.prix <= maxPrice
        );
        setFilteredPosts(filtered);
    }, [minPrice, maxPrice, posts]);

    const handleDelete = async (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`http://localhost:8000/api/delete/${id}`);
                    toastr.success(response.data.message);
                    fetchPosts();
                    Swal.fire("Deleted!", "Your file has been deleted.", "success");
                } catch (error) {
                    console.error('Error deleting post:', error);
                    Swal.fire("Error!", "There was an issue deleting your file.", "error");
                }
            }
        });
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase();
        setInput(searchTerm);

        const filtered = posts.filter(post =>
            post.title.toLowerCase().startsWith(searchTerm)
        );
        setFilteredPosts(filtered);
    };

    const handlePriceChange = (min: number, max: number) => {
        setMinPrice(min);
        setMaxPrice(max);
    };
    const postDetails = filteredPosts.map((post) => (
        <tr key={post.id}>
            <td>{post.id}</td>
            <td>{post.title}</td>
            <td>
                <img src={`http://127.0.0.1:8000/storage/photos/posts/${post.photo}`} width="50px" alt={post.title} />
            </td>
            <td>{post.body}</td>
            <td>{post.prix}</td>
            <td>
                <Link to={`/Edit/${post.id}`} className="btn btn-primary">Edit</Link> 
            </td>
            <td>
                <button id="delete" className="btn btn-danger" onClick={() => handleDelete(post.id)}>Delete</button>
            </td>
        </tr>
    ));

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <label>Search:</label>
            <input 
                type="search"
                id="search-form"
                className="search-input"
                placeholder="Search post by title"
                value={input}
                onChange={handleSearch}
            />  <br /><br />
            Price :
            <PriceFilter onPriceChange={handlePriceChange} />
            <br />
            <Link to='/Create' className="btn btn-warning">ADD Post</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Content</th>
                        <th>Prix</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {postDetails}
                </tbody>
            </table>
        </div>
    );
}


export default Post;
