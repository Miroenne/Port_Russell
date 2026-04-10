import '../style/bootstrap.min.css';
import '../style/style.css';
import Modal from '../components/Modal';



const DisplayCard = (props) => {   

    return(
       <div className="card shadow-lg  mx-auto border-2 mt-5" id='userCard'>            
            <div className="card-body text-center">
                <div className="row">
                    <div className={props.col1}>
                        <img src={props.icon1} className='cardIcon' alt={props.iconAlt1}/>
                        <p className="card-title">{props.text1}</p>
                    </div>                    
                    <div className={props.col1}>
                        <img src={props.icon2} className='cardIcon' alt={props.iconAlt2} />
                        <p className="card-text">{props.text2}</p>
                    </div> 
                    {/*définir la propriété "col" dans "props.display" si élément affiché*/}
                    <div className={props.display}> 
                        <img src={props.icon3} className={props.display} alt={props.iconAlt3} />
                        <p className="card-text">{props.text3}</p>
                    </div>  
                </div>
                <div className={props.rowDisplay}>                    
                    <img src={props.icon4} className={props.secondRowIcon} alt={props.iconAlt4} />
                    <div className={props.col2}>                            
                        <p className="card-text">{props.text4}</p>
                    </div> 
                    <div className={props.col2}>                            
                        <p className="card-text">{props.text5}</p>
                    </div>                     
                </div>        
            </div>
            <div className='card-footer'>
                <Modal/>
            </div>
        </div> 
    )
    
}

export default DisplayCard;

