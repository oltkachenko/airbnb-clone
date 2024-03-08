"use client"

interface Headingprops {
    title: string;
    subtitle?: string;
    center?: boolean;
}

export function Heading({
    title,
    subtitle,
    center
}: Headingprops) {
    return (
        <div className={center ? 'text-center' : ''}>
            <h1 className="text-2xl font-bold">
                { title }
            </h1>
            <p className="font-light text-neutral-500 mt-2">
                { subtitle }
            </p>
        </div>
    )
}
