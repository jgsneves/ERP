import Image from 'next/image'
import Button from './button'
import brandLogo from '../../public/lysimed.png'

export default function NavBar() {
    return (
        <nav className="w-56 border-r-2 h-screen">
            <div className='p-2'>
                <Image src={brandLogo} alt="LysiMed" />
            </div>
            <ul>
                <Button href='/' content='Métricas' />
                <Button href='/socios' content='Sócios' />
                <Button href='/empregados' content='Empregados' />
                <Button href='/financeiro' content='Financeiro' />
            </ul>
        </nav>
    )   
}