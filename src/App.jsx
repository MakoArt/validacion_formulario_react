import React,{useState,useEffect} from 'react'



const App = () => {

//valores de los formularios
const[user,setUser]=useState('')
const[name,setName]=useState('')
const[password,setPassword]=useState('')
const[email,setEmail]=useState('')
const[telephone,setTelephone]=useState('')
const[checkbox,setCheckbox]=useState(false)

//guardar en el state si todo va bien 
const[lista,setLista]=useState([])


//control de errores 
const[errorVacioUser,setErrorVacioUser]=useState(false)
const[errorVacioName,setErrorVacioName]=useState(false)
const[errorVacioPassword,setErrorVacioPassword]=useState(false)
const[errorVacioEmail,setErrorVacioEmail]=useState(false)
const[errorVacioTelephone,setErrorVacioTelephone]=useState(false)
const[errorVacioCheckbox,setErrorVacioCheckbox]=useState(false)
 
const[errorUser,setErrorUser]=useState('')
const[errorName,setErrorName]=useState('')
const[errorPassword,setErrorPassword]=useState('')
const[errorEmail,setErrorEmail]=useState('')
const[errorTelephone,setErrorTelephone]=useState('')
const[errorCheckbox,setErrorCheckbox]=useState('')

//REGEX 

const userRegex=/^[a-zA-Z0-9_-]{3,16}$/
const nameRegex=/^[a-zA-Z]{3,16}$/
const passwordRegex=/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/
const emailRegex=/^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
const telephoneRegex=/^[\d]{3}[-]*([\d]{2}[-]*){2}[\d]{2}$/

//ARRAY DE VALIDACION 

let validationArray=[]

//ARRAY LOCALSTORAGE 

let arrayUsuarios=[]



useEffect(()=>{

 let errorTimeout=setTimeout(()=>{
   
   setErrorVacioUser('')
   setErrorVacioName('')
   setErrorVacioPassword('')
   setErrorVacioEmail('')
   setErrorVacioTelephone('')
   setErrorVacioCheckbox('')
   setErrorUser('')
   setErrorName('')
   setErrorPassword('')
   setErrorEmail('')
   setErrorTelephone('')
   setErrorCheckbox('')
 
 },35000)

 
 return()=>{
   clearTimeout(errorTimeout)
 }



},[errorVacioUser,
   errorVacioName,
   errorVacioPassword,
   errorVacioEmail,
   errorVacioTelephone,
   errorVacioCheckbox,
   errorUser,
   errorName,
   errorPassword,
   errorEmail,
   errorTelephone,
   errorCheckbox])



 // Validamos y guardamos los datos 
 const guardarDatos=(e)=>{
    e.preventDefault()
  
  if(!user.trim()){
    setErrorVacioUser('Campo vacio')
   
  }else{
      
     if(!userRegex.test(user)){
        setErrorUser(true)
      }else{
         console.log('usuario correcto')
         validationArray.push('user')
      }
   }

  
  if(!name.trim()){
    setErrorVacioName('Campo vacio')
  }else{
    if(!nameRegex.test(name)){
      setErrorName(true)
    }else{
      console.log('name es correcto')
      validationArray.push('name')
    }
  }


  if(!password.trim()){
    setErrorVacioPassword('Campo Vacio')
  }else{
    if(!passwordRegex.test(password)){
      setErrorPassword(true)
    }else{
      console.log('el password esta correcto')
      validationArray.push('password')
    }
  }

  
  if(!email.trim()){
    setErrorVacioEmail('Campo Vacio')
  }else{
    if(!emailRegex.test(email)){
      setErrorEmail(true)
    }else{
      console.log('email correcto')
      validationArray.push('email')
    }
  }
  
  
  if(!telephone.trim()){
    setErrorVacioTelephone('Campo Vacio')
  }else{
    if(!telephoneRegex.test(telephone)){
      setErrorTelephone(true)
    }else{
      console.log('telephone esta correcto')
      validationArray.push('telephone')
    }
  }

  
  if(!checkbox){
    setErrorVacioCheckbox('Acepta las condiciones')
  }else{
    console.log('aceptas las condiciones correctamente')
    validationArray.push('checkbox')
  }


  //validacion antes de enviar datos 

   if(validationArray.length===6){
       
    //guardamos datos en el state
       setLista([
         ...lista,
         {user,name,password,email,telephone,checkbox}
       ])
   
     //guardando datos en el local storage 

     //JSON.stringify para guardar arrays de objetos en el localstorage 
     //JSON.parse para sacar los datos y manejarlos fuera del localstorage 


     let usuario={
        user,
        name,
        password,
        email,
        telephone
     }
    
     arrayUsuarios.push(usuario)
   
     localStorage.setItem(`${email}`,JSON.stringify(arrayUsuarios))
   
   }







 //limpiamos los campos 

 e.target.reset()
 setUser('')
 setName('')
 setPassword('')
 setEmail('')
 setTelephone('')
 setCheckbox('')

}

//  bd=JSON.parse(localStorage.getItem('macaco@hotmil.com'))

return (
    
    <>
    <form onSubmit={guardarDatos}>
      <h6>{errorVacioUser}{errorUser ? 'Debe tener entre 3 y 16 caracteres alfanumericos incluidas guion bajo y alto':null}</h6>
      <input 
      type="text" 
      placeholder="user"
      onChange={(e)=>setUser(e.target.value)} />
      <br/>
     
     <h6>{errorVacioName}{errorName ? 'Introduce de 3 a 16 caracteres de la a - z A-Z':null}</h6>
      <input 
      type="text" 
      placeholder="name"
      onChange={(e)=>setName(e.target.value)}
      />
      <br/>
     
      <h6>{errorVacioPassword}{errorPassword ? 'Debe tener 1 mayuscula 1 minuscula y un numero además minimo 8 caracteres':null}</h6>
       <input 
       type="password"
       placeholder="contraseña"
       onChange={(e)=>setPassword(e.target.value)}
        />
        <br/>
        
        <h6>{errorVacioEmail}{errorEmail ? 'de 3 a 6 caracteres correctos ,@ obligatoria':null}</h6>
        <input 
        type="email" 
        placeholder="email"
        onChange={(e)=>setEmail(e.target.value)}/>
        <br/>


       <h6>{errorVacioTelephone}{errorTelephone ? 'Introduce el telefono correctamente':null}</h6>
        <input 
        type="text" 
        placeholder="telephone"
        onChange={(e)=>setTelephone(e.target.value)}/>
        <br/>
        
        <h6>{errorVacioCheckbox ? 'Acepta las condiciones':null}</h6>
        <input 
        type="checkbox" 
        placeholder="checkbox"
        onChange={(e)=>setCheckbox(e.target.value)}/>
        Terms and Conditions
        <br/> 

      <input type="submit" />
    </form>
    {/* <button onClick={(()=>{localStorage.removeItem('')})}>BORRAR</button> */}

    
    </>
  )
}



export default App
