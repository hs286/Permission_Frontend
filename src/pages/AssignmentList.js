import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { deleteBlog } from "../redux/actions";
import avatar from "../assets/ProfileImg.png";
import { getAllAssignments } from "../redux/actions";
import { JwtId } from "../helpers/JwtId";

function BlogList({ users, total,permissions }) {
  //var put="",del="";
  // permissions.forEach(element => {
  //    if(element.permissionId.type==='PUT'){
  //     put=element.permissionId.type
  //   }
  //   else if(element.permissionId.type==='DELETE'){
  //     del=element.permissionId.type
      
  //   }
  // });
  const put=permissions.find((element) => element.permissionId.type  === "PUT")
  const del=permissions.find((element) => element.permissionId.type  === "DELETE")
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState();
  const [searchVal, setSearchVal] = useState();
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const { _id } = JwtId();
  let lim=10,Numbering = total / lim;
  let obj = {
    array: [],
  };

  Numbering = Math.ceil(Numbering);

  const terserst = [...Array(Numbering).keys()];

  // useEffect(() => {
  //   dispatch(getAllAssignments(_id, 1, lim));
  // }, [lim, total]);

  const handleDelete = (id, userId) => {
    dispatch(deleteBlog(id, userId));
  };

  const handleEdit = (id) => {
    localStorage.setItem("userToBeEdit", JSON.stringify(id));
    history.push("/update");
  };

  const modal = (e) => {
    handleClose();
    handleDelete(id, _id);
    history.push("/home");
  };

  const handlePagination = (val) => {
    const page = val + 1;
    dispatch(getAllAssignments(_id, page, lim));
  };

  for (var l = 0; l < 50 && l < total; l++) {
    obj.array[l] = l + 1;
  }

  // const handlelimit = (limit) => {
  //   console.log("in limithan", limit);
  //   setLim(limit);
  // };
 /* <div>
         {permissions.map((data)=>(
          <div>
          <p>{data}</p>
          </div>
         ))}
      
      </div> */

  return (
    
     
      <div className = "create">
        {/* <h4>Set Limit</h4>
        <select onChange={(e) => handlelimit(e.target.value)}>
          {obj.array.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select> */}
        <h4>Search Assignments</h4>
        <input
          type = "text"
          value = {searchVal}
          onChange = {(e) => {
            e.preventDefault();
            setSearchVal(e.target.value);
            dispatch(getAllAssignments(_id, undefined, undefined, e.target.value));
          }}
        ></input>
        <Modal
          className = "custom-map-modal"
          show = {show}
          onHide = {handleClose}
        >
          <Modal.Body>Are you sure you want to delete this assignment?</Modal.Body>
          <Container>
            <Row style={{display:"inline-flex", margin:"4px" }}>
              <Col>
              <Button onClick = {handleClose} className = "btn-info">No</Button>
              </Col>
              <Col>
              <Button onClick = {modal} className="btn-danger">Yes</Button>
              </Col>
            </Row>
          </Container>
        </Modal>
        {users !== undefined && (
          <>
          <div className="container-fluid d-flex">
            <div className="row">
            {users.map((users) => (
              <React.Fragment key = {users._id}>
                <div className="col m-3">
                <div
                  className = "card  h-100"
                  style = {{ width: "17rem", display: "inline-block" }}
                >
                  <img
                    className = "card-img-top"
                    style = {{ height: "100px", objectFit: "cover" }}
                    src = {
                      `${process.env.REACT_APP_API}/${users.myFile}` || avatar
                    }
                    alt = "Cardimagecap"
                  />
                  <div className = "card-body">
                    <p className = "card-text">{users.title}</p>
                    <p className = "card-text">{users.body}</p>
                  </div>
                  { put &&
                    <button
                        type = "button"
                        className = "btn btn-info m-2"
                        onClick = {() => handleEdit(users)}
                      >
                        Edit
                      </button>
}
                     {del && <button
                        type = "button"
                        className = "btn btn-danger m-2"
                        onClick = {() => {
                          setId(users._id);
                          handleShow();
                        }}
                      >
                        Delete
                      </button>} 
                      
                    
                  
                </div>
                </div>
              </React.Fragment>
            ))}
            </div>
            </div>
          </>
        )}

        {terserst.map((val) => (
          <Fragment key = {val}>
            <span
              className = "btn m-2"
              onClick = {() => handlePagination(val)}
            >
              {val + 1}
            </span>
          </Fragment>
        ))}
        
        {users.length === 0 && <h4>No Assignments exists against this user...</h4>}
      </div>
    
  );
}

export default BlogList;
