import React from 'react'

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {companyName: this.props.companyName}
        // contructor code here
      }
       changeName =()=>{
                this.setState({companyName:"XYZ.com"})
            }

         render(){
            return (
            <header>
                This is the {this.state.companyName}
                 <button onClick={()=>this.changeName()}>Change name</button>
            </header>
        )
        }


}

export default Header