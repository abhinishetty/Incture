
interface MyProps{
    name:string;
    city:string;
}
//const PropComp:React.FC<MyProps>=({name})=>{
const PropComp=(props:MyProps)=>{
    return(
        <div>
<h2>PrompComp  in typescript</h2>
<p>Name:{props.name}</p>
<p>City:{props.city}</p>

        </div>
    )

}



export default PropComp