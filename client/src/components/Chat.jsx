import { useRef } from 'react'
import { Link } from 'react-router-dom';
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Chat = () => {

    const chat = useRef();


    const toggleChat = () => {
        chat.current.classList.toggle("show");
    }


    return (

        <div className="position-sticky bottom-0 end-0 chat-container me-md-3">
            <div className="row justify-content-end">
                <div className="col-md-3">
                    <div className="portlet portlet-default">
                        <div className="portlet-heading d-flex justify-content-between align-items-center py-2">
                            <span> <i className="fa fa-circle text-green"></i> Chat</span>
                            <FontAwesomeIcon icon={faMinus} className="cursor-pointer" onClick={toggleChat} />
                        </div>
                        <div className="panel-collapse collapse in show" ref={chat}>
                            <div className="portlet-body chat-widget">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <p className="text-center text-muted small ">Marzo, 16</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="media">

                                            <div className="media-body">
                                                <div className='d-flex align-items-center justify-content-between'>
                                                    <h5 className="media-heading">Montserrat Medina</h5>
                                                    <span className="small pull-right">20:00</span>
                                                </div>

                                                <p>
                                                    Hola, tienen este producto?
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="portlet-footer">
                                <div className="form-group text-center">
                                    <textarea className="form-control mb-3" placeholder="Enter message..."></textarea>
                                    <button type="button" className="btn btn-success pull-right">Send</button>
                                </div>
                                <div className="form-group">
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat





