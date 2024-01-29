const { DateTime } = require("luxon");

export function formattaData(data) {
    return DateTime.fromISO(data).toFormat("dd/MM/yy");
}

export async function elementiPerPagina(paginaCorrenteNews,elementoPerPagina,lista){
    return new Promise((resolve)=>{
        let indiceUltimoElemento = paginaCorrenteNews * elementoPerPagina;
        let indicePrimoElemento = indiceUltimoElemento - elementoPerPagina;
        if(lista){
            const listaNuova = lista.slice(indicePrimoElemento,indiceUltimoElemento)
            resolve(listaNuova);
        }
    })
}
export async function bottoniCarouselPagina(bottoniPagina,totalePagine,setPaginaCorrenteNews,colore){
    return new Promise((resolve)=>{
        const bottoniPaginaNuovi = []
        for(let i = 1; i<= totalePagine;i++){
            bottoniPaginaNuovi.push(
                <button style={{cursor:"pointer",color:"white",fontWeight:"bold",fontSize:"20px",backgroundColor:colore,height:"50px",width:"50px"}} key={i}onClick={()=>setPaginaCorrenteNews(i)}>{i}</button>
            )
        }
        resolve(bottoniPaginaNuovi)
    })
}
export function formattaInKm(m){
    if(m > 1000){
        return Math.round(m/1000)+" km"
    }
    return m+" metri"
}
export function formattaInOre(minuti){
    if(minuti > 59){
        return Math.round(minuti/60)+" ore"
    }
    return minuti +" minuti";
}