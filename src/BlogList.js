import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlog, getAllBlogsByTitle } from "./redux/actions";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { JwtId } from "./helpers/JwtId";
import { getAllBlogs } from "./redux/actions";
import avatar from "./assets/ProfileImg.png";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

function BlogList({ users, total }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState();
  var [lim, setLim] = useState(10);
  const [searchVal, setSearchVal] = useState();
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const {_id} = JwtId();
  let Numbering = total / lim;
  let obj = {
    array: [],
  };

  Numbering = Math.ceil(Numbering);

  const terserst = [...Array(Numbering).keys()];

  useEffect(() => {
    dispatch(getAllBlogs(_id, 1, lim));
  }, [lim, total]);

  const handleDelete = (blogid) => {
    dispatch(deleteBlog(blogid));
  };

  const handleEdit = (id) => {
    localStorage.setItem("userToBeEdit", JSON.stringify(id));
    history.push("/update");
  };

  const modal = (e) => {
    handleClose();
    handleDelete(id);
history.push("/home")
  };

  const handlePagination = (val) => {
    const page = val + 1;
    dispatch(getAllBlogs(_id, page, lim));
  };

  for (var l = 0; l < 50 && l < total; l++) {
    obj.array[l] = l + 1;
  }

  const handlelimit = (limit) => {
    console.log("in limithan", limit);
    setLim(limit);
  };

  return (
    <div>
      <div className="create">
        {/* <h4>Set Limit</h4>
        <select onChange={(e) => handlelimit(e.target.value)}>
          {obj.array.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select> */}
        <h4>Search</h4>
        <input
          type="text"
          value={searchVal}
          onChange={(e) => {
            e.preventDefault();
            setSearchVal(e.target.value);
            dispatch(getAllBlogs(_id, undefined, undefined, e.target.value));
          }}
        ></input>
        <p>{searchVal}</p>
        <Modal
          className="custom-map-modal modal-dialog"
          show={show}
          onHide={handleClose}
        >
          <Modal.Body>Are y You Sure You Want To Del This Blog</Modal.Body>
          <Container>
            <Row>  
                <Button onClick={handleClose}>No</Button>
                <Button onClick={modal}>Yes</Button>   
            </Row>
          </Container>
        </Modal>
        {users !== undefined && (
          <>
            <table>
              <thead>
                <tr>
                  <th>Profile Picture</th>
                  <th>Title</th>
                  <th>Body</th>
                  <th>Delete</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody className="blog-preview">
                {users.map((users) => (
                  <React.Fragment  key={users._id}>
                    <tr>
                      <td>
                        {" "}
                        <label className="custom-file-upload">
                          <img
                            src={
                              `${process.env.REACT_APP_API}/${users.myFile}` ||
                              avatar
                            }
                          ></img>
                        </label>
                      </td>

                      <td>
                        {" "}
                        <p>{users.title}</p>
                      </td>
                      <td>
                        {" "}
                        <p>{users.body}</p>
                      </td>
                      <td>
                        {" "}
                        <button
                          onClick={() => {
                            setId(users._id);
                            handleShow();
                          }}
                        >
                          {" "}
                          delete{" "}
                        </button>
                      </td>
                      <td>
                        {" "}
                        <button onClick={() => handleEdit(users)}>
                          {" "}
                          Edit{" "}
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </>
        )}
        <div></div>
        {terserst.map((val) => (
          <Fragment key={val}>
            <span
              className="PaginationNumbering"
              onClick={() => handlePagination(val)}
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
