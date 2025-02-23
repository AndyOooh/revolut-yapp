import { Wallet } from "lucide-react";
import { Flex, Heading, Section } from "@radix-ui/themes";

export function Header() {
  return (
    <Section size='1'>
      <Flex direction='row' align='center' justify='center' gap='2' >
        <Wallet className='h-6 w-6 text-blue-500' />
        <Heading as='h1' size='3'>
          Revolut Offramp
        </Heading>
      </Flex>
    </Section>
  );
}
