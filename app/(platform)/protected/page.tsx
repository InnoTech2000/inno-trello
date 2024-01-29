"use client"

// import { currentUser , auth } from "@clerk/nextjs"
// import { useAuth, useUser } from "@clerk/nextjs";

import { UserButton } from "@clerk/nextjs";

    const ProtectedPage = () => {
        // const { userId } = useAuth();
        // const { user } = useUser();


    return (
        <>
            <div>
                {/* User: {user?.firstName}
                userId:{userId} */}
                <UserButton 
                    afterSignOutUrl="/"
                />

            </div>
        </>
    )
}

export default ProtectedPage