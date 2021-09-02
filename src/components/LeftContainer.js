import React, { useState } from 'react'

function LeftContainer({pre,ext}) {
    const [code,setCode] = useState(pre);
    const handleChange=(e)=>{
      setCode(e.target.value);
    }
    return (
        <div className='left__container'>
            <div className='header__info'> 
              <div className='file__name'>
                    <span>main.{ext}</span>
              </div>
              <div>
                   <button className='btn'><img title="Download Code" src={`${process.env.PUBLIC_URL}/assets/download.png`}  alt='Download Code'/></button>
                   <button className='btn'><img title="Run" src={`${process.env.PUBLIC_URL}/assets/play.png`}  alt='Submit Code'/></button>
              </div>
             </div>
             <div className='code__body'>
                <textarea className='code__block' onChange={handleChange} defaultValue={pre}></textarea>
             </div>
           
        </div>
    )
}

export default LeftContainer
