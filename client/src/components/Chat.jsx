import { Link } from 'react-router-dom';

const Chat = () => {

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="portlet portlet-default">
                        <div className="portlet-heading">
                            <div className="portlet-title">
                                <h4><i className="fa fa-circle text-green"></i> Jane Smith</h4>
                            </div>
                            <div className="portlet-widgets">
                                <span className="divider"></span>
                                <a data-toggle="collapse" data-parent="#accordion" href="#chat"><i className="fa fa-chevron-down"></i></a>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                        <div id="chat" className="panel-collapse collapse in">
                            <div className="portlet-body chat-widget">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <p className="text-center text-muted small">January 1, 2014 at 12:23 PM</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="media">

                                            <div className="media-body">
                                                <h4 className="media-heading">Jane Smith
                                                    <span className="small pull-right">12:23 PM</span>
                                                </h4>
                                                <p>Hi, I wanted to make sure you got the latest product report. Did Roddy get it to you?</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="portlet-footer">
                                <form>
                                    <div className="form-group">
                                        <textarea className="form-control" placeholder="Enter message..."></textarea>
                                    </div>
                                    <div className="form-group">
                                        <button type="button" className="btn btn-default pull-right">Send</button>
                                        <div className="clearfix"></div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat





