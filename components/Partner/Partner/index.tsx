import { Avatar, Grid, Text } from "@chakra-ui/react";

interface Props {
    nome: string;
    dataNascimento: string;
    cotaSocietaria: number;
}
export default function Partner({ cotaSocietaria, dataNascimento, nome }: Props) {
    return (
        <Grid>
            <Avatar name={nome} src={undefined} />
            <Text>Nome: {nome}</Text>
            <Text>Data de nascimento: {dataNascimento}</Text>
            <Text>Cota Societária: {cotaSocietaria}</Text>
        </Grid>
    )
}