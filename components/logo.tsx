import Image from "next/image"
import Link from "next/link"

export const Logo = () => {
    return (
        <Link href="/">
            <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex"  >
                Logo
                <p className="text-lg text-neutral-700 pb-1" >
                    1000%
                </p>
            </div>
        </Link>
    )
}