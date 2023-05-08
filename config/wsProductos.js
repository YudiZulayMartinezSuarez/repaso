import productos from "../api/productos.js";

self.addEventListener("message", (e)=>{
    let res = productos[`${e.data.type}`]((e.data.arg) ? e.data.arg : undefined);
    Promise.resolve(res).then(res=>postMessage(res));
})