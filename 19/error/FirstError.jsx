function FirstError(props){
    try{
    throw new Error("Somethingsss broken................")
    }
    catch(error){
return <p>Some Error Occured in First Error Component.......</p>
    }
    return(
        <div>
            <h2>This is a first component From Error</h2>
            <h3>{props.name}</h3>
        </div>
    )
}
export default FirstError