import { useForm } from 'react-hook-form';
const RegistrationForm=()=>{
    const {
register,
handleSubmit,
formState:{errors}

    }=useForm();
    const onSubmit=(data)=>{
        alert("Registration sucessful:"+JSON.stringify(data, null, 2));
    }
return(
    <div style={{maxWidth:'500px'}}>

<h2>Registration form: </h2>
<form onSubmit={handleSubmit(onSubmit)}>
    <div style={{marginBottom:'15px'}}>
<label>Name:</label>
<input type='text'
{...register("name",{required :"Name is required"})} />
{errors.name&&<p style={{color:'red'}}>{errors.name.message}</p>}


    </div>

 <div style={{marginBottom:'15px'}}>
<label>Email:</label>
<input type='email'
{...register("email",{required :"Email is required",
    pattern:{
        value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message:"Invalid email format"
    }

})} />
{errors.email&&<p style={{color:'red'}}>{errors.email.message}</p>}


    </div>

 <div style={{marginBottom:'15px'}}>
<label>Password :</label>
<input type='password'
{...register("password",{required :"password is required",
    minLength:{
        value:10,
        message:"Password must be of atleast 10 digit"
    }

})} />
{errors.password&&<p style={{color:'red'}}>{errors.password.message}</p>}


    </div>

    <button type="submit">Register</button>


</form>

    </div>
)

}
export default RegistrationForm