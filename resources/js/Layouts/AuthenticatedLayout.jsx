import Navbar from "@/Components/Navbar";

export default function Authenticated({ user, header, children }) {
    return (
        <div>
            <Navbar auth={{ user }} />
            <main className="container mx-auto sm:px-20 px-5">{children}</main>
        </div>
    );
}
