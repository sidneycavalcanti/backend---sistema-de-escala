import React from 'react';
import NavBar from '../NavBar';

import './style.css';

function MainPage() {

    const cardsData = [
        {
          id: 1,
          image: 'https://picsum.photos/id/1/400/300',
          title: 'Card 1',
          description: ' consectetur adipiscing elit. Donec euismod enim eget pretium pulvinar.'
        },
        {
          id: 2,
          image: 'https://picsum.photos/id/2/400/300',
          title: 'Card 2',
          description: 'Nulla facilisi. Sed dictum sapien id justo iaculis, vel bibendum risus facilisis.'
        },
        {
          id: 3,
          image: 'https://picsum.photos/id/3/400/300',
          title: 'Card 3',
          description: 'Praesent sed sapien euismod, consectetur dolor sed, tempor est. Nulla facilisi.'
        },
      ];
      
  return (
  <><NavBar />
  <div className=''>
  <div className="grid-container-responsive">
          {cardsData.map((card) => (
            <div className="card" key={card.id}>
                <img src={card.image} alt={card.title} />
                <h2>{card.title}</h2>
                <p>{card.description}</p>
                <button>Ver mais</button>
            </div>
          ))}
      </div>
      </div>
      </>
  );
}

export default MainPage;