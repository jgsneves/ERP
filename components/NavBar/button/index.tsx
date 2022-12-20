import Link from "next/link";

interface Props {
    href: string;
    content: string;
}

export default function Button({ content, href}: Props) {
    return (
        <Link href={href}>
            <li className="p-3 hover:text-green-600 hover:bg-green-100 cursor-pointer">
                <h3 className="font-bold">{content}</h3>
            </li>
        </Link>
    )
}