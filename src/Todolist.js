import React, { useState } from "react";
import "./Todolist.css";

function Todolist() {
  const [Todolistitem, setTodolistitem] = useState([]);
  const [inputvalue, setinputvalue] = useState();


  const Handletaddtask = () => {
    setTodolistitem([...Todolistitem, inputvalue])
    setinputvalue("")
  }

  
  const handleRemove=(value,itemid)=>{
   const removeid = Todolistitem.filter((item,index)=> index !==itemid )
   setTodolistitem(removeid)
   
  }
  console.log(Todolistitem)
  
  

  return (
    <div className="Todolist-main">
      <div className="Todolist-Heading">
        <p>Todolist</p>
      </div>

      <hr className="hrline"></hr>
      <input
        className="todolist-input"
        onChange={(e) => {
          setinputvalue(e.target.value);
        }}
        type="text"
      ></input>
      <button
        className="Handleinput"
        onClick={() => {
          Handletaddtask();
        }}
      >
        Add Task
      </button>

      <div className="Todolist-items-Show">
        <ol>
          {Todolistitem.map((item,index) => {
            return (<div className="Todolist-item">
                <li key={index}>{item}</li>
                    <button className="remove-button" onClick={()=>{ handleRemove(item,index)}}>Remove</button>
            </div>)
            
          })}
        </ol>
      </div>
    </div>
  );
}

export default Todolist;
