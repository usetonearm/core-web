import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
  render,
} from '@react-email/components';
import { format, formatDistance } from 'date-fns';

interface StreamDownEmailProps {
  accountName: string;
  accountSlug: string;
  streamTitle: string;
  streamId: string;
  outageDate: Date;
}

export const StreamDownEmail = ({
  accountName,
  accountSlug,
  streamId,
  streamTitle,
  outageDate,
}: StreamDownEmailProps) => {
  const previewText = `Your stream is down!`;
  const streamLink = `https://usetonearm.com/home/${accountSlug}/streams/${streamId}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[500px] rounded-xl border-2 border-solid border-red-300 p-[20px] shadow-lg">
            <Section className="mt-[32px]">
              <Img
                src={'https://usetonearm.com/images/logo-transparent.png'}
                width="auto"
                height="50"
                alt="Vercel"
                className="mx-auto my-0 rounded-lg"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Your stream is{' '}
              <span className="font-medium text-red-500">down</span>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello {accountName},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              We've detected that your stream{' '}
              <span className="font-medium">{streamTitle}</span> is currently
              offline. This outage is ongoing and was first detected{' '}
              {formatDistance(new Date(outageDate), new Date(), {
                includeSeconds: true,
              }) +
                ' ago on ' +
                format(new Date(outageDate), 'MMMM do, yyyy hh:mm:ss a z')}
              .
            </Text>
            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={streamLink}
              >
                View stream
              </Button>
            </Section>
            <Text className="text-[12px] leading-[24px] text-black">
              Or copy and paste this URL into your browser:{' '}
              <Link href={streamLink} className="text-blue-600 no-underline">
                {streamLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              If you were not expecting this notification, you can ignore this
              email. If you are concerned about your account's safety, please
              reply to this email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const getStreamDownEmailHtml = (
  accountName: string,
  accountSlug: string,
  streamId: string,
  streamTitle: string,
  outageDate: Date,
) => {
  const html = render(
    <StreamDownEmail
      accountName={accountName}
      accountSlug={accountSlug}
      streamId={streamId}
      streamTitle={streamTitle}
      outageDate={outageDate}
    />,
    {
      pretty: true,
    },
  );
  return html;
};

StreamDownEmail.PreviewProps = {
  accountName: 'Nomad Radio',
  accountSlug: 'nomad-radio',
  streamTitle: 'Main Stream',
  streamId: '12312908312',
  outageDate: new Date(),
} as StreamDownEmailProps;

export default StreamDownEmail;
