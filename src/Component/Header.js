import React, { useState, useEffect } from "react";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Badge from '@mui/material/Badge';
import { NavLink } from "react-router-dom";
import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import { DLT } from "../redux/actions/action";

export default function Header() {

  const getdata = useSelector((state) => state.reducer.carts);
  // console.log(getdata);

  const [price, setPrice] = useState(0);
  // console.log(price);


  const dispatch = useDispatch();




  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };




  const handleClose = () => {
    setAnchorEl(null);
  };




  const dlt = (id) => {

    dispatch(DLT(id))
  }



  const total = () => {
    let price = 0;
    getdata.map((ele, k) => {
      price = ele.price *ele.qnty + price
    });
    setPrice(price);
  };



  useEffect(() => {
    total();
  }, [total])



  return (
    <>

      <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-3">Add to Cart</NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light" >Home</NavLink>

          </Nav>
          <Badge badgeContent={getdata.length} color="primary"
            id="demo-positioned-button"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >

            <i className="fa-solid fa-cart-shopping text-light" style={{ fontSize: 25, cursor: "pointer" }}></i>

          </Badge>


        </Container>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >


          {
            getdata.length ?
              <div className="card_details" style={{ width: "24rem", padding: 10 }}>
                <Table>
                  <thead>
                    <tr>
                      <th>Photos</th>
                      <th>Restaurent</th>
                    </tr>
                  </thead>


                  <tbody >

                    {
                      getdata.map((e) => {
                        return (
                          <>
                            <tr>
                              <td>
                                <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                                  <img src={e.imgdata} style={{ width: "5rem", height: "5rem", marginRight: "3rem" }} alt="" />
                                </NavLink>
                              </td>
                              <td>
                                <p>{e.rname}</p>
                                <p>Price : ₹{e.price}</p>
                                <p>Quantity : {e.qnty}</p>
                                <p style={{ color: "red", fontSize: 20, cursor: "pointer" }} >
                                  <i className='fas fa-trash smalltrash' onClick={() => dlt(e.id)}></i>
                                </p>
                              </td>

                              <td className='mt-5' style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => dlt(e.id)}  >
                                <i className='fas fa-trash largetrash'></i>
                              </td>
                            </tr>

                          </>
                        )
                      })
                    }
                    <p className='text-center'>Total :{price}₹</p>
                  </tbody>
                </Table>
              </div>
              :
              <div className="card_details card_details d-flex justify-content-center align-items-center" style={{ width: "24rem", padding: 10, position: "relative" }}>
                <i className="fas fa-close  smallclose" onClick={handleClose}
                  style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: "pointer" }}></i>
                <p style={{ fontsize: 22 }}>Your Card is empty </p>
                <img src="./cart.gif" alt="" />
              </div>
          }

        </Menu>
      </Navbar>
    </>
  )
}