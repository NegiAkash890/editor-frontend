import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { shallowEqual,useSelector } from 'react-redux';
import Popup from 'reactjs-popup';
import { LanguageContext } from './Context/languageContext';
import snippets from "./snippets";


function LeftContainer({pre,ext, updateOutput,updateLoading}) {
    const ans = useContext(LanguageContext).language;
    const[copied,setCopied] = useState(false);
    const [code,setCode] = useState(pre);
    const [input, setInput] = useState(null);
    const handleChange=(e)=>{
      setCode(e.target.value);
    }
    const takeInput=(e)=>{
      setInput(e.target.value);
    }
    const handleSubmit = (e) =>{
      e.preventDefault() ;
      updateLoading('true');
      const data = {
        language : ext ,
        code : code ,
        input : input
      }
   
      axios.post('https://editor-backend-v1.herokuapp.com/compile',data)
      .then( res => 
                  { 
                   updateLoading('false'); 
                   if(res.data.result.output.search("error") !== -1){
                        return updateOutput(res,"error");
                      } 
                      else{
                         return updateOutput(res,"response");
                      }
                  }
            )
      .catch(err => 
                  {   
                    return updateOutput(err,"error");
                  }
            );
    }
    const [codeValue,updateCodeValue] = useState(snippets[ans]);
    useEffect(()=>{
      updateCodeValue(snippets[ans]);
    },[ans]);

    return (
        <div className='left__container'>
            <div className='header__info'> 
              <div className='file__name'>  
                    <span>code.{ext}</span>
              </div>
              <div>
                 {/* Button for download & Submit */}
                  {/* <button className='btn'><img title="Download Code" src={`${process.env.PUBLIC_URL}/assets/download.png`}  alt='Download Code'/></button> */}
                  <button className='btn'><img title="Run" src={`${process.env.PUBLIC_URL}/assets/play.png`}  alt='Submit Code' onClick={handleSubmit}/></button>
              </div>
             </div>
             <div className='code__body'>
               <div className='logger__head_left'> 
                      <h3 className='logger__heading'>Editor</h3>
                      <div className="tooltipBoundary">
                          <Popup
                            trigger={
                              <button type="button" style={{backgroundColor:"blueviolet",border:"none"}}>
                                 <CopyToClipboard text={code}
                                    onCopy={() => setCopied(true)} >
                                      <img width='24px' src={`${process.env.PUBLIC_URL}/assets/copy.png`} alt='Copy to ClipBoard' title='Copy Code' />
                                </CopyToClipboard>
                              </button>
                            }
                            position={['top center', 'bottom right', 'bottom left']}
                            closeOnDocumentClick
                            keepTooltipInside=".tooltipBoundary"
                          >
                            Copied!
                          </Popup>
                        </div>
                 </div>
                <form>
                     {/* textarea for codeblock */}
                     <textarea className='code__block' spellCheck="false" key={codeValue} defaultValue={codeValue} onChange={handleChange} > 
                     </textarea>
                     {/* textarea for Input Data */}
                     <textarea placeholder="Input the Data Here" spellCheck="false" onChange={takeInput} className='input__block' default={input}>
                     </textarea>
                </form>
             </div>
           
        </div>
    )
}

export default LeftContainer
