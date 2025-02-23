"use client";

import { useState, useEffect } from "react";
import { Flex, Select, Heading, Text, Card, Link, Button, Callout, TextField, Section } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Address, isAddress } from "viem";
import { useRouter } from "next/navigation";

type SupportedToken = "USDC" | "USDT";

const STORAGE_KEY = "revolut-offramp-address";
const REVOLUT_UNIVERSAL_LINK = "https://revolut.com/crypto";
const SUPPORTED_TOKENS: SupportedToken[] = ["USDC", "USDT"];
const MIN_DEPOSIT_BY_TOKEN: Record<SupportedToken, number> = {
  USDC: 5,
  USDT: 5,
};

export default function Home() {
  const router = useRouter();
  const [address, setAddress] = useState<Address | null>(null);
  const [token, setToken] = useState<SupportedToken>("USDC");
  const [error, setError] = useState<string | null>(null);

  const isValidToken = (token: SupportedToken) => {
    return SUPPORTED_TOKENS.includes(token);
  };

  useEffect(() => {
    const savedAddress = localStorage.getItem(STORAGE_KEY) as Address;
    if (savedAddress) {
      setAddress(savedAddress);
    }
  }, []);

  useEffect(() => {
    if (address) {
      localStorage.setItem(STORAGE_KEY, address);
    }
  }, [address]);

  const handleDeposit = () => {
    if (!address || !isAddress(address)) {
      setError("Please enter a valid deposit address");
      return;
    }
    if (!isValidToken(token)) {
      setError("Please select a valid token");
      return;
    }
    const url = `https://yodl.me/${address}?tokens=${token}&chains=137`;
    router.push(url);
  };

  const steps = [
    "Go to 'Crypto' on the bottom menu.",
    "Tap 'Receive'.",
    "Select Token (USDT or USDC)",
    "Select Polygon as the network",
    "Copy the address and paste it below.",
  ];

  return (
    <>
      <Section size='1'>
        <Card>
          <Flex direction='column' gap='2'>
            <Heading as='h2' size='2'>
              How to find your deposit address:
            </Heading>

            <Flex direction='column' gap='2' className='text-sm text-gray-300'>
              <Flex gap='2'>
                <Text>1. </Text>
                <Flex gap='2'>
                  <Text>Open Revolut</Text>
                  <Button size='1' asChild>
                    <Link href={REVOLUT_UNIVERSAL_LINK} target='_blank'>
                      Open App
                    </Link>
                  </Button>
                </Flex>
              </Flex>
              {steps.map((step, index) => (
                <Flex gap='2' key={index}>
                  <Text>{index + 2}. </Text>
                  <Text>{step}</Text>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </Card>
      </Section>
      <Callout.Root>
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>Currently only Polygon chain is supported.</Callout.Text>
      </Callout.Root>

      <Section size='1'>
        <Card>
          <Flex direction='column' gap='4'>
            <Flex direction='column' gap='2'>
              <Text as='label' size='2' color='gray'>
                Deposit Address
              </Text>
              <Flex direction='column' gap='2'>
                <TextField.Root value={address || ""} onChange={e => setAddress(e.target.value as Address)} />
                {address && !isAddress(address) && (
                  <Callout.Root color='red'>
                    <Callout.Icon>
                      <InfoCircledIcon />
                    </Callout.Icon>
                    <Callout.Text>Please enter a valid address</Callout.Text>
                  </Callout.Root>
                )}
              </Flex>
            </Flex>

            <Flex direction='column' gap='2'>
              <Text as='label' size='2' color='gray'>
                Token
              </Text>
              <Select.Root defaultValue='USDC' value={token} onValueChange={value => setToken(value as SupportedToken)}>
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    <Select.Item value='USDC'>USDC</Select.Item>
                    <Select.Item value='USDT'>USDT</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Flex>

            {error && (
              <Callout.Root color='red'>
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>{error}</Callout.Text>
              </Callout.Root>
            )}

            <Button onClick={handleDeposit} disabled={!address || !token}>
              Deposit
            </Button>
          </Flex>
        </Card>
      </Section>
      <Callout.Root>
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          Minimum deposit for {token} is: {MIN_DEPOSIT_BY_TOKEN[token]}
        </Callout.Text>
      </Callout.Root>
    </>
  );
}
