import { Avatar, Grid, Text } from "@chakra-ui/react";

interface Props {
  nome: string;
  dataNascimento: string;
  participacao: number | null;
}
export default function Partner({ participacao, dataNascimento, nome }: Props) {
  return (
    <Grid>
      <Avatar name={nome} src={undefined} />
      <Text>Nome: {nome}</Text>
      <Text>Data de nascimento: {dataNascimento}</Text>
      <Text>Cota Societária: {participacao}</Text>
    </Grid>
  );
}
