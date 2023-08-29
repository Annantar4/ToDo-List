import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import { useEffect, useState } from "react";
import axios from 'axios';



export default function App() {
  const [editMode, setEditMode] = useState(false);
  const [list, setList] = useState([]);
  const [Tugas, setTugas] = useState('');
  const [Deadline, setDeadline] = useState('');
  const [Status, setStatus] = useState('');
  const [userId, setUserid] = useState('');
  

  useEffect(()=>{
    showTodo();
  }, []);

  
  const showTodo = async ()=>{ 
    try {
      const {data} = await axios.get('/Todo');
      setList(data)
    } catch (error) {
      console.log("errorororo");
    }
  } 

  const deleteTodo = async (id)=>{ 
    try {
      const deletetodo = await axios.delete(`/todo/${id}`);
      if (deletetodo.status !== 404) {
        showTodo();
      }
    } catch (error) {
      console.log("errorororo");
    }
  }

  const showSingletodo = async (id)=>{ 
    setEditMode(true);
    try {
      const {data} = await axios.get(`/todo/${id}`);
      setTugas(data.Tugas);
      setDeadline(data.Deadline);
      setStatus(data.Status);
      setUserid(data.id);
      
    } catch (error) {
      console.log("errorororo");
    }
  }
  
  const addTodo = async (e)=>{ 
    e.preventDefault();
    try {
      const add = await axios.post('/Todo', {Tugas, Deadline, Status});
      if (add.status === 201) {
        setTugas('');
        setDeadline('');
        setStatus('');
        showTodo();
      }
    } catch (error) {
      console.log("errorororo");
    }
  } 

  const editTodo = async (e)=>{ 
    e.preventDefault();
    try {
      const edit = await axios.patch(`/todo/${userId}`, {Tugas, Deadline, Status});
      if (edit.status === 200) {
        setEditMode(false);
        setTugas('');
        setDeadline('');
        setStatus('');
        showTodo();
      }
    } catch (error) {
      console.log("errorororo");
    }
  }


  return (
    <>
      <Header />
      <div className="container">
        <div className="form" style={{paddingBottom:"50px", paddingTop:"50px"}}>
          <form onSubmit={editMode ? editTodo : addTodo}>
            <div className="form-wrapper" style={{display:"flex", justifyContent:"space-between"}}>
              <div style={{flex:1, marginRight:"10px"}}>
                <input onChange={(e)=>setTugas(e.target.value)} value={Tugas} className="form-control"type="text" placeholder="Tugas" name="TUGAS"></input>
              </div>
              <div style={{flex:1}}>
                <input onChange={(e)=>setDeadline(e.target.value)} value={Deadline} className="form-control"type="text" placeholder="xx-xx-xxxx" name="DEADLINE"></input>
              </div>
              <div style={{flex:1}}>
                <input onChange={(e)=>setStatus(e.target.value)} value={Status} className="form-control"type="text" placeholder="Selesai/Belum Selesai" name="STATUS"></input>
              </div>
              {
                editMode ?
                <button type="submit" style={{width:"200px", marginLeft:"10px"}} className='btn btn-primary'>EDIT</button>
                :
                <button type="submit" style={{width:"200px", marginLeft:"10px"}} className='btn btn-primary'>ADD</button>
              }
              
            </div>
          </form>
        </div>
        
        <table className="table">
          <thead>
            <tr>
              <th scope="col">NO</th>
              <th scope="col">TUGAS</th>
              <th scope="col">DEADLINE</th>
              <th scope="col">STATUS</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>
              {
                list && list.map((tugas,index)=>(
                  <tr key={tugas.id}>
                    <th scope="row">{index+1}</th>
                    <td>{tugas.Tugas}</td>
                    <td>{tugas.Deadline}</td>
                    <td>{tugas.Status}</td>
                    <td>
                      <button onClick={()=> showSingletodo(tugas.id)} type="submit" classname="btn" style={{color:"white", backgroundColor:"green",cursor:"pointer", marginRight:"10px"}}>edit</button>
                      <button onClick={()=> deleteTodo(tugas.id)} type="submit" classname="btn1" style={{color:"white", backgroundColor:"red",cursor:"pointer"}}>delete</button>
                    </td>
                  </tr>
              ))}
          </tbody>
        </table>
 
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);