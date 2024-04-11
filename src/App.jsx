import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ChakraProvider,
  Flex,
  Box,
  Heading,
  Button,
  Grid,
  Image,
  Text,
  Spinner,
  Drawer, // Add import for Drawer
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from '@chakra-ui/react';
import Login from './component/Login';

// Rest of the code remains the same...


function Header() {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      padding="1rem"
      borderBottom="1px solid #eaeaea"
    >
      <Heading as="h1" size="lg">
        My E-Commerce App
      </Heading>
      <Button colorScheme="blue">Login</Button>
    </Flex>
  );
}

function ProductCard({ product }) {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={product.image} alt={product.title} />
      <Box p="6">
        <Text fontWeight="bold" fontSize="xl" mb="2">
          {product.title}
        </Text>
        <Text>${product.price}</Text>
        <Button colorScheme="blue" mt="4">
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
}

function ProductListing() {
  const products = [
    { id: 1, title: 'Product 1', price: 10, image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Product 2', price: 20, image: 'https://via.placeholder.com/150' },
    // Add more products here
  ];

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6} p="4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
}

function ProductDetails({ productId }) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (isLoading) {
    return <Spinner size="xl" />;
  }

  if (!product) {
    return <Box>No product found</Box>;
  }

  return (
    <Box p="4">
      <Image src={product.image} alt={product.title} />
      <Heading as="h2" size="lg" mt="4">
        {product.title}
      </Heading>
      <Text fontSize="lg" mt="2">
        ${product.price}
      </Text>
      <Text mt="4">{product.description}</Text>
      <Button colorScheme="blue" mt="4">
        Add to Cart
      </Button>
    </Box>
  );
}

function CartDrawer({ isOpen, onClose }) {
  const cartItems = []; // Fetch cart items here

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Your Cart</DrawerHeader>
        <DrawerBody>
          {cartItems.map((item) => (
            <Box key={item.id} mb="4">
              <Text fontWeight="bold">{item.title}</Text>
              <Text>${item.price}</Text>
            </Box>
          ))}
        </DrawerBody>
        <DrawerFooter>
          <Button colorScheme="blue" mr="4">
            Checkout
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function Checkout() {
  return (
    <Box p="4">
      <Heading as="h2" size="lg" mb="4">
        Checkout
      </Heading>
      {/* Checkout form fields */}
      <Button colorScheme="blue">
        Place Order
      </Button>
    </Box>
  );
}

function App() {
  return (
    <ChakraProvider>
      <Header />
      {/* Uncomment the component you want to render */}
      <ProductListing />
      <ProductDetails productId={1} /> {/* Pass productId as a prop */}
      <Login /> {/* Uncomment Login component */}
      <CartDrawer isOpen={false} onClose={() => { }} />
      <Checkout />
    </ChakraProvider>
  );
}

export default App;
