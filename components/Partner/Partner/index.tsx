import { Avatar, Grid, Text } from "@chakra-ui/react";
import Link from "next/link";
import { DateFormat } from "utils/DateFormat";

interface Props {
  nome: string;
  dataNascimento: string;
  participacao: number | null;
  id: string;
}
export default function Partner({
  id,
  participacao,
  dataNascimento,
  nome,
}: Props) {
  return (
    <Link href={`socios/${id}`}>
      <Grid
        borderRadius="lg"
        padding={2}
        cursor="pointer"
        _hover={{
          backgroundColor: "gray.200",
        }}
      >
        <Avatar name={nome} src={undefined} />
        <Text>Nome: {nome}</Text>
        <Text>
          Data de nascimento:{" "}
          {DateFormat.formatISODateStringToLocale(dataNascimento)}
        </Text>
        <Text>Cota Societária: {participacao}</Text>
      </Grid>
    </Link>
  );
}
