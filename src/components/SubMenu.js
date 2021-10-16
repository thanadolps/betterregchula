import React, { useState } from "react";
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SidebarLink = styled(Link)`
  display: flex;
  color: #FFFFFF;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  list-style: none;
  height: 40px;
  text-decoration: none;
  font-size: 18px;
  border-radius:30px;
  &:hover {
    color:black;
    background: #FFBABE;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span` 
  margin-left: 16px;
  font-family: 'Kanit', sans-serif;
`;//ตัวหนังสือหัวข้อ

const DropdownLink = styled(Link)`
  background: #797979;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;
  &:hover {
    background: #393737;
    cursor: pointer;
  }
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
              ? item.iconClosed
              : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;