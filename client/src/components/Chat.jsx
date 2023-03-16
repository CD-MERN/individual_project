import { Link } from 'react-router-dom';
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Chat = () => {

    return (

        <div className="position-sticky bottom-0 end-0 chat-container me-3">
            <div className="row justify-content-end">
                <div className="col-md-3">
                    <div className="portlet portlet-default">
                        <div className="portlet-heading d-flex justify-content-between align-items-center py-2">
                            <span> <i className="fa fa-circle text-green"></i> Jane Smith</span>
                            <FontAwesomeIcon icon={faMinus} className="cursor-pointer" />
                        </div>
                        <div id="chat" className="panel-collapse collapse in show">
                            <div className="portlet-body chat-widget">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <p className="text-center text-muted small">January 1</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="media">

                                            <div className="media-body">
                                                <div className='d-flex align-items-center justify-content-between'>
                                                    <h5 className="media-heading">Jane Smith</h5>
                                                    <span className="small pull-right">12:23 PM</span>
                                                </div>

                                                <p>
                                                    Hi, I wanted to make sure you got the latest product report. Did Roddy get it to you?
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="portlet-footer">
                                <div className="form-group">
                                    <textarea className="form-control" placeholder="Enter message..."></textarea>
                                    <button type="button" className="btn btn-default pull-right">Send</button>
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





