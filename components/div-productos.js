/* let pathnName= new URL(import.meta.url).pathname;
let name= pathnName.split("/").pop().replace(".js",""); */
import config  from "../config/config.js";

export default class registroProducto extends HTMLElement{
    static url = import.meta.url
    //posible error static url no mencionado
    static async components(){
        return await (await fetch(config.uri(registroProducto.url))).text();
    }

    constructor(){
        super();
        this.attachShadow({mode:"open"});
        
    }

    handleEvent(e){
        e.preventDefault();
        (e.type==="submit") ? this.wsProducto(e) : undefined;
    }
    wsProducto(e){
        let ws = new Worker("../config/wsProductos.js", {type:"module"});
        let data = Object.fromEntries(new FormData(e.target));
        switch (e.submitter.dataset.valor){
            case "get":
                ws.postMessage({type:"getProductosAll"});
                break;
            case "post":
                ws.postMessage({type:"postProductos", arg:data});
                break;
            case "delete":
                ws.postMessage({type:"deleteProductos", arg:data});
                break;
            case "put":
                ws.postMessage({type:"putProductos", arg:data});
                break;
            case "search":
                ws.postMessage({type:"getProductosId", arg:data});
                break;

            default:
                break;
        }
        ws.addEventListener("message", (e)=>{
            console.log(e.data);
            ws.terminate();
        })
    }

    static get observedAttributes(){
        return ['data-accion'];
    }
    
    atributeChangedCallback(id,name, costo, inventario){
        console.log("dato");
    console.log(id,name, costo, inventario);
    console.log(this.dataset.accion);
    }
    connectedCallback(){
        Promise.resolve(registroProducto.components()).then(html=>{
            this.shadowRoot.innerHTML=html;
            this.form=this.shadowRoot.querySelector("#formProducto");
            this.form.addEventListener("submit",this.handleEvent.bind(this));
        })

    } 
}

customElements.define(config.name(registroProducto.url), registroProducto);