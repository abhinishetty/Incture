

function Data(){
    let username:string="abhi";
    let age:number=20;
 const course:string[]=["React","Angular","Vue"]//here we can declare only strings

type Employee={
    id:number,
    name:string,
    city:string;
}




const emp1:Employee={
    id:100,
    name:"Abhi",
    city:"Udupi"
}


    let isActive:boolean=true;
    return(
<div>
<h2>User profile</h2>
<p>Name:{username}</p>
<p>Age: {age}</p>
<p>Is Active : {isActive?"Yes":"No"}</p>
<p>Employee Id: {emp1.id}</p>
<p>Employee name: {emp1.name}</p>
<p>Employee city : {emp1.city}</p>
<ul>
    {
        course.map((c,index)=>(
            <li key={index}>
                {c}
            </li>
        ))
    }
</ul>
</div>

    )
}
export default Data