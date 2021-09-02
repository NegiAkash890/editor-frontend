import React from 'react'
import './Main.css'

function SelectBar({changeLanguage}) {
    const handleClick = (e,value)=>{
        switch(value) {
            case 'cpp' : e.target.setAttribute("src",`${process.env.PUBLIC_URL}/assets/c-active.png`)
                break;
            case 'js'  : e.target.setAttribute("src",`${process.env.PUBLIC_URL}/assets/js-active.png`)
                break;
            case 'py'  : e.target.setAttribute("src",`${process.env.PUBLIC_URL}/assets/py-active.png`)
                break ;
            default :
        }
       console.log(e.target) ;
       changeLanguage(value);
    }
    return (
        <div className='select__bar'>
            <img src={`${process.env.PUBLIC_URL}/assets/c-unactive.png`} alt='C++' width='60px' onClick={(e)=> handleClick(e,'cpp')}/>
            <img src={`${process.env.PUBLIC_URL}/assets/js-unactive.png`} alt='JS' width='60px' onClick={(e)=> handleClick(e,'js')}/>
            <img src={`${process.env.PUBLIC_URL}/assets/py-unactive.png`} alt='Python' width='60px' onClick={(e)=>handleClick(e,'py')}/>
        </div>
    )
}

export default SelectBar
