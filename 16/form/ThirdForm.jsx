import { useState } from "react";
function ThirdForm(){
    const[formData,setFormData]=useState({
        name: '',
        email: '',
        password:'',
        confirmpassword:''
    });
     const [error,setErrors]=useState({});

const handleChange=(event)=>{
    setFormData({
        ...formData,
        [event.target.name]:event.target.value
    })
}

const validate=()=>{
    let errorList={};

    if(!formData.name.trim())
    {
        errorList.name="Name is required..."
    }

     if(!formData.email.trim())
    {
        errorList.email="Email is required..."
    }
    else if(! /^[^\s@]+@[^\s@]+\.com$/.test(formData.email)){
        errorList.email="email is invalid"
    }
     if(!formData.password.trim())
    {
        errorList.password="password is required..."
    }
    else if(formData.password.length<=3){
        errorList.password="password legth should be greater than 3"
    }
    else if(formData.password!=formData.confirmpassword){
        errorList.confirmpassword="password is not matching"
    }

    return errorList;
}
const handleSubmit=(event)=>
{
    event.preventDefault();
    const validateErrors=validate()
    setErrors(validateErrors);

    if(Object.keys(validateErrors).length==0){
alert(`Name: ${formData.name},Email:${formData.email}`);
    }

}



   
    return(
        <div>
                <form onSubmit={handleSubmit}>
<div>
    <input name="name"
    type="text"
    placeholder="enter name"
    value={formData.name}
    onChange={handleChange} />
{error.name&&<p style={{color:'red'}}>{error.name}</p>}
</div> <br></br>
<div>

<input name="email"
    type="email"
    placeholder="enter email"
    value={formData.email}
    onChange={handleChange} />
{error.email&&<p style={{color:'red'}}>{error.email}</p>}


</div> <br></br>
<div>

<input name="password"
    type="password"
    placeholder="enter password"
    value={formData.password}
    onChange={handleChange} />
{error.password&&<p style={{color:'red'}}>{error.password}</p>}
</div> <br></br>
<div>
<input name="confirmpassword"
    type="password"
    placeholder="confirm password"
    value={formData.confirmpassword}
    onChange={handleChange} />
{error.confirmpassword&&<p style={{color:'red'}}>{error.confirmpassword}</p>}
</div>

<button type="submit"> Submit</button>


                </form>
        </div>
    )

}
export default ThirdForm