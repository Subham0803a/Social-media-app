import { useRecoilValue } from "recoil";
import SignupCard from "../components/Signupcard";
import LoginCard from "../components/LoginCard";
import authScreenAtom from "../atoms/authAtom";


const AuthPage = () => {

    const authScreenState = useRecoilValue(authScreenAtom);

    return (
        < >
            { authScreenState === "login" ? <LoginCard /> : <SignupCard /> }
        </>
    );
};

export default AuthPage;
