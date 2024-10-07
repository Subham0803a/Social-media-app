import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,

} from '@chakra-ui/react';

import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useSetRecoilState } from 'recoil';
import authScreenAtom from '../atoms/authAtom';
import useShowToast from "../hooks/useShowToast";
import userAtom from '../atoms/userAtom';
 


export default function LoginCard() {

    const [showPassword, setShowPassword] = useState(false);
    const setAuthScreen = useSetRecoilState(authScreenAtom);
    const showToast = useShowToast();
    const setUser = useSetRecoilState(userAtom);
    
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const bgGradient = useColorModeValue(
        'linear(to-r, gray.50, gray.100)',
        'linear(to-r, gray.900, gray.800)'
    );

    const boxBg = useColorModeValue('white', 'gray.700');
    const boxShadow = useColorModeValue(
        '0 2px 4px rgba(160, 174, 192, 0.6)',
        '0 2px 4px rgba(0, 0, 0, 0.4)'
    );

    const handelLogin = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),

            });
            
            const data = await res.json();
            console.log(data);

            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }

            console.log(data);
            localStorage.setItem("user-threads", JSON.stringify(data));
            setUser(data);

        } 
        catch (error) {
            useShowToast("Error", error, "error");
            
        };

    };

    return (
        <Flex
            minH={'80vh'}
            align={'center'}
            justify={'center'}
            bgGradient={bgGradient}
            transition="all 0.2s">

            <Stack spacing={4} mx={'auto'} maxW={'sm'} py={6} px={4}>
                <Stack align={'center'} spacing={1}>
                    <Heading
                        fontSize={'2xl'}
                        textAlign={'center'}
                        bgGradient={useColorModeValue(
                            'linear(to-r, blue.500, purple.500)',
                            'linear(to-r, blue.200, purple.200)'
                        )}
                        bgClip="text">
                        Login
                    </Heading>
                    <Text fontSize={'md'} color={useColorModeValue('gray.600', 'gray.300')}>
                        Welcome To Threads ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={boxBg}
                    boxShadow={boxShadow}
                    p={4}
                    w={{ base: "full", sm: "320px" }}
                    h={'310px'}
                    _hover={{
                        boxShadow: useColorModeValue(
                            '0 4px 6px rgba(160, 174, 192, 0.7)',
                            '0 4px 6px rgba(0, 0, 0, 0.5)'
                        )
                    }}
                    transition="all 0.3s">
                    <Stack spacing={3}>
                        <FormControl id="email" isRequired>
                            <FormLabel fontSize="sm">Username</FormLabel>
                            <Input
                                type="text"
                                size="sm"
                                borderWidth="1px"
                                _hover={{
                                    borderColor: useColorModeValue('blue.500', 'blue.300')
                                }}

                                value={inputs.username}
                                onChange={(e) => setInputs((inputs) => ({ ...inputs, username: e.target.value }))}
                            />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel fontSize="sm">Password</FormLabel>
                            <InputGroup size="sm">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    borderWidth="1px"
                                    _hover={{
                                        borderColor: useColorModeValue('blue.500', 'blue.300')
                                    }}

                                    value={inputs.password}
                                    onChange={(e) => setInputs((inputs) => ({ ...inputs, password: e.target.value }))}
                                />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        size="sm"
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={4} pt={1}>
                            <Button
                                size="sm"
                                bg={useColorModeValue('blue.400', 'blue.500')}
                                color={'white'}
                                _hover={{
                                    bg: useColorModeValue('blue.500', 'blue.600'),
                                }}
                                transition="all 0.3s"
                                onClick={handelLogin}
                                
                            >
                                Login
                            </Button>
                        </Stack>
                        <Stack pt={2}>
                            <Text fontSize={'sm'} align={'center'}>
                                Don't have an account?{' '}
                                <Link
                                    color={useColorModeValue('blue.400', 'blue.200')}
                                    _hover={{
                                        color: useColorModeValue('blue.600', 'blue.300'),
                                        textDecoration: 'underline'
                                    }}
                                    onClick={() => {
                                        setAuthScreen("signup")
                                    }}>
                                    Sign Up
                                </Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};