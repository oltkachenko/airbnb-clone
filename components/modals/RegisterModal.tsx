"use client"

import useRegisterModal from "@/hooks/useRegisterModal"
import axios from "axios";
import { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Modal from "@/components/modals/Modal";
import { Heading } from "@/components/common/Heading";
import { Input } from "@/components/formElements/Input";
import toast from "react-hot-toast";
import Button from "../common/Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import useLoginModal from "@/hooks/useLoginModal";
import { signIn } from "next-auth/react";

export default function RegisterModal() {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const [isLoading, setIsLoading] = useState(false);

    const {
        register, 
        handleSubmit, 
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() =>{
                registerModal.onClose()
            })
            .catch((error) =>{
                toast.error("Something went wrong")
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title="Welcome to Airbnb"
                subtitle="Create an account!"
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="email"
            />

            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

            <Input
                id="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="password"
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button 
                outline 
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => signIn('google')} 
            />

            <Button 
                outline 
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />

            <div className="text-neutral-500 text-center mt-4 font-light">
                <p>Already have an account?
                    <span 
                        onClick={() => {
                            loginModal.onOpen()
                            registerModal.onClose()
                        }} 
                        className="text-neutral-800 cursor-pointer hover:underline ml-2"
                    > 
                        Log in
                    </span>
                </p>
            </div>
        </div>
    )

    return (
        <Modal 
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel="Continue"
            body={bodyContent}
            footer={footerContent}
        />
    )
}
