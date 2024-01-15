import { useCallback, useEffect, useRef, useState } from "react"
import './App.css'

function App() {
    const [length, setlength] = useState(8);
    const [number, setnumber] = useState(false);
    const [character, setCharacter] = useState(false);
    const [password, setPassword] = useState('');

    // copy clipboard
    const passwordRef = useRef(null);

    const copyPasswordBtn = useCallback(()=>{
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0, 100);

      window.navigator.clipboard.writeText(password);
    }, [password]);
    // copy clipboard

    const passwordGenerator = useCallback(()=>{
      let pass = '';
      let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

      if(number) str += '0123456789';
      if(character) str += '`~!@#$%^&*()-_=+[]{}';

      for(let i = 1; i<= length; i++){
        let char = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(char);
      }
      setPassword(pass);
    }, [length, number, character]);

    useEffect(()=>{
        passwordGenerator()
    },[length, number, character, passwordGenerator])
  return (
    
    <>
      <div className="container body_content">
            <div className="password_generator">
              <h3>Password Generator</h3>
              <div className="input-group">
                  <input type="text" value={password} className="form-control" ref={passwordRef} placeholder="Generate your Password" readOnly/>
                  <button onClick={copyPasswordBtn} className="input-group-item">Copy</button>
              </div>
              <div className="check_Value">
                <input type="range" min={8} max={100} value={length} onChange={(e)=>{setlength(e.target.value)}} id="range" />
                <label htmlFor="range">Length: {length}</label>

                <label htmlFor="number">Number</label>
                <input type="checkbox" defaultChecked={number} onChange={()=>{setnumber((prev) => !prev)}} id="number" />

                <label htmlFor="character">Character</label>
                <input type="checkbox" defaultChecked={character} onChange={()=>{setCharacter((prev) => !prev)}} id="character" />
              </div>
            </div>
      </div>
    </>
  )
}

export default App
