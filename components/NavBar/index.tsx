import Image from 'next/image'
import Button from './button'
import brandLogo from '../../public/lysimed.png'
import { VStack } from '@chakra-ui/react'

export default function NavBar() {
    return (
        <VStack borderRight="4px" borderColor="gray.200" h="100vh" p={3} spacing={5} alignItems="start">
            <Image src={brandLogo} alt="LysiMed" />
            <Button href='/' content='Métricas' />
            <Button href='/socios' content='Sócios' />
            <Button href='/empregados' content='Empregados' />
            <Button href='/financeiro' content='Financeiro' />
        </VStack>
    )   
}