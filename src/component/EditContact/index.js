import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";

const EditContact = ({ data, updateContact }) => {
  
  const { id } = useParams();
  console.log('jhabvfcjvb',id)
  const history = useHistory();
  console.log("here is the", data[0])
  
  const currentContact = data[0].find(
    (data) => data._id == id
  );
  
  
  // const [_id,setId]=useState('')

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    // setId(currentContact._id)
    setName(currentContact.name);
    setEmail(currentContact.email);
    setPhone(currentContact.phone);
  }, [currentContact]);
  console.log("this is", currentContact)

console.log("here is the updated data",currentContact)

  const handleSubmit = (e) => {
    e.preventDefault();
    

    if (!email || !name || !phone) {
      return toast.warning("Please fill in all fields!!");
    }
    if (currentContact.email.length < 12 ) {
      return toast.error("Enter a valid Email");
    }
    if (currentContact.phone.length < 6) {
      return toast.error("This phone number already exists!!");
    }

    const data = {
      _id:id,
      name,
      email,
      phone,
    };
    // const id=axios.get(`http://localhost:8000/notes/`)
    //         .then(res=>{
    //           console.log(res)
    //         })

    // console.log(data)
    const myurl = (`http://localhost:8000/notes/${id}`) 
    axios({
      method: 'PUT',
      url: myurl,
      data: data
    }).then(res => {
      console.log("updating..",res)
    }
    )

    updateContact(data);
    toast.success("Contact updated successfully!!");
    history.push("/");
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <button
          className="btn btn-dark ml-auto my-5"
          onClick={() => history.push("/")}
        >
          Go back
        </button>
        <div className="col-md-6 mx-auto shadow p-5">
          {currentContact ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  value={name}
                  placeholder={"Name"}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={email}
                  placeholder={"Email"}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={phone}
                  placeholder={"Phone"}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="form-group d-flex align-items-center justify-content-between my-2">
                <button type="submit" className="btn btn-primary">
                  Update Contact
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => history.push("/")}
                >
                  cancel
                </button>
              </div>
            </form>
          ) : (
            <h1 className="text-center">No Contact Found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state,
});
const mapDispatchToProps = (dispatch) => ({
  updateContact: (data) => {
console.log("data for store",data)
    dispatch({ type: "UPDATE_CONTACT", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);