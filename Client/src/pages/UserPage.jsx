import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

const UserPage = () => {
    return (
        <>
            <UserHeader />
            <UserPost likes={700} replies={401} postImg="/mark-zuckerberg.png" postTitle={"Lets talk about thread"} />
            <UserPost likes={98} replies={89} postImg="/post11.png" postTitle={"Lets talk about mark marriage"} />
            <UserPost likes={145} replies={4} postImg="/post22.png" postTitle={"Lets talk about Nvedia"} />
            <UserPost likes={14} replies={47} postTitle={" This is my first thread "} />

        </>
    );
};

export default UserPage;