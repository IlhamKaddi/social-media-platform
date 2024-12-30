import React from 'react';
import './CommandeExample.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const CommandeExample = () => {
  return (
 <div className='all'>
        <h2 className='h2'>Bienvenue sur votre espace personnel</h2>
        <span className='Flesh'> <i className="bi bi-arrow-left-short"></i> </span>
        <div className='home'>
        <span className='iconH'> <i className="bi bi-house-door-fill"></i> </span>   Magasine  <i className="bi bi-chevron-right"> </i>  <span className='passer'> Passer une commande</span>
        </div>
      <div className="form-container">
      <h4>Informations Client   <hr /></h4>
        <form className="client-form">
          <div className="form-group">
            <label >Nom client</label>
            <input type="text"  />
          </div>
          <div className="form-group">
            <label>Sous client</label>
            <input type="text"  />
          </div>
          <div className="form-group">
            <label>Numéro Téléphone</label>
            <input type="tel"  />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email"   />
          </div>
          <div className="form-group full-width">
            <label >Adresse</label>
            <input type="text" />
          </div>
        </form>
      </div>
      {/* ------------form2 */}
      <div  className="form-container">
      <form  >
        <h3>  Recherche Articles</h3>
            <label >Ref article</label>
            <input  className="inputForm2" type="text" />
            <br /> <br />
            <label >Quantité</label>
            <input className= "inputForm2" type="number" />
            <br /> <br />
            <button className='buttonForm2'>Ajouter  <span className='add'><i className="bi bi-plus-circle"></i></span></button>
        </form>
      </div>
      {/* --------------------------------------------form3 */}
       <div className="form3">  
       <h3>Listes des Articles</h3> 
        <table className='tableR'>
            <thead>
           <tr>
            <th>ID</th>
            <th>Ref Article</th>
            <th>Destination</th>
            <th>PrixHT</th>
            <th >Quantité</th>
            <th>Statut</th>
            <th>MontantHt</th>
            <th>Action</th>
           </tr>
           </thead>
           <tbody>
            <tr>
                <td>1</td>
                <td>1</td>
                <td>XX</td>
                <td>1777</td>
                <td> 1</td>
                <td>YY</td>
                <td>9000</td>
                <td className='spaceIcons'>
                <span className='edit'>   <i className="bi bi-pencil"></i></span>
                <span className='delete'><i className="bi bi-trash"></i></span>
                
               </td>
            </tr>
           </tbody>
         </table>
       </div>



       
       <div  className='table3'>
        
        
        <div className='row'>
        <span className='cell-1'>Total Brut Ht:</span>
        <span className='cell-2'>Total Remise :</span>
        <span className='cell-3'>Total Net Ht:</span>
        <span className='cell-4'>Montant Total:</span>
      </div>

       </div>
      
    <br /> 
    {/* ?--------- */}
     <br /><br /><br /><br /><br /> <br />    
    
       <div className="form-container">
      <h4>Informations Suplementaire  <hr /></h4>
        <form className="client-form">
        <div className="form-group full-width">
            <label >Remarque</label>
            <input type="text" id="address"  />
          </div>
          <div className='buttonC'>  
          <button className='buttonForm3'>Bon de Commande <i className="bi bi-download download-icon"></i></button>
          <button className='buttonV'>Valider <i className="bi bi-check2-circle V-icon"></i></button>

          </div>
         
     
         
         
        </form>
      </div>
      </div>
  
  );
};

export default CommandeExample;
