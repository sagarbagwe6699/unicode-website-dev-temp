import React, { Component } from 'react';
import ProjTile from '../Projects/components/ProjTile/ProjTile';
import FeedbackCard from '../Projects/components/CardHolder/components/Card/FeedbackCard';
import { Grid } from '@material-ui/core';
import NEXT from './images/NEXT.png';
import PREV from './images/PREV.png';

class PaginationCards extends Component {
    state = {
        data: [],
        todos: [],
        currentPage: 1,
        todosPerPage: this.props.no,
        checked: false
     }
     resize = () =>{
        let Gwidth=document.body.clientWidth
        if(Gwidth<600){
            this.setState({todosPerPage: 1})
        }
        else if(Gwidth<960){
            this.setState({todosPerPage: 1})
        }
        else if(Gwidth<1280){
            this.setState({todosPerPage: 2})
        }
        else if(Gwidth<1920){
            this.setState({todosPerPage: 3})
        }
        else{
            this.setState({todosPerPage: 4})
        }
     }
     componentDidMount() {
        window.addEventListener('resize', this.resize)
      }
     handleClick=(event)=>{
        console.log(event.target)
        this.setState({
          currentPage: Number(event.target.id),
          checked: false
        });
      }
      handlePrev=(event)=>{
        // console.log(event.target.parentElement.childNodes[6].childNodes)
        if(this.state.currentPage!==1)
        this.setState({currentPage: this.state.currentPage-1})
      }
      handleNext=(pageNumbers)=>{
        // console.log(event.target.parentElement.childNodes[6].childNodes)
        console.log(pageNumbers.length)
        // console.log(event)
        const indexOfLastTodo = this.state.currentPage * this.state.todosPerPage;
        if(this.state.currentPage!==pageNumbers.length)
        this.setState({currentPage: this.state.currentPage+1})
      }
      componentDidUpdate=(prevProps,prevState)=>{
          if(prevProps!==this.props){
              this.setState({todos: this.props.data})
          }
      }
      alterContent=(content)=>{
        var newContent=""
        var count=0
        content=`${content}`
        content.split(" ").forEach((word)=>{
            if(count!==31){
                newContent+=word+" "
                count++;
            }
        })
        if (count>30){
            newContent+=". . . ."
        }
        return newContent
    }
    render() { 
        console.log(this.state)
        const { todos, currentPage, todosPerPage, id } = this.state;
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        var currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderTodos = currentTodos.map((todo, index) => {
            console.log(todo.color)
            return (
                <Grid item xs={10} md={6} lg={4} xl={3} style={{marginBottom: "4%"}} >
                    <FeedbackCard
                    color={todo.color}
                    index={todo.id} 
                    text={this.state.todos.length?this.alterContent(this.state.todos[index].comments):""}
                    pic={this.state.todos.length?this.state.todos[index].photograph:""}
                    fname={this.state.todos.length?this.state.todos[index].first_name:""}
                    lname={this.state.todos.length?this.state.todos[index].last_name:""}
                    company={this.state.todos.length?this.state.todos[index].company:""}
                    department={this.state.todos.length?this.state.todos[index].department:""}
                    desgn={this.state.todos.length?this.state.todos[index].designation:""}
                    />
                </Grid>
            );
        });

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }

    const renderPageNumbers = pageNumbers.map(number => {
      const breakTag = <br/>
      return (
        // <li
        //   key={number}
        //   id={number}
        //   style={{textAlign: "center"}}
        //   onClick={this.handleClick}
        // >
        <React.Fragment>
            <div 
            id={number}
            onClick={this.handleClick}
            // #7FC4FD
            style={{
              width: 20,
              float: "left",
              height: 20,
              background: "#7FC4FD",
              opacity: `${number===this.state.currentPage?"1.0":"0.3"}`,
              transition: "linear 0.2s",
              borderRadius: 100,
              margin:10
              }} >
            </div>
            {number===4?breakTag:""}
        </React.Fragment>
        // </li>
      );
    });


        return ( 
            <React.Fragment>
                {/* <div style={{textAlign: "center"}} > */}
                    {/* <ul> */}
                    {renderTodos}
                    {/* </ul> */}
                    <Grid item xs={12}></Grid>
                    <img
                    width={50}
                    height={50}
                    src={PREV}
                    onClick={this.handlePrev}
                    style={{boxShadow: "#d6d6d6 4px 4px 8px",borderRadius: 100,marginRight: "10%"}}
                    >
                    </img>

                    <ul id="page-numbers">
                    {renderPageNumbers}
                    </ul>

                    <img
                    width={50}
                    height={50}
                    src={NEXT}
                    onClick={(e)=>this.handleNext(pageNumbers,e)}
                    style={{boxShadow: "#d6d6d6 4px 4px 8px",borderRadius: 100,marginLeft: "10%"}}
                    >
                    </img>
                {/* </div> */}
            </React.Fragment>
         );
    }
}
 
export default PaginationCards;