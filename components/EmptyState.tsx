"use client"

import { Heading } from './common/Heading';
import Button from './common/Button';
import { useRouter } from 'next/navigation';

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

export default function EmptyState({
    title = "No exact matches",
    subtitle = "Try changing or removing some of your filters.",
    showReset
}: EmptyStateProps) {
    const router = useRouter()

    return ( 
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
            <Heading
                center
                title={title}
                subtitle={subtitle}
            />

            {showReset && (
                <div className="w-48 mt-4">
                    <Button
                        outline
                        label="Remove all filters"
                        onClick={() => router.push('/')}
                    />
                </div>
            )}
        </div>
    );
}
