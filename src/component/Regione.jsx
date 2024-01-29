import {
    AREA_MARINA,
    AREA_MARINA_PROTETTA,
    AREA_PARCO,
    COLORE_BIANCO, COLORE_BLUE, COLORE_CELESTE, COLORE_GRIGIO_CHIARO,
    COLORE_VERDE, ESPLORA_REGIONI,
    PARCO_NAZIONALE, TESTO_REGIONI
} from "../utility/Costanti";
import {DETTAGLI_AREA, HOME_PAGE} from "../utility/Route";
import {Link, useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {findAllAreePerRegione, findAllRegioni, findOneAreaById, findOneAreaRandom} from "../service/areaService";
import imgAreaMarina from "../utility/foto/imgAreaMarina.png"
import imgAreaParco from "../utility/foto/imgAreaParco.png"
import {useSelector} from "react-redux";
import {Button} from "react-bootstrap";
import {useTranslation} from "react-i18next";

export default function Regione(){

    const [areaHome, setAreaHome] = useState();
    const [tipoArea,setTipoArea] = useState();
    const [regioni,setRegioni] = useState();
    const [regioneSelezionata,setRegioneSelezionata] = useState("");
    const [listaAree,setListaAree] = useState()
    const history = useHistory();
    const {t,i18n} = useTranslation()


    useEffect(()=>{
        window.scrollTo(0, 0);
        caricamento()
    },[])

    useEffect(()=>{
        caricamento()
        if(regioneSelezionata){
            ricercaAreeRegione(regioneSelezionata)
        }
    },[i18n.language])

    async function caricamento() {
        if(areaHome){
            let dataArea = await findOneAreaById(i18n.language,areaHome.id)
            setAreaHome(dataArea)
        }else{
            let dataArea = await findOneAreaRandom(i18n.language)
            setAreaHome(dataArea)
            setTipoArea(dataArea.type)
        }
        let dataRegioni = await findAllRegioni()
        setRegioni(dataRegioni)
    }

    async function ricercaAreeRegione(regione){
        let regioneFormattata = regione.split(" ")
        let primaParte = regioneFormattata[0]
        setRegioneSelezionata(regione)
        let dataAree = await findAllAreePerRegione(i18n.language,primaParte)
        setListaAree(dataAree)
    }

    return (
        <>
            <div className="container text-center">
                {areaHome && (
                    <>
                        <div className={tipoArea === AREA_PARCO ? "row p-0 bg-areaParco  d-flex flex-column justify-content-center " : "row p-0 bg-areaMarina d-flex flex-column justify-content-center p-0"}>>
                            <div className="col-12 text-center">
                                <p className="h4 my-5" style={{ color: COLORE_BIANCO }}>{areaHome.nome}</p>
                            </div>
                            <div className="col-10 mx-auto text-center">
                                <p className="h5 my-5 " style={{ color: COLORE_BIANCO }}>
                                    {(areaHome.descrizione && areaHome.descrizione.length > 200)
                                        ? areaHome.descrizione.split(' ').slice(0, 200).join(' ') + "..."
                                        : areaHome.descrizione}
                                </p>
                            </div>
                            <div className="col-12 text-center mt-1">
                                <Button className="border-0 mb-2" style={{ backgroundColor:"orange" }} onClick={() => history.push(DETTAGLI_AREA, { idArea: areaHome.id })}>
                                    {t("Leggi di più")}
                                </Button>
                            </div>
                        </div>
                    </>
                )}
                <div className={"row p-0 d-flex flex-row"} style={{backgroundColor:"orange"}}>
                    <div className={"col-6 d-flex justify-content-center"}>
                        <i style={{color:COLORE_BIANCO}} className="fa-regular fa-chess-rook fa-8x mt-5 mb-5"></i>
                    </div>
                    <div className={"col-6 d-flex justify-content-center align-items-center"}>
                        <p className={"h2 text-start btn-close-white"}>{t(TESTO_REGIONI)}</p>
                    </div>
                </div>
                <div className={"row p-0 d-flex flex-row mt-3"}>
                    <div className={"col-6 d-flex flex-row"}>
                        <Link to={HOME_PAGE}> <p style={{textDecoration:"none"}} className={"h5 mx-2 text-start"}>Home page</p></Link>
                        <p className={"h5 mx-2 text-start fw-bold"}>/ {t(ESPLORA_REGIONI)}</p>
                    </div>
                </div>
                <div className={"row p-0 mt-4"}>
                    {regioneSelezionata && <p className={"h2 text-start"}>{regioneSelezionata}</p>}
                </div>
                <div className={"row p-0 d-flex flex-row mt-4 mb-4"}>
                    <div className={"col-4 d-flex flex-column"}>
                        {regioni && regioni.map((regione,index)=>(
                            <div className={"col-12 d-flex"}>
                                {(regioneSelezionata && regioneSelezionata == regione)&&(
                                    <div style={{width:"13px",height:"30px",backgroundColor:"orange",marginRight:"10px"}}></div>
                                )}
                                <p className={"h4 text start mb-3"} onClick={(e)=>ricercaAreeRegione(regione)} style={{cursor:"pointer",fontWeight:regioneSelezionata==regione ?"bold":"lighter"}} key={index}>{regione}</p>
                            </div>
                        ))}
                    </div>
                    {/* perche ho dovuto inserire per forza flex wrap per forzare l'andatura a capo?*/}
                    <div className={"col-8 "} >
                        <div className={"col-12 d-flex flex-wrap justify-content-center"}>
                            {(listaAree && listaAree.length>0) && listaAree.map((area,index)=>(
                                <div className={"col-5 d-flex flex-column  mb-2 mx-4 mb-4  rounded-4 "} style={{backgroundColor:COLORE_GRIGIO_CHIARO}} key={index} onClick={(e)=>history.push(DETTAGLI_AREA,{idArea:area.id})}>
                                    {area.type == AREA_PARCO ?
                                        <img className={""} src={imgAreaParco} style={{ width: "406px", height: "220px"}}></img>
                                        :
                                        <img src={imgAreaMarina} style={{ width: "406px", height: "220px"}}></img>
                                    }
                                    <p className={"h3 mt-2"} style={{color:area.type == AREA_PARCO ? COLORE_VERDE : area.type == AREA_MARINA ? COLORE_CELESTE : ""}}>{area.type == AREA_PARCO ? t(PARCO_NAZIONALE): area.type == AREA_MARINA ? t(AREA_MARINA_PROTETTA) :""}</p>
                                    <p className={"h5 mb-3"}>{area.nome}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}