import React from 'react'

class Footer extends React.Component{
    constructor(props) {
        super(props);
        // contructor code here
    }
         render(){
            return (
    <footer style={{color:"red"}}>
        &copy;{this.props.authorName}
    </footer>)
        }
    }

    export default Footer