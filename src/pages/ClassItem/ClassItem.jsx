import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ClassItem.scss";
import {
  DeleteOutlined,
  EditOutlined,
  FolderViewOutlined,
} from "@ant-design/icons";
import { AddChildModal } from "../../components/ClassRoom/AddChildModal/AddChildModal";
import { EditChildModal } from "../../components/ClassRoom/EditChildModal/EditChildModal";
import {
  addChildren,
  deleteChildren,
  editChildren,
  getFetchChildren,
} from "../../store/action/ChildrenAction";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/AdminHooks/useAuth";
import Swal from "sweetalert2";
import { Loading } from "../../components/Loading/Loading";

export const ClassItem = () => {
  const { auth } = useAuth();
  const { name } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Children, loading } = useSelector((state) => state.Children);
  useEffect(() => {
    if (auth?.id) {
      dispatch(getFetchChildren({ id: auth?.id, name }));
    }
  }, [dispatch, auth]);
  let LocalValue;
  if (localStorage.getItem("language")) {
    let local = localStorage.getItem("language");
    LocalValue = JSON.parse(local);
  }

  const [addChild, setAddChild] = useState(false);
  const [editChild, setEditChild] = useState(false);
  
  const [success,setSuccess] = useState("")
  useEffect(() => {
   

    if (success === 'ok') {
        Swal.fire({
            position: "center",
            icon: "success",
            title:LocalValue ==="AM"? "Տվըալները հաջողությամբ հաստատվել են": "Data has been successfully verified",
            showConfirmButton: false,
            timer: 2500
        }).then(() => {
          setEditChild('')
          setSuccess("")
        });
    }
    if (success?.response?.status < 200 || success?.response?.status >= 400) {
        Swal.fire({
            position: "center",
            icon: "error",
            title:LocalValue ==="AM"? "Չհաջողվեց!!": "Failed",
            showConfirmButton: false,
            timer: 2500
        }).then(() => {
            setSuccess("")
        });
    }
}, [success])
  async function saveChild(
    child,
    setError,
    setError1,
    setError2,
    setError3,
    setError4
  ) {
    console.log(child);
    if (!child?.fullName?.trim()) {
      setError(true);
    }
    if (!child?.bookNumber > 0) {
      setError1(true);
    }
    if (!child?.picture?.trim()) {
      setError4(true);
    }
    if (!child?.login?.trim()) {
      setError2(true);
    }
    if (!child?.password?.trim()) {
      setError3(true);
    } else if (
      child?.fullName?.trim() &&
      child?.bookNumber > 0 &&
      child?.picture?.trim() &&
      child?.login?.trim() &&
      child?.password?.trim()
    ) {
      await dispatch(
        addChildren({
          ...child,
          teacher_id: auth?.id,
          level: 1,
          classNumber: name,
          role: "children",
        })
      );
      await dispatch(getFetchChildren({ id: auth?.id, name }));
      setAddChild(false);
    }
  }
  async function EditChild(child, setError, setError1, setError2, setError3) {
    if (!child?.fullName?.trim()) {
      setError1(true);
    }
    if (!child?.bookNumber > 0) {
      setError(true);
    }
    if (!child?.picture?.trim()) {
      setError3(true);
    }
    if (!child?.level > 0) {
      setError2(true);
    } else if (
      child?.bookNumber > 0 &&
      child?.fullName?.trim() &&
      child?.level > 0 &&
      child?.picture?.trim()
    ) {
      await dispatch(editChildren(child,setSuccess));
      await dispatch(getFetchChildren({ id: auth?.id, name }));
      setEditChild(false);
    }
  }
  async function DeleteItem({ title, text, deleteItem }) {
    Swal.fire({
      title: title,
      text: text,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: LocalValue === "AM" ? "Ոչ" : "No",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: LocalValue === "AM" ? "Այո" : "Yes",
    }).then((result) => {
      if (result?.isConfirmed) {
        deleteItem();
      }
    });
  }
  async function deleteItemS(id) {
    DeleteItem({
      title:
        LocalValue === "AM" ? "Ցանկանում եք ջնջել՞" : "Do you want to delete?",
      text:
        LocalValue === "AM"
          ? "Ջնջելու դեպքում վերականգնել չեք կարող"
          : "Once deleted, you cannot restore",
      deleteItem: () => deleteItem(id),
    });
  }
  async function deleteItem(id) {
    await dispatch(deleteChildren(id));
    await dispatch(getFetchChildren({ id: auth?.id, name }));
  }

  return (
    <div className="ClassItem">
      <div className="ClassItemDiv">
        <h1>{name}</h1>
        {loading ? (
          <Loading />
        ) : (
          <div className="ClassTable">
            <table>
              <thead>
                <tr>
                  <th>{LocalValue === "AM" ? "Նկար" : "Photo"}</th>
                  <th>{LocalValue === "AM" ? "Համար" : "Number"}</th>
                  <th>
                    {LocalValue === "AM"
                      ? "Անուն Ազգանուն"
                      : "First Name Last Name"}
                  </th>
                  <th>{LocalValue === "AM" ? "Դասընթացներ" : "Courses"}</th>
                  <th>{LocalValue === "AM" ? "Փոփոխել" : "Edit"}</th>
                  <th>{LocalValue === "AM" ? "Հարցաշար" : "Questionnaire"}</th>
                </tr>
              </thead>
              <tbody>
                {Children?.map((el) => (
                  <tr key={el?.id}>
                    <td>
                      <img src={el?.picture} alt="" />
                    </td>
                    <td>
                      <strong>{el?.bookNumber}</strong>
                    </td>
                    <td>{el.fullName}</td>
                    <td>{LocalValue === "AM" ? "Դաս " : "Lesson "}{el.level}</td>
                    <td className=" editdelete">
                      <EditOutlined
                        className="edit"
                        onClick={() => {
                          setEditChild(el);
                        }}
                      />
                      <DeleteOutlined
                        className="delete"
                        onClick={() => {
                          deleteItemS(el.id);
                        }}
                      />
                    </td>
                    <td>
                      <FolderViewOutlined
                        onClick={() => navigate(`/PupilExperince/${el?.id}`)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="addChild">
          <button
            className="btn2"
            onClick={() => {
              navigate("/Class");
            }}
          >
            {" "}
            {LocalValue === "AM" ? "Հետ" : "Prev"}{" "}
          </button>
          <button
            className="btn1"
            onClick={() => {
              setAddChild(true);
            }}
          >
            {LocalValue === "AM" ? " Ավելացնել աշակերտ" : "Add a pupil"}{" "}
          </button>
        </div>
      </div>
      {addChild && (
        <AddChildModal setAddChild={setAddChild} saveChild={saveChild} />
      )}
      {editChild && (
        <EditChildModal
          setEditChild={setEditChild}
          editChild={editChild}
          EditChild={EditChild}
        />
      )}
    </div>
  );
};
