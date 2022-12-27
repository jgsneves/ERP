import { Grid, Avatar } from "@chakra-ui/react";
import Link from "next/link";
import { Text } from "@chakra-ui/react";

interface Props {
  name: string;
  id: string;
  salary: number | null;
}

export default function Employee({ id, name, salary }: Props) {
  return (
    <Link href={`empregados/${id}`}>
      <Grid
        borderRadius="lg"
        padding={2}
        cursor="pointer"
        _hover={{
          backgroundColor: "gray.200",
        }}
      >
        <Avatar name={name} src={undefined} />
        <Text>Nome: {name}</Text>
        <Text>Salário: {salary}</Text>
      </Grid>
    </Link>
  );
}
