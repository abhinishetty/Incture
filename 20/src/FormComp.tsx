import { useState } from "react";


interface FormData{
    name:string;
    email:string;
}

function FormComp(){
    const [form,setForm]=useState<FormData>({
    name:'',
    email:''
    })
    const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const{name,value}=event.target;
        setForm({
         ...form,
         [name]:value
        })
    }

    
    return (
        <div>
<h2>User Form</h2>
<input
name="name"
value={form.name}
onChange={handleChange}
placeholder="Enter name"/> <br></br>

<input
name="email"
value={form.email}
onChange={handleChange}
placeholder="Enter email"/> <br></br>


<p>Name:{form.name}</p>
<p>Email:{form.email}</p>
        </div>
    )
}
export default FormComp