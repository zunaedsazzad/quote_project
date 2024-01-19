import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import './CustomCSS.css';
import './CustomCSS2.css';
import { FaQuoteLeft } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa";
function App() {
  const [quote, setquote]=useState("Mediocrity doesn't just happen. It's chosen over time through small choices day by day")
  const [author, setauthor]=useState('Todd Henry')
  const [selectedvalue, setSelectedValue]=useState('default')

  const handleSelectChange = (event) => {
    if (event.target.value!=='default'){
      setSelectedValue(event.target.value);
    }
  };
  
  const get_quote = ()=> {
    let tempSelectedValue = selectedvalue; 
    if(tempSelectedValue==='default'){
      setSelectedValue("success");
      tempSelectedValue = "success";
    }
  
    let config = {
      headers: {
        'X-Api-Key': '335qrgzWRMREQYGrgrOXBQ==RjoOvuCki4ylwJDe',
      }
    }
    axios.get('https://api.api-ninjas.com/v1/quotes?category='+tempSelectedValue , config).then(result=> {
      console.log(result);
      setquote(result.data[0].quote)
      setauthor(result.data[0].author)
      
    })
  }
useEffect(() => {
  if(selectedvalue !== "default"){
    get_quote()
  }
}, [selectedvalue])

   
  return (

    <div className=" flex bg-gray-800 items-center justify-center h-screen">
    <div className="absolute rounded top-4 right-4 flex gap-4 border-2 border-yellow-300">
    <select value={selectedvalue} 
    onChange={handleSelectChange} className="font-bold p-1 text-xl bg-gray-200 border-2 border-lime-950">
      <option value="default" selected={true} >Choose One</option>
      <option value="success">Success</option>
      
      <option value="friendship">Friendship</option>
      <option value="forgiveness">Forgiveness</option>
      <option value="home">Home</option>
      <option value="love">Love</option>
      
    </select>
    
  </div>

      <div>
        <div className=" min-h-[100px] max-w-[900px] custom-font text-slate-200 text-3xl font-inter ">{quote}</div>
        <div className="flex mt-5 justify-end text-gray-300">
          <div className=" justify-end"><span className="text-[17px] ">said by </span>
          <span className="custom-font2 text-lg italic">{`  ${author}`}</span></div>
        </div>
        
          <div className="flex justify-center mt-10">
          <button onClick={get_quote} className="btn-quote rounded-lg py-3 px-4 text-lg font-semibold text-yellow-200 hover:bg-green-700 hover:shadow-md border-2 flex gap-1"><FaQuoteLeft />
            Get Another Quote
          </button>

          </div>
          <div className="flex justify-center mt-20 items-center">
        <FaRegCopyright size={13}/> <span className=" text-[14px]">Zunaed Sazzad</span>
      </div>
      </div>

    </div>

  );
}

export default App;
