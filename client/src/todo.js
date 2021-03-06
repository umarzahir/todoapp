import React, { Component } from 'react'
import {MDBBtn, MDBInput,MDBCol,MDBRow, MDBContainer} from 'mdbreact'
import ShowTodo from './showTodo';
import axios from 'axios'

class todo extends Component {
    state = {mytodos: [], isUpdate: false ,currentTodo: null, allTodos: [] }
    handleChange = (event) =>{
        console.log(event.target.value)
        this.setState({ currentTodo: event.target.value})
    }
    handleClick = () => {
        console.log(this.state.currentTodo)
        const todoobj = {name: this.state.currentTodo}
    //    await this.setState({mytodos: [...this.state.mytodos, todoobj ]})
        axios.post("http://localhost:5000/api/newtodo", {todo: this.state.currentTodo})
        .then(()=> this.setState({isUpdate: true})
        )
    }

     handleDelete = (todo) => {
        axios.delete("http://localhost:5000/api/deletetodo",{ data: {id: todo}})
        .then(() => this.setState({isUpdate: true})
        )
     }
    
    componentDidMount =  () => {
      console.log("mount")
        axios.get("http://localhost:5000/api/alltodos")
        .then(data => {
            console.log(data)
            this.setState({
            allTodos: data
        }) }
        ).catch(err => console.log("errrr",err))
    }
    handleUpdate = (id,utodo)=> {
        console.log(id,utodo)
     axios.put("http://localhost:5000/api/updatetodo",{ id: id, utodo: utodo})
     .then(()=> this.setState({isUpdate: true})
     )
    }
handleEdit = (id) => {
    axios.put("http://localhost:5000/api/updatetodo",{ data:  {id: id}})
}
    componentDidUpdate = () => {

        if(this.state.isUpdate)
        {
            axios.get("http://localhost:5000/api/alltodos")
            .then(data => {
                console.log(data)
                this.setState({
                allTodos: data,
                isUpdate: false

            }) }
            ).catch(err => console.log("update comp err", err))
        }
    }
    
    render() {
        const {mytodos} = this.state
        return (
            
                <MDBContainer>
                  { this.state.isUpdate ? <div id="cover-spin"></div> : null }
                   { this.state.isUpdate ? <p>....</p> : null }
                <MDBRow>
               <MDBCol size="8"> <MDBInput onChange={this.handleChange} ></MDBInput></MDBCol>
               <MDBCol><MDBBtn onClick={this.handleClick} color="info" size="lg">todo</MDBBtn> </MDBCol> 
                </MDBRow>
                <MDBRow>
                    <p>{console.log("chk props",this.state.isUpdate)}</p>
                   <MDBCol><ShowTodo  update={this.state.isUpdate} handled={this.handleUpdate} handleEditpr={this.handleEdit} handleDeletepr={this.handleDelete} todos={this.state.allTodos}/></MDBCol> 
                    </MDBRow> 
                    </MDBContainer>
            
        )
    }
}

export default todo
