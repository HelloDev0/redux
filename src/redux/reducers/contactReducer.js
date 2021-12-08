

const initialState = [
  // { _id: '619c993058de3cf23aed616c', name: "Raman Sharma", email: "email@email.com", phone: 1234567890, },
]
// 



const contactReducer = (state = initialState, action) => {
  // console.log("hjgwvfjq,bkcn",data)
  switch (action.type) {
    case "FETCH_CONTACT":
      console.log("here is the data in redux store",action.payload)
     state=[...state,action.payload];
     return state;
    case "ADD_CONTACT":
      state = [...state, action.payload];
      return state;
    case "DELETE_CONTACT":
      console.log('deleting from store..',action.payload)
      const contactFilter = state.filter((contact) =>
        contact._id === action.payload ? null : contact
      );
      state = contactFilter;
      return state;
    case "UPDATE_CONTACT":
      
      const contactUpdate = state.filter((contact) =>
        
        contact._id == action.payload._id
        
          ? Object.assign(contact, action.payload)
          : contact
      );
      state = contactUpdate;
      return state;
    case "RESET_CONTACT":
      state = [{ name: null, email: null, phone: null }];
      return state;
    default:
      return state;
  }
};
export default contactReducer;