import React from 'react'

class Footer extends React.Component{
    constructor(props) {
        super(props);
        // contructor code here
    }
         render(){
            return ( <footer> &copy;{this.props.authorName} </footer>)
        }
    }

    export default Footer