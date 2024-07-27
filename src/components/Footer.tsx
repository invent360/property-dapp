
export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-blue-600 text-white p-4">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Footer</p>
            </div>
        </footer>
    );
}
