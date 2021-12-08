import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";


const Home = ({ contacts, deleteContact }) => {
  const { id } = useParams()
  // let dataFromStore=contacts[0]

  console.log("why not coming..", contacts)
  // const [list, setList] = React.useState({})
  // useEffect(() => {
  //   axios.get('http://localhost:8000/notes')
  //     .then((response) => {
  //       console.log(response.data)
  //       setList(response.data)
  //     }).catch((err) => console.log(err));
  // }, {})
  
  console.log('check the list from ', id)

  // console.log("hjsav,c,bvc,jafbvljebavhae", list[0])

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <Link to="/add" className="btn btn-outline-dark my-5 ml-auto ">
          Add Contact
        </Link>
        <div className="col-md-10 mx-auto my-4">
          <table className="table table-hover">
            <thead className="table-header bg-dark text-white">
              <tr>

                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              
              {contacts.length > 0 ? (
                contacts[0].map((value,_id) => (
                  <tr key={id}>
                    <td>{value._id}</td>
                    <td>{value.name}</td>
                    <td>{value.email}</td>
                    <td>{value.phone}</td>
                    <td>
                      <Link
                        to={`/edit/${value._id}`}
                        className="btn btn-sm btn-primary mr-1"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => deleteContact(value._id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th>No contacts found</th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state,

});

// console.log('xdfcgvbhnjmk',contacts)
const mapDispatchToProps = (dispatch) => ({
  deleteContact: (_id) => {
    
    const myurl = (`http://localhost:8000/notes/${_id}`)
    axios({
      method: 'DELETE',
      url: myurl,
    }).then(res => {
      console.log("Deleting..", res)
    }
    )
    dispatch({ type: "DELETE_CONTACT", payload: _id });
    console.log("trying the deletion", _id)
  },


});

export default connect(mapStateToProps, mapDispatchToProps)(Home);