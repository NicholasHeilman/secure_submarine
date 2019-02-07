import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class UserList extends Component {
    state ={
        crewList: [],
    }
 
componentDidMount(){
    this.getCrewList();
};

    getCrewList = () =>{
        axios.get('/api/userList')
    .then( response => {
        console.log(response);
        this.setState({
            crewList: response.data
        })
     })

     }

  render() {
    return (
      <div>
    {/* {JSON.stringify(this.state.crewList)} */}
        <ul>

          {this.state.crewList.map(crew => 
            (<li>Crew: {crew.username}</li>)
        )}
        </ul>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   secrets: state.secrets,
//   user: state.user,
// });

export default UserList;