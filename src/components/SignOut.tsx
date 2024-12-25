'use client'
const SignOut = () => {
    const handleSignOut = async () => {
        const response = await fetch("http://localhost:3000/api/auth/sign-out");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
    }

    return <button onClick={handleSignOut}>Sign out</button>
}

export default SignOut;
