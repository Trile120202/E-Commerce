import {useEffect, useState} from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {apiCall} from "@/lib/call-api";

interface IAuthDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function DialogLogin({ isOpen, onOpenChange }: IAuthDialogProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await apiCall('/api/auth/login', 'POST', { email, password });

            localStorage.setItem('authToken', response.token);

            onOpenChange(false);

            window.location.reload();
        } catch (err) {
            // @ts-ignore
            setError(err.message || 'An unexpected error occurred');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Login</DialogTitle>
                    <DialogDescription>
                        Enter your credentials to login.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="your-email@example.com"
                            className="col-span-3"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            className="col-span-3"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                </div>
                <DialogFooter>
                    <Button type="button" onClick={handleLogin}>Login</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}



export function DialogSignup({ isOpen, onOpenChange }: IAuthDialogProps) {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSignup = async () => {
        try {
            const response = await apiCall('/api/auth/register', 'POST', {
                username,
                firstName,
                lastName,
                email,
                password,
                role: 'user',
            });

            setSuccess('Account created successfully');
            setError('');

            setUsername('');
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');

            onOpenChange(false);
        } catch (err) {
            // @ts-ignore
            setError(err.message || 'An unexpected error occurred');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Sign Up</DialogTitle>
                    <DialogDescription>
                        Create a new account.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            placeholder="Your Username"
                            className="col-span-3"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="firstName" className="text-right">
                            First Name
                        </Label>
                        <Input
                            id="firstName"
                            placeholder="Your First Name"
                            className="col-span-3"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="lastName" className="text-right">
                            Last Name
                        </Label>
                        <Input
                            id="lastName"
                            placeholder="Your Last Name"
                            className="col-span-3"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="your-email@example.com"
                            className="col-span-3"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            className="col-span-3"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                </div>
                <DialogFooter>
                    <Button type="button" onClick={handleSignup}>Sign Up</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}


interface IProps {
    className?: string;
}

export function AuthPage(props: IProps) {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
    };

    return (
        <div className={cn('', props.className)}>
            {!isLoggedIn ? (
                <>
                    <div className="flex justify-center space-x-4">
                        <Button variant="outline" onClick={() => setIsLoginOpen(true)}>Login</Button>
                        <Button variant="outline" onClick={() => setIsSignupOpen(true)}>Sign Up</Button>
                    </div>

                    <DialogLogin isOpen={isLoginOpen} onOpenChange={setIsLoginOpen} />
                    <DialogSignup isOpen={isSignupOpen} onOpenChange={setIsSignupOpen} />
                </>
            ) : (
                <div className="flex justify-center">
                    <Button variant="outline" onClick={handleLogout}>Logout</Button>
                </div>
            )}
        </div>
    );
}
