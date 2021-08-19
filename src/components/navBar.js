import React, { Component } from "react";
import PropTypes from "prop-types";
import { Menu, Container, Icon, Button, Input} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

class HeaderMenu extends Component {
  render() {
    const headerIcon = <Icon name={this.props.headerIcon} size="large" />;
    let url = 'http://localhost:8000/logout';
    let menuItems = [];
    for (let i = 0; i < this.props.items.length; i++) {
      if (this.props.items[i].length !== 2) {
        console.error('HeaderMenu: items format should be ["name", "route"]');
        break;
      }
      const name = this.props.items[i][0];
      const route = this.props.items[i][1];
      menuItems.push(
        <Menu.Item
          key={"item-" + i}
          index={i}
          as={Link}
          to={route}
          header={i === 0}
          active={route === this.props.location.pathname}
        >
          {i === 0 ? headerIcon : ""}
          {name}
        </Menu.Item>
      );
    }
    const singOut = async () =>{
      let res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers:{
            'Content-Type': 'application/json'
        }
      })
      let response = await res.json()
      localStorage.clear();
      sessionStorage.clear();
      this.props.history.push("/login");

    }
    
    const handleInputChange = (e) => {
      this.props.setFilter(e.target.value);
    }
   
    return (
      <Menu fixed="top" inverted>
        <Container>{menuItems}</Container>
        <Menu.Item>
          <Input 
            onChange={(e)=>handleInputChange(e)}
            type='text'
            value={this.filter}
            name='search' 
            className='icon' 
            icon='search' 
            placeholder='Search...'
          />
        </Menu.Item>
        <Menu.Item>
            <Button onClick={singOut} primary>Sing Out</Button>
        </Menu.Item>
      </Menu>
    );
  }
}

HeaderMenu.propTypes = {
  onItemClick: PropTypes.func.isRequired,
  headerIcon: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired
};

export default withRouter(HeaderMenu);