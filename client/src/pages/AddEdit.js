import React, {useState, useEffect}from 'react';
import {useNavigate, useParams, Link, Navigate} from 'react-router-dom';
import "./AddEdit.css";
import axios from "axios";
import { toast } from 'react-toastify';

const initialState = {
    name : "",
    email : "",
    number : ""
};


const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const {name,email,number} = state;
    const history = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        axios.get(`/api/update/${id}`)
        .then((resp)=>setState({...resp.data[0]}));
    },[id])

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!name || !email || !number){
            toast.error("Please Enter all Details")
        }else{
            if(!id){
                axios.post("/api/post", {
                name,email,number
            }).then(()=>{
                setState({name:'', email:'', number:''});
            }).catch((err)=>toast.error(err.response.data));
           toast.success("Contact added Successfully")
            setTimeout(()=>{
                Navigate.push("/")},500)
            }else{
                axios.put(`/api/update/${id}`,
            {
                name,
                email,
                number
            }).then(()=>{
                setState({name:'', email:'', number:''});
            }).catch((err)=>toast.error(err.response.data));
           toast.success("Contact Updated Successfully")
            setTimeout(()=>{
                history.push("/")},500)
            }
        }
    }

    const handleInputChange = (e)=>{
        const {name, value} = e.target;
        setState({...state,[name]:value});
    }
  return (
    <div style={{marginTop:'100px'}}>
      <form style={{
        margin:"auto",
        padding:"15px",
        maxWidth:"400px",
        alignContent:"center"
      }}
      onSubmit={handleSubmit}
      >
        <label htmlFor='name'>Name</label>
        <input
        type="text"
        id="name"
        name="name"
        placeholder = "Enter Your Name.."
        value = {name || ""}
        onChange = {handleInputChange}
        /><br/>
        <label htmlFor='email'>Email</label>
        <input
        type="email"
        id="email"
        name="email"
        placeholder = "Enter Your email.."
        value = {email || ""}
        onChange = {handleInputChange}
        /><br/>
        <label htmlFor='number'>Mobile No.</label>
        <input
        type="number"
        id="number"
        name="number"
        placeholder = "Enter Your Number.."
        value = {number || ""}
        onChange = {handleInputChange}
        /><br/>
        <input type="submit" value={id ? "Update":"Save"}/><br/>
        <Link to="/">
        <input type="button" value="Goback"/>
        </Link>
      </form>
    </div>
  )
}

export default AddEdit
