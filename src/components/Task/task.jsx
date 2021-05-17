import React from 'react';

const Task = (props) => {
    const styles = {
        container : {
            padding : 20,
            borderBottom:"1px solid rgba(0,0,0,0.1)"
        },
        taskText : {
            color : "#5285ec",
            maxWidth: "100%",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap"
        },
        taskTextStriked : {
            color : "#5285ec",
            textDecoration : "line-through",
            maxWidth: "100%",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap"
        },
        deleteIcon : {
            width : 20,
            height : 20,
            float : "right",
            display : "inline-block",
            backgroundImage : "url(delete.svg)",
            backgroundPosition : "center",
            backgroundRepeat : "no-repeat",
            backgroundSize: "cover",
            cursor : "pointer",
            marginRight : 20
        },
        editIcon : {
            width : 20,
            height : 20,
            float : "right",
            display : "inline-block",
            backgroundImage : "url(pencil.svg)",
            backgroundPosition : "center",
            backgroundRepeat : "no-repeat",
            backgroundSize: "cover",
            cursor : "pointer",
            marginRight : 20
        }
    };

    return (
        <div className="col-sm-12" style={styles.container}>
            <div className="form-check form-check-inline" style={{maxWidth: "70%"}}>
                <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" onChange={e => props.onTaskCompleted(props.task.id,(e.target.checked)?1:0)} checked={(props.task.completed == 1)?true:false}/>
                <label className="form-check-label" htmlFor="inlineCheckbox1" style={(props.task.completed == 0)?styles.taskText:styles.taskTextStriked}>{props.task.name}</label>
            </div>
            <div onClick={() => props.onTaskDeleted(props.task.id)} style={styles.deleteIcon}></div>
            <div onClick={() => props.onTaskEdited(props.task)} style={styles.editIcon}></div>
        </div>
    );
}

export default Task;