import Navbar from "@/Components/Navbar";

export default function Authenticated({ user, header, children }) {
    return (
        <div>
            <Navbar auth={{ user }} />
            <main className="mx-auto px-3">{children}</main>
        </div>
    );
}
