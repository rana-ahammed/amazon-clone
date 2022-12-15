import React, { useEffect, useState } from 'react'

const Subtotal = ({items}) => {

  const [price, setPrice] = useState(0);

  useEffect(() => {
    totalAmount();
  }, [items]);

  const totalAmount = () => {
    let price = 0;
    items.map((item) => {
      price += item.price.cost
    })
    setPrice(price);
  }

  return (
    <div className='sub-item'>
        <h3>Subtotal({items.length} items): <strong style={{fontWeight: 700, color: "#111"}}>₹{price}.00</strong></h3>
    </div>
  )
}

export default Subtotal