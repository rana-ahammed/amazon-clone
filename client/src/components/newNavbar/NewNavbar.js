import React from 'react';
import './NewNavbar.css';

const NewNavbar = () => {
  return (
    <div className='new-nav'>
      <div className="nav-data">
        <div className="left-data">
          <p>All</p>
          <p>Mobile</p>
          <p>BestSeller</p>
          <p>Fashion</p>
          <p>Customer Services</p>
          <p>Electronics</p>
          <p>Prime</p>
          <p>Today's Deals</p>
          <p>Amazon Pay</p>
        </div>
        <div className="right-data">
          <img src="./nav.jpg" alt="navdata" />
        </div>
      </div>
    </div>
  )
}

export default NewNavbar;