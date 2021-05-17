import React, { useState,setState,useEffect } from 'react';
import {Modal,Button, ModalDialog} from 'react-bootstrap'
import {proxy as url} from '../../../package.json';

const TaskModal = (props) => {
    const edit = ("id" in props.data);
    const [taskName,setTaskName] = useState("");
    const [btnData,setBtnData] = useState({disabled : false,value : "+ New Task"});

    useEffect(() => {
        if(edit){
            setTaskName(props.data.name);
        }else{
            setTaskName("");
        }
    },[(props.data.id)?props.data.id:null]);

    const addTask = e => {
        e.preventDefault();
        setBtnData({disabled : true,value : "Please wait.."});
        fetch(url+'/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+props.token
            },
            body: JSON.stringify({name : taskName})
        })
        .then(data => data.json())
        .then(data => {
            setBtnData({disabled : false,value : "+ New Task"});
            props.onHide();
            props.onTaskAdded(data);
        });
    };

    const updateTask = e => {
        e.preventDefault();
        setBtnData({disabled : true,value : "Please wait.."});

        fetch(url+'/tasks/'+props.data.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+props.token
            },
            body : JSON.stringify({name : taskName})
        })
        .then(data => data.json())
        .then(data => {
            setBtnData({disabled : false,value : "+ New Task"});
            props.onHide();
            props.onTaskUpdated(taskName,props.data.id);
        });
    };

    const styles = {
        text : {
            fontsize: 18,
            fontWeight: 500,
            textAlign: "center",
            marginBottom: 20
        },
        button : {
            width: 200,
            margin: "0 auto",
            fontSize: 13,
            fontWeight: 600
        },
        input : {
            backgroundColor : "#eef1f8"
        }
    };

    return (
      <Modal
      show={props.show}
      onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body >
            <form onSubmit={(e) => (edit)?updateTask(e):addTask(e)}>
                <div  style={styles.text}>{(edit)?"Update Task":"+ New Task"}</div>
                <input style={styles.input} type="text" id="inputId" className="mb-3 form-control" placeholder="Task Name" required autoFocus value={taskName} onChange={e => setTaskName(e.target.value)}/>
                <button className="btn btn-lg btn-primary btn-block" type="submit"  style={styles.button} disabled={btnData.disabled}>{(edit)?"Update Task":btnData.value}</button>
            </form>
        </Modal.Body>
      </Modal>
    );
  }

  export default TaskModal;