import React, { useState } from 'react';
import './Card.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Card = () => {
  const Data = [
    // -----------1
    {off: '25% Off', img: 'https://lightweight-wheelset.com/themes/bicycle/assets/img/accueil/paire-roues-lightweight-meilenstein-t-obermayer-schwarz-edition.jpg', title: 'ROUE AV3208', REf: '134566777', Constructeur: 'Constructeur', price: '1200 MAD' },
    {off: '25% Off', img: 'https://c.pxhere.com/photos/bc/dc/alloy_car_rim_wheel-1182792.jpg!s2', title: 'ROUE AV3208', REf: '134566777', Constructeur: 'Constructeur', price: '1200 MAD' },
    {off: '25% Off', img: 'https://img.lovepik.com/bg/20231220/Stunning-Nighttime-Ferris-Wheel-Background-Image-Perfect-for-Your-Design_2479108_wh860.png', title: 'ROUE AV3208', REf: '134566777', Constructeur: 'Constructeur', price: '1200 MAD' },
    { off: '25% Off', img: 'https://img.lovepik.com/bg/20231220/Stunning-Nighttime-Ferris-Wheel-Background-Image-Perfect-for-Your-Design_2479108_wh860.png', title: 'ROUE AV3208', REf: '134566777', Constructeur: 'Constructeur', price: '1200 MAD' },
    {off: '25% Off', img: 'https://img.lovepik.com/bg/20231220/Stunning-Nighttime-Ferris-Wheel-Background-Image-Perfect-for-Your-Design_2479108_wh860.png', title: 'ROUE AV3208', REf: '134566777', Constructeur: 'Constructeur', price: '1200 MAD' },
    {off: '25% Off', img: 'https://img.lovepik.com/bg/20231220/Stunning-Nighttime-Ferris-Wheel-Background-Image-Perfect-for-Your-Design_2479108_wh860.png', title: 'ROUE AV3208', REf: '134566777', Constructeur: 'Constructeur', price: '1200 MAD' },
     {off: '25% Off', img: 'https://img.lovepik.com/bg/20231220/Stunning-Nighttime-Ferris-Wheel-Background-Image-Perfect-for-Your-Design_2479108_wh860.png', title: 'ROUE AV3208', REf: '134566777', Constructeur: 'Constructeur', price: '1200 MAD' },
    {off: '25% Off', img: 'https://img.lovepik.com/bg/20231220/Stunning-Nighttime-Ferris-Wheel-Background-Image-Perfect-for-Your-Design_2479108_wh860.png', title: 'ROUE AV3208', REf: '134566777', Constructeur: 'Constructeur', price: '1200 MAD' },
    // ----------------2
    { off: '25% Off', img: 'https://resize-europe1.lanmedia.fr/r/622,311,forcex,center-middle/img/var/europe1/storage/images/europe1/emissions/les-origines/les-origines-de-la-roue-4095415/58243144-1-fre-FR/Les-origines-de-la-roue.jpg', title: 'ROUE AV3208', REf: '134566777', Constructeur: 'Constructeur', price: '1200 MAD' },
    { off: '25% Off', img: 'https://img.freepik.com/vecteurs-libre/illustration-roue-dentee_53876-6328.jpg', title: 'ROUE AV3208', REf: '134566777', Constructeur: 'Constructeur', price: '1200 MAD' },
    { off: '25% Off', img: 'https://img.lovepik.com/bg/20231220/Stunning-Nighttime-Ferris-Wheel-Background-Image-Perfect-for-Your-Design_2479108_wh860.png', title: 'ROUE AV3208', REf: '134566777', Constructeur: 'Constructeur', price: '1200 MAD' },
    { off: '25% Off', img: 'https://img.lovepik.com/bg/20231220/Stunning-Nighttime-Ferris-Wheel-Background-Image-Perfect-for-Your-Design_2479108_wh860.png', title: 'ROUE AV3208', REf: '134566777', Constructeur: 'Constructeur', price: '1200 MAD' },
    { off: '25% Off', img: 'https://img.lovepik.com/bg/20231220/Stunning-Nighttime-Ferris-Wheel-Background-Image-Perfect-for-Your-Design_2479108_wh860.png', title: 'ROUE AV3208', REf: '134566777', Constructeur: 'Constructeur', price: '1200 MAD' },
    { off: '25% Off', img: 'https://img.lovepik.com/bg/20231220/Stunning-Nighttime-Ferris-Wheel-Background-Image-Perfect-for-Your-Design_2479108_wh860.png', title: 'ROUE AV3208', REf: '134566777', Constructeur: 'Constructeur', price: '1200 MAD' },
    { off: '25% Off', img: 'https://img.lovepik.com/bg/20231220/Stunning-Nighttime-Ferris-Wheel-Background-Image-Perfect-for-Your-Design_2479108_wh860.png', title: 'ROUE AV3208', REf: '134566777', Constructeur: 'Constructeur', price: '1200 MAD' },
    { off: '25% Off', img: 'https://img.lovepik.com/bg/20231220/Stunning-Nighttime-Ferris-Wheel-Background-Image-Perfect-for-Your-Design_2479108_wh860.png', title: 'ROUE AV3208', REf: '134566777', Constructeur: 'Constructeur', price: '1200 MAD' },
    // --------------3
    { off: '25% Off', img: 'https://cimatti.ma/1316-home_default/jante-avant-mt-05.jpg', title: 'ROUE AV3208', REf: '134566777', Constructeur: 'Constructeur', price: '1200 MAD' },
    { off: '25% Off', img: 'https://img.lovepik.com/bg/20231220/Stunning-Nighttime-Ferris-Wheel-Background-Image-Perfect-for-Your-Design_2479108_wh860.png', title: 'ROUE AV3208', REf: '134566777', Constructeur: 'Constructeur', price: '1200 MAD' },
    { off: '25% Off', img: 'https://img.lovepik.com/bg/20231220/Stunning-Nighttime-Ferris-Wheel-Background-Image-Perfect-for-Your-Design_2479108_wh860.png', title: 'ROUE AV3208', REf: '134566777', Constructeur: 'Constructeur', price: '1200 MAD' },
    { off: '25% Off', img: 'https://img.lovepik.com/bg/20231220/Stunning-Nighttime-Ferris-Wheel-Background-Image-Perfect-for-Your-Design_2479108_wh860.png', title: 'ROUE AV3208', REf: '134566777', Constructeur: 'Constructeur', price: '1200 MAD' },
    { off: '25% Off', img: 'https://img.lovepik.com/bg/20231220/Stunning-Nighttime-Ferris-Wheel-Background-Image-Perfect-for-Your-Design_2479108_wh860.png', title: 'ROUE AV3208', REf: '134566777', Constructeur: 'Constructeur', price: '1200 MAD' },
    { off: '25% Off', img: 'https://img.lovepik.com/bg/20231220/Stunning-Nighttime-Ferris-Wheel-Background-Image-Perfect-for-Your-Design_2479108_wh860.png', title: 'ROUE AV3208', REf: '134566777', Constructeur: 'Constructeur', price: '1200 MAD' },
    { off: '25% Off', img: 'https://img.lovepik.com/bg/20231220/Stunning-Nighttime-Ferris-Wheel-Background-Image-Perfect-for-Your-Design_2479108_wh860.png', title: 'ROUE AV3208', REf: '134566777', Constructeur: 'Constructeur', price: '1200 MAD' },
    { off: '25% Off', img: 'https://img.lovepik.com/bg/20231220/Stunning-Nighttime-Ferris-Wheel-Background-Image-Perfect-for-Your-Design_2479108_wh860.png', title: 'ROUE AV3208', REf: '134566777', Constructeur: 'Constructeur', price: '1200 MAD' },
  ];
  // range price  const-------------
  const [minValue, setMinValue] = useState<number>(0); // start with a default value
  const [maxValue, setMaxValue] = useState<number>(1000); 

  const handleMinChange = (event: any) => {
    const value = Math.min(Number(event.target.value), maxValue - 1); // cap at maxValue - 1
    setMinValue(value);
  };

  const handleMaxChange = (event:any) => {
    const value = Math.max(Number(event.target.value), minValue + 1); // cap at minValue + 1
    setMaxValue(value);
  };
  // ------------------

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Data.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(Data.length / recordsPerPage);

  const changePage = (page:any) => {
    setCurrentPage(page);
  };
  // Magasins Data-------------------
  const magasinsData = [
    {
      name: "Magasin1",
      description: "Marché  Boutiques de souvenirs & Magasins ILLEURES boutiques",
      address: "boulvard XXXYYY123",
    },
    {
      name: "Magasin2",
      description: "Marché  Boutiques de souvenirs & Magasins ILLEURES boutiques",
      address: "boulvard XXXYYY124",
    },
    {
      name: "Magasin3",
      description: "Marché  Boutiques de souvenirs & Magasins ILLEURES boutiques",
      address: "boulvard XXXYYY125",
    },
    {
      name: "Magasin4",
      description: "Marché  Boutiques de souvenirs & Magasins ILLEURES boutiques",
      address: "boulvard XXXYYY126",
    },
    {
      name: "Magasin5",
      description: "Marché  Boutiques de souvenirs & Magasins ILLEURES boutiques",
      address: "boulvard XXXYYY123",
    },
    {
      name: "Magasin6",
      description: "Marché  Boutiques de souvenirs & Magasins ILLEURES boutiques",
      address: "boulvard XXXYYY124",
    },
    {
      name: "Magasin7",
      description: "Marché  Boutiques de souvenirs & Magasins ILLEURES boutiques",
      address: "boulvard XXXYYY125",
    },
    {
      name: "Magasin8",
      description: "Marché  Boutiques de souvenirs & Magasins ILLEURES boutiques",
      address: "boulvard XXXYYY126",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 4; // Number of cards visible at a time

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % magasinsData.length
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + magasinsData.length) % magasinsData.length
    );
  };

  return (
    <div className="u-card-container">
      {/* Navbar----------------- */}
    <div className='u-mainNav'>
    <div className="u-navbar">
        <div className='u-navbar-content'>
      <span className='u-navbar-title'> Bienvenu sur le boutique en ligne Merchsentry </span> 
      <span>Suivez-nous</span>
      <span  className='u-navbar-select'>
        <select >
          <option value="eng">Eng</option>
          <option value="fr">Fr</option>
          <option value="ar">Ar</option>
     
        </select>
        <select >
          <option value="usd">USD</option>
          <option value="mad">MAD</option>

        </select>
        </span>
        </div> 
      </div>
   {/* imag nav---------- */}

      <div className="u-img-nav">
        <h1 className='u-img-title'> Merchsentry </h1> 
      </div>
      {/* navbar2---------------- */}
      <div className='u-navbar2'>
       <span> <i className="bi bi-house-door"></i>   Accueil <i className="bi bi-chevron-right"></i></span>
       <span>Shope <i className="bi bi-chevron-right"></i></span>
       <span>Shope Grid <i className="bi bi-chevron-right"></i></span>
       <span className='u-piece'>Piéce Automoiles</span>
     </div>
    


    </div>


      <div className="u-content">
        {/* Category--------------------- */}
        <div className="u-category">
          <h2 className="u-category-title">Categorie</h2>
          <form className="u-categoryForm">
            {['Pièces automobiles', 'Constructeurs', 'Maintenance et réparation', 'Outils industriels', 'Equipements', 'Lubrifiants', 'Huiles'].map((category) => (
              <label key={category} className="u-category-item">
                <input type="radio" name="category" value={category} className="u-category-radio" />
                {category}
              </label>
            ))}
          </form> <br /> <br />
          {/* range price ------------------*/}
        {/* <div>
        <div className="u-range-slider">
  <h5>GAMME DE PRIX</h5> <br />
  <div className="u-range-input">
    <input type="range"  />
    <input type="range" />
   
  </div>  
  <div className="u-price-labels">
   <span>  <input type="number"  placeholder='Min'/></span>
    <span> <input type="number"   placeholder='Max'/> </span> 
  </div>
</div>
</div> <br /> */}

{/*  other range price ---------------------*/}
<div className="u-range-slider">
      <h5>GAMME DE PRIX</h5>
      <div className="u-range-input">
        <input
          type="range"
          min="0"
          max="1000"
          value={minValue}
          onChange={handleMinChange}
        />
        <input
          type="range"
          min="0"
          max="1000"
          value={maxValue}
          onChange={handleMaxChange}
        />
        {/* Blue line between the thumbs---------- */}
        <div
          className="u-range-track"
          style={{
            left: `${(minValue / 1000) * 100}%`,
            width: `${((maxValue - minValue) / 1000) * 100}%`,
          }}
        ></div>
      </div> <br />
      <div className="u-price-labels">
        <span>
          <input
            type="number"
            value={minValue}
            onChange={handleMinChange}
            placeholder="Min"
          />
        </span>
        <span>
          <input
            type="number"
            value={maxValue}
            onChange={handleMaxChange}
            placeholder="Max"
          />
        </span>
      </div>
    </div>
<br />
    
   {/* ------------------------------------------ */}
        <h2 className="u-category-title">Touts les prix</h2>
          <form className="u-categoryForm">
            {['Moins de 19000', ' 19000 à 60000', '19000 à 60000', '19000 à 60000', '19000 à 60000', '19000 à 60000', 'plus de 3000000'].map((category) => (
              <label key={category} className="u-category-item">
                <input type="radio" name="category" value={category} className="u-category-radio" />
                {category}
              </label>
            ))}
          </form>
         <br /> <br />
        </div>

        {/* Main Content */}
        <div className="u-main-content">
          {/* Header--------------- */}
          <div className="u-Header">
            <h3 className="u-title">COMMANDES</h3>
            <div className='u-c'>
              Vous ne trouvez pas ce que vous cherchez ? <span className='u-contact'>Contactez nous par Whats app</span>
            </div>
            <div className="u-header-controls">
              <div className="u-search">
                <input type="text" placeholder="chercher un produit" className="u-input-search" />
                <span><i className="bi bi-search u-icon-search"></i></span>
                
              </div>
              <div className="u-select">
                <label className='mx-2'>Trier par</label>
                <select className="u-select-option">
                  <option value="option1" >Meilleur ventes</option>
                  <option value="option2">Prix croissant</option>
                  <option value="option3">Prix décroissant</option>
                </select>
              </div>
            </div>
            <div className="u-filtre">
              <span>
              Filtres <strong>Tous</strong> <i className="bi bi-x u-i-filter"></i>
              </span>
              <span>
               <strong>66788 </strong> Résultats trouvés
              </span>
          
            </div>
          </div>

          {/* Card List-------------- */}
    
          <div className="u-card-list">
  {records.map((data, index) => (
    <div key={index} className="u-card">
      <div className="u-card-off">{data.off}</div>

      <img src={data.img} alt={data.title} className="u-card-img" />

      {/* Icons on hover */}
      <div className="u-card-icons">
      <i className="bi bi-suit-heart u-heart"></i>
      <i className="bi bi-cart u-card-shopping"></i>
      </div>

      <div className="u-km">
        <p>A 10 Km de chez vous</p>
      </div>
      <div className="u-star">
        <i className="bi bi-star-fill u-i-star"></i>
        <i className="bi bi-star-fill u-i-star"></i>
        <i className="bi bi-star-fill u-i-star"></i>
        <i className="bi bi-star-fill u-i-star"></i>
        <i className="bi bi-star-fill u-i-star"></i>
      </div>
      

      <div className="u-card-title">{data.title}</div>
      <div className="u-card-REf">{data.REf} <span className="u-card-Constructeur">{data.Constructeur}</span></div>
      <div className="u-card-price">{data.price}</div>
    </div>
  ))}
</div>



          {/* Pagination------------------- */}
          <nav>
            <ul className="u-pagination">
              <li className="u-page-item">
                <button
                  className="u-page-link"
                  onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                    <i className="bi bi-arrow-left"></i>
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index} className={`u-page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button
                    className="u-page-link"
                    onClick={() => changePage(index + 1)} >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className="u-page-item">
                <button
                  className="u-page-link"
                  onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                    <i className="bi bi-arrow-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* Magasin----------------- */}
      {/* <div className="u-magasins">
      <h3>Vous avez +20 magasins</h3>
          <div className="u-magasin-slider">
          
               <i className="bi bi-arrow-left  u-icon-prev"  onClick={handlePrev}></i>
        
            {magasinsData
              .slice(currentIndex, currentIndex + visibleCards)
              .map((magasin, index) => (
                <div
                  className="u-magasin-cards"
                  key={index}
                >
                  <h3 className="text-lg font-bold">{magasin.name}</h3>
                  <p className="text-gray-500">{magasin.description}</p>
                  <p className="text-gray-400"> <i className="bi bi-geo-alt-fill"></i>{magasin.address}</p>
                </div>
              ))}
          
                <i onClick={handleNext} className="bi bi-arrow-right u-icon-next"></i>
          </div>
        </div> */}
  

    </div>
  );
};

export default Card;
