import { Box, Flex, Text, Link, VStack } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";
import { useToast } from '@chakra-ui/toast'

const UserHeader = () => {
    const toast = useToast()

    const copyURL = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL).then((
            toast({
                title: 'Copied Sucessfully',
                description: "Profile link copied to clipboard",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        ));
    };


    return (
        <VStack gap={4} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"}> Mark Zuckerberg</Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"}>@mark_zuckerberg</Text>
                        <Text fontSize={"xs"} bg={"gray.dark"} color={"green.light"} p={1} borderRadius={"full"}>
                            threads.net
                        </Text>
                    </Flex>
                </Box>
                <Box>
                    <Avatar
                        name="Mark Zuckerberg"
                        src="/mark-zuck.png"
                        size={{
                            base: "md",
                            md: "xl",
                        }}
                    />
                </Box>
            </Flex>


            <Text> Co-founder, executive chairman and CEO of META platforms.</Text>
            <Flex w={"full"} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"}>3.2M followers</Text>
                    <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"}></Box>
                    <Link color={"gray.light"}>instagram</Link>
                </Flex>
                <Flex>
                    <Box className="icon-container">
                        <BsInstagram size={24} cursor={"pointer"} />
                    </Box>
                    <Box className="icon-container">
                        <Menu>
                            <MenuButton>
                                <CgMoreO size={24} cursor={"pointer"} />
                            </MenuButton>
                            <Portal>
                                <MenuList bg={"gray.dark"}>
                                    <MenuItem bg={"gray.dark"} onClick={copyURL}> Copy profile URL </MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                </Flex>
            </Flex>
            <Flex w={"full"}>
                <Flex
                    flex={1}
                    borderBottom={"1.5px solid white"}
                    justifyContent={"center"}
                    pb="3"
                    cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Threads</Text>
                </Flex>

                <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={"center"} color={"gray.light"} pb="3" cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Replies</Text>
                </Flex>

            </Flex>
        </VStack>
    );
}

export default UserHeader;