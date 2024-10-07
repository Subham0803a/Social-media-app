import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Avatar,
    Center,

} from '@chakra-ui/react'

import { useRef, useState } from 'react'
import { useRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import usePreviewImg from '../hooks/usePreviewImg';
import useShowToast from "../hooks/useShowToast";

export default function UpdateProfilePage() {

    const [user, setUser] = useRecoilState(userAtom);
    const [inputs, setInputs] = useState({
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
        password: "",
    });

    const fileRef = useRef(null);
    const [updating, setUpdating] = useState(false);

    const showToast = useShowToast();
    const { handleImageChange, imgUrl } = usePreviewImg();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (updating) return;
        setUpdating(true);

        try {
            const res = await fetch(`http://localhost:5000/api/users/update/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...inputs, profilePic: imgUrl }),
            });
            console.log(inputs);

            const data = await res.json(); // updated user object
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }

             
        } 
        catch (error) {
            showToast('Error', error, 'error')

        }
        finally {
			setUpdating(false);
		}
    };

    return (
        <form onSubmit={handleSubmit}>
            <Flex
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.dark')}
                m={6}>

                <Stack
                    spacing={4}
                    w={'full'}
                    maxW={'md'}
                    bg={useColorModeValue('white', 'gray.700')}
                    rounded={'xl'}
                    boxShadow={'lg'}
                    p={{ base: 4, sm: 6 }}
                    my={12}
                    transition="all 0.3s"
                    _hover={{ boxShadow: 'xl' }}
                >

                    <Heading lineHeight={1.1} fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}>
                        User Profile Edit
                    </Heading>
                    <FormControl id="userName">
                        <FormLabel>User Icon</FormLabel>
                        <Stack direction={['column', 'row']} spacing={{ base: 4, sm: 6 }}>
                            <Center>
                                <Avatar size="xl" boxShadow={"md"} src={imgUrl || user.profilePic} />
                            </Center>
                            <Center w="full">
                                <Button w="full" onClick={() => fileRef.current.click()} transition="all 0.3s" _hover={{ transform: 'translateY(-2px)' }}>
                                    Change Profile
                                </Button>
                                <Input type='file' hidden ref={fileRef} onChange={handleImageChange} />
                            </Center>
                        </Stack>
                    </FormControl>

                    <FormControl >
                        <FormLabel>Full Name</FormLabel>
                        <Input
                            placeholder="Fullname"
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                            transition="all 0.3s"
                            _hover={{ borderColor: 'blue.500' }}
                            value={inputs.name}
                            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                        />
                    </FormControl>

                    <FormControl >
                        <FormLabel>User Name</FormLabel>
                        <Input
                            placeholder="Username"
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                            transition="all 0.3s"
                            _hover={{ borderColor: 'blue.500' }}
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        />
                    </FormControl>

                    <FormControl >
                        <FormLabel>Email address</FormLabel>
                        <Input
                            placeholder="email@example.com"
                            _placeholder={{ color: 'gray.500' }}
                            type="email"
                            transition="all 0.3s"
                            _hover={{ borderColor: 'blue.500' }}
                            value={inputs.email}
                            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                        />
                    </FormControl>

                    <FormControl >
                        <FormLabel>Bio</FormLabel>
                        <Input
                            placeholder="Your Bio..."
                            _placeholder={{ color: 'gray.500' }}
                            type="email"
                            transition="all 0.3s"
                            _hover={{ borderColor: 'blue.500' }}
                            value={inputs.bio}
                            onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
                        />
                    </FormControl>

                    <FormControl >
                        <FormLabel>Password</FormLabel>
                        <Input
                            placeholder="password"
                            _placeholder={{ color: 'gray.500' }}
                            type="password"
                            transition="all 0.3s"
                            _hover={{ borderColor: 'blue.500' }}
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </FormControl>

                    <Stack spacing={6} direction={['column', 'row']}>
                        <Button
                            bg={'red.400'}
                            color={'white'}
                            w="full"
                            transition="all 0.3s"
                            _hover={{
                                bg: 'red.500',
                                transform: 'translateY(-2px)',
                            }}>
                            Cancel
                        </Button>
                        <Button
                            bg={'blue.400'}
                            color={'white'}
                            w="full"
                            transition="all 0.3s"
                            _hover={{
                                bg: 'blue.500',
                                transform: 'translateY(-2px)',
                            }}
                            type='submit'
                        >
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </form>
    );
}