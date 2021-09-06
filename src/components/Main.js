import React, {  useState } from 'react'
import LeftContainer from './LeftContainer'
import RightContainer from './RightContainer'
import SelectBar from './SelectBar'

function Main() {
    const [output, setOutput] = useState('');
    const [lang,setLang] = useState('cpp') ;
    const [error, setError] = useState(false);
    const [intial,setIntial] = useState('');
    const [loading, setLoading] = useState('false') ;
    
    const updateOutput = (res,type) =>{
            //Todo :console.log(res.data.result)
            if(type === "clear"){
                setOutput('Console Cleared')
            }
            else if(type === "error"){
                console.log(type);
                setError(true);
                setOutput(res.data.result.output);
            }
            else{
                console.log('exec')
                setOutput(res.data.result.output);
            }
    }
    
    const updateError = (value)=>{
        setError(value) ;
    }
    const updateLoading = (status) => {
        setLoading(status); 
    }
    const changeLanguage = (value) =>{
        setLang(value);
   
    }

    return (
        <div className='main__container'>
          
            <SelectBar changeLanguage={changeLanguage}/>
            <div className='content__area'>
                <LeftContainer ext={lang} pre={intial} updateOutput={updateOutput} updateLoading={updateLoading} updateError={updateError} loading={loading}/>
                <RightContainer output={output}  loading={loading} updateOutput={updateOutput} error={error}/>
            </div>
        </div>
    )
}

export default Main
