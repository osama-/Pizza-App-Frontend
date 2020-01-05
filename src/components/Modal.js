
import React, { Component } from 'react';

class Modal extends Component {
  onClose(){
      this.props.onclose(false);
  }
  render() {
      return (
        <div className="modal show-modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{this.props.title}</h5>
                        <button type="button" className="close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>{this.props.message}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={()=> this.onClose()}>{this.props.buttonLabel}</button>
                    </div>
                </div>
            </div>
        </div>
      );
  }
}

export default Modal;