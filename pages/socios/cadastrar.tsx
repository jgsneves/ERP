import MainContent from "../../components/Containers/MainContent";
import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react"
import React, { useState } from "react";
import { Partner } from "../../models/Partner";
import { ArrowBackIcon } from '@chakra-ui/icons'
import Link from "next/link";

export default function CadastrarSocio() {
    const [formData, setFormData] = useState<Partner>({
        nome: '',
        cpf: '',
        dataNascimento: '',
        cotaSocietaria: 0
    });

    const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { id, value } = event.target;
        setFormData((partner) => ({ ...partner, [id]: value }))
    }

    return (
        <MainContent>
            <Text fontSize="5xl" fontWeight={600}>Cadastrar novo sócio</Text>
            <Text>Preencha todos os dados abaixo.</Text>
            
            <Link href="/socios">
                <ArrowBackIcon boxSize={8} mt="6" cursor="pointer" />
            </Link>
            
            <FormControl maxW="500px" mt="14">
                <FormLabel>Nome:</FormLabel>
                <Input value={formData.nome} id="nome" onChange={handleInputOnChange} />
                
                <FormLabel mt="5">Cpf:</FormLabel>
                <Input value={formData.cpf} id="cpf" onChange={handleInputOnChange} />

                <FormLabel mt="5">Data de nascimento:</FormLabel>
                <Input value={formData.dataNascimento} id="dataNascimento" type="date" onChange={handleInputOnChange} />

                <FormLabel mt="5">Cota societária:</FormLabel>
                <Input value={formData.cotaSocietaria} type="number" id="cotaSocietaria" onChange={handleInputOnChange} />

                <Button colorScheme="green" mt="10" onClick={() => console.log(formData)}>Cadastrar</Button>
            </FormControl>
        </MainContent>
    )
}