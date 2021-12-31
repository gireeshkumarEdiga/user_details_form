import { useState, useRef, useEffect } from "react";

const inistate = {
    name : "",
    age : "",
    address : "",
    department : "",
    salary : "",
    ismarried : "",
    profilepic : "", 
}

export const Userdetails = () => {
    const [ form, setForm ] = useState(inistate);
    const [ details, setDetails] = useState([])

    const fileref = useRef();

    useEffect(() => {
        getDetails();
    },[])

    const handleChange = (e) => {
        let { name, value,checked,type } = e.target
        value = type === "checkbox" ? checked : value;
        setForm((prev) => ({...prev,[name]:value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    }

    const postData = () => {
        const payload = {
            name:form.name,
            age:form.age,
            address:form.address,
            salary:form.salary,
            department:form.department,
            ismarried : form.ismarried,


            status:false,
        }
        fetch("http://localhost:3005/users",{
            method:"POST",
            body : JSON.stringify(payload),
            headers: {
                "content-type":"application/json",
            }
        }).then(()=> {
            getDetails();
            setForm("")
        })
    }

    const getDetails = () => {
        fetch("https://localhost:3005/users")
        .then(d => d.json())
        .then((res) => {
            setDetails(res)
        });
    }

    const {name,age,address,salary,ismarried,department} = form;

    return (
        <>
        <div id="flex">
            <form onSubmit={handleSubmit}>
              <label>Name</label>
              <br />
              <input name="name" value={name} onChange={handleChange} type="text" placeholder="Enter your name"/>  
              <br />
              <br />
              <label>Age</label>
              <br />
              <input name="age" value={age} onChange={handleChange} type="number" placeholder="Enter your age"/>
              <br />
              <br />
              <label>Address</label> 
              <br />
              <input name="address" value={address} onChange={handleChange} type="text" placeholder="Enter your address"/>   
              <br />
              <br />
              <select name="department" value={department} onChange={handleChange} >department
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
              </select>
              <br />
              <br />
              <label>salary</label>
              <br />
              <input name="salary" value={salary} onChange={handleChange} type="number" placeholder="Enter your salary"/>
              <br />
              <br />  
              <label>ismarried</label>
              <br />
              <input name="ismarried" value={ismarried} onChange={handleChange} type="checkbox" placeholder="checkbox"/>  
              <br />
              <br />
              <label>Profile pic</label>
              <br />
              <input type="file" ref={fileref}/>  
              <br />
              <br />
              <input onClick={postData} id="submitbtn" type="submit" />  
            </form>

            <table>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Address</th>
                    <th>salary</th>
                    <th>Department</th>
                    <th>married status</th>
                </tr>

                {details.map((e,i)=>
                    <tr key={i}>
                        <td>{e.name}</td>
                        <td>{e.age}</td>
                        <td>{e.address}</td>
                        <td>{e.salary}</td>
                        <td>{e.department}</td>
                        <td>{e.ismarried}</td>
                    </tr>
                )}
            </table>
        </div>
        </>
    )
}

export default Userdetails;





// import { useState,useRef, useEffect} from "react"

// const initstate ={
//     name:"",
//     age :"",
//     address:"",
//     department:"",
//     salary:"",
//     isMarried:"",
//     profilepic:"",
// }

// export const Userdetails =()=>{
//     const [form,setForm]=useState(initstate);
//     const [details,setDetails]=useState([])
   
//     const fileref = useRef();

//     useEffect(()=>{
//         getDetails();

//     },[])

//     const handleChange =(e)=>{
//         let {name,value,checked,type} =e.target
//         value=type==="checkbox" ? checked : value;
//         setForm((prev)=>({...prev,[name]:value}));
//     }

//     const handleSubmit =(e)=>{
//         e.preventDefault();
//         console.log(form);
//     }

//     const postData=()=>{
//         const payload={
//             name:form.name,
//             age:form.age,
//             address:form.address,
//             salary:form.salary,
//             department:form.department,
//             isMarried:form.isMarried,


//             status:false,
//         };
//         fetch("http://localhost:3005/users",{
//             method:"POST",
//             body:JSON.stringify(payload),
//             headers:{
//                 "content-type":"application/json",
//             },
//         }).then(()=>{
//             getDetails();
//             setForm("")
//         })
//     }

//     const getDetails =()=>{
//          fetch("http://localhost:3005/users")
//     .then(d=>d.json())
//     .then((res)=>{
//         setDetails(res)});
//     }

//     const {name,age,address,salary,isMarried,department}=form;


//     return (
//         <>
//         <div id="flex">
//         <form  onSubmit={handleSubmit}>
//             <label>Name</label>
//             <br />
//             <input  name="name" value={name} onChange={handleChange} type="text" placeholder="Enter Your Name" />
//             <br />
//             <br />
//             <label>Age</label>
//             <br />
//             <input name="age" value={age} onChange={handleChange} type="number" placeholder="Enter your age" />
//             <br />
//             <br />
//             <label>Address</label>
//             <br />
//             <input name="address" value ={address} onChange={handleChange} type="text" placeholder="Enter your address" />
//             <br />
//             <br />
//             <select name="department" value={department} onChange={handleChange}>Department
//                 <option value="ECE">ECE</option>
//                 <option value="EEE">EEE</option>
//                 <option value="CSE">CSE</option>
//                 <option value="IT">IT</option>
//             </select>
//             <br />
//             <br />
//             <label>Salary</label>
//             <br />
//             <input name="salary" value={salary} onChange={handleChange}  type="number" placeholder="salary" />
//             <br />
//             <br />
//             <label>isMarried</label>
//             <br />
//             <input name="isMarried" checked={isMarried} onChange={handleChange} type="checkbox"  />
//             <br />
//             <br />
//             <label>Profile Pic</label>
//             <br />
//             <input type="file" ref={fileref}  />
//             <br />
//             <br />
//             <input onClick={postData} id="submitbtn" type="submit" />
//         </form>
//         <table>
//   <tr>
//     <th>Name</th>
//     <th>Age</th>
//     <th>Address</th>
//     <th>Salary</th>
//     <th>Department</th>
//     <th>Married Status</th>
//   </tr>
  
//   {details.map((e,i)=>
//         <tr key ={i} > 
//             <td>{e.name}</td>
//             <td>{e.age}</td>
//             <td>{e.address}</td> 
//             <td>{e.salary}</td> 
//             <td>{e.department}</td> 
//             <td>{e.isMarried}</td>
//         </tr>)}

  
 
// </table>
        

//              </div>
//         </>
//     )
    
// }

// export default Userdetails;