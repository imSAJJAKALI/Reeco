import React from 'react'
import styled from 'styled-components';


export const Navbar = () => {
  
    return (
      <>
      <NavbarContainer>
        <NavbarLinks>
          <NavLink>Recco</NavLink>
          <NavLink>Store</NavLink>
          <NavLink>Orders</NavLink>
          <NavLink>Analytics</NavLink>
        </NavbarLinks>
        <CartContainer>
          <CartIcon>🛒</CartIcon>
          <UserName>Hello, James</UserName>
        </CartContainer>
      </NavbarContainer>

      <OrderContainer>
         <InsideDiv>Order > <UnderlineText>Order 32457ABC</UnderlineText></InsideDiv>
         <OderNumber>Order 32457ABC</OderNumber>

      <BackButton1>Back</BackButton1>
      <BackButton2>Approved</BackButton2>
      </OrderContainer>



      </>
    );
  
}
const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #004D40;
  color: white;
`;

const NavbarLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const CartContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const NavLink = styled.a`
  color: white;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const CartIcon = styled.span`
  font-size: 24px;
`;

const UserName = styled.span`
  font-weight: bold;
`;
// Order container

const OrderContainer = styled.div`
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
height: 100px;
`
const InsideDiv = styled.p`
/* border: 2px solid red; */
padding-left: 50px;
`
const OderNumber = styled.h1`
/* border: 2px solid red; */
/* text-decoration: solid; */
font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
font-size: 20px;
margin-top: 20px;
padding-left: 50px;
`
const UnderlineText = styled.span`
  text-decoration: underline;
`

const BackButton1 = styled.button`
/* background-color: green; */
border: 1px solid green;
color: green;
border-radius: 10px;
position: absolute;
padding: 2px 18px;
top: 17%;
left: 75%;
`
const BackButton2 = styled.button`
background-color: green;
color: white;
border-radius: 10px;
position: absolute;
padding: 2px 18px;
top: 17%;
left: 82%;
`
