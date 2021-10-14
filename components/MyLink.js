import Link from 'next/link'

const MyLink = ({href="/", children}) => {
    return (
        <Link href={href}>
            <a>{children}</a>
        </Link>
    )
}

export default MyLink
