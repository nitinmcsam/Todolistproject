import React, { useEffect, useRef, useState } from "react";
import "./Todolist.css";

function Todolist() {
  
  const inputRef = React.useRef(null);
  const[editIndex,setEditIndex]=useState(0)
  const[count,setCount]=useState(1)
  const [Todolistitem, setTodolistitem] = useState([]);
  const [updateTitle,setUpdateTitle]=useState("")
  const [getData,setGetData]=useState([])
  const [inputvalue, setinputvalue] = useState({ 
      title:"",
      isEdit:false,
      taskComplete:false,}
      );
      
      useEffect(()=>{
        
         if(Todolistitem[editIndex]){
       if(Todolistitem[editIndex].isEdit==true){
        
         setCount(count+1)
         console.log(count)
       }
       }
       
      },[Todolistitem])

      useEffect( ()=>{
       async function fetchApi(){
         let url = 'https://mocki.io/v1/38a904ec-6754-4052-b396-6466f0b249b0'
         let respones=await fetch(url)
         let datafine=await respones.json()
         setGetData(datafine.data)
         
       }

       fetchApi()
       console.log(getData)
      },[getData])

  const handleAddTask = () => {
    setTodolistitem([...Todolistitem, inputvalue])
    inputRef.current.value=""
  }

  
  const handleRemove=(value,itemid)=>{
   const removeid = Todolistitem.filter((item,index)=> index !==itemid )
   setTodolistitem(removeid)
  }


  const editTodotask=(editItemIndex)=>{
  let tempStore=[...Todolistitem]
   let tempelement= {...tempStore[editItemIndex]}
   tempelement.isEdit=tempelement.isEdit=true
   tempStore[editItemIndex]=tempelement
   setTodolistitem(tempStore)
   setEditIndex(editItemIndex)
  }

  
  const handleUpdate=(index)=>{
    let tempStore=[...Todolistitem] 
    let tempElement= {...tempStore[index]}
    // let secondTempElement={...tempStore[index]}
    tempElement.title=updateTitle
    tempElement.isEdit=false
    tempStore[index]=tempElement   
    setTodolistitem(tempStore)
  }


  return (
    <div className="Todolist-main">
      <div className="Todoapp-heading">
        <h1>Todo App</h1>
      </div>
      <div className='inputbox-addbutton'>
      <input
        className="todolist-inputbox"
         
        
        onChange={(e) => {
          setinputvalue({
            title:e.target.value,
            isEdit:false,
            taskComplete:false,
          });
        }}
        ref={inputRef}
        type="text"
        ></input> 

      <button 
        className="taskAddbButton"
        onClick={() => {
          handleAddTask();
        }}
        >
        Add Todo
      </button>
      
      </div>
        <hr></hr>

      <div className="Todolist-items-Show">
         <ol>
          {
            
            getData.map((item,index)=>{
             if (!item.isEdit) {
              return <div className="Todolist-itemshow cards">
              <li> 
                <div className="titleDiv">  
                <p className="titlepera">{item.title}</p>
                </div>
                <div className="removeEditButton">
              <button className="remove-button" type="text"  onClick={()=>{ handleRemove(item,index)}}>Remove</button>
              <button className="edit-button" onClick={()=>{editTodotask(index)}}>Edit</button>
              <button className="taskcomplete" onClick={()=>{editTodotask(index)}}>Task</button>
              </div>

              </li>
               </div>
             }

               else{
                return <div className="edit-div   ">
                  <input className="updateValueInputBox" type="text"  onChange={(e)=>{setUpdateTitle(e.target.value)}}></input>
                  <button className="updatebutton"  onClick={()=>{handleUpdate(index)}} >update</button>
                </div>
                  }
                
          })
         }
        </ol> 
      </div>
    </div>
  );
        }
export default Todolist;
 