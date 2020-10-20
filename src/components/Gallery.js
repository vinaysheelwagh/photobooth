import React from 'react';

const Gallery = ({ items }) => {
  return (
    <div className="section-center">
      {items.map((item) => {
        const { farm, server, id, secret, title } = item;
        const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`
        return (
          <article key={id} className="menu-item">
            <img src={url} alt={title} key ={id} className="photo" />
            
          </article>
        );
      })}
    </div>
  );
};

export default Gallery;
