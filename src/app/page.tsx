"use client";

import { useState, useEffect } from "react";
import { Flex, Heading, Text, Card, Link, Button, Callout, TextField, Section } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Address, isAddress } from "viem";
import { useRouter } from "next/navigation";
import { UAParser } from "ua-parser-js";

const STORAGE_KEY = "revolut-offramp-address";
const REVOLUT_UNIVERSAL_LINK = "https://revolut.com/crypto";
const REVOLUT_UNIVERSAL_LINK_MOBILE = "https://revolut.me/crypto";

export default function Home() {
  const router = useRouter();
  const [address, setAddress] = useState<Address | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const savedAddress = localStorage.getItem(STORAGE_KEY) as Address;
    if (savedAddress) {
      setAddress(savedAddress);
    }
    const parser = new UAParser();
    setIsMobile(parser.getDevice().type === "mobile");
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

    const url = `https://yodl.me/${address}?tokens=USDC,USDT&chains=137`;
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
        <Heading as='h2' size='2' align='center' className='text-center'>
          <Text size='5' className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500'>
            Send any token on any chain
          </Text>
          <br />
          <Text>Receive USDT or USDC on Revolut</Text>
        </Heading>
      </Section>
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
                    <Link href={isMobile ? REVOLUT_UNIVERSAL_LINK_MOBILE : REVOLUT_UNIVERSAL_LINK} target='_blank'>
                      Open App 1
                    </Link>
                  </Button>
                  <Button size='1' asChild>
                    <Link href={REVOLUT_UNIVERSAL_LINK} target='_blank'>
                      Open App 2
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

            {error && (
              <Callout.Root color='red'>
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>{error}</Callout.Text>
              </Callout.Root>
            )}

            <Button onClick={handleDeposit} disabled={!address}>
              Deposit
            </Button>
            <Callout.Root>
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>Minimum deposit is: 5 USDC or USDT</Callout.Text>
            </Callout.Root>
          </Flex>
        </Card>
      </Section>
    </>
  );
}
