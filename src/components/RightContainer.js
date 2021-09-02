import React from 'react'

function RightContainer() {
    return (
        <div className='right__container'>
             <div className='header__info'> 
              <div className='file__name'>
                    <span>Terminal</span>
              </div>
              <div>
                   <button className='btn'><img title="Clear Terminal" alt='Clear Terminal' src={`${process.env.PUBLIC_URL}/assets/clear-icon.png`}  /></button>
              </div>
             </div>
        </div>
    )
}

export default RightContainer
