'use client';

import React, { forwardRef, useRef } from 'react';

import { cn } from '@kit/ui/utils';

import { AnimatedBeam } from '~/components/ui/animated-beam';

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]',
        className,
      )}
    >
      {children}
    </div>
  );
});

export function IntegrationsFeature() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div className="absolute left-0 top-0 h-[300px] w-full border-none p-4 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105">
      <div
        className="flex w-full max-w-full items-center justify-center"
        ref={containerRef}
      >
        <div className="flex h-full w-full flex-col items-stretch justify-between gap-10">
          <div className="flex flex-row items-center justify-between">
            <Circle ref={div1Ref}>
              <Icons.icecast />
            </Circle>
            <Circle ref={div5Ref}>
              <Icons.gmail />
            </Circle>
          </div>
          <div className="flex flex-row items-center justify-between">
            <Circle ref={div2Ref}>
              <Icons.radioco />
            </Circle>
            <Circle ref={div4Ref} className="h-16 w-16">
              <Icons.tonearm />
            </Circle>
            <Circle ref={div6Ref}>
              <Icons.slack />
            </Circle>
          </div>
          <div className="flex flex-row items-center justify-between">
            <Circle ref={div3Ref}>
              <Icons.airtime />
            </Circle>
            <Circle ref={div7Ref}>
              <Icons.discord />
            </Circle>
          </div>
        </div>
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={div4Ref}
          curvature={-75}
          endYOffset={-10}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div2Ref}
          toRef={div4Ref}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div3Ref}
          toRef={div4Ref}
          curvature={75}
          endYOffset={10}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div5Ref}
          toRef={div4Ref}
          curvature={-75}
          endYOffset={-10}
          reverse
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div6Ref}
          toRef={div4Ref}
          reverse
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div7Ref}
          toRef={div4Ref}
          curvature={75}
          endYOffset={10}
          reverse
        />
      </div>
    </div>
  );
}

const Icons = {
  discord: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 -28.5 256 256"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <g>
          {' '}
          <path
            d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
            fill="#5865F2"
            fill-rule="nonzero"
          >
            {' '}
          </path>{' '}
        </g>{' '}
      </g>
    </svg>
  ),
  gmail: () => (
    <svg
      viewBox="0 0 32 32"
      width="100"
      height="100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <path
          d="M2 11.9556C2 8.47078 2 6.7284 2.67818 5.39739C3.27473 4.22661 4.22661 3.27473 5.39739 2.67818C6.7284 2 8.47078 2 11.9556 2H20.0444C23.5292 2 25.2716 2 26.6026 2.67818C27.7734 3.27473 28.7253 4.22661 29.3218 5.39739C30 6.7284 30 8.47078 30 11.9556V20.0444C30 23.5292 30 25.2716 29.3218 26.6026C28.7253 27.7734 27.7734 28.7253 26.6026 29.3218C25.2716 30 23.5292 30 20.0444 30H11.9556C8.47078 30 6.7284 30 5.39739 29.3218C4.22661 28.7253 3.27473 27.7734 2.67818 26.6026C2 25.2716 2 23.5292 2 20.0444V11.9556Z"
          fill="white"
        ></path>{' '}
        <path
          d="M22.0515 8.52295L16.0644 13.1954L9.94043 8.52295V8.52421L9.94783 8.53053V15.0732L15.9954 19.8466L22.0515 15.2575V8.52295Z"
          fill="#EA4335"
        ></path>{' '}
        <path
          d="M23.6231 7.38639L22.0508 8.52292V15.2575L26.9983 11.459V9.17074C26.9983 9.17074 26.3978 5.90258 23.6231 7.38639Z"
          fill="#FBBC05"
        ></path>{' '}
        <path
          d="M22.0508 15.2575V23.9924H25.8428C25.8428 23.9924 26.9219 23.8813 26.9995 22.6513V11.459L22.0508 15.2575Z"
          fill="#34A853"
        ></path>{' '}
        <path
          d="M9.94811 24.0001V15.0732L9.94043 15.0669L9.94811 24.0001Z"
          fill="#C5221F"
        ></path>{' '}
        <path
          d="M9.94014 8.52404L8.37646 7.39382C5.60179 5.91001 5 9.17692 5 9.17692V11.4651L9.94014 15.0667V8.52404Z"
          fill="#C5221F"
        ></path>{' '}
        <path
          d="M9.94043 8.52441V15.0671L9.94811 15.0734V8.53073L9.94043 8.52441Z"
          fill="#C5221F"
        ></path>{' '}
        <path
          d="M5 11.4668V22.6591C5.07646 23.8904 6.15673 24.0003 6.15673 24.0003H9.94877L9.94014 15.0671L5 11.4668Z"
          fill="#4285F4"
        ></path>{' '}
      </g>
    </svg>
  ),
  webhook: () => (
    <svg
      viewBox="0 0 24 24"
      height="100"
      width="100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.52 3.046a3 3 0 0 0-2.13 5.486 1 1 0 0 1 .306 1.38l-3.922 6.163a2 2 0 1 1-1.688-1.073l3.44-5.405a5 5 0 1 1 8.398-2.728 1 1 0 1 1-1.97-.348 3 3 0 0 0-2.433-3.475zM10 6a2 2 0 1 1 3.774.925l3.44 5.405a5 5 0 1 1-1.427 8.5 1 1 0 0 1 1.285-1.532 3 3 0 1 0 .317-4.83 1 1 0 0 1-1.38-.307l-3.923-6.163A2 2 0 0 1 10 6zm-5.428 6.9a1 1 0 0 1-.598 1.281A3 3 0 1 0 8.001 17a1 1 0 0 1 1-1h8.266a2 2 0 1 1 0 2H9.9a5 5 0 1 1-6.61-5.698 1 1 0 0 1 1.282.597Z"
          fill="#000000"
        ></path>{' '}
      </g>
    </svg>
  ),
  slack: () => (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <path
          d="M26.5002 14.9996C27.8808 14.9996 29 13.8804 29 12.4998C29 11.1192 27.8807 10 26.5001 10C25.1194 10 24 11.1193 24 12.5V14.9996H26.5002ZM19.5 14.9996C20.8807 14.9996 22 13.8803 22 12.4996V5.5C22 4.11929 20.8807 3 19.5 3C18.1193 3 17 4.11929 17 5.5V12.4996C17 13.8803 18.1193 14.9996 19.5 14.9996Z"
          fill="#2EB67D"
        ></path>{' '}
        <path
          d="M5.49979 17.0004C4.11919 17.0004 3 18.1196 3 19.5002C3 20.8808 4.1193 22 5.49989 22C6.8806 22 8 20.8807 8 19.5V17.0004H5.49979ZM12.5 17.0004C11.1193 17.0004 10 18.1197 10 19.5004V26.5C10 27.8807 11.1193 29 12.5 29C13.8807 29 15 27.8807 15 26.5V19.5004C15 18.1197 13.8807 17.0004 12.5 17.0004Z"
          fill="#E01E5A"
        ></path>{' '}
        <path
          d="M17.0004 26.5002C17.0004 27.8808 18.1196 29 19.5002 29C20.8808 29 22 27.8807 22 26.5001C22 25.1194 20.8807 24 19.5 24L17.0004 24L17.0004 26.5002ZM17.0004 19.5C17.0004 20.8807 18.1197 22 19.5004 22L26.5 22C27.8807 22 29 20.8807 29 19.5C29 18.1193 27.8807 17 26.5 17L19.5004 17C18.1197 17 17.0004 18.1193 17.0004 19.5Z"
          fill="#ECB22E"
        ></path>{' '}
        <path
          d="M14.9996 5.49979C14.9996 4.11919 13.8804 3 12.4998 3C11.1192 3 10 4.1193 10 5.49989C10 6.88061 11.1193 8 12.5 8L14.9996 8L14.9996 5.49979ZM14.9996 12.5C14.9996 11.1193 13.8803 10 12.4996 10L5.5 10C4.11929 10 3 11.1193 3 12.5C3 13.8807 4.11929 15 5.5 15L12.4996 15C13.8803 15 14.9996 13.8807 14.9996 12.5Z"
          fill="#36C5F0"
        ></path>{' '}
      </g>
    </svg>
  ),
  icecast: () => (
    <img
      src="/images/logo/icecast.png"
      height="100"
      width="100"
      alt="Icecast"
    ></img>
  ),
  airtime: () => (
    <img
      src="/images/logo/airtime.png"
      height="100"
      width="100"
      alt="Airtime"
    ></img>
  ),
  tonearm: () => (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
    >
      <defs>
        <mask id="globeOuterOnly">
          <path
            d="M214.309 48.8686V145.653L81.8245 236.092V278.138H214.309V428.868M280.658 428.868V332.083L413.142 241.645V199.599H280.658V48.8682"
            stroke="black"
            stroke-width="35"
          ></path>
        </mask>
      </defs>
      <path
        d="M214.309 48.8686V145.653L81.8245 236.092V278.138H214.309V428.868M280.658 428.868V332.083L413.142 241.645V199.599H280.658V48.8682"
        stroke="black"
        stroke-width="35"
      ></path>
    </svg>
  ),
  radioco: () => (
    <svg
      version="1.1"
      id="svg2"
      width="160.8"
      style={{ fill: 'red' }}
      height="178.41333"
      viewBox="0 0 160.8 178.41333"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs id="defs6" />
      <g id="g8" transform="matrix(1.3333333,0,0,-1.3333333,0,178.41333)">
        <g id="g10" transform="scale(0.1)">
          <path
            d="M 1073.8,989.852 810.84,1140.85 c -15.629,8.97 -35.121,-2.32 -35.121,-20.35 V 877.262 c 0,-8.399 4.484,-16.153 11.769,-20.332 l 50.946,-29.258 c 14.558,-8.359 23.543,-23.867 23.543,-40.664 l 0.015,-243.086 c 0,-16.797 -8.98,-32.305 -23.547,-40.672 L 626.301,381.434 c -14.465,-8.313 -32.254,-8.313 -46.715,0 L 367.523,503.238 c -14.558,8.36 -23.539,23.875 -23.539,40.664 l -0.015,243.067 c 0,16.804 8.996,32.324 23.574,40.683 l 51.086,29.286 c 7.289,4.183 11.785,11.945 11.785,20.355 v 243.367 c 0,18.03 -19.496,29.31 -35.129,20.33 L 132.117,989.82 C 102.992,973.094 85.0391,942.066 85.0391,908.48 l 0.0312,-486.082 c 0.0039,-33.585 17.9567,-64.609 47.0777,-81.339 L 556.188,97.5 c 28.925,-16.6211 64.5,-16.6211 93.425,0 l 424.217,243.59 c 29.13,16.726 47.1,47.754 47.09,81.348 l -0.03,486.074 c 0,33.586 -17.96,64.609 -47.09,81.34"
            id="path12"
          />
          <path
            d="m 763.93,771.383 -51.024,29.297 c -14.562,8.371 -23.547,23.879 -23.547,40.672 V 1183.5 c 0,16.81 -8.988,32.32 -23.574,40.68 l -39.539,22.68 c -14.461,8.29 -32.23,8.28 -46.683,-0.02 l -39.333,-22.59 c -14.562,-8.36 -23.535,-23.87 -23.535,-40.67 V 841.414 c 0,-16.789 -8.98,-32.309 -23.539,-40.664 l -51.14,-29.375 c -7.278,-4.184 -11.766,-11.937 -11.766,-20.332 l 0.008,-171.184 c 0,-8.386 4.492,-16.152 11.773,-20.332 l 149.242,-85.722 c 7.235,-4.16 16.129,-4.16 23.36,0 l 149.308,85.734 c 7.286,4.18 11.774,11.941 11.774,20.34 l -0.012,171.172 c 0,8.398 -4.492,16.152 -11.773,20.332"
            id="path14"
          />
        </g>
      </g>
    </svg>
  ),
};
