import React from 'react'
import styles from './Header.module.css'

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {companyName: this.props.companyName}
        // contructor code here
      }
       changeName =(new_name)=>{
                this.setState({companyName:new_name})
            }

         render(){
            return (
            <header className={styles.Header}>
                This is the {this.state.companyName}
                 <button onClick={()=>this.changeName(document.getElementById('xyz123').value)}>Change name</button>
                <input type="text" id="xyz123"/>
            </header>
        )
        }


}

export default Header