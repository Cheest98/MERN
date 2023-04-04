import { Button } from "react-bootstrap";

interface NavBarLoggedOutViewProps{
    onSingedUpClicked: () => void,
    onLoginClicked: () => void,
}

const NavBarLoggedOutView  = ( {onSingedUpClicked, onLoginClicked}:NavBarLoggedOutViewProps) => {
    return (
        <>
        <Button onClick={onSingedUpClicked}>Sing Up</Button>
        <Button onClick={onLoginClicked}>Log In</Button></>
    );
}

export default NavBarLoggedOutView;

