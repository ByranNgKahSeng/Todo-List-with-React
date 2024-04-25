import './App.css';
import React, {useEffect, useState} from 'react';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditItem] = useState("");


  //Add Todo Function
  const handleAddTodo = ()=>{
    let newTodoItem = {
      title:newTitle,
      description:newDescription
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr)) //save the item as string, not object
  };

  //Delete Todo Function
  const handleDeleteTodo = index =>{
    let reduceTodo = [...allTodos];
    reduceTodo.splice(index, 1);

    //Save it in local storage
    localStorage.setItem('todolist',JSON.stringify(reduceTodo));
    setTodos(reduceTodo);
  }

  //Complete Todo Function
  const handleCompleteTodo = index =>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd+'-'+mm+'-'+yy+" at "+h+":"+m+":"+s;

    let filteredItem = {
      ...allTodos[index],
      completedOn:completedOn
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);

    //saved it into local storage
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
  }

  //Delete "Completed" Todo Function
  const handleDeleteCompletedTodo = index =>{
    let reduceTodo = [...completedTodos];
    reduceTodo.splice(index,1);

    //Save it in local storage
    localStorage.setItem('completedTodos',JSON.stringify(reduceTodo));
    setCompletedTodos(reduceTodo);
  }

  const handleEdit = (index,item) => {
    console.log(index);
    setCurrentEdit(index);
    setCurrentEditItem(item);
  }

  const handleUpdateTitle = (value) => {
    setCurrentEditItem((prev)=>{
      return {...prev,title:value}
    })
  }

  const handleUpdateDescription = (value) => {
    setCurrentEditItem((prev)=>{
      return {...prev,description:value}
    })
  }

  const handleUpdateTodo = (index) =>{
    let EditedTodo = [...allTodos];
    EditedTodo[currentEdit] = currentEditedItem;
    setTodos(EditedTodo);
    setCurrentEdit("");
  }

  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist')); //convert into array
    let savedCompletedTodo = JSON.parse (localStorage.getItem ('completedTodos'));
    if(savedTodo){
      setTodos(savedTodo);
    }
    if(savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo);
    }
  },[])

  return (
    <div className="App">
      <h1>Todo-List</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type='text' value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="What's the task title?" />
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text' value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="What's the task description?" />
          </div>
          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className="primaryBtn">Add</button>
          </div>
        </div>

        <div className='btn-area'>
          <button 
            className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} 
            onClick={()=>setIsCompleteScreen(false)}>
            Task
            </button>

          <button 
            className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} 
            onClick={()=>setIsCompleteScreen(true)}>
            Completed
            </button>
        </div>

        <div className='todo-list'>
          {isCompleteScreen===false && 
           allTodos.map((item,index)=>{

            if(currentEdit===index){ //Edit the Todo List
              return(
                <div className='edit-wrapper' key={index}>
                  <div>
                    <p>Title</p>
                    <input 
                      type='text' 
                      placeholder='Update Title' 
                      onChange={(e)=>handleUpdateTitle(e.target.value)}
                      value={currentEditedItem.title} />
                      <p>Description</p>
                    <input
                      type='text' 
                      placeholder='Update Description' 
                      onChange={(e)=>handleUpdateDescription(e.target.value)}
                      value={currentEditedItem.description} />
                  </div>

                  <div>
                    <button 
                      type='button'
                      onClick={handleUpdateTodo}
                      className='primaryBtn'>
                      Update
                    </button>
                  </div>
                </div>
              )
            }else{
                return( //Shows Todo list
                <div className='todo-list-item' key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>

                  <div>
                    <AiOutlineDelete 
                      className='icon' 
                      onClick={()=>handleDeleteTodo(index)} 
                      title='Delete?'/>
                    <BsCheckLg 
                      className='check-icon' 
                      onClick={()=>handleCompleteTodo(index)} 
                      title="Complete?"/>
                    <AiOutlineEdit 
                      className='check-icon' 
                      onClick={()=>handleEdit(index,item)} 
                      title="Edit?"/>
                    
                  </div>
                </div>
              )}
          })}

          {isCompleteScreen===true && completedTodos.map((item,index)=>{
            return( //Shows Completed Todo list
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Completed on: {item.completedOn}</small></p>
                </div>

                <div>
                  <AiOutlineDelete 
                    className='icon' 
                    onClick={()=>handleDeleteCompletedTodo(index)} 
                    title='Delete?'/>
                </div>
              </div>
            )
          })}
          
        </div>
      </div>
    </div>
  );
}

export default App;
