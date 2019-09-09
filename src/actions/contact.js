import axios from 'axios';
import config from '../config';
import { LISTCONTACT } from './ActionTypes';


function loading() {
  return {
    type: LISTCONTACT.LOADING
  };
}

function fetchSuccess(data) {
  return {
    type: LISTCONTACT.FETCH_SUCCESS,
    payload: { data }
  };
}

function fetchFailed() {
  return {
    type: LISTCONTACT.FETCH_FAILED
  };
}

function removeSuccess(id) {
  return {
    type: LISTCONTACT.DELETE_SUCCESS,
    payload: id
  }
}

function removeFailed() {
  return {
    type: LISTCONTACT.DELETE_FAILED
  }
}

function updateSuccess(id) {
  return {
    type: LISTCONTACT.UPDATE_SUCCESS,
    payload: id
  }
}

function updateFailed() {
  return {
    type: LISTCONTACT.UPDATE_FAILED
  }
}

function addSuccess(id) {
  return {
    type: LISTCONTACT.ADD_SUCCESS,
    payload: id
  }
}

function addFailed() {
  return {
    type: LISTCONTACT.UPDATE_FAILED
  }
}

export function fetchListContact() {
  return (dispatch) => {
    dispatch(loading());
    axios.get(`${config.apiUrl}/contact`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then((res) => {
      if (res.status === 200) {
        const response = res.data.data;
        console.log(response);
        dispatch(fetchSuccess(response));
      } else {
        dispatch(fetchFailed());
      }
    }).catch(() => {
      dispatch(fetchFailed());
    });
  };
}


export function submitContact(payload) {
  console.log('masuk submit contact');
  console.log(payload);
  return (dispatch) => {
    axios.post(`${config.apiUrl}/contact`, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.status === 200) {
        console.log(res);
        const response = res.data;
        dispatch(addSuccess(response));
        window.location = '/';
      } else {
        dispatch(addFailed());
      }
    }).catch(() => {
      dispatch(addFailed());
    })
  }
}

export function deleteContact(id) {
  console.log('masuk delete contact');
  console.log(id);
  return (dispatch) => {
    axios.delete(`${config.apiUrl}/contact/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.status === 200) {
        console.log(res);
        const response = res.data;
        dispatch(removeSuccess(response));
      } else {
        dispatch(removeFailed());
      }
    }).catch(() => {
      dispatch(removeFailed());
    })
  }
}

export function updateContact(id) {
  console.log('masuk delete contact');
  console.log(id);
  return (dispatch) => {
    axios.put(`${config.apiUrl}/contact/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.status === 200) {
        console.log(res);
        const response = res.data;
        dispatch(updateSuccess(response));
      } else {
        dispatch(updateFailed());
      }
    }).catch(() => {
      dispatch(updateFailed());
    })
  }
}