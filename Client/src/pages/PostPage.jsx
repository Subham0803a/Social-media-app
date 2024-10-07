import { Avatar, Flex, Image, Text, Box, Divider, Button } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";
import Actions from "../components/Actions";
import Comment from "../components/Comment";


const PostPage = () => {
  const [liked, setLiked] = useState(false);

  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src="/mark-zuck.png" size={"md"} name="Mark Zuckerberg" />
          <Flex>
            <Text fontsize={"sm"} fontWeight={"bold"}>markzuckerberg</Text>
            <Image src="/verified.png" w="4" h={4} ml={2} marginTop={1.5} marginLeft={1} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>1d</Text>
          <BsThreeDots />

        </Flex>
      </Flex>
      <Text my={3}> Let's talk about Elon Musk </Text>

      <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
        <Image src={"/post3.png"} w={"full"} />
      </Box>

      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>

      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>238 replies</Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"grey.light"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>{200 + (liked ? 1 : 0)} likes</Text>
      </Flex>
      <Divider my={4} />

      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2x1"}>👋</Text>
          <Text color={"gray.light"}>Get the app to like, reply and post.</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>

      <Divider my={4} />
      <Comment
        Comment="Looks really good!"
        createdAt="1d"
        likes="18"
        Username="johndoe"
        userAvatar="https://bit.ly/dan-abramov"
      />
      <Comment
        Comment="how are you!"
        createdAt="2d"
        likes="170"
        Username="lucifer"
        userAvatar="https://bit.ly/tioluwani-kolawole"
      />
      <Comment
        Comment="Good morining!"
        createdAt="1d"
        likes="10"
        Username="james"
        userAvatar="https://bit.ly/ryan-florence"

      />
    </>
  );
};

export default PostPage;