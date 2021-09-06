import React, { useState } from 'react'
import './Main.css'

function SelectBar({changeLanguage}) {
    const [lang, setLang] = useState('cpp');
    const handleClick = (e,value)=>{
        switch(value) {
            case 'cpp' : e.target.setAttribute("src",`${process.env.PUBLIC_URL}/assets/c-active.png`);
                         setLang('cpp')
                break;
            case 'java'  : e.target.setAttribute("src",`${process.env.PUBLIC_URL}/assets/java-active.png`)
                         setLang('java')    
            break;
            case 'py'  : e.target.setAttribute("src",`${process.env.PUBLIC_URL}/assets/py-active.png`);
                         setLang('py')
                break ;
            default :
        }
       changeLanguage(value);
    }
    return (
        <div className='select__bar'>
            <img src={(lang==='cpp')?`${process.env.PUBLIC_URL}/assets/c-active.png`:`${process.env.PUBLIC_URL}/assets/c-inactive.png`}  alt='C++' width='60px' onClick={(e)=> handleClick(e,'cpp')}/>
            <img  src={(lang==='java')?`${process.env.PUBLIC_URL}/assets/java-active.png`:`${process.env.PUBLIC_URL}/assets/java-inactive.png`} alt='JS' width='60px' onClick={(e)=> handleClick(e,'java')}/>
            <img  src={(lang==='py')?`${process.env.PUBLIC_URL}/assets/py-active.png`:`${process.env.PUBLIC_URL}/assets/py-inactive.png`} alt='Python' width='60px' onClick={(e)=>handleClick(e,'py')}/>
        </div>
    )
}

export default SelectBar
