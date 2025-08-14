import Navbar from "@/Components/Navbar";

export default function UserLayout({ auth, children }) {
    return (
        <>
            <Navbar auth={auth} />
            <main className="mt-10 container mx-auto sm:px-20 px-5">
                {children}
            </main>
        </>
    );
}
