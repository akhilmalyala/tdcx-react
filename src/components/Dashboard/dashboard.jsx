import React,{ setState,useState,Component,useEffect } from 'react';
import Navbar from '../Navbar/navbar';
import {proxy as url} from '../../../package.json';
import TaskModal from '../TaskModal/taskModal';
import Task from '../Task/task';
import Chart from "../Chart/chart";

const Dashboard = (props) => {
    const {name,token} = getUserData();
    const [tasks,setTasks] = useState({list : [],total : 0,completed : 0});
    const [taskList,setTaskList] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [taskModal, setTaskModal] = React.useState({status : false,data : {}});

    const newTaskAdded = (taskData) => {
        let totalTasks = tasks.total + 1,
            tasksCompleted = tasks.completed,
            list = tasks.list;
            list.push({
                id : taskData.id,
                name : taskData.name,
                completed : taskData.completed,
                status : 1
            });
            setTasks({list : list,total : totalTasks,completed : tasksCompleted});
            setTaskList(list);
        
    };

    const taskDeleted = id => {
        fetch(url+'/tasks/'+id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer '+token
            }
        })
        .then(() => {
            let newTasks = {...tasks};
            newTasks.list = newTasks.list.filter(task => {
                if(task.id == id){
                    return false;
                }
                return task;
            });
            newTasks.total = newTasks.list.length;
            newTasks.completed = newTasks.list.filter(task => {
                if(task.completed == 1){
                    return true;
                }
                return false;
            }).length;
            setTasks(newTasks);
            setTaskList(newTasks.list);
        });
    };

    const taskEdited = async task => {
        setTaskModal({status : true,data : task});
    };

    const updateTask = (name,id) => {
        let newTasks = {...tasks};
        newTasks.list = newTasks.list.filter(task => {
            if(task.id == id){
                task.name = name;
            }
            return task;
        });
        let newTasksList = [...taskList];
        setTasks(newTasks);
        setTaskList(newTasks.list);
    };

    const taskCompleted = async (id,isCompleted) => {
        let data = await fetch(url+'/task-completed', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
            body : JSON.stringify({id : id,isCompleted : isCompleted})
        })
        .then(data => data.json())
        .then(data => {
            return data;
        });

        let newTasks = {...tasks};
        newTasks.list = newTasks.list.filter(task => {
            if(task.id == id){
                task.completed = isCompleted;
            }
            return task;
        });
        newTasks.total = newTasks.list.length;
            newTasks.completed = newTasks.list.filter(task => {
                if(task.completed == 1){
                    return true;
                }
                return false;
            }).length;
        setTasks(newTasks);
        setTaskList(newTasks.list);
    };

    const searchTask = searchString => {
        const searchData =  tasks.list.filter(task => task.name.includes(searchString));
        setTaskList(searchData);
    };

    useEffect(async () => {
        let data = await fetch(url+'/dashboard', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
        })
        .then(data => data.json())
        .then(data => {
            return data;
        });
        setTasks({list : data.latestTasks,total : data.totalTasks,completed : data.tasksCompleted});
        setTaskList(data.latestTasks);
        setIsLoading(false);
    },[token]);

    if(isLoading){
        return ( 
            <div className="loading"></div>
         );
    }else if(tasks.list.length === 0){
        let styles = {
            container : {
                maxWidth: 300,
                backgroundColor: "#fff",
                padding: "40px 20px",
                borderRadius: 8,
                margin: "0 auto",
                marginTop: "calc(40vh - 50px)"
            },
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
            }
        }

        return ( 
            <React.Fragment>
                <Navbar name={name} onLogout={props.handleLogout}/>
                <div className="form-group no-task-container" style={styles.container}>
                    <div  style={styles.text}>You have no task.</div>
                    <button className="btn btn-lg btn-primary btn-block" type="button"  style={styles.button} onClick={() => setTaskModal({status : true, data : {}})}>+ New Task</button>
                </div>
                <TaskModal show={taskModal.status} onHide={() => setTaskModal({status : false, data : {}})} token={token} onTaskAdded={newTaskAdded}  data={taskModal.data} onTaskUpdated={updateTask}/>
            </React.Fragment> 
         );
    }else{

        let styles = {
            analyticsDiv : {
                height: 180,
                backgroundColor: "#fff",
                borderRadius: 8,
                boxShadow: "0 0 3px 1px rgba(0,0,0,0.1)"
            },
            analyticsChartDiv : {
                height: 180,
                backgroundColor: "#fff",
                borderRadius: 8,
                boxShadow: "0 0 3px 1px rgba(0,0,0,0.1)",
                padding : "20px 0"
            },
            headingText : {
                fontsize: 22,
                color: "#537178",
                padding: "20px 0 0 20px"
            },
            completedTasksText : {
                fontSize: 40,
                padding: "0 0 0 20px",
                color : "#5285ec",
                marginRight : 3
            },
            completedTasksTextDivider : {
                color: "#537178",
                marginRight : 3 
            },
            totalTasksText : {
                color: "#537178",
            },
            analyticsTaskList : {
                paddingTop : 10
            },
            analyticsTaskText : {
                color: "#9daaad"
            },
            analyticsTaskTextStriked : {
                color: "#9daaad",
                textDecoration:"line-through"
            },
            button : {
                margin: "0 auto",
                fontSize: 13,
                fontWeight: 600
            },
            tasksContainer : {
                maxHeight: 300,
                overflowX : "hidden",
                overflowY : "auto",
                backgroundColor: "#fff",
                borderRadius: 8,
                boxShadow: "0 0 3px 1px rgba(0,0,0,0.1)"
            }
        };

        return ( 
            <React.Fragment>
                <Navbar name={name} onLogout={props.handleLogout}/>
                <div className="container pt-5 pb-5">
                    <div className="row">
                        <div className="col-sm mb-4 mb-md-0">
                            <div style={styles.analyticsDiv}>
                                <div style={styles.headingText}>Tasks Completed</div>
                                <div>
                                    <span style={styles.completedTasksText}>{tasks.completed}</span>
                                    <span style={styles.completedTasksTextDivider}>/</span>
                                    <span style={styles.totalTasksText}>{tasks.total}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm mb-4 mb-md-0">
                            <div style={styles.analyticsDiv}>
                            <div style={styles.headingText}>Latest Created Tasks</div>
                            <ul style={styles.analyticsTaskList}>
                                {tasks.list.map(function(task, index){
                                    return (index<3)?<li key={ task.id } style={(task.completed == 0)?(styles.analyticsTaskText):(styles.analyticsTaskTextStriked)}>{task.name}</li>:false;
                                })}
                            </ul>
                            </div>
                        </div>
                        <div className="col-sm mb-4 mb-md-0">
                            <div style={styles.analyticsChartDiv}>
                                <Chart total={tasks.total} completed={tasks.completed}/>
                            </div>
                        </div>
                    </div>
                    <div className="pt-5">
                        <div className="row">
                            <div className="col-sm-2 mb-2 mb-md-0">Tasks</div>
                            <div className="justify-content-end col-sm-10 mb-2 mb-md-0">
                                <div className="col-sm-2 float-sm-right pr-0 mb-2 mb-md-0 pl-0 pr-0">
                                    <button className="btn btn-lg btn-primary btn-block" type="button"  style={styles.button} onClick={() => setTaskModal({status : true, data : {}})}>+ New Task</button>
                                </div>
                                <div className="col-sm-3 float-sm-right pl-0 pr-0 mr-0 mr-md-2">
                                    <input type="text" placeholder="Search by task name" className="form-control" onKeyUp={e => searchTask(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div style={styles.tasksContainer} className="mt-3">
                            <div>
                            {taskList.length && taskList.map(function(task){
                                    return <Task key={task.id} task={task} onTaskDeleted={taskDeleted}  onTaskEdited={taskEdited} onTaskCompleted={taskCompleted}/>;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <TaskModal show={taskModal.status} onHide={() => setTaskModal({status : false, data : {}})} token={token} onTaskAdded={newTaskAdded} data={taskModal.data} onTaskUpdated={updateTask}/>
            </React.Fragment> 
         );   
    }

};

const getUserData = () =>{
    const tokenString = sessionStorage.getItem('user');
    return tokenString?JSON.parse(tokenString):{};
}

export default Dashboard;
