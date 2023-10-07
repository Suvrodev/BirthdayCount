import React, { useEffect, useState } from 'react';

const HeaderMode = () => {

    const [check,setCheck]=useState(true)

    const setDarkMode=()=>{
        document.querySelector("body").setAttribute('data-theme','dark')
        localStorage.setItem("selectedTheme",'dark')
        console.log("Dark Korchi, Dark Rakhchi");
        
    }

    const setLightkMode=()=>{
        document.querySelector("body").setAttribute('data-theme','light')
        localStorage.setItem("selectedTheme",'light')
        console.log("Light Korchi, Light Rakhchi");

       

    }



    const [selectedTheme,setSelectedTheme]=useState("")
    // console.log("Check: ",check);
    useEffect(()=>{
        let checkTheme=localStorage.getItem('selectedTheme')
        console.log("Ki Theme ache?: ",checkTheme);
        setSelectedTheme(checkTheme)
        console.log("StorageTheme--(selectedTheme): ",checkTheme);
        if(checkTheme==='dark'){
            setDarkMode()
           
        }else{
            setLightkMode()
        }
    },[check])

  
   
    const handleCheck=(event)=>{
        
        if(selectedTheme==='dark'){
            console.log("------Already Dark Ache,Light Koro");
            setLightkMode()
            console.log('Bartoman Abastha:',localStorage.getItem('selectedTheme'));
        }
        if(selectedTheme==='light'){
            console.log("---------Already Light Ache,Dark koro");
            setDarkMode()
            console.log('Bartoman Abastha:',localStorage.getItem('selectedTheme'));
        }

        setCheck(!check)
    }


   
    

    return (
        <div className='text-sm me-5'>
            <button 
            onClick={handleCheck} className=' dark_mode_input'> {selectedTheme=='dark'?
            <svg className="swap-off fill-current w-5 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
            :
            <svg className="swap-on fill-current w-5 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
            }
            </button>
     </div>
    );
};

export default HeaderMode;