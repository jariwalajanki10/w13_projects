import React from 'react';
import styles from './Offices.module.css'


/**
* offices components
* uses our office server REST API http://localhost:3001/Offices
* props inputs: none
*/
class Offices extends React.Component {
    constructor(props) {
      super(props);

      // set initial state
      // do not use setState in constructor, write state directly
      this.state = {
        offices_data : [], // will contain offices data array from server
        offices_index : 0, // the index of the office currently shown, start at first in array
        offices_count : 0, // how many offices in data array from server
        isLoaded : false,  // will be true after data have been received from server
        error : null,      // no errors yet !
        add_new: false
      };


         
    }

    handleChange = (event) => {
        this.setState({[event.target.name]:event.target.value})
     }

    // REACT component lifecycle for componentDidMount
    // https://www.w3schools.com/react/react_lifecycle.asp
    componentDidMount() {

       // AJAX call using fetch. Make sure the office server is running !
       // see https://reactjs.org/docs/faq-ajax.html
      fetch('http://localhost:8000/offices')
        .then(
            (response)=> {
                // here full fetch response object
                //console.log(response)
                // fetch not like jQuery ! both ok code 200 and error code 404 will execute this .then code
                if (response.ok) {
                    // handle 2xx code success only
                    // get only JSON data returned from server with .json()
                    response.json().then(json_response => {
                        console.log(json_response)
                        this.setState({
                            offices_data:json_response.offices, // data received from server
                           offices_count:json_response.offices.length, // how many offices in array
                           offices_index:0,  // will first show the first office in the array
                            isLoaded : true,  // we got data
                            error : null // no errors
                        })
                    }
                    )

                }else{
                    // handle errors, for example 404
                    response.json().then(json_response => {
                        this.setState({
                            isLoaded: false,
                            // result returned is case of error is like  {message: "office not found"}
                            // save the error in state for display below
                            error:json_response,   // something in format  {message: "office not found", db_data:{}}
                            offices_data: {}, // no data received from server
                            offices_count:0,
                            offices_index:0,
                        });
                    })
                }
            },

            (error) => {
                // Basically fetch() will only reject a promise if the URL is wrong, the user is offline,
                // or some unlikely networking error occurs, such a DNS lookup failure.
                this.setState({
                    isLoaded: false,
                    error: {message:"AJAX error, URL wrong or unreachable, see console"}, // save the AJAX error in state for display below
                    offices_data: {}, // no data received from server
                    offices_count:0,
                    offices_index:0,
                });
            }
        )
    }



    updateArrayItem = (event) => {
        const i=this.state.offices_index
        this.setState(state => {
          const list = state.offices_data.map((office, j) => {
            if (j === i) {
              // the new value of the form field beeing modified
              // the input NAME must be the same as in the office object (and table colum)
              office[event.target.name]=event.target.value
              return office;
            } else {
              return office;
            }
          });

          return {
            list,
          };
        });
      };
      deleteData =()=>{

        fetch("http://localhost:8000/offices/" + document.getElementById('officecode').value,
            {
                method: 'DELETE'
                //,body: JSON.stringify(someData)// data to send in the body of the request
            }
        )

            .then(res => res.json())//here server sends JSON response
            .then(
                (response) => {
                    // TO DO how to handle code other than 200 because this gets
                    // exeucted in all cases
                    this.clearAll()
                    this.setState({error: {message:"Form Saved"}})
                },

                (error) => {
                    // only NO RESPONSE URL errors will trigger this code
                    this.setState({error: {message:"AJAX error: URL wrong or unreachable, see console"}})
                }

            )
      }
    changePrev =()=>{
     if((this.state.offices_index-1)===-1)
     this.setState({offices_index:this.state.offices_data.length-1})
     else
     this.setState({offices_index:this.state.offices_index-1})
    }
    changeNext =()=>{

     if((this.state.offices_index+1)===this.state.offices_data.length)
     this.setState({offices_index:0})
     else
     this.setState({offices_index:this.state.offices_index+1})
    }

    addData =()=>{
        console.log("abcd")
        let data ={
            officecode: document.getElementById("officecode").value,
            addressline1: document.getElementById("addressline1").value,
            addressline2: document.getElementById("addressline2").value,
            city: document.getElementById("city").value,
            state: document.getElementById("state").value,
            country: document.getElementById("country").value,
            postalcode: document.getElementById("postalcode").value,
            phone: document.getElementById("phone").value,
            territory: document.getElementById("territory").value,

        }
        fetch("http://localhost:8000/offices/",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                //'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data)
        }
    )
        .then(res => res.json())//here server sends JSON response
        .then(
            (response) => {
                // TO DO how to handle code other than 200 because this gets
                // exeucted in all cases
                this.setState({error: {message:"Added data "}})
            },

            (error) => {
                // only NO RESPONSE URL errors will trigger this code
                this.setState({error: {message:"AJAX error: URL wrong or unreachable, see console"}})
            }

        )
    }
     updateData =()=> {


        let data = {
            officecode: document.getElementById('officecode').value,
            addressline1: document.getElementById('addressline1').value,
            addressline2: document.getElementById('addressline2').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            country: document.getElementById('country').value,
            postalcode: document.getElementById('postalcode').value,
            phone: document.getElementById('phone').value,
            territory: document.getElementById('territory').value
        }

        fetch("http://localhost:8000/offices/" + document.getElementById('officecode').value,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                    //'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(data)
            }
        )
            .then(res => res.json())//here server sends JSON response
            .then(
                (response) => {
                    // TO DO how to handle code other than 200 because this gets
                    // exeucted in all cases
                    this.setState({error: {message:"Updated Data"}})
                },

                (error) => {
                    // only NO RESPONSE URL errors will trigger this code
                    //document.getElementById("status").innerHTML = "AJAX error: URL wrong or unreachable, see console"
                    this.setState({error: {message:"AJAX error: URL wrong or unreachable, see console"}})

                }

            )

    }

    clearAll =()=>{
    //console.log(this.state.offices_count)
    this.setState({add_new:true})
    this.state.offices_data.push({

        officecode:"",

        addressline1:"",

        addressline2:"",

        city:"",

        state:"",

        country:"",

        postalcode:"",

        phone:"",

        territory:""

    })

    this.setState( {

        offices_index : this.state.offices_count

    })
 }
    getOneOffice =()=> {
    this.clearAll()
    document.getElementById("status").innerHTML = "Waiting for server"
    fetch("http://localhost:8000/offices/" + document.getElementById('officecode').value,
        {
            method: 'GET',
        }
    )
        .then(res => res.json())//here server sends JSON response
        .then(
            (response) => {
                // TO DO how to handle code other than 200 because this gets
                // executed in all cases
                let offices = response.offices;
                console.log(offices)

                //document.getElementById("response").innerHTML = html
                document.getElementById("status").innerHTML = response.msg

                document.getElementById('officecode').value = offices.officecode
                document.getElementById('addressline1').value = offices.addressline1
                document.getElementById('addressline2').value = offices.addressline2
                document.getElementById('city').value = offices.city
                document.getElementById('state').value = offices.state
                document.getElementById('country').value = offices.country
                document.getElementById('postalcode').value = offices.postalcode
                document.getElementById('phone').value = offices.phone
                document.getElementById('territory').value = offices.territory
            },
            (error) => {
                this.setState({error: {message:"AJAX error: URL wrong or unreachable, see console"}})
            }
        )
}
 saveData =()=>
 {
    if (this.state.add_new) {
        this.addData()
    } else {
        this.updateData()
    }
    this.setState({add_new:false})
 }

    // display the offices table
    render() {

        if(this.state.error){
            return <div><b>{this.state.error.message}</b></div>;
        }else if(this.state.isLoaded){
            if(this.state.offices_count!==0){
                // office table not empty
                return (
                    <div>
                    <form id="officeform" className={styles.Form1}>
                        <label className={styles.Label1}>officecode</label> <input className={styles.Input1} type="number" name="officecode" id="officecode" min="0" step="1" value={this.state.offices_data[this.state.offices_index].officecode} onChange={(event)=>this.updateArrayItem(event)} /><br/>
                        <label className={styles.Label1}>Address Line 1</label> <input  className={styles.Input1} type="text" name="addressline1" id="addressline1" value={this.state.offices_data[this.state.offices_index].addressline1} onChange={(event)=>this.updateArrayItem(event)}/><br/>
                        <label className={styles.Label1}>Address Line 2</label> <input  className={styles.Input1} type="text" name="addressline2" id="addressline2" value={this.state.offices_data[this.state.offices_index].addressline2} onChange={(event)=>this.updateArrayItem(event)}/><br/>
                        &nbsp;&nbsp;<label className={styles.Label1}>City</label> <input  className={styles.Input1} type="text" name="city" id="city" value={this.state.offices_data[this.state.offices_index].city} onChange={(event)=>this.updateArrayItem(event)} /><br/>
                        <label className={styles.Label1}>State</label> <input  className={styles.Input1} type="text" name="state" id="state" value={this.state.offices_data[this.state.offices_index].state} onChange={(event)=>this.updateArrayItem(event)}/><br/>
                        <label className={styles.Label1}>Country</label> <input className={styles.Input1} type="text" name="country" id="country" value={this.state.offices_data[this.state.offices_index].country} onChange={(event)=>this.updateArrayItem(event)}/><br/>
                        <label className={styles.Label1}>Postal Code</label> <input  className={styles.Input1} type="text" name="postalcode" id="postalcode" value={this.state.offices_data[this.state.offices_index].postalcode} onChange={(event)=>this.updateArrayItem(event)}/><br/>
                        <label className={styles.Label1}>Phone</label> <input  className={styles.Input1} type="text" name="phone" id="phone" value={this.state.offices_data[this.state.offices_index].phone} onChange={(event)=>this.updateArrayItem(event)}/><br/>
                        <label className={styles.Label1}>Territory</label> <input  className={styles.Input1} type="text" name="territory" id="territory" value={this.state.offices_data[this.state.offices_index].territory} onChange={(event)=>this.updateArrayItem(event)}/><br/>

                        <button className={styles.Btn1} type="button" onClick={()=>this.changePrev()}>Prev</button>
                        <button className={styles.Btn1} type="button" onClick={()=>this.changeNext()}>Next</button><br>
                        </br><br></br>
                        <button className={styles.Btn2} type="button" onClick={()=>this.clearAll()}>Clear</button>
                        <button className={styles.Btn2} type="button" onClick={()=>this.deleteData()}>Delete</button>
                        <button className={styles.Btn2} type="button" onClick={()=>this.saveData()}>Save</button>
                    </form>

                    </div>
                )
            }else{
                return(<div><b>office table is empty</b></div>)
            }
        }else{
            return (<div><b>Waiting for server ...</b></div>)
        }
    }
}

export default Offices;