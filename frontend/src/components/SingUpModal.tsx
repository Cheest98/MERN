import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { SingUpCredentials } from "../network/notes_api";
import * as  NotesApi from "../network/notes_api"
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInpurField";
import styleUtils from "../styles/utils.module.css"

interface SingUpModalProps {
    onDismiss: () => void,
    onSingUpSucessful: (user: User) => void,
}

const SingUpModal = ({ onDismiss, onSingUpSucessful }: SingUpModalProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SingUpCredentials>();

    async function onSubmit(credentials: SingUpCredentials) {
        try {
            const newUser = await NotesApi.singUp(credentials)
            onSingUpSucessful(newUser)
        } catch (error) {
            alert(error);
            console.error(error)
        }

    }
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title> Sing Up </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Username"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.username}
                    />
                </Form>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Email"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.email}
                    />
                </Form>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.password}
                    />
                    <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className={styleUtils.width100}>
                
                        Sing Up
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>

    );
}

export default SingUpModal