import {Link} from 'react-router-dom';
import './presentation.css';

function Presentation () {
  
  return (
    <div className='presentationContent'>
    <article className='presentationMain'>
    <h3>Bienvenid@ a 
    <br/>
    <br/>
    Check Books</h3>
    <div className='explainContent'>
        <h5 className='textPresentation'>Administra tus lecturas</h5>
        <p className='textPresentation'>Ordena tu estantería con los libros que has leído</p>
        <p className='textPresentation'>Guarda en tu Librería las obras pendientes</p>
    <Link to="/register" className='regButton'>Registrarse</Link>

    </div>
    
    </article>
    </div>
  )
}
export default Presentation;