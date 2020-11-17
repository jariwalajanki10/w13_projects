import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Header from './Header';
import Footer from './Footer';
import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// const names = ["Janki", "Karan"]
// function Hellomsg(){
//     return(
//     <div>
//         <p>Hello World</p>
//         <p>Janki Jariwala</p>
//         <p>{names}</p>
//     </div>
//     )
// }


class Person extends React.Component{
    render(){
       // return <span>Done! I am Janki.</span>
        return (
           <div>
        <Header companyName="ABCD.com"/>
        <p>Hello World!</p>
        <Footer authorName="Janki Jariwala"/>
        </div>
       )
    }

}

// let numbers = [ 1, 2, 3, 4, 5 ];
// function myfunction(onenumber){
// 	return <li>{ onenumber } </li>;
// }

ReactDOM.render(<Person/>,document.getElementById("root"))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
