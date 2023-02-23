import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlog } from "./redux/actions";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { JwtId } from "./helpers/JwtId";
import { getAllBlogs } from "./redux/actions";
import avatar from "./assets/ProfileImg.png";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

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
  const put=permissions.find((element) => element.permissionId.type  =="PUT")
  const del=permissions.find((element) => element.permissionId.type  =="DELETE")
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState();
  const [searchVal, setSearchVal] = useState();
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const { _id, role } = JwtId();
  let lim=10,Numbering = total / lim;
  let obj = {
    array: [],
  };

  Numbering = Math.ceil(Numbering);

  const terserst = [...Array(Numbering).keys()];

  // useEffect(() => {
  //   dispatch(getAllBlogs(_id, 1, lim));
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
    dispatch(getAllBlogs(_id, page, lim));
  };

  for (var l = 0; l < 50 && l < total; l++) {
    obj.array[l] = l + 1;
  }

  // const handlelimit = (limit) => {
  //   console.log("in limithan", limit);
  //   setLim(limit);
  // };

  return (
    <div>
      {/* <div>
         {permissions.map((data)=>(
          <div>
          <p>{data}</p>
          </div>
         ))}
      
      </div> */}
      <div className = "create">
        {/* <h4>Set Limit</h4>
        <select onChange={(e) => handlelimit(e.target.value)}>
          {obj.array.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select> */}
        <h5>Search Assignments</h5>
        <input
          type = "text"
          value = {searchVal}
          onChange = {(e) => {
            e.preventDefault();
            setSearchVal(e.target.value);
            dispatch(getAllBlogs(_id, undefined, undefined, e.target.value));
          }}
        ></input>
        <p>{searchVal}</p>
        <Modal
          className = "custom-map-modal modal-dialog modal-dialog-centered"
          show = {show}
          onHide = {handleClose}
        >
          <Modal.Body>Are y You Sure You Want To Del This Blog</Modal.Body>
          <Container>
            <Row>
              <Button onClick = {handleClose}>No</Button>
              <Button onClick = {modal}>Yes</Button>
            </Row>
          </Container>
        </Modal>
        {users !== undefined && (
          <>
            {users.map((users) => (
              <React.Fragment key = {users._id}>
                <div
                  className = "card m-2"
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
              </React.Fragment>
            ))}
          </>
        )}
        <div></div>
        {terserst.map((val) => (
          <Fragment key = {val}>
            <span
              className = "btn btn-info m-2"
              onClick = {() => handlePagination(val)}
            >
              {val + 1}
            </span>
          </Fragment>
        ))}
        
        {users.length === 0 && <h4>No blogs exists against this user...</h4>}
      </div>
    </div>
  );
}

export default BlogList;
