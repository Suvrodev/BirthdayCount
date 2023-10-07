import React, { useState } from "react";

const Extra = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange=(e)=>{
        const selectedValue = e.target.value;
        setSelectedOption(selectedValue);
        console.log(`Selected: ${selectedValue}`);
    }
  return (
    <div>
      <select onChange={handleSelectChange} value={selectedOption} className="p-2 rounded-md font-bold">
        <option value="" disabled>Select an option</option>
        <option value="default">Default</option>
        <option value="lth">A-Z</option>
        <option value="htl">Z-A</option>
      </select>
    </div>
  );
};

export default Extra;
