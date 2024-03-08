import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import React, { useCallback } from 'react'
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
    var cloudinary: any
}

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

export default function ImageUpload({
    onChange,
    value
}: ImageUploadProps) {
    const setResource = useCallback((result: any) => {        
        onChange(result?.secure_url)
    }, [onChange])

    return (
        <CldUploadWidget 
            onSuccess={(result) => {
                setResource(result?.info);
            }}
            uploadPreset='u5jzre7z'
            options={{
                maxFiles: 1
            }}
        >
            {({open}) => {
                function handleOnClick() {
                    setResource(undefined);
                    open?.();
                }
                return (
                    <div 
                        onClick={handleOnClick}
                        className='relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600'
                    >
                        <TbPhotoPlus size={50} />
                        <div className='font-semibold text-lg'>
                            Click to upload
                        </div>
                        {value && (
                            <div className='absolute inset-0 w-full h-full'>
                                <Image 
                                    alt='Upload'
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    src={value}
                                />
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>
    )
}
