import React from 'react';
import './style.css' 

function Planilha() {
    return (
        <>
          <div className="container">
                <iframe 
                    src="https://docs.google.com/spreadsheets/d/1C5bCGILGaLAAfKLsYFveph7df7ZrZQBk/edit#gid=2016936985" 
                    title="Planilha">
                </iframe>
          </div>
        </>
      );

}

export default Planilha;