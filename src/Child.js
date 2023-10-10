import './App.css';
import { useState, useRef } from "react"

export default function Child() {
  const [inputdata, setinputdata] = useState("")
  const [arr, setarr] = useState([]);
  const changediv = useRef([])
  const ch = useRef([])
  const [desc,setdesc] = useState("")
  const [date,setdate] = useState("")
  const [editmode, seteditmode] = useState(true)
  const [ide,setide] = useState(undefined)
  console.log(ide,"id")
  const addData = () => {
    if (!inputdata) {
      alert("please fill the input box")
    }else if(!desc){
      alert("please fill the input box")
    }else if(!date){
      alert("Please select date")
    }
    else {
      const dataObj = { id: new Date().getTime(), name: inputdata,
                      desc:desc,date:date}
      setarr([...arr, dataObj])
      setinputdata("");
      setdesc("");
      setdate("");
    }
  }
  const deleteItam = (index) => {
    const result = arr.filter((item) => {
      return item.id !== index
    })
    setarr(result)
  }
  const changeColor = (e, index) => {
    if (ch.current[index].checked && e.target.value == index) {
      changediv.current[index].style.textDecoration = "line-through red"
    }
    else{
      changediv.current[index].style.textDecoration = "none"
    }
  }
  const Edit = (itemid,ind) =>{
    const todoinfo = arr.find((item)=>item.id==itemid)
    setinputdata(todoinfo.name);
    setdesc(todoinfo.desc);
    setdate(todoinfo.date);
    seteditmode(false)
    setide(ind)
    console.log(itemid,"index","inputdata",todoinfo)
  }
  const Save = (ind)=>{
    arr[ind] = { id: new Date().getTime(), name: inputdata,
        desc:desc,date:date}
        seteditmode(true)
        setinputdata("");
      setdesc("");
      setdate("");
    
    //  console.log(arr[ind],"arrdatawithdindex")
  }
  return (
    <div className="container">
      <div>
        <h1>To-do List</h1>
      <div className="addData">
        <div className="leftside">
          <div>
            <label>Description--</label>
            <input type="text"  placeholder="Add Dedcription..."
            value={inputdata}
            onChange={(e) => setinputdata(e.target.value)}></input>
          </div>
          <div>
            <label>Task------</label>
            <input type="text" value={desc} placeholder="Add Task"
                onChange={(e)=>setdesc(e.target.value)}
                ></input>
          </div>
          
        </div>
        <div>
          <div>
            <label>Date</label>
            <input type="date" value={date}
                onChange={(e)=>setdate(e.target.value)}
                ></input>
          </div>
           { editmode?<input type="button" id="adbtn" value="Add data"
          onClick={addData}></input>:<input type="button" onClick={()=>Save(ide)} id="savebtn" value="Save"></input>}
        </div>
      </div>
      <div>
        {changediv && ch && arr.map((curEle,index) => {
          return (
            <div ref={(ref) => (changediv.current[curEle.id]=ref)} className="items" key={curEle.id} style={{border:new Date(curEle.date) < new Date() ?'3px solid yellow':'none'}}>
              <div><label>Date:</label> {curEle.date}
              <input type="button" value="Edit" onClick={()=>Edit(curEle.id,index)}></input>
              <input type="button" value="Delete" onClick=
                  {() => deleteItam(curEle.id)}></input>
              </div>
              <div>
                <label>Completed:</label>
                <input type="checkbox" value={curEle.id} ref={(ref) => (ch.current[curEle.id]=ref)} onClick={(e) => changeColor(e, curEle.id)}></input></div>
              <div className="lastbox">
                <div><label>Description:</label>  {curEle.name}</div>
              </div>

              <div className="lastbox" >
                <div><label>Task:</label> {curEle.desc}
                </div>
                <div>
                {/* <div>
                    <input type="button" value="Edit" onClick={()=>Edit(curEle.id,index)}></input>
                </div> */}
                  {/* <input type="button" value="Delete" onClick=
                  {() => deleteItam(curEle.id)}></input> */}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      </div>
    </div>
  )
}
