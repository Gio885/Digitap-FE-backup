import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './component/Home';
import {HOME_PAGE, AREE_PROTETTE, DETTAGLI_AREA, ITINERARI, DETTAGLI_ITINERARIO, REGIONE, RICERCA} from './utility/Route';
import NavBar from './component/NavBar';
import Footer from "./component/Footer";
import Area from "./component/Area";
import DettagliArea from "./component/DettagliArea";
import Itinerario from "./component/Itinerario";
import DettaglioItinerario from "./component/DettaglioItinerario";
import Regione from "./component/Regione";
import Ricerca from "./component/Ricerca";

function App() {
    return (

        <div className="container-fluid p-0">
            <BrowserRouter>
                    <NavBar/>
                <Switch>
                    <Route exact path={HOME_PAGE} component={() => <Home/>}/>
                    <Route exact path={AREE_PROTETTE} component={() => <Area/>}/>
                    <Route exact path={DETTAGLI_AREA} component={() => <DettagliArea/>}/>
                    <Route exact path={ITINERARI} component={() => <Itinerario/>}/>
                    <Route exact path={DETTAGLI_ITINERARIO} component={() => <DettaglioItinerario/>}/>
                    <Route exact path={REGIONE} component={() => <Regione/>}/>
                    <Route exact path={RICERCA} component={() => <Ricerca/>}/>
                </Switch>
                    <Footer/>
            </BrowserRouter>
        </div>
    );
}


export default App;
