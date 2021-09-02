import React, {  useState } from 'react'
import LeftContainer from './LeftContainer'
import RightContainer from './RightContainer'
import SelectBar from './SelectBar'

function Main() {
    const [lang,setLang] = useState('cpp') ;
    const [intial,setIntial] = useState('// C++ Goes Here')
    const changeLanguage = (value) =>{
        if(value === 'js'){
            setLang(value);
            setIntial('// Write your JS Program Here');
        }
        else if(value === 'cpp'){
            setLang(value);
            setIntial('// C++ Goes Here');
        }
        else{
            setLang(value);
            setIntial('// Python Script Goes Here');
        }
    }

    return (
        <div className='main__container'>
            <SelectBar changeLanguage={changeLanguage}/>
            <div className='content__area'>
                <LeftContainer ext={lang} pre={intial}/>
                <RightContainer/>
            </div>
        </div>
    )
}

export default Main
