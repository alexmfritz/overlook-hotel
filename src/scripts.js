import './css/base.scss';
import { 
  allCustomersData, 
  allBookingsData, 
  allRoomsData, 
  fetchSingleCustomer, 
  postNewBooking,
} from './apiCalls';
import { domUpdates, querySelectors } from './domUpdates';


function validateUserCredentials() {
  let loginUsername = document.getElementById('loginUsername');
  let loginPassword = document.getElementById('loginPassword');
  if (loginUsername.value !== 'username2022' && loginPassword !== 'overlook2022') {
    querySelectors.loginErrorMessage.innerText = "Please enter the correct credentials!"
  } else {
    domUpdates.showUserDashboard();
  }
}


export { 
  validateUserCredentials
};