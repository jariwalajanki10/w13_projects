import React from 'react'
import styles from './Header.module.css'

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
            <header className={styles.Header}>
                This is the {this.state.companyName}
                 <button onClick={()=>this.changeName()}>Change name</button>
            </header>
        )
        }


}

export default Header