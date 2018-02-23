import React from 'react';

class UserProfile extends React.Component {
  
  constructor(props){
    super(props);
  }
  
  componentDidMount(){
    console.log(this.props);
  }
  
  render() {
    return (
      <div>Hi</div>
    );
  }
}


export default UserProfile;
