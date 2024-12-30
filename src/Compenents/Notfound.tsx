import React from 'react';
import './Notfound.css';
import{Link} from 'react-router-dom';


function Notfound() {
    return (
        <div className='container'>
            <div className='oopss'>
                <div className='error-text'>
                    <img src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg" alt="404" />
                    <span>404 PAGE</span>
                    <p className="p-a">
                    ! Page non trouvable
                    </p>
                     <button ><Link to='/'>Home</Link> </button>
                </div>
            </div>
        </div>
    );
}

export default Notfound;

