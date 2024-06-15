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

interface StreamSilentEmailProps {
  accountName: string;
  accountSlug: string;
  streamTitle: string;
  streamId: string;
  outageDate: Date;
}

export const StreamSilentEmail = ({
  accountName,
  accountSlug,
  streamId,
  streamTitle,
  outageDate,
}: StreamSilentEmailProps) => {
  const previewText = `Your stream is silent!`;
  const streamLink = `https://usetonearm.com/home/${accountSlug}/streams/${streamId}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[500px] rounded-xl border-2 border-solid border-yellow-300 p-[20px] shadow-lg">
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
              <span className="font-medium text-yellow-500">silent</span>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello {accountName},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              We've detected that your stream{' '}
              <span className="font-medium">{streamTitle}</span> is currently
              broadcasting silence or inaudible audio. This issue is ongoing and
              was first detected{' '}
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

export const getStreamSilentEmailHtml = (
  accountName: string,
  accountSlug: string,
  streamId: string,
  streamTitle: string,
  outageDate: Date,
) => {
  const html = render(
    <StreamSilentEmail
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

StreamSilentEmail.PreviewProps = {
  accountName: 'Nomad Radio',
  accountSlug: 'nomad-radio',
  streamTitle: 'Main Stream',
  streamId: '12312908312',
  outageDate: new Date(),
} as StreamSilentEmailProps;

export default StreamSilentEmail;
