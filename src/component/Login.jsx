import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });
      console.log(response.data);
      // Handle successful login, e.g., store token in local storage
    } catch (error) {
      console.error('Login error:', error.response.data);
      setError(error.response.data.error);
    }
    setIsLoading(false);
  };

  return (
    <Box maxW="md" mx="auto" mt="8" p="4" borderWidth="1px" borderRadius="lg">
      <FormControl id="email" isRequired>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired mt="4">
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        mt="4"
        isLoading={isLoading}
        onClick={handleLogin}
      >
        Sign in
      </Button>
      {error && (
        <Alert status="error" mt="4">
          <AlertIcon />
          {error}
        </Alert>
      )}
    </Box>
  );
}

export default Login;