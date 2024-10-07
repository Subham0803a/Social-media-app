import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
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
import userAtom from "../atoms/userAtom";
import { useToast } from '@chakra-ui/toast';

export default function SignupCard() {
    
    const [showPassword, setShowPassword] = useState(false);
    const setAuthScreen = useSetRecoilState(authScreenAtom);
    const [inputs, setInputs] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const setUser = useSetRecoilState(userAtom);

    const bgGradient = useColorModeValue(
        'linear(to-r, gray.50, gray.100)',
        'linear(to-r, gray.900, gray.800)'
    );

    const boxBg = useColorModeValue('white', 'gray.700');
    const boxShadow = useColorModeValue(
        '0 2px 4px rgba(160, 174, 192, 0.6)',
        '0 2px 4px rgba(0, 0, 0, 0.4)'
    );



    const handleSignup = async () => {
        if (!inputs.name || !inputs.username || !inputs.email || !inputs.password) {
            toast({
                title: 'Error',
                description: 'Please fill all fields',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });

            const data = await res.json();

            if (data.error) {
                toast({
                    title: 'Error',
                    description: data.error,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }

            localStorage.setItem("user-threads", JSON.stringify(data));
            setUser(data);

            toast({
                title: 'Success',
                description: 'Account created successfully',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } 
        catch (error) {
            toast({
                title: 'Error',
                description: 'An error occurred during signup',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } 
        finally {
            setIsLoading(false);
        }
    };

    return (
        <Flex
            minH={'80vh'} 
            align={'center'}
            justify={'center'}
            bgGradient={bgGradient}
            transition="all 0.2s">

            <Stack spacing={4} mx={'auto'} maxW={'md'} py={6} px={4}>
                <Stack align={'center'} spacing={1}>
                    <Heading
                        fontSize={'2xl'}
                        textAlign={'center'}
                        bgGradient={useColorModeValue(
                            'linear(to-r, blue.500, purple.500)',
                            'linear(to-r, blue.200, purple.200)'
                        )}
                        bgClip="text">
                        Sign up
                    </Heading>
                    <Text fontSize={'md'} color={useColorModeValue('gray.600', 'gray.300')}>
                        To enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={boxBg}
                    boxShadow={boxShadow}
                    p={6}
                    w={{ base: "full", sm: "400px" }}
                    _hover={{
                        boxShadow: useColorModeValue(
                            '0 4px 6px rgba(160, 174, 192, 0.7)',
                            '0 4px 6px rgba(0, 0, 0, 0.5)'
                        )
                    }}
                    transition="all 0.3s">
                    <Stack spacing={3}>
                        <HStack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel fontSize="sm">Full Name</FormLabel>
                                <Input
                                    size="sm"
                                    borderWidth="1px"
                                    _hover={{
                                        borderColor: useColorModeValue('blue.500', 'blue.300')
                                    }}
                                    onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                                    value={inputs.name}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel fontSize="sm">Username</FormLabel>
                                <Input
                                    size="sm"
                                    borderWidth="1px"
                                    _hover={{
                                        borderColor: useColorModeValue('blue.500', 'blue.300')
                                    }}
                                    onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                                    value={inputs.username}
                                />
                            </FormControl>
                        </HStack>
                        <FormControl isRequired>
                            <FormLabel fontSize="sm">Email</FormLabel>
                            <Input
                                size="sm"
                                type="email"
                                borderWidth="1px"
                                _hover={{
                                    borderColor: useColorModeValue('blue.500', 'blue.300')
                                }}
                                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                                value={inputs.email}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel fontSize="sm">Password</FormLabel>
                            <InputGroup size="sm">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    borderWidth="1px"
                                    _hover={{
                                        borderColor: useColorModeValue('blue.500', 'blue.300')
                                    }}
                                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                                    value={inputs.password}
                                />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        size="sm"
                                        onClick={() => setShowPassword(!showPassword)}>
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
                                onClick={handleSignup}
                                isLoading={isLoading}
                                transition="all 0.3s">
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={2}>
                            <Text fontSize={'sm'} align={'center'}>
                                Already a user?{' '}
                                <Link
                                    color={useColorModeValue('blue.400', 'blue.200')}
                                    _hover={{
                                        color: useColorModeValue('blue.600', 'blue.300'),
                                        textDecoration: 'underline'
                                    }}
                                    onClick={() => setAuthScreen("login")}>
                                    Login
                                </Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};
