import config  from "../config/config.js";

export default class registroUsuario extends HTMLElement{
    static url = import.meta.url
    static async components(){
        return await (await fetch(config.uri(registroUsuario.url))).text();
    }

    constructor(){
        super();
        this.attachShadow({mode:"open"});
        
    }

    handleEvent(e){
        e.preventDefault();
        (e.type==="submit") ? this.wsUsuario(e) : undefined;
    }
    wsUsuario(e){
        let ws = new Worker("../config/wsUsuarios.js", {type:"module"});
        let data = Object.fromEntries(new FormData(e.target));
        switch (e.submitter.dataset.valor){
            case "get": 
                ws.postMessage({type:"getUsuariosAll"});
                console.log("get compra ");
                break;
            case "post":
                console.log("post compra ");
                ws.postMessage({type:"postUsuario", arg:data});
                break;
            case "delete":
                console.log("delete compra ");
                ws.postMessage({type:"delteUsuario", arg:data});
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
    
    atributeChangedCallback(id,name,compra){
        console.log("dato");
    console.log(id,name,compra);
    console.log(this.dataset.accion);
    }
    connectedCallback(){
        Promise.resolve(registroUsuario.components()).then(html=>{
            this.shadowRoot.innerHTML=html;
            this.form=this.shadowRoot.querySelector("#formUsuario");
            this.form.addEventListener("submit",this.handleEvent.bind(this));
        })

    } 
}

customElements.define(config.name(registroUsuario.url), registroUsuario); 

