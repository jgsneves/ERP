import NavBar from "../NavBar";
import { Inter } from '@next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

interface Props {
    children: React.ReactNode
}
export default function Layout({ children }: Props) {
    return (
        <>
            <Head>
                <title>LysiMed</title>
            </Head>
            <div className={`flex ${inter.className}`}>
                <NavBar />
                <main>{children}</main>
            </div>
        </>
    )
}