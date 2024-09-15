import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {SearchIcon} from "lucide-react";
import {useState} from "react";
import { useRouter } from 'next/router'
interface Iprops {
    type?: string
    title?: string
    placeholder?: string
    disabled?: boolean
    className?: string
    variant?: "primary" | "secondary" | "tertiary" | "outline"
    size?: "small" | "medium" | "large"
    asChild?: boolean
    children?: React.ReactNode
}
export function InputWithButton( props:Iprops) {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = () => {
        if (searchTerm.trim()) {
          window.location.href=`/sanpham?search=${encodeURIComponent(searchTerm.trim())}`
        }
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };
    return (
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type={props.type} onChange={(e) => setSearchTerm(e.target.value)}  onKeyDown={handleKeyDown} placeholder={props.placeholder} />
            <Button onClick={handleSearch} type="submit">{props.title ?? <SearchIcon/>}</Button>
        </div>
    )
}
