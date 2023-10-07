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
            onClick={handleCheck} className='btn btn-group dark_mode_input'> {selectedTheme=='dark'?'Dark':'Light'}
            </button>
     </div>
    );
};

export default HeaderMode;