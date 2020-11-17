import React from 'react'

class Header extends React.Component{
    constructor(props) {
        super(props);
        // contructor code here
      }
         render(){
            return ( <header>This is the {this.props.companyName}</header>)
        }


}

export default Header