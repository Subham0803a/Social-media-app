import { Button } from "@chakra-ui/button";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { useToast } from "@chakra-ui/toast";
import { FiLogOut } from "react-icons/fi"

const LogoutButton = () => {
    const setUser = useSetRecoilState(userAtom);
    const toast = useToast();

    const handleLogout = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/users/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            console.log(data);

            if (data.error) {
                toast({
                    title: 'Error',
                    description: 'error',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }

            localStorage.removeItem("user-threads");
            setUser(null);

        }
        catch (error) {
            showToast("Error", error, "error");
        }
    };
    return (
        <Button position={"fixed"} top={"30px"} right={"30px"} size={"sm"} onClick={handleLogout}>
            < FiLogOut size={24} />
        </Button>
    );
};

export default LogoutButton;