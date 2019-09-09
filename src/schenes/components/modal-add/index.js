import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

class ModalAdd extends Component {
	constructor(props) {
		super(props);
		const textRequired = 'This field is reqiured'
		this.state = { 
			firstName: '',
			lastName: '',
			age: '',
			photo: '',
			defaultText: textRequired,
      validation: {
        firstName: {
          class: 'hide',
          text: textRequired
        },
        lastName: {
          class: 'hide',
          text: textRequired
        },
        age: {
          class: 'hide',
          text: textRequired
        },
        photo: {
          class: 'hide',
          text: textRequired
        }
      }
		 }

			this.onHandlerAdd = this.onHandlerAdd.bind(this);
			this.handleClose = this.handleClose.bind(this);
			this.changeInput = this.changeInput.bind(this);
			}

		onHandlerAdd() {
			const payload = {
				firstName: this.state.firstName ,
				lastName: this.state.lastName,
				age: this.state.age,
				photo: this.state.photo,
			}
			const regexPattern = /^[a-z0-9]+$/i;
			const first = payload.firstName;
			const last = payload.lastName;
			if (payload.firstName === '' || payload.lastName === '' || payload.age === '' || payload.photo === '') {
				return toast.warn('This field is required');
			} else if (payload.age > 200) {
				return toast.warn('This field must be less than or equal 200');
			} else if (!first.match(regexPattern) || !last.match(regexPattern)) {
				return toast.warn('This field must be alphanumeric only');
			} else {
				this.props.addHandler(payload);
				toast.success('Yayy success add contact');
				this.props.onHide();
			}
		}

		handleClose() {
			this.props.onHide();
		}

	// 	handlePhoto(e) {
	// 	e.preventDefault();
  //   const file = e.target.files;
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file[0]);
  //   reader.onload = (e) => {
	// 		this.setState({photo: e.target.result })
  //   };
  // }

		changeInput(e) {
    const { value, name } = e.target;
    if (value === '') {
      this.setState({
        [name]: value,
        validation: Object.assign(this.state.validation, { [name]: { class: 'show', text: this.state.defaultText } })
      });
    } else {
      this.setState({
        [name]: value,
        validation: Object.assign(this.state.validation, { [name]: { class: 'hide' } })
      });
		}
		
		// if (name === 'photo') {
		// 	this.handlePhoto();
		// }
  }


    render() {
        return (
					<Modal show={this.props.show} onHide={this.props.onHide}>
						<Modal.Body>
							<div id="form-group" encType="multipart/form-data">
								<div className="">
									<div className="form-wrapper clearfix m-top-20">
										<div className={`form-group ${this.state.validation.firstName.class === 'show' ? 'has-danger' : ''}`}>
											<label htmlFor="firstName">First Name</label>
											<input value={this.state.firstName} autoComplete="off" onBlur={this.changeInput} onChange={this.changeInput} type="text" className="form-control form-size form-control-danger" id="firstName" name="firstName" required />
											<div className={`invalid-feedback ${this.state.validation.firstName.class === 'show' ? 'show' : 'hide'}`}>{this.state.validation.firstName.text}</div>
										</div>
									</div>
									<div className="form-wrapper clearfix">
										<div className={`form-group ${this.state.validation.lastName.class === 'show' ? 'has-danger' : ''}`}>
											<label htmlFor="lastName">Last Name</label>
											<input value={this.state.lastName} autoComplete="off" onBlur={this.changeInput} onChange={this.changeInput} type="text" className="form-control form-size form-control-danger" id="lastName" name="lastName" required />
											<div className={`invalid-feedback ${this.state.validation.lastName.class === 'show' ? 'show' : 'hide'}`}>{this.state.validation.lastName.text}</div>
										</div>
										<div className={`form-group ${this.state.validation.age.class === 'show' ? 'has-danger' : ''}`}>
											<label htmlFor="age">Age</label>
											<input value={this.state.age} autoComplete="off" onBlur={this.changeInput} onChange={this.changeInput} type="number" className="form-control form-size form-control-danger" id="age" name="age" required />
											<div className={`invalid-feedback ${this.state.validation.age.class === 'show' ? 'show' : 'hide'}`}>{this.state.validation.age.text}</div>
										</div>
									</div>
									<div className="form-wrapper clearfix">
										<div className={`form-group ${this.state.validation.photo.class === 'show' ? 'has-danger' : ''}`}>
											<label htmlFor="photo">Photo</label>
											<input value={this.state.photo} autoComplete="off" onBlur={this.changeInput} onChange={this.changeInput} type="file" className="form-control form-size form-control-danger" id="photo" name="photo" required accept="image/*" />
											<div className={`invalid-feedback ${this.state.validation.photo.class === 'show' ? 'show' : 'hide'}`}>{this.state.validation.photo.text}</div>
										</div>
									</div>
									<br />
									<div className="text-center">
										<button id="next-step-button-1" className="btn btn-purple next-step-button m-right-20" onClick={this.handleClose}><i className="fa fa-arrow-left" aria-hidden="true" /> Kembali</button>
										<button id="next-step-button-1" className="btn btn-success next-step-button" onClick={this.onHandlerAdd}>Add <i className="fa fa-arrow-right" aria-hidden="true" /></button>
									</div>
								</div>
							</div>
						</Modal.Body>
					</Modal>
        );
    }
}

ModalAdd.propTypes = {
	onHide: PropTypes.func.isRequired,
	show: PropTypes.func.isRequired,
	addHandler: PropTypes.func.isRequired
};

export default (ModalAdd);
