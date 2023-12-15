import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { editProductFailure, editProductSuccess, fetchProducts, updateProductStatus } from '../redux/action/action';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { RxCross1 } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";

export const Main = () => {
  const products = useSelector(state => state.rootReducer.products);
  console.log(products)
  const dispatch = useDispatch();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editedProduct, setEditedProduct] = useState({
    price: "",
    qty: "",
    reason: "",
    name: "",
    brand:"",
    img_url: "https://media.istockphoto.com/id/94929126/photo/avocados-isolated-on-white.jpg?s=612x612&w=0&k=20&c=c0BSuWnUTAkZyj-cYHKzR5dXtZWQ1_3PXcea3M92Z4I="
  });
  const [isEditing, setIsEditing] = useState(false);
  console.log("process",process.env.url)

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEditClick = (productId) => {
    setSelectedProductId(productId);
    setIsEditing(true);
    fillInfo(productId)
  };
 
  const fillInfo = (selectedProductId)=>{
    // console.log("edited")
    // console.log("selectedProductId",selectedProductId)
    const selectedProduct = products.find(product => product.id == selectedProductId );
    // console.log(selectedProduct,"selectedProduct")
    if (selectedProduct) {
      setEditedProduct({
        price: selectedProduct.price.toString(),
        qty: selectedProduct.qty.toString(),
        reason: selectedProduct.reason,
        name: selectedProduct.name,
        brand: selectedProduct.brand,
        img_url: selectedProduct.img_url,
      });
    }
  }


  const handleEditFieldChange = (field, value) => {
    setEditedProduct({
      ...editedProduct,
      [field]: value,
    });
  };

 // Dialog box------------------------------------------------->>>
  const handleYesClick = (productId) => {
    const status = "Approved"
    console.log(status,"statusss")
    setSelectedProductId(productId)
    dispatch(updateProductStatus(selectedProductId, status));
    setIsDialogOpen(false);
  };

  const handleNoClick = (productId) => {
    setSelectedProductId(productId)
    setIsDialogOpen(true);
  };
  // Dialog box----------------------------------->>>
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogConfirm = (isUrgent) => {
  
    const status = isUrgent ? "Missing - Urgent" : "Missing";
    console.log(status,"statusss",selectedProductId)
    dispatch(updateProductStatus(selectedProductId, status));
    setIsDialogOpen(false);
  };
  // Dialog box----------------------------------->>>

  const handleEditSubmit = async () => {
    try {
      if (editedProduct.price >= 0 && editedProduct.qty >= 0) {
        const updatedData = { status : "ProductUpdated",price: editedProduct.price, qty: editedProduct.qty, reason: editedProduct.reason,name:editedProduct.name, brand :editedProduct.brand, img_url: "https://media.istockphoto.com/id/94929126/photo/avocados-isolated-on-white.jpg?s=612x612&w=0&k=20&c=c0BSuWnUTAkZyj-cYHKzR5dXtZWQ1_3PXcea3M92Z4I="};
        await fetch(`${process.env.url}/products/${selectedProductId}`, {
          method: "PUT",
          headers: {"Content-Type": "application/json", },
          body: JSON.stringify(updatedData),
        });

        dispatch(editProductSuccess());

        setIsEditing(false);
        setSelectedProductId(null);
        setEditedProduct({
          price: "",
    qty: "",
    reason: "",
    name: "",
    brand:"",
    img_url: "https://media.istockphoto.com/id/94929126/photo/avocados-isolated-on-white.jpg?s=612x612&w=0&k=20&c=c0BSuWnUTAkZyj-cYHKzR5dXtZWQ1_3PXcea3M92Z4I="
        });

        dispatch(fetchProducts());
      } else {
        alert("Please enter valid price and quantity (both should be >= 0).");
      }
    } catch (error) {
      dispatch(editProductFailure(error.message));
    }
  };

  const handleEditClose = () => {
    setIsEditing(false);
    setSelectedProductId(null);
    setEditedProduct({
      price: "",
    qty: "",
    reason: "",
    name: "",
    brand:"",
    });
  };

  return (
    <>
    <ThirdDiv>
    <ParentDiv>
    <HeadingDiv>Supplier</HeadingDiv>
    <TextHead>East Cost Fruits</TextHead>
    </ParentDiv>
    <ParentDiv>
    <HeadingDiv>Shipping Date</HeadingDiv>
    <TextHead>Thu, Feb 10</TextHead>
    </ParentDiv>
    <ParentDiv>
    <HeadingDiv>Total</HeadingDiv>
    <TextHead>₹ {products.map((ele)=>{
    return  ele.qty * ele.price
    })}</TextHead>
    </ParentDiv>
    <ParentDiv>
    <HeadingDiv>Category</HeadingDiv>
    <TextHead>Fruits, Vegetable<br/> and Spices</TextHead>
    </ParentDiv>
    <ParentDiv>
    <HeadingDiv>Department</HeadingDiv>
    <TextHead>300-400-678</TextHead>
    </ParentDiv>
    <ParentDiv>
    <HeadingDiv>Status</HeadingDiv>
    <TextHead>Awating</TextHead>
    </ParentDiv>

    </ThirdDiv>

    <DIV>
      <TableHead>
        <tr>
          <TableTh>Product name</TableTh>
          <TableTh>Brand</TableTh>
          <TableTh>Price</TableTh>
          <TableTh>Quantity</TableTh>
          <TableTh>Total</TableTh>
          <TableTh>Status</TableTh>
        </tr>
      </TableHead>
      <tbody>
        {products?.map(product => (
          <tr key={product.id}>
            <TableTd>
              <img src={product.img_url} alt={product.name} style={{ width: '50px', height: '50px' }} />
              {product.name}
            </TableTd>
            <TableTd>{product.brand}</TableTd>
            <TableTd>{product.price}</TableTd>
            <TableTd>{product.qty}</TableTd>
            <TableTd>{product.qty * product.price}</TableTd>
            <TableTd>
            <Tabledata status={product.status}><TextForStatus>{product.status}</TextForStatus> </Tabledata>
            </TableTd>
            <TableTd>
              <button onClick={() => handleYesClick(product.id)} color={product.status === 'Approved' ? 'green' : 'red'}><IoMdCheckmark /></button>
            </TableTd>
            <TableTd>
              <button onClick={() => handleNoClick(product.id)} color={product.status == 'Missing' ? 'red' : 'green'}><RxCross1 /></button>
            </TableTd>
            <TableTd>
              <button onClick={() => handleEditClick(product.id)}> Edit</button>
            </TableTd>
          </tr>
        ))}
      </tbody>


       {/* ----------------Dialog box ------------------------ */}
       <Modal isOpen={isDialogOpen} onClose={handleDialogClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Missing Product</ModalHeader>
          <ModalBody>is this Product urgent?</ModalBody>
          <ModalFooter>
  <Button colorScheme="blue" mr={3} onClick={() => handleDialogConfirm(false)}>
    No
  </Button>
  <Button colorScheme="green" onClick={() => handleDialogConfirm(true)}>
    Yes
  </Button>
</ModalFooter>
        </ModalContent>
      </Modal>
       {/* ----------------Dialog box ------------------------ */}

      <Modal isOpen={isEditing} onClose={handleEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                value={editedProduct.price}
                onChange={(e) => handleEditFieldChange('price', e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Quantity</FormLabel>
              <Input
                type="number"
                value={editedProduct.qty}
                onChange={(e) => handleEditFieldChange('qty', e.target.value)}
              />
            </FormControl>
            {/* ----- */}
            <FormControl mt={4}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={editedProduct.name}
                onChange={(e) => handleEditFieldChange('name', e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Brand</FormLabel>
              <Input
                type="text"
                value={editedProduct.brand}
                onChange={(e) => handleEditFieldChange('brand', e.target.value)}
              />
            </FormControl>
            
             {/* ----- */}
            <FormControl mt={4}>
              <FormLabel>Reason</FormLabel>
              <Select
                value={editedProduct.reason}
                onChange={(e) => handleEditFieldChange('reason', e.target.value)}
              >
                <option value="Reason 1">Not like the Product</option>
                <option value="Reason 2">Price is to high</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEditSubmit}>
              Save
            </Button>
            <Button onClick={handleEditClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </DIV>
    </>
  );
};

const DIV = styled.table`
  width: 80%;
  border-collapse: collapse;
  margin: auto;
  border: 1px solid grey;
  margin-top: 20px;
`;

const TableHead = styled.thead`
  /* border: 2px solid red; */
  background-color: #f2f2f2;
`;

const TableTh = styled.th`
/* border: 2px solid red; */
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const TableTd = styled.td`
/* border: 2px solid red; */
  border-bottom: 1px solid #ddd;
`;

const Tabledata = styled.tr`

  background-color: ${({ status }) => {
    if (status && typeof status == "string") {
      switch (status.trim().toLowerCase()) {
        case 'approved':
          return 'green';
        case 'missing':
        case 'missing - urgent':
          return 'red';
        default:
          return 'yellow';
      }
    }
    return 'transparent';
  }};
  

`;


const TextForStatus = styled.p`
/* border: 1px solid red; */
border-radius: 10px;
padding: 5px 10px;
`

const ThirdDiv = styled.div`
border: 1px solid grey;
height: 100px;
width: 80%;
margin: auto;
margin-top: 20px;
display: grid;
grid-template-columns: repeat(6,1fr);
`
const ParentDiv = styled.div`
border: 1px solid grey;
/* height: 50px; */
`
const HeadingDiv = styled.p`
font-size: 15px;
font-weight: bold;
color: grey;
padding-left: 20px;
padding-top: 5px;
`
const TextHead = styled.p`
font-size: 14px;
font-weight: bold;
padding-left: 20px;
padding-top: 5px;
`