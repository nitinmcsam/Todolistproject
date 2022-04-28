import React, { useEffect, useRef, useState } from "react";
import "./Todolist.css";

function Todolist() {
  
  const inputRef = React.useRef(null);
  const[editIndex,setEditIndex]=useState(0)
  const[count,setCount]=useState(1)
  const [Todolistitem, setTodolistitem] = useState([]);
  const [updateTitle,setUpdateTitle]=useState("")
  const [getStatus,SetGetStatus]=useState()
  

  const [inputvalue, setinputvalue] = useState({ 
      title:"",
      isEdit:false,
      taskComplete:false,}  
      );

  
      useEffect(()=>{
        
         if(Todolistitem[editIndex]){
       if(Todolistitem[editIndex].isEdit==true){
        
         setCount(count+1)
         
       }
       }
       
      },[Todolistitem])
      
      async function fetchApi(){
         
        const respones=await fetch('https://mocki.io/v1/3451ee6d-6010-499e-b610-820ef160276a')
        const fineData= await respones.json()
        let {status,data}=fineData
        setTodolistitem(data)
        SetGetStatus(status)

      }
      
      console.log(getStatus)
      useEffect( ()=>{
     
        console.log(Todolistitem)
        // setTodolistitem([...Todolistitem,getData])
       
  fetchApi()
      },[])


  const handleAddTask = () => {
    setTodolistitem([...Todolistitem, inputvalue])
    inputRef.current.value=""
  }
  // console.log( ...getData )s

  
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
            
            Todolistitem.map((item,index)=>{
              if(getStatus){
             if (!item.isEdit) {
              
                return <div className="Todolist-itemshow cards">
              <li> 
                <div className="titleDiv">  
                <p className="titlepera">{item.title}</p>
                </div>
                <div className="removeEditButton">
              <button className="remove-button" type="text"  onClick={()=>{ handleRemove(item,index)}}>Remove</button>
              <button className="edit-button" onClick={()=>{editTodotask(index)}}>Edit</button>
              
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
              }
              else{
                return <h1> status code is false not enable to show data</h1>
              }
          })
        }
        </ol>        
      </div>
    </div>
  );
        }
export default Todolist;
 