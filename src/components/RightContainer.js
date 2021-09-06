import React from 'react'
import Loader from 'react-loader-spinner';

function RightContainer({output,loading, updateOutput,error}) {
    return (
        <div className='right__container'>
             <div className='header__info'> 
                <div className='file__name'>
                    <span>Output Terminal</span>
                </div>
                <div>
                    <button className='btn' onClick={()=>updateOutput('Console Cleared',"clear")}><img title="Clear Terminal" alt='Clear Terminal' src={`${process.env.PUBLIC_URL}/assets/clear-icon.png`}  /></button>
                </div>
             </div>
             <div className='logger__head_right'>
                    <div id='output'>{output}</div>
                    <Loader width='100' height='100' type="Rings"  style={{"position":"absolute","top":"40%","left":"40%"}} color={'blueviolet'} visible={loading}/>
            </div>
        </div>
    )
}

export default RightContainer
