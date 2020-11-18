import React from 'react';
class SelectList extends React.Component{
    constructor(props){
        super(props)
        this.state = {array:this.props.array}
    }
    function1(oneItem, index)
    {
        return(
            <option key = {index} value = {oneItem.code}>
                {oneItem.name}
            </option>
        )
    }
    render(){
        return(
        <select>
        {this.props.list.map(this.function1)}
                {oneItem.name}
        </select>
        )
    }
}
export default SelectList;