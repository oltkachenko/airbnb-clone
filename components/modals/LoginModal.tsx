"use client"

import useLoginModal from "@/hooks/useLoginModal"
import useRegisterModal from "@/hooks/useRegisterModal";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Modal from "@/components/modals/Modal";
import { Heading } from "@/components/common/Heading";
import { Input } from "@/components/formElements/Input";
import toast from "react-hot-toast";
import Button from "../common/Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginModal() {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter()

    const {
        register, 
        handleSubmit, 
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false
        })
        .then((calback) => {
            setIsLoading(false)

            if (calback?.ok) {
                toast.success('Logged in');
                router.refresh();
                loginModal.onClose()
            }

            if (calback?.error) {
                toast.error(calback.error)
            }
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title="Welcome back"
                subtitle="Login to your account"
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
                <p>First time using Airbnb?
                    <span 
                        onClick={() => {
                            loginModal.onClose()
                            registerModal.onOpen()
                        }} 
                        className="text-neutral-800 cursor-pointer hover:underline ml-2"
                    > 
                        Create an account
                    </span>
                </p>
            </div>
        </div>
    )

    return (
        <Modal 
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel="Continue"
            body={bodyContent}
            footer={footerContent}
        />
    )
}
