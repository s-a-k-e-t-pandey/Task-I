

export default function Footer() {

    return (
        <footer className="bg-secondary/15 backdrop-blur-lg border-t border-primary/10 shadow-lg shadow-neutral-600/5 mx-auto">
            <div className="max-w-7xl mx-auto px-4 py-6 text-center">
                <p className="text-sm text-gray-500">
                    © {new Date().getFullYear()} Topboard. All rights reserved.
                </p>
            </div>
        </footer>
    );
}