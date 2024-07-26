import './Otp.css'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
function Otp() {

    const emptyArr = ['','','',''];
    const refs = [useRef(),useRef(),useRef(),useRef()];
    const[inputs,setInputs] = useState(emptyArr);
    const[missing,setMissing] = useState(emptyArr);
    const CODE = '1234';

    const handleSubmit = () => {
        const missed = inputs.map((items,i) => {
            if(items === '') return i;
        }).filter((item) => (item || item === 0));
        console.log(missed);
        setMissing(missed);
        if(missed.length) {
            return;
        }
        const userInput = inputs.join('');
        const isMatch = userInput === CODE;
        const msg = isMatch ? 'code is valid ' : 'code is not valid';
        alert(msg);
    }

    useEffect(() => {
        refs[0].current.focus();
    })

    const handleInputChange = ( e, index) => {
        const val = e.target.value;
        console.log(val,index);
        if(!Number(val)) return ;

        if(index < inputs.length-1){
            refs[index+1].current.focus();
        }
        const copyInputs = [...inputs];
        copyInputs[index] = val;
        setInputs(copyInputs);
    }

    const handleOnKeyDown = (e,index) => {
        console.log(e.keyCode , index);
        if(e.keyCode === 8) {
            const copyInputs = [...inputs];
            copyInputs[index ] = '';
            setInputs(copyInputs);

            if(index>0){
                refs[index-1].current.focus();
            }
        }
    }

    const handlePaste = (e) => {
        const data = e.clipboardData.getData('text');
        console.log('paste data',data);
        if(!Number(data) || data.length !== inputs.length) return ;

        const pastCode = data.split('');
        setInputs(pastCode);
        refs[inputs.length-1].current.focus();
    }

    console.log('inputs',inputs);
  return (
    <>
    <div className='Outer'>
        <h1>Chai aur code</h1>
    </div>
    <div className='inner'>
     <h1>Mobile Phone verification</h1>
     <h6>Enter the 4 digit verification code that was sent to your phone number</h6>
    </div>
    <div>
        {
        emptyArr.map((item,i) => {
            return <input
            value = {inputs[i]}
            key ={i}
            ref = {refs[i]}
            type = 'text'
            maxLength = "1"
            onPaste = {handlePaste}
            onChange = {(e) => handleInputChange(e,i)}
            onKeyDown = {(e) => handleOnKeyDown(e,i)}
            className={missing.includes(i) ? 'error' : ''}
            />
        })
    }
        <button onClick={handleSubmit}>Submit</button>
    </div>
      
    </>
  )
}

export default Otp
