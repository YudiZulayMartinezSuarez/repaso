let headers = new Headers({"Content-Type": "application/json"});
let puerto = 4005;


const getUsuariosAll = async()=>{
    console.log("get usuario");
    let config = {
        method: "GET", 
        headers: headers
    };
    return await ( await fetch(`http://localhost:${puerto}/usuarios`, config) ).json();
}

const postUsuario = async(arg)=>{
    console.log("post usuario");
    
    let config = {
        method: "POST", 
        headers: headers, 
        body:JSON.stringify(arg)
    };
    return await ( await fetch(`http://localhost:${puerto}/usuarios`, config) ).json();
}

const delteUsuario = async(arg)=>{
    console.log("delete usuario");
    let config = {
        method: "DELETE", 
        headers: headers, 
    };
    return await ( await fetch(`http://localhost:${puerto}/usuarios/${arg.id}`, config) ).json();
}


export default{
    postUsuario,
    getUsuariosAll,
    delteUsuario
} 