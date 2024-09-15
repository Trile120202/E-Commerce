import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">About Us</h3>
                        <p className="text-gray-400">
                            We are a technology company providing innovative software solutions.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/about" className="text-gray-400 hover:text-white">About</a></li>
                            <li><a href="/services" className="text-gray-400 hover:text-white">Services</a></li>
                            <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Feedback</h3>
                        <form>
                            <div className="mb-4">
                                <Input
                                    type="email"
                                    placeholder="Your email"
                                    className="w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <Textarea
                                    placeholder="Your feedback"
                                    className="w-full"
                                    rows={4}
                                />
                            </div>
                            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                                Submit Feedback
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-700 pt-4 text-center">
                    <p>&copy; 2024 Tech Company. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
