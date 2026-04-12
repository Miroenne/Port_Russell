import '../style/bootstrap.min.css';
import '../style/style.css';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Modal = (props) => {

    const [formData, setFormData] = useState(props.initialValues || {});

    useEffect(() => {
        setFormData(props.initialValues || {});
    }, [props.initialValues, props.modalId]);

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch(props.action, {
                method: props.method,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(formData)
            });

            if(response.status === 200){                
                navigate('/Confirm');               
            }
        }catch(error){
            console.error('error_during_form_submission', error);
        }
    }

    return(
        <div>
            {/*Button trigger modal */}
            <div className={props.textPosition}>
                <button type="button" className={"btn btn-success w-auto " + props.margin} data-bs-toggle="modal" data-bs-target={"#" + props.modalId}>
                   {props.title}
                </button>
                {/* Remplacer le form DELETE par un bouton qui utilise une fonction fetch  vers le service delete 
                <form action="" method="" enctype="application/x-www-form-urlencoded" className="  w-50">
                    <input type="hidden" name="_method" value="">  </input>
                    <input type="submit" className="btn btn-danger" value="Supprimer"></input>
                </form>*/}
            </div>


            {/*Adding Modal */}
            <div className="fade modal " id={props.modalId} name='myModal' tabIndex="-1" aria-labelledby={props.modalId + "Label"} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={props.modalId + "Label"}>{props.title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='' onSubmit={handleSubmit}>                                
                                {/*<div className="mb-3">
                                    <label htmlFor={props.id1} className="form-label">{props.label1}</label>
                                    <input type={props.type1} className="form-control" disabled={props.disabledInput} id={props.id1} name={props.id1} value={props.value1}></input>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor={props.id2} className="form-label">{props.label2}</label>
                                    <input type={props.type2} className="form-control" disabled={props.disabledInput} id={props.id2} name={props.id2} value={props.value2}></input>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor={props.id3} className="form-label">{props.label3}</label>
                                    <input type={props.type3} className="form-control"  id={props.id3} name={props.id3} value={props.value3}></input>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor={props.id4} className={"form-label " + props.noDisplay}>{props.label4}</label>
                                    <input type={props.type4} className={"form-control " + props.noDisplay}  id={props.id4} name={props.id4} value={props.value4}></input>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor={props.id5} className={"form-label " + props.noDisplay}>{props.label5}</label>
                                    <input type={props.type5} className={"form-control " + props.noDisplay}  id={props.id5} name={props.id5} value={props.value5}></input>
                                </div>*/}
                                <div className='container'>                                    
                                        {props.fields?.map((field) =>                                     
                                        <div className='mb-3 text-start' key={field.name}>
                                            <label className='form-label' htmlFor={field.name}>{field.label}</label>
                                            <input
                                                id={field.name}
                                                name={field.name}
                                                type={field.type}
                                                value={formData[field.name] || ''}
                                                onChange={handleChange}
                                                disabled={field.disabledInput}
                                                className='form-control'
                                            ></input>
                                        </div>    
                                    )}                                    
                                </div>
                                <div className="text-center pt-3">
                                    <input type="submit" className="btn btn-primary me-5" value="Valider"></input>  
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Fermer</button> 
                                </div>                                                         
                            </form>
                        </div>               
                    </div>            
                </div>
            </div>
        </div>   
    );
}

export default Modal;