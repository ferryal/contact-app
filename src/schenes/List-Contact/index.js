import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Card, CardDeck, Button} from 'react-bootstrap';
import { fetchListContact, submitContact, deleteContact, updateContact } from '../../actions/contact';
import ModalUpdate from '../components/modal-update';
import ModalAdd from '../components/modal-add';
import 'react-toastify/dist/ReactToastify.css';

class ListContact extends Component {
constructor(props) {
    super(props);
		this.state = {
			showModalAdd: false,
			showModalUpdate: false
		};
		
		this.modalOpenAdd = this.modalOpenAdd.bind(this);
		this.modalOpenUpdate = this.modalOpenUpdate.bind(this);
		this.modalCloseAdd = this.modalCloseAdd.bind(this);
		this.modalCloseUpdate = this.modalCloseUpdate.bind(this);
		this.addHandler = this.addHandler.bind(this);
		this.updateHandler = this.updateHandler.bind(this);
		this.removeContact = this.removeContact.bind(this);

  }
	
	componentWillMount() {
		this.props.fetchListContact();
	}

	modalCloseAdd() {
    this.setState({ showModalAdd: false });
	}
	
	modalCloseUpdate() {
    this.setState({ showModalUpdate: false });
	}
	
	modalOpenAdd() {
    this.setState({ showModalAdd: true });
	}
	
	modalOpenUpdate() {
		console.log('add')
    this.setState({ showModalUpdate: true });
	}
	
	addHandler(payload) {
		console.log('masuk add');
		console.log(payload)
		this.props.submitContact(payload)
	}

	updateHandler(id, payload) {
		console.log('masuk update');
		this.props.updateContact(id, payload)
	}

	removeContact(e, id) {
		e.preventDefault()
		if (id !== '' || id !== undefined)  {
			this.props.deleteContact(id)
		} else {
			return toast.warn('Please try again');
		}
	}


renderListContact() {
	const { card } = this.props;
	const { listContact } = card;
	return(
		<React.Fragment>
			{ 
				listContact.length > 0 ?
					listContact.map((data, index) => {
						return(
							<Card style={{ width: '18rem' }} key={data.id}>
								{ data.photo !== 'N/A' ? <Card.Img variant="top" src={data.photo} /> : <Card.Img variant="top" src="/assets/images/image-notfound.png" />}
								<Card.Body className="text-center">
									<Card.Title>{data.firstName} {data.lastName}</Card.Title>
									<Card.Text>
										Age {data.age} years old
									</Card.Text>
								</Card.Body>
								<Card.Footer className="text-center">
									<Button style={{marginRight: '20px'}} onClick={this.modalOpenUpdate}>edit</Button>
									<Button onClick={ e => this.removeContact(e, data.id)}>delete</Button>
								</Card.Footer>
							</Card>
						)
					}) : ''
			}
			<ToastContainer />
		</React.Fragment>
	)
}

render() {
    return(
			<React.Fragment>
				<div className="navbar navbar-inverse navbar-fixed-top">
					<Link className="nav-pokemon m-left-15" to="/">List Contact</Link>
					<Button onClick={this.modalOpenAdd}>Add contact</Button>
				</div>
				<div id="container" className="container">	
					<div className="">
						<CardDeck>
							{ this.renderListContact() }
						</CardDeck>
					</div>
					</div>
					<ModalAdd addHandler={this.addHandler} show={this.state.showModalAdd}  onHide={this.modalCloseAdd} />
					<ModalUpdate updateHandler={this.updateHandler} show={this.state.showModalUpdate}  onHide={this.modalCloseUpdate} />
			</React.Fragment>
    )
	}
}

ListContact.propTypes = {
	fetchListContact: PropTypes.func.isRequired,
	card: PropTypes.object.isRequired,
	submitContact: PropTypes.func.isRequired,
	deleteContact: PropTypes.func.isRequired,
	updateContact: PropTypes.func.isRequired
}

const mapStatetoProps = state => ({
	card: state.listContact
});

const mapDispatchToProps = {
	fetchListContact, submitContact, deleteContact, updateContact
};

export default connect(mapStatetoProps, mapDispatchToProps)(ListContact);

