import NavBar from "../NavBar";
import { Inter } from '@next/font/google'
import Head from 'next/head'
import { Box, Flex } from '@chakra-ui/react'

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
            <Flex className={inter.className}>
                <NavBar />
                <Box flex={1}>{children}</Box>
            </Flex>
        </>
    )
}