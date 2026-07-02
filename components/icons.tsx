import React from "react";

export function Favicon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M14.25 0.5H1.75C1.05964 0.5 0.5 1.05964 0.5 1.75V2.5V12.5C0.5 14.1569 1.84315 15.5 3.5 15.5H10.5C13.2614 15.5 15.5 13.2614 15.5 10.5V2.5V1.75C15.5 1.05964 14.9404 0.5 14.25 0.5Z"
        fill="var(--primary)"
        stroke="var(--primary)"
        strokeLinecap="square"
      />
      <rect x={1} y={1} width={2} height={2} rx={1} fill="var(--color-error)" />
      <rect x={4} y={1} width={2} height={2} rx={1} fill="var(--color-warning)" />
      <rect x={7} y={1} width={2} height={2} rx={1} fill="var(--color-success)" />
      <path
        d="M1 5C1 4.44771 1.44772 4 2 4H14C14.5523 4 15 4.44772 15 5V10C15 12.7614 12.7614 15 10 15H4C2.34315 15 1 13.6569 1 12V5Z"
        fill="var(--secondary)"
      />
      <path d="M11 11C11 12.6569 9.65685 14 8 14C6.34315 14 5 12.6569 5 11H11Z" fill="var(--secondary-foreground)" />
      <path
        d="M8.25 5.75L8.18837 5.82191C7.76694 6.31357 7.66158 7.00201 7.91666 7.59721V7.59721C8.12659 8.08705 8.09457 8.647 7.83016 9.10971L7.75 9.25"
        stroke="var(--secondary-foreground)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12.25 5.75L12.1559 5.85983C11.7625 6.3187 11.7002 6.97527 12 7.5V7.5C12.2998 8.02473 12.2375 8.6813 11.8441 9.14017L11.75 9.25"
        stroke="var(--secondary-foreground)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 1024 1024" width={16} height={16} fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
        transform="scale(64)"
        fill="currentColor"
      />
    </svg>
  );
}

export function LetterboxdIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <g clipPath="url(#clip0_284_61933)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.5 8C15.5 12.1421 12.1421 15.5 8 15.5C3.85786 15.5 0.5 12.1421 0.5 8C0.5 3.85786 3.85786 0.5 8 0.5C12.1421 0.5 15.5 3.85786 15.5 8ZM6.21654 9.11188C6.41837 8.78946 6.53503 8.40837 6.53503 8.00008C6.53503 7.59174 6.41835 7.21063 6.21649 6.88818C6.01462 7.21063 5.89795 7.59174 5.89795 8.00008C5.89795 8.4083 6.01456 8.78931 6.21632 9.1117C5.84483 9.70515 5.18479 10.0999 4.43244 10.0999C3.27134 10.0999 2.33008 9.1597 2.33008 7.9999C2.33008 6.8401 3.27134 5.8999 4.43244 5.8999C5.18482 5.8999 5.8449 6.29469 6.21637 6.88819C6.58785 6.29469 7.24792 5.8999 8.00031 5.8999C8.75237 5.8999 9.41219 6.29434 9.78376 6.88742C10.1553 6.29434 10.8151 5.8999 11.5672 5.8999C12.7283 5.8999 13.6696 6.8401 13.6696 7.9999C13.6696 9.1597 12.7283 10.0999 11.5672 10.0999C10.8151 10.0999 10.1553 9.70546 9.78376 9.11239C9.41219 9.70546 8.75237 10.0999 8.00031 10.0999C7.24804 10.0999 6.58805 9.70524 6.21654 9.11188ZM9.78387 6.88818C9.98574 7.21063 10.1024 7.59174 10.1024 8.00008C10.1024 8.40841 9.98574 8.78953 9.78387 9.11197C9.58201 8.78953 9.46533 8.40841 9.46533 8.00008C9.46533 7.59174 9.58201 7.21063 9.78387 6.88818Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_284_61933">
          <rect width="15" height="15" fill="white" transform="translate(0.5 0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function VercelIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 256 222" preserveAspectRatio="xMidYMid" {...props}>
      <path fill="currentColor" d="m128 0 128 221.705H0z" />
    </svg>
  );
}

export function EverfiIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 18 18" fill="currentcolor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M9.375 0C4.6095 0 0.75 3.8595 0.75 8.625C0.75 12.4418 3.219 15.6652 6.64725 16.8075C7.0785 16.8832 7.23975 16.6245 7.23975 16.398C7.23975 16.1933 7.22925 15.5145 7.22925 14.7915C5.0625 15.1905 4.50225 14.2635 4.32975 13.779C4.23225 13.5308 3.81225 12.765 3.44475 12.5602C3.14325 12.3982 2.712 11.9993 3.43425 11.9888C4.11375 11.9783 4.599 12.6142 4.761 12.873C5.53725 14.178 6.777 13.8105 7.27275 13.584C7.34775 13.0237 7.57425 12.6465 7.8225 12.4305C5.90325 12.2153 3.8985 11.4713 3.8985 8.172C3.8985 7.2345 4.23225 6.45825 4.782 5.8545C4.69575 5.6385 4.39425 4.75425 4.86825 3.5685C4.86825 3.5685 5.5905 3.342 7.2405 4.45275C7.9305 4.2585 8.66325 4.16175 9.39675 4.16175C10.1295 4.16175 10.863 4.25925 11.553 4.45275C13.203 3.3315 13.9245 3.5685 13.9245 3.5685C14.3993 4.75425 14.097 5.6385 14.0107 5.8545C14.5605 6.45825 14.895 7.22325 14.895 8.172C14.895 11.4818 12.879 12.2145 10.9598 12.4305C11.2725 12.7005 11.5417 13.218 11.5417 14.0265C11.5417 15.18 11.5312 16.107 11.5312 16.398C11.5312 16.6245 11.6933 16.8945 12.1238 16.8083C15.5318 15.6652 18 12.4305 18 8.625C18 3.8595 14.1405 0 9.375 0Z"></path>
    </svg>
  );
}

export function EverfiNewIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={16} height={16} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M22.4589 26.6838C20.2845 26.6838 18.716 25.3014 18.4413 23.0108H29.6983C29.6983 18.9486 27.1658 15 22.405 15C18.2205 15 15 18.2878 15 22.4C15 26.7676 18.1667 30 22.4602 30C25.8477 30 28.7639 27.927 29.5071 24.6108H26.0106C25.4344 25.9095 23.9749 26.6838 22.4602 26.6838H22.4589ZM22.4333 18.1757C24.2482 18.1757 25.4882 19.1716 25.9258 20.8014H18.6608C19.1832 19.1716 20.6144 18.1757 22.432 18.1757H22.4333Z"
        fill="#272763"
      />
      <path
        d="M11.6093 16.6844C11.6093 15.9119 10.9894 15.2864 10.2257 15.2879H7.30322L4.38071 15.2922C3.61701 15.2922 2.99856 15.9192 3 16.6916V19.6476L3.00432 22.6035C3.00432 23.3759 3.6242 24.0015 4.3879 24H7.31041L10.2329 23.9956C10.9966 23.9956 11.6151 23.3687 11.6136 22.5962V19.6403L11.6093 16.6844ZM17.893 7.40926C16.9135 6.83174 12.9023 5.54871 12.058 7.01358C11.4871 8.00422 10.2185 12.0614 11.6668 12.9153C12.6463 13.4928 16.6575 14.7758 17.5018 13.3109C18.0728 12.3203 19.3413 8.26316 17.893 7.40926ZM26.5569 4.63225C26.137 3.90491 25.4437 3.34049 24.5765 3.10919C23.7092 2.8779 22.829 3.02482 22.1099 3.44813C21.3908 3.8729 20.8327 4.57406 20.6041 5.45124C20.3754 6.32988 20.5206 7.21869 20.9392 7.94604C21.3577 8.67338 22.0524 9.2378 22.9196 9.4691C23.7883 9.70039 24.6671 9.55347 25.3862 9.13015C26.1053 8.70684 26.6634 8.00422 26.892 7.12705C27.1207 6.24841 26.9755 5.3596 26.5569 4.63225Z"
        fill="url(#paint0_linear_48_12928)"
      />
      <defs>
        <linearGradient id="paint0_linear_48_12928" x1="-0.968101" y1="27.2891" x2="38.3248" y2="-9.34053" gradientUnits="userSpaceOnUse">
          <stop offset="0.1" stopColor="#19A5CA" />
          <stop offset="0.19" stopColor="#2AAABD" />
          <stop offset="0.37" stopColor="#56B99B" />
          <stop offset="0.62" stopColor="#9ED166" />
          <stop offset="0.7" stopColor="#B9DA53" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" width={16} height={16} {...props}>
      <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path>
    </svg>
  );
}

export function BaseUiIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg aria-label="Base UI" viewBox="0 0 17 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
      <path d="M9.5 7.015A.477.477 0 0 0 9 7.5V23a8 8 0 0 0 .5-15.985ZM8 9.8V23c-4.418 0-8-3.94-8-8.8V1c4.418 0 8 3.94 8 8.8Z" />
    </svg>
  );
}

export function TailwindIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 54 33" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#tailwindcss__a)">
        <path
          fill="#38bdf8"
          fillRule="evenodd"
          d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="tailwindcss__a">
          <path fill="#fff" d="M0 0h54v32.4H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function NextJsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask height="180" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: "alpha" }}>
        <circle cx="90" cy="90" fill="var(--foreground)" r="90" />
      </mask>
      <g mask="url(#nextjs_icon_dark__:r8:mask0_408_134)" fill="currentColor">
        <circle cx="90" cy="90" data-circle="true" fill="var(--foreground)" r="90" />
        <path
          d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
          fill="url(#nextjs_icon_dark__:r8:paint0_linear_408_134)"
        />
        <rect fill="url(#nextjs_icon_dark__:r8:paint1_linear_408_134)" height="72" width="12" x="115" y="54" />
      </g>
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="nextjs_icon_dark__:r8:paint0_linear_408_134"
          x1="109"
          x2="144.5"
          y1="116.5"
          y2="160.5"
        >
          <stop stopColor="var(--background)" />
          <stop offset="1" stopColor="var(--background)" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="nextjs_icon_dark__:r8:paint1_linear_408_134"
          x1="121"
          x2="120.799"
          y1="54"
          y2="106.875"
        >
          <stop stopColor="var(--background)" />
          <stop offset="1" stopColor="var(--background)" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function ShadcnIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="none" d="M0 0h256v256H0z" />
      <path fill="none" stroke="currentColor" strokeWidth="25" strokeLinecap="round" d="M208 128l-80 80M192 40L40 192" />
    </svg>
  );
}

export function FigmaIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 54 80" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#figma__clip0_912_3)">
        <path
          d="M13.3333 80.0002C20.6933 80.0002 26.6667 74.0268 26.6667 66.6668V53.3335H13.3333C5.97333 53.3335 0 59.3068 0 66.6668C0 74.0268 5.97333 80.0002 13.3333 80.0002Z"
          fill="#0ACF83"
        />
        <path
          d="M0 39.9998C0 32.6398 5.97333 26.6665 13.3333 26.6665H26.6667V53.3332H13.3333C5.97333 53.3332 0 47.3598 0 39.9998Z"
          fill="#A259FF"
        />
        <path d="M0 13.3333C0 5.97333 5.97333 0 13.3333 0H26.6667V26.6667H13.3333C5.97333 26.6667 0 20.6933 0 13.3333Z" fill="#F24E1E" />
        <path
          d="M26.6667 0H40.0001C47.3601 0 53.3334 5.97333 53.3334 13.3333C53.3334 20.6933 47.3601 26.6667 40.0001 26.6667H26.6667V0Z"
          fill="#FF7262"
        />
        <path
          d="M53.3334 39.9998C53.3334 47.3598 47.3601 53.3332 40.0001 53.3332C32.6401 53.3332 26.6667 47.3598 26.6667 39.9998C26.6667 32.6398 32.6401 26.6665 40.0001 26.6665C47.3601 26.6665 53.3334 32.6398 53.3334 39.9998Z"
          fill="#1ABCFE"
        />
      </g>
      <defs>
        <clipPath id="figma__clip0_912_3">
          <rect width="53.3333" height="80" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function CodexIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" fillRule="evenodd" style={{ flex: "none", lineHeight: 1 }} viewBox="0 0 24 24" {...props}>
      <title>Codex</title>
      <path
        clipRule="evenodd"
        d="M8.086.457a6.105 6.105 0 013.046-.415c1.333.153 2.521.72 3.564 1.7a.117.117 0 00.107.029c1.408-.346 2.762-.224 4.061.366l.063.03.154.076c1.357.703 2.33 1.77 2.918 3.198.278.679.418 1.388.421 2.126a5.655 5.655 0 01-.18 1.631.167.167 0 00.04.155 5.982 5.982 0 011.578 2.891c.385 1.901-.01 3.615-1.183 5.14l-.182.22a6.063 6.063 0 01-2.934 1.851.162.162 0 00-.108.102c-.255.736-.511 1.364-.987 1.992-1.199 1.582-2.962 2.462-4.948 2.451-1.583-.008-2.986-.587-4.21-1.736a.145.145 0 00-.14-.032c-.518.167-1.04.191-1.604.185a5.924 5.924 0 01-2.595-.622 6.058 6.058 0 01-2.146-1.781c-.203-.269-.404-.522-.551-.821a7.74 7.74 0 01-.495-1.283 6.11 6.11 0 01-.017-3.064.166.166 0 00.008-.074.115.115 0 00-.037-.064 5.958 5.958 0 01-1.38-2.202 5.196 5.196 0 01-.333-1.589 6.915 6.915 0 01.188-2.132c.45-1.484 1.309-2.648 2.577-3.493.282-.188.55-.334.802-.438.286-.12.573-.22.861-.304a.129.129 0 00.087-.087A6.016 6.016 0 015.635 2.31C6.315 1.464 7.132.846 8.086.457zm-.804 7.85a.848.848 0 00-1.473.842l1.694 2.965-1.688 2.848a.849.849 0 001.46.864l1.94-3.272a.849.849 0 00.007-.854l-1.94-3.393zm5.446 6.24a.849.849 0 000 1.695h4.848a.849.849 0 000-1.696h-4.848z"
      />
    </svg>
  );
}

export function CursorIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg version="1.1" viewBox="0 0 466.73 532.09" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M457.43,125.94L244.42,2.96c-6.84-3.95-15.28-3.95-22.12,0L9.3,125.94c-5.75,3.32-9.3,9.46-9.3,16.11v247.99c0,6.65,3.55,12.79,9.3,16.11l213.01,122.98c6.84,3.95,15.28,3.95,22.12,0l213.01-122.98c5.75-3.32,9.3-9.46,9.3-16.11v-247.99c0-6.65-3.55-12.79-9.3-16.11h-.01ZM444.05,151.99l-205.63,356.16c-1.39,2.4-5.06,1.42-5.06-1.36v-233.21c0-4.66-2.49-8.97-6.53-11.31L24.87,145.67c-2.4-1.39-1.42-5.06,1.36-5.06h411.26c5.84,0,9.49,6.33,6.57,11.39h-.01Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ClipboardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path
        opacity="0.5"
        d="M12 3.26953C12.5973 3.61546 13 4.26007 13 5V12C13 13.1046 12.1046 14 11 14H5C3.89543 14 3 13.1046 3 12V5C3 4.26007 3.40267 3.61546 4 3.26953V3.45215C4.00002 3.71837 4.05328 4.09053 4.30078 4.43359C4.74057 5.04284 5.81625 6 8 6C10.1838 6 11.2594 5.04284 11.6992 4.43359C11.9467 4.09053 12 3.71837 12 3.45215V3.26953Z"
        fill="currentColor"
      />
      <path
        d="M11 2.83333V3.55935C11 3.63009 10.9854 3.69985 10.9479 3.75988C10.7591 4.0628 10.0121 5 8 5C5.98786 5 5.24094 4.0628 5.05208 3.75988C5.01465 3.69985 5 3.63009 5 3.55935V2.83333C5 2.55719 5.22386 2.33333 5.5 2.33333H6.05556C6.30102 2.33333 6.5 2.13435 6.5 1.88889C6.5 1.39797 6.89797 1 7.38889 1H8.61111C9.10203 1 9.5 1.39797 9.5 1.88889C9.5 2.13435 9.69898 2.33333 9.94444 2.33333H10.5C10.7761 2.33333 11 2.55719 11 2.83333Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CheckIconStraight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentcolor" width="10" height="10" viewBox="0 0 10 10" {...props}>
      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z"></path>
    </svg>
  );
}

export function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} strokeWidth="1.5">
      <path
        d="M2 6.98442L5.29634 9.93486C5.33132 9.96617 5.38739 9.95103 5.40391 9.90708C7.60044 4.06139 9.78662 2.2107 10 2"
        stroke="currentColor"
        strokeWidth="inherit"
        strokeLinecap="round"
      />
    </svg>
  );
}
export function CheckIcon2Line(props: React.ComponentProps<"svg">) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M3.75 8.75L7.4187 12.2568C7.45419 12.2907 7.51308 12.2755 7.52846 12.2289C8.83123 8.27977 10.6635 5.33649 12.25 3.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function GlobeIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M8 1.5C8.24513 1.5 8.52037 1.61408 8.81641 1.90625C9.11457 2.20054 9.40657 2.65081 9.66211 3.24707C10.1725 4.43793 10.5 6.1181 10.5 8C10.5 9.8819 10.1725 11.5621 9.66211 12.7529C9.40657 13.3492 9.11457 13.7995 8.81641 14.0938C8.52037 14.3859 8.24513 14.5 8 14.5C7.75487 14.5 7.47963 14.3859 7.18359 14.0938C6.88543 13.7995 6.59343 13.3492 6.33789 12.7529C5.82752 11.5621 5.5 9.8819 5.5 8C5.5 6.1181 5.82752 4.43793 6.33789 3.24707C6.59343 2.6508 6.88543 2.20054 7.18359 1.90625C7.47963 1.61408 7.75487 1.5 8 1.5Z"
        stroke="currentColor"
      />
      <path
        d="M12.6706 12.5205C11.4317 11.886 9.79474 11.5 8 11.5C6.20526 11.5 4.56828 11.886 3.32938 12.5205M12.6706 12.5205C13.8031 11.3507 14.5 9.75676 14.5 8C14.5 6.56023 14.0319 5.22978 13.2396 4.15257M12.6706 12.5205C11.489 13.7412 9.83309 14.5 8 14.5C6.16691 14.5 4.51104 13.7412 3.32938 12.5205M3.32938 12.5205C2.19692 11.3507 1.5 9.75676 1.5 8C1.5 6.56023 1.96811 5.22978 2.76045 4.15257M13.2396 4.15257C11.9572 4.97908 10.085 5.5 8 5.5C5.91496 5.5 4.04283 4.97908 2.76045 4.15257M13.2396 4.15257C12.0563 2.54393 10.1501 1.5 8 1.5C5.84992 1.5 3.94367 2.54393 2.76045 4.15257"
        stroke="currentColor"
      />
      <path d="M14 8.5H2" stroke="currentColor" />
    </svg>
  );
}

export function BoxArrowUpRightIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M3 7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H8.2C9.88016 3 10.7202 3 11.362 3.32698C11.9265 3.6146 12.3854 4.07354 12.673 4.63803C13 5.27976 13 6.11984 13 7.8V8.2C13 9.88016 13 10.7202 12.673 11.362C12.3854 11.9265 11.9265 12.3854 11.362 12.673C10.7202 13 9.88016 13 8.2 13H7.8C6.11984 13 5.27976 13 4.63803 12.673C4.07354 12.3854 3.6146 11.9265 3.32698 11.362C3 10.7202 3 9.88016 3 8.2V7.8Z"
        fill="currentColor"
        fillOpacity="0.4"
      />
      <path
        d="M10.25 5.75H6.75M10.25 5.75V9.25M10.25 5.75L5.75 10.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BoxArrowRightIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M3 7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H8.2C9.88016 3 10.7202 3 11.362 3.32698C11.9265 3.6146 12.3854 4.07354 12.673 4.63803C13 5.27976 13 6.11984 13 7.8V8.2C13 9.88016 13 10.7202 12.673 11.362C12.3854 11.9265 11.9265 12.3854 11.362 12.673C10.7202 13 9.88016 13 8.2 13H7.8C6.11984 13 5.27976 13 4.63803 12.673C4.07354 12.3854 3.6146 11.9265 3.32698 11.362C3 10.7202 3 9.88016 3 8.2V7.8Z"
        fill="currentColor"
        fillOpacity="0.4"
      />
      <path
        d="M11 7.99999L8.5 5.5M11 7.99999L8.5 10.5M11 7.99999H4.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowSvg(props: React.ComponentProps<"svg">) {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" {...props}>
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className="fill-popover"
      />
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        className="fill-border dark:fill-none"
      />
      <path
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
        className="dark:fill-black/90"
        transform="translate(0, -0.5)"
      />
      <path
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
        className="dark:fill-white/4 dark:in-data-[side=bottom]:fill-white/20"
      />
    </svg>
  );
}

export function InfoIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="9 7 13.13 13.13" fill="currentColor" {...props}>
      <path d="M15.563 20.127c3.6 0 6.57-2.97 6.57-6.564C22.133 9.971 19.156 7 15.557 7 11.964 7 9 9.97 9 13.563c0 3.593 2.97 6.564 6.563 6.564Zm0-1.308a5.231 5.231 0 0 1-5.243-5.256 5.225 5.225 0 0 1 5.237-5.249 5.246 5.246 0 0 1 5.262 5.25 5.238 5.238 0 0 1-5.256 5.255Zm-.038-7.401a.86.86 0 0 0 .87-.863.86.86 0 0 0-.87-.876.863.863 0 0 0-.863.876c0 .476.387.863.863.863Zm1.492 5.599c.286 0 .514-.204.514-.496a.499.499 0 0 0-.514-.488h-.704v-2.996c0-.381-.19-.635-.546-.635h-1.213a.493.493 0 0 0-.508.489c0 .292.223.501.508.501h.648v2.64h-.762a.497.497 0 0 0-.508.49.49.49 0 0 0 .508.495h2.577Z"></path>
    </svg>
  );
}

export function InfoIcon2(props: React.ComponentProps<"svg">) {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.07031 16.1406C6.95573 16.1406 5.91146 15.9297 4.9375 15.5078C3.96354 15.0911 3.10677 14.513 2.36719 13.7734C1.6276 13.0391 1.04688 12.1849 0.625 11.2109C0.208333 10.2318 0 9.1849 0 8.07031C0 6.95573 0.208333 5.91146 0.625 4.9375C1.04688 3.95833 1.6276 3.09896 2.36719 2.35938C3.10677 1.61979 3.96354 1.04167 4.9375 0.625C5.91146 0.208333 6.95573 0 8.07031 0C9.1849 0 10.2292 0.208333 11.2031 0.625C12.1823 1.04167 13.0417 1.61979 13.7812 2.35938C14.5208 3.09896 15.099 3.95833 15.5156 4.9375C15.9375 5.91146 16.1484 6.95573 16.1484 8.07031C16.1484 9.1849 15.9375 10.2318 15.5156 11.2109C15.099 12.1849 14.5208 13.0391 13.7812 13.7734C13.0417 14.513 12.1823 15.0911 11.2031 15.5078C10.2292 15.9297 9.1849 16.1406 8.07031 16.1406ZM8.07031 14.5469C8.96615 14.5469 9.80469 14.3776 10.5859 14.0391C11.3672 13.7057 12.0547 13.2422 12.6484 12.6484C13.2474 12.0547 13.7135 11.3672 14.0469 10.5859C14.3802 9.80469 14.5469 8.96615 14.5469 8.07031C14.5469 7.17448 14.3802 6.33594 14.0469 5.55469C13.7135 4.76823 13.2474 4.08073 12.6484 3.49219C12.0547 2.89844 11.3672 2.4349 10.5859 2.10156C9.80469 1.76302 8.96615 1.59375 8.07031 1.59375C7.17969 1.59375 6.34115 1.76302 5.55469 2.10156C4.77344 2.4349 4.08594 2.89844 3.49219 3.49219C2.89844 4.08073 2.43229 4.76823 2.09375 5.55469C1.76042 6.33594 1.59375 7.17448 1.59375 8.07031C1.59375 8.96615 1.76042 9.80469 2.09375 10.5859C2.43229 11.3672 2.89844 12.0547 3.49219 12.6484C4.08594 13.2422 4.77344 13.7057 5.55469 14.0391C6.34115 14.3776 7.17969 14.5469 8.07031 14.5469ZM6.70312 12.3594C6.52604 12.3594 6.3776 12.3047 6.25781 12.1953C6.14323 12.0807 6.08594 11.9375 6.08594 11.7656C6.08594 11.5938 6.14323 11.4531 6.25781 11.3438C6.3776 11.2292 6.52604 11.1719 6.70312 11.1719H7.63281V7.90625H6.84375C6.66667 7.90625 6.51823 7.85156 6.39844 7.74219C6.27865 7.6276 6.21875 7.48438 6.21875 7.3125C6.21875 7.14583 6.27865 7.00521 6.39844 6.89062C6.51823 6.77604 6.66667 6.71875 6.84375 6.71875H8.3125C8.53125 6.71875 8.69531 6.78906 8.80469 6.92969C8.91927 7.0651 8.97656 7.25 8.97656 7.48438V11.1719H9.84375C10.0208 11.1719 10.1667 11.2292 10.2812 11.3438C10.401 11.4531 10.4609 11.5938 10.4609 11.7656C10.4609 11.9375 10.401 12.0807 10.2812 12.1953C10.1667 12.3047 10.0208 12.3594 9.84375 12.3594H6.70312ZM8.02344 5.50781C7.73177 5.50781 7.48177 5.40625 7.27344 5.20312C7.07031 4.99479 6.96875 4.74479 6.96875 4.45312C6.96875 4.15625 7.07031 3.90625 7.27344 3.70312C7.48177 3.49479 7.73177 3.39062 8.02344 3.39062C8.3151 3.39062 8.5625 3.49479 8.76562 3.70312C8.97396 3.90625 9.07812 4.15625 9.07812 4.45312C9.07812 4.74479 8.97396 4.99479 8.76562 5.20312C8.5625 5.40625 8.3151 5.50781 8.02344 5.50781Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.25}
      />
    </svg>
  );
}

export function HelpIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="10" cy="10" r="5.375" stroke="currentColor" strokeWidth="1.25"></circle>
      <path
        d="M8.5 8.5C8.73 7.85 9.31 7.49 10 7.5C10.86 7.51 11.5 8.13 11.5 9C11.5 10.08 10 10.5 10 10.5V10.75"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <circle cx="10" cy="12.625" r="0.625" fill="currentColor"></circle>
    </svg>
  );
}

export function CheckIcon2(props: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="currentColor" {...props}>
      <path d="M7.146 16.97c.534 0 .956-.215 1.246-.655L16.89 3.169c.213-.326.3-.616.3-.89 0-.722-.527-1.234-1.26-1.234-.513 0-.82.176-1.133.665L7.109 13.893 3.17 8.903c-.293-.375-.61-.536-1.052-.536-.748 0-1.281.53-1.281 1.254 0 .316.108.615.375.934l4.698 5.796c.344.42.727.62 1.236.62Z"></path>
    </svg>
  );
}

export function CssIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 1000 1000" {...props} width="18" height="18">
      <path fill="#639" d="M0 0h840a160 160 0 0 1 160 160v680a160 160 0 0 1-160 160H160A160 160 0 0 1 0 840V0Z" />
      <path
        fill="#fff"
        d="M816.54 919.9c-32.39 0-57.16-9.42-74.5-28.35-17.15-19.03-26.08-46.18-26.88-81.64h69.8c.4 31.36 11.42 47.08 33.08 47.08 11.04 0 18.86-3.5 23.37-10.42 4.41-6.9 6.72-17.93 6.72-33.05 0-12.02-3.01-22.04-8.83-29.95a73.2 73.2 0 0 0-29.48-21.14L783.95 750c-23.06-11.02-39.81-24.04-50.14-39.27-10.03-15.13-15.04-36.36-15.04-63.5 0-30.36 8.83-55 26.37-73.94 18.05-18.93 42.62-28.34 74-28.34 30.3 0 53.76 9.31 70.3 27.84 16.85 18.64 25.67 45.28 26.38 80.14h-67.19c.4-11.4-1.9-22.72-6.72-33.06-3.8-7.6-11.23-11.41-22.26-11.41-19.65 0-29.48 11.71-29.48 35.05 0 11.83 2.4 21.04 7.22 28.05A65.18 65.18 0 0 0 822.76 689l24.77 10.92c25.57 11.72 44.02 26.05 55.35 43.38 11.43 17.23 17.05 40.27 17.05 69.12 0 34.56-9.03 61.1-27.38 79.63-18.25 18.53-43.62 27.85-76 27.85Zm-225.42 0c-32.4 0-57.16-9.42-74.51-28.35-17.15-19.03-26.07-46.18-26.87-81.64h69.79c.4 31.36 11.43 47.08 33.1 47.08 11.02 0 18.84-3.5 23.25-10.42 4.52-6.9 6.72-17.93 6.72-33.05 0-12.02-2.9-22.04-8.72-29.95a73.2 73.2 0 0 0-29.48-21.14L558.53 750c-23.07-11.02-39.81-24.04-50.14-39.27-10.03-15.13-15.04-36.36-15.04-63.5 0-30.36 8.82-55 26.37-73.94 18.05-18.93 42.62-28.34 74-28.34 30.29 0 53.75 9.31 70.2 27.84 17.05 18.64 25.77 45.28 26.47 80.14h-67.18c.4-11.4-1.9-22.72-6.72-33.06-3.81-7.6-11.23-11.41-22.26-11.41-19.66 0-29.49 11.71-29.49 35.05 0 11.83 2.41 21.04 7.22 28.05A65.18 65.18 0 0 0 597.33 689l24.77 10.92c25.57 11.72 44.02 26.05 55.36 43.38 11.33 17.23 17.04 40.27 17.04 69.12 0 34.56-9.12 61.1-27.37 79.63-18.25 18.53-43.62 27.85-76.01 27.85Zm-234.75 0c-31.7 0-56.86-8.62-75.51-25.85-18.65-17.12-27.88-42.87-27.88-76.93V648.83c0-33.85 9.83-59.5 29.48-77.13 19.96-17.43 46.13-26.24 78.52-26.24 31.39 0 56.15 9.01 74.5 26.84 18.56 17.93 27.88 44.58 27.88 80.14v13.32h-73.9v-12.92c0-13.72-3.01-23.84-8.83-30.45a26.46 26.46 0 0 0-21.66-10.32c-12.03 0-20.55 4.1-25.37 12.42a79.04 79.04 0 0 0-6.72 36.66v146.26c0 30.55 10.74 46.08 32.1 46.38 10.02 0 17.54-3.61 22.76-10.82a51.74 51.74 0 0 0 7.72-30.46V801.6h73.9v11.42c0 23.74-4.61 43.57-13.94 59.4a88.8 88.8 0 0 1-38.2 35.66 121.46 121.46 0 0 1-54.85 11.82Z"
      />
    </svg>
  );
}

export function GridIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 3a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-4a2 2 0 0 1 2 -2z" className="opacity-100" />
      <path d="M19 3a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-4a2 2 0 0 1 2 -2z" className="opacity-20" />
      <path d="M9 13a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-4a2 2 0 0 1 2 -2z" className="opacity-20" />
      <path d="M19 13a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-4a2 2 0 0 1 2 -2z" className="opacity-20" />
    </svg>
  );
}

export function ClipCornerIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x={1} y={1} width={22} height={22} rx={3} fill="currentColor" fillOpacity="0.1" />
      <path
        d="M21 4C13.7705 4 4 13.7628 4 20V4H21Z"
        fill="currentColor"
        stroke="currentColor"
        fillOpacity="0.5"
        strokeWidth={1}
        strokeLinejoin="round"
      />
      <rect x={18} y={2} width={4} height={4} rx={2} fill="var(--background)" stroke="var(--foreground)" strokeWidth={1} />
      <rect x={2} y={2} width={4} height={4} rx={2} fill="var(--background)" stroke="var(--foreground)" strokeWidth={1} />
      <rect x={2} y={18} width={4} height={4} rx={2} fill="var(--background)" stroke="var(--foreground)" strokeWidth={1} />
    </svg>
  );
}

export function MarkdownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 208 128" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="10"
        d="M15 5h178a10 10 0 0 1 10 10v98a10 10 0 0 1-10 10H15a10 10 0 0 1-10-10V15A10 10 0 0 1 15 5z"
      />
      <path fill="currentColor" d="M30 98V30h20l20 25 20-25h20v68H90V59L70 84 50 59v39H30zm125 0-30-33h20V30h20v35h20l-30 33z" />
    </svg>
  );
}

export function FolderIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        id="rect-folder"
        d="M3 5.5C3 4.67157 3.67157 4 4.5 4H6.75C7.22214 4 7.66672 4.22229 7.95 4.6L8.55 5.4C8.83328 5.77771 9.27786 6 9.75 6H15.5C16.3284 6 17 6.67157 17 7.5V14.5C17 15.3284 16.3284 16 15.5 16H4.5C3.67157 16 3 15.3284 3 14.5V5.5Z"
        fill="var(--foreground)"
      />
      <rect x="12" y="13" width="1" height="1" fill="var(--background)" />
      <rect x="7" y="13" width="1" height="1" fill="var(--background)" />
      <rect x="8" y="12" width="4" height="1" fill="var(--background)" />
      <rect x="7" y="8" width="1" height="2" fill="var(--background)" />
      <rect x="12" y="8" width="1" height="2" fill="var(--background)" />
    </svg>
  );
}

export function BatteryIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg width={16} height={16} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#clip0_202_54)">
        <path d="M12.5 37.5H75V62.5H12.5V37.5Z" fill="currentColor" />
        <path
          d="M12.5 25C9.18479 25 6.00537 26.317 3.66117 28.6612C1.31696 31.0054 0 34.1848 0 37.5L0 62.5C0 65.8152 1.31696 68.9946 3.66117 71.3388C6.00537 73.683 9.18479 75 12.5 75H75C78.3152 75 81.4946 73.683 83.8388 71.3388C86.183 68.9946 87.5 65.8152 87.5 62.5V37.5C87.5 34.1848 86.183 31.0054 83.8388 28.6612C81.4946 26.317 78.3152 25 75 25H12.5ZM75 31.25C76.6576 31.25 78.2473 31.9085 79.4194 33.0806C80.5915 34.2527 81.25 35.8424 81.25 37.5V62.5C81.25 64.1576 80.5915 65.7473 79.4194 66.9194C78.2473 68.0915 76.6576 68.75 75 68.75H12.5C10.8424 68.75 9.25268 68.0915 8.08058 66.9194C6.90848 65.7473 6.25 64.1576 6.25 62.5V37.5C6.25 35.8424 6.90848 34.2527 8.08058 33.0806C9.25268 31.9085 10.8424 31.25 12.5 31.25H75ZM100 50C100 52.4864 99.0123 54.871 97.2541 56.6291C95.496 58.3873 93.1114 59.375 90.625 59.375V40.625C93.1114 40.625 95.496 41.6127 97.2541 43.3709C99.0123 45.129 100 47.5136 100 50Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_202_54">
          <rect width={100} height={100} fill="red" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function PlayIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" {...props}>
      <path d="m14 22.5868v-9.1675c0-.9342.5631-1.4248 1.2609-1.4248.3849 0 .6266.0643.966.2728l7.4683 4.4023c.6617.3903 1.0191.7077 1.0191 1.3245 0 .6176-.3574.935-1.0191 1.3253l-7.4683 4.4023c-.3394.2084-.5811.2728-.966.2728-.6977 0-1.2609-.4727-1.2609-1.4077" />
    </svg>
  );
}

// prettier-ignore
export function GoogleIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg overflow="hidden" viewBox="0 0 268.152 273.883" {...props}><defs><linearGradient id="google__a"><stop offset={0} stopColor="#0fbc5c" /><stop offset={1} stopColor="#0cba65" /></linearGradient><linearGradient id="google__g"><stop offset=".231" stopColor="#0fbc5f" /><stop offset=".312" stopColor="#0fbc5f" /><stop offset=".366" stopColor="#0fbc5e" /><stop offset=".458" stopColor="#0fbc5d" /><stop offset=".54" stopColor="#12bc58" /><stop offset=".699" stopColor="#28bf3c" /><stop offset=".771" stopColor="#38c02b" /><stop offset=".861" stopColor="#52c218" /><stop offset=".915" stopColor="#67c30f" /><stop offset={1} stopColor="#86c504" /></linearGradient><linearGradient id="google__h"><stop offset=".142" stopColor="#1abd4d" /><stop offset=".248" stopColor="#6ec30d" /><stop offset=".312" stopColor="#8ac502" /><stop offset=".366" stopColor="#a2c600" /><stop offset=".446" stopColor="#c8c903" /><stop offset=".54" stopColor="#ebcb03" /><stop offset=".616" stopColor="#f7cd07" /><stop offset=".699" stopColor="#fdcd04" /><stop offset=".771" stopColor="#fdce05" /><stop offset=".861" stopColor="#ffce0a" /></linearGradient><linearGradient id="google__f"><stop offset=".316" stopColor="#ff4c3c" /><stop offset=".604" stopColor="#ff692c" /><stop offset=".727" stopColor="#ff7825" /><stop offset=".885" stopColor="#ff8d1b" /><stop offset={1} stopColor="#ff9f13" /></linearGradient><linearGradient id="google__b"><stop offset=".231" stopColor="#ff4541" /><stop offset=".312" stopColor="#ff4540" /><stop offset=".458" stopColor="#ff4640" /><stop offset=".54" stopColor="#ff473f" /><stop offset=".699" stopColor="#ff5138" /><stop offset=".771" stopColor="#ff5b33" /><stop offset=".861" stopColor="#ff6c29" /><stop offset={1} stopColor="#ff8c18" /></linearGradient><linearGradient id="google__d"><stop offset=".408" stopColor="#fb4e5a" /><stop offset={1} stopColor="#ff4540" /></linearGradient><linearGradient id="google__c"><stop offset=".132" stopColor="#0cba65" /><stop offset=".21" stopColor="#0bb86d" /><stop offset=".297" stopColor="#09b479" /><stop offset=".396" stopColor="#08ad93" /><stop offset=".477" stopColor="#0aa6a9" /><stop offset=".568" stopColor="#0d9cc6" /><stop offset=".667" stopColor="#1893dd" /><stop offset=".769" stopColor="#258bf1" /><stop offset=".859" stopColor="#3086ff" /></linearGradient><linearGradient id="google__e"><stop offset=".366" stopColor="#ff4e3a" /><stop offset=".458" stopColor="#ff8a1b" /><stop offset=".54" stopColor="#ffa312" /><stop offset=".616" stopColor="#ffb60c" /><stop offset=".771" stopColor="#ffcd0a" /><stop offset=".861" stopColor="#fecf0a" /><stop offset=".915" stopColor="#fecf08" /><stop offset={1} stopColor="#fdcd01" /></linearGradient><linearGradient xlinkHref="#google__a" id="google__s" x1="219.7" x2="254.467" y1="329.535" y2="329.535" gradientUnits="userSpaceOnUse" /><radialGradient xlinkHref="#google__b" id="google__m" cx="109.627" cy="135.862" r="71.46" fx="109.627" fy="135.862" gradientTransform="matrix(-1.93688 1.043 1.45573 2.55542 290.525 -400.634)" gradientUnits="userSpaceOnUse" /><radialGradient xlinkHref="#google__c" id="google__n" cx="45.259" cy="279.274" r="71.46" fx="45.259" fy="279.274" gradientTransform="matrix(-3.5126 -4.45809 -1.69255 1.26062 870.8 191.554)" gradientUnits="userSpaceOnUse" /><radialGradient xlinkHref="#google__d" id="google__l" cx="304.017" cy="118.009" r="47.854" fx="304.017" fy="118.009" gradientTransform="matrix(2.06435 0 0 2.59204 -297.679 -151.747)" gradientUnits="userSpaceOnUse" /><radialGradient xlinkHref="#google__e" id="google__o" cx="181.001" cy="177.201" r="71.46" fx="181.001" fy="177.201" gradientTransform="matrix(-.24858 2.08314 2.96249 .33417 -255.146 -331.164)" gradientUnits="userSpaceOnUse" /><radialGradient xlinkHref="#google__f" id="google__p" cx="207.673" cy="108.097" r="41.102" fx="207.673" fy="108.097" gradientTransform="matrix(-1.2492 1.34326 -3.89684 -3.4257 880.501 194.905)" gradientUnits="userSpaceOnUse" /><radialGradient xlinkHref="#google__g" id="google__r" cx="109.627" cy="135.862" r="71.46" fx="109.627" fy="135.862" gradientTransform="matrix(-1.93688 -1.043 1.45573 -2.55542 290.525 838.683)" gradientUnits="userSpaceOnUse" /><radialGradient xlinkHref="#google__h" id="google__j" cx="154.87" cy="145.969" r="71.46" fx="154.87" fy="145.969" gradientTransform="matrix(-.0814 -1.93722 2.92674 -.11625 -215.135 632.86)" gradientUnits="userSpaceOnUse" /><filter id="google__q" width="1.097" height="1.116" x="-.048" y="-.058" colorInterpolationFilters="sRGB"><feGaussianBlur stdDeviation="1.701" /></filter><filter id="google__k" width="1.033" height="1.02" x="-.017" y="-.01" colorInterpolationFilters="sRGB"><feGaussianBlur stdDeviation=".242" /></filter><clipPath id="google__i" clipPathUnits="userSpaceOnUse"><path d="M371.378 193.24H237.083v53.438h77.167c-1.241 7.563-4.026 15.003-8.105 21.786-4.674 7.773-10.451 13.69-16.373 18.196-17.74 13.498-38.42 16.258-52.783 16.258-36.283 0-67.283-23.286-79.285-54.928-.484-1.149-.805-2.335-1.197-3.507a81.115 81.115 0 0 1-4.101-25.448c0-9.226 1.569-18.057 4.43-26.398 11.285-32.897 42.985-57.467 80.179-57.467 7.481 0 14.685.884 21.517 2.648a77.668 77.668 0 0 1 33.425 18.25l40.834-39.712c-24.839-22.616-57.219-36.32-95.844-36.32-30.878 0-59.386 9.553-82.748 25.7-18.945 13.093-34.483 30.625-44.97 50.985-9.753 18.879-15.094 39.8-15.094 62.294 0 22.495 5.35 43.633 15.103 62.337v.126c10.302 19.857 25.368 36.954 43.678 49.988 15.997 11.386 44.68 26.551 84.031 26.551 22.63 0 42.687-4.051 60.375-11.644 12.76-5.478 24.065-12.622 34.301-21.804 13.525-12.132 24.117-27.139 31.347-44.404 7.23-17.265 11.097-36.79 11.097-57.957 0-9.858-.998-19.87-2.689-28.968Z" /></clipPath></defs><g clipPath="url(#google__i)" transform="matrix(.95792 0 0 .98525 -90.174 -78.856)"><path fill="url(#google__j)" d="M92.076 219.958c.148 22.14 6.501 44.983 16.117 63.424v.127c6.949 13.392 16.445 23.97 27.26 34.452l65.327-23.67c-12.36-6.235-14.246-10.055-23.105-17.026-9.054-9.066-15.802-19.473-20.004-31.677h-.17l.17-.127c-2.765-8.058-3.037-16.613-3.14-25.503Z" filter="url(#google__k)" /><path fill="url(#google__l)" d="M237.083 79.025c-6.456 22.526-3.988 44.421 0 57.161 7.457.006 14.64.888 21.45 2.647a77.662 77.662 0 0 1 33.424 18.25l41.88-40.726c-24.81-22.59-54.667-37.297-96.754-37.332Z" filter="url(#google__k)" /><path fill="url(#google__m)" d="M236.943 78.847c-31.67 0-60.91 9.798-84.871 26.359a145.533 145.533 0 0 0-24.332 21.15c-1.904 17.744 14.257 39.551 46.262 39.37 15.528-17.936 38.495-29.542 64.056-29.542l.07.002-1.044-57.335c-.048 0-.093-.004-.14-.004Z" filter="url(#google__k)" /><path fill="url(#google__n)" d="m341.475 226.379-28.268 19.285c-1.24 7.562-4.028 15.002-8.107 21.786-4.674 7.772-10.45 13.69-16.373 18.196-17.702 13.47-38.328 16.244-52.687 16.255-14.842 25.102-17.444 37.675 1.043 57.934 22.877-.016 43.157-4.117 61.046-11.796 12.931-5.551 24.388-12.792 34.761-22.097 13.706-12.295 24.442-27.503 31.769-45 7.327-17.497 11.245-37.282 11.245-58.734Z" filter="url(#google__k)" /><path fill="#3086ff" d="M234.996 191.21v57.498h136.006c1.196-7.874 5.152-18.064 5.152-26.5 0-9.858-.996-21.899-2.687-30.998Z" filter="url(#google__k)" /><path fill="url(#google__o)" d="M128.39 124.327c-8.394 9.119-15.564 19.326-21.249 30.364-9.753 18.879-15.094 41.83-15.094 64.324 0 .317.026.627.029.944 4.32 8.224 59.666 6.649 62.456 0-.004-.31-.039-.613-.039-.924 0-9.226 1.57-16.026 4.43-24.367 3.53-10.289 9.056-19.763 16.123-27.926 1.602-2.031 5.875-6.397 7.121-9.016.475-.997-.862-1.557-.937-1.908-.083-.393-1.876-.077-2.277-.37-1.275-.929-3.8-1.414-5.334-1.845-3.277-.921-8.708-2.953-11.725-5.06-9.536-6.658-24.417-14.612-33.505-24.216Z" filter="url(#google__k)" /><path fill="url(#google__p)" d="M162.099 155.857c22.112 13.301 28.471-6.714 43.173-12.977l-25.574-52.664a144.74 144.74 0 0 0-26.543 14.504c-12.316 8.512-23.192 18.9-32.176 30.72Z" filter="url(#google__q)" /><path fill="url(#google__r)" d="M171.099 290.222c-29.683 10.641-34.33 11.023-37.062 29.29a144.806 144.806 0 0 0 16.792 13.984c15.996 11.386 46.766 26.551 86.118 26.551.046 0 .09-.004.137-.004v-59.157l-.094.002c-14.736 0-26.512-3.843-38.585-10.527-2.977-1.648-8.378 2.777-11.123.799-3.786-2.729-12.9 2.35-16.183-.938Z" filter="url(#google__k)" /><path fill="url(#google__s)" d="M219.7 299.023v59.996c5.506.64 11.236 1.028 17.247 1.028 6.026 0 11.855-.307 17.52-.872v-59.748a105.119 105.119 0 0 1-17.477 1.461c-5.932 0-11.7-.686-17.29-1.865Z" filter="url(#google__k)" opacity=".5" /></g></svg>
  );
}

export function MetaIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg preserveAspectRatio="xMidYMid" viewBox="0 0 256 171" width={16} height={16} {...props}>
      <defs>
        <linearGradient id="meta__a" x1="13.878%" x2="89.144%" y1="55.934%" y2="58.694%">
          <stop offset="0%" stopColor="#0064E1" />
          <stop offset="40%" stopColor="#0064E1" />
          <stop offset="83%" stopColor="#0073EE" />
          <stop offset="100%" stopColor="#0082FB" />
        </linearGradient>
        <linearGradient id="meta__b" x1="54.315%" x2="54.315%" y1="82.782%" y2="39.307%">
          <stop offset="0%" stopColor="#0082FB" />
          <stop offset="100%" stopColor="#0064E0" />
        </linearGradient>
      </defs>
      <path
        fill="#0081FB"
        d="M27.651 112.136c0 9.775 2.146 17.28 4.95 21.82 3.677 5.947 9.16 8.466 14.751 8.466 7.211 0 13.808-1.79 26.52-19.372 10.185-14.092 22.186-33.874 30.26-46.275l13.675-21.01c9.499-14.591 20.493-30.811 33.1-41.806C161.196 4.985 172.298 0 183.47 0c18.758 0 36.625 10.87 50.3 31.257C248.735 53.584 256 81.707 256 110.729c0 17.253-3.4 29.93-9.187 39.946-5.591 9.686-16.488 19.363-34.818 19.363v-27.616c15.695 0 19.612-14.422 19.612-30.927 0-23.52-5.484-49.623-17.564-68.273-8.574-13.23-19.684-21.313-31.907-21.313-13.22 0-23.859 9.97-35.815 27.75-6.356 9.445-12.882 20.956-20.208 33.944l-8.066 14.289c-16.203 28.728-20.307 35.271-28.408 46.07-14.2 18.91-26.324 26.076-42.287 26.076-18.935 0-30.91-8.2-38.325-20.556C2.973 139.413 0 126.202 0 111.148l27.651.988Z"
      />
      <path
        fill="url(#meta__a)"
        d="M21.802 33.206C34.48 13.666 52.774 0 73.757 0 85.91 0 97.99 3.597 110.605 13.897c13.798 11.261 28.505 29.805 46.853 60.368l6.58 10.967c15.881 26.459 24.917 40.07 30.205 46.49 6.802 8.243 11.565 10.7 17.752 10.7 15.695 0 19.612-14.422 19.612-30.927l24.393-.766c0 17.253-3.4 29.93-9.187 39.946-5.591 9.686-16.488 19.363-34.818 19.363-11.395 0-21.49-2.475-32.654-13.007-8.582-8.083-18.615-22.443-26.334-35.352l-22.96-38.352C118.528 64.08 107.96 49.73 101.845 43.23c-6.578-6.988-15.036-15.428-28.532-15.428-10.923 0-20.2 7.666-27.963 19.39L21.802 33.206Z"
      />
      <path
        fill="url(#meta__b)"
        d="M73.312 27.802c-10.923 0-20.2 7.666-27.963 19.39-10.976 16.568-17.698 41.245-17.698 64.944 0 9.775 2.146 17.28 4.95 21.82L9.027 149.482C2.973 139.413 0 126.202 0 111.148 0 83.772 7.514 55.24 21.802 33.206 34.48 13.666 52.774 0 73.757 0l-.445 27.802Z"
      />
    </svg>
  );
}

export function KrogerIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 95.1 74.1" {...props} fill="light-dark(#084999, #418fde)" width={12} height={12}>
      <g>
        <path
          className="st0"
          d="M36.4,67.8c0,3.4-2.9,6.2-6.3,6.1c-3.4,0-6.2-2.9-6.1-6.3c0-3.4,2.8-6.1,6.2-6.1
		C33.6,61.5,36.4,64.3,36.4,67.8C36.4,67.7,36.4,67.8,36.4,67.8z"
        ></path>
        <ellipse className="st0" cx="81.6" cy="67.8" rx="6.2" ry="6.3"></ellipse>
        <path
          className="st0"
          d="M29.8,26.5c0-0.4,0.1-0.8,0.3-1.1c0.3-0.3,0.7-0.5,1.1-0.5h16.9c0.5,0,1,0.3,1.2,0.7c0.3,0.4,0.3,1,0,1.4
		l-8.7,15.2c-0.4,0.7-1.2,0.9-1.9,0.6c0,0,0,0,0,0c-0.1,0-0.2-0.1-0.2-0.2c-4.6-4-7.7-9.5-8.6-15.5C29.9,27,29.8,26.7,29.8,26.5z
		 M57.1,48.6c-4.1,0.4-8.3-0.3-12.1-1.9c-0.4-0.2-0.7-0.5-0.8-0.9c-0.1-0.4-0.1-0.8,0.1-1.2L54.3,27c0.4-0.7,1.2-0.9,1.9-0.5
		c0.2,0.1,0.4,0.3,0.5,0.5l9.7,17.1c0.4,0.7,0.2,1.6-0.5,1.9c0,0-0.1,0-0.1,0C63.2,47.5,60.2,48.3,57.1,48.6L57.1,48.6z M74.1,39.5
		c-0.6,0.8-1.3,1.5-2,2.1c-0.3,0.3-0.7,0.5-1.2,0.4c-0.4-0.1-0.8-0.3-1-0.7L61.8,27c-0.3-0.4-0.3-1,0-1.4c0.2-0.4,0.7-0.7,1.2-0.7
		h15.3c0.4,0,0.8,0.2,1.1,0.5c0.3,0.3,0.4,0.7,0.3,1.1C79.2,31.3,77.2,35.8,74.1,39.5L74.1,39.5z"
        ></path>
        <path
          className="st0"
          d="M84.8,24.9c-1,14.5-12.3,26.7-27.1,28c-16.4,1.5-31-10.8-32.5-27.4C23.8,10.5,14.2,0.7,0,0v10.5
		c8.8,0.6,14.1,6.3,15,16c1.9,21.1,19.5,37,40,37c1.2,0,2.5-0.1,3.7-0.2c20.1-1.9,35.4-18.6,36.4-38.4L84.8,24.9z"
        ></path>
      </g>
    </svg>
  );
}

export function TruistIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 55 55" width={12} height={12} {...props}>
      <g>
        <g id="svg_1">
          <g id="truist-logo">
            <g id="global_x2F_truist-logo--purple">
              <path
                className="fill-current"
                id="tru_lg_hrz_rgb_pos"
                d="M50.4,50.4V30.2h-14v10h-5.3V14.8h5.3v10h14V4.6H4.6v20.2h14v-10h5.3v25.4h-5.3&#10;&#9;&#9;&#9;&#9;&#9;v-10h-14v20.2H50.4z M0,50V5c0-3.1,1.9-5,5-5H50c3.1,0,5,1.9,5,5V50c0,3.1-1.9,5-5,5H5C1.9,55,0,53.1,0,50z"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export function BeyondMeatIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 257 257" width={16} height={16} {...props} fill="#6bc746">
      <g transform="matrix(.13333333 0 0 -.13333333 -352.63 424.27)">
        <path d="m4224.35 2206.98-3.24-.3c-9.09-.84-18.24-1.48-27.41-1.9-.47-.02-.94-.04-1.43-.06-4.06-.17-8.12-.32-12.17-.42-4.63-.1-9.28-.16-13.98-.16-.16 0-.32.01-.48.01-5.25 0-10.55.1-15.88.27-1.08.03-2.15.1-3.23.14-4.66.18-9.33.41-14.02.71-.77.05-1.54.12-2.32.17-11.25.79-22.59 1.92-33.95 3.44l-1.08.15-.91.06c-57.7 7.84-111.72 24.18-163.46 43.15-.2.08-.4.16-.6.24-6.53 2.58-13.05 5.23-19.63 7.91-13.81 5.68-27.59 11.47-41.37 17.25-47.32 19.89-96.26 40.45-146.57 56.3-37.85 11.94-76.61 18.3-115.2 19.05-.98.03-1.97.03-2.96.07-.32 0-.64.03-.96.03h-.29c-18.48.55-37.08-.42-55.88-3.27-21.48-2.69-43.22-7.11-65.09-13.2 6.51 8.22 12.94 16.54 19.21 24.96 11.89 15.92 21.21 36.06 28.48 61.55 2.58 9 8.56 29.96 1.22 50.71 1.4 1.27 2.77 2.57 4.18 3.83 11.9 7.66 22.56 16.46 31.98 26.45 35.58 27.19 74.58 49.91 116.36 67.21 64.28 26.59 141.92 43.79 229.69 34.95 233.02-23.49 322.83-72.96 487.12 108.7-165.45 262.58-457.93 437.08-791.22 437.08-373.88 0-696.43-219.58-845.86-536.79 41.21-39.82 124-79.35 285.46-43.08 32.19 17.42 69.01 27.33 108.18 27.33 39.12 0 75.94-9.86 108.13-27.33 279.43-62.77 323.55 101.41 323.55 101.41 0-116.18-46.36-167.4-116.64-188.74 6.03-2.35 11.06-4.75 15.14-7.38 14.99-9.58 17.63-22.09 10.98-45.29-5.08-17.79-12.26-36.24-23.19-50.88-26.7-35.83-56.18-69.63-84.57-104.22-.14-.27-.29-.13-.2-.93.6-5.78 5.51-8.66 10.78-6.2 1.54.72 3.06 1.45 4.57 2.18 47.8 23.11 96.57 38.76 146.14 44.95 17.01 2.15 34.14 3.17 51.39 2.97 36.12-.33 72.69-5.99 109.59-17.63 63.14-19.89 123.94-47.38 185.31-72.6 6.69-2.72 13.37-5.45 20.06-8.08 56.09-22.42 113.09-41.53 173.8-45.61 24.1-3.22 48.82-5.04 74.25-5.04 19.98 0 43.51.95 62.2 2.69.21-42.4.16-84.79 0-127.08v-417c.95-24.52-18.98-44.94-43.79-44.32-22.49.54-40.36 19.35-41.6 41.8l-2.81 50.32c-10.86 81.64-33.27 159.11-70.16 237.9-13.87-43.96-27.33-86.63-40.58-128.77-13.29-42.1-26.37-83.62-39.45-125.19l-14.61-49.15c-6.2-20.81-28.98-33.18-51.27-24.48-15.39 6.06-24.6 21.96-23.27 38.43 0 0 25.25 207.94 13.49 317.56-106.44-67.45-222.3-93.77-346.24-95.83-3.22-74.8-6.36-143.37-9.62-218.95v-4.67c0-23.14-19.77-41.51-43.13-39.44-18.78 1.68-33.43 17.12-35.86 35.77l-9.17 65.61c-7.89 50.6-15.68 100.75-23.48 150.82h-5.33c-6.81-48.59-13.62-97.25-20.59-146.81l-8.26-68.03c-2.76-22.82-24.14-39.13-47.5-34.91-18.91 3.39-32.44 20.3-33.17 39.5l-3.23 79.61c-2.61 54.11-5.21 107.43-8.14 160.72-.33 5.66-5.12 11.26-8.54 16.47-.17.25-.33.51-.5.76-31.78 48.08-56.26 100.6-72.75 155.82-11.97 40.09-25.75 86.46-34.89 117.84 30.5 11.81 59.07 34.59 63.03 41.19 4 6.62-4.05 13.84-11.93 9.13-9-5.66-33.85-15.8-45.61-16.8-28.02-2.39-56.38-1.44-84.57-1.08-34.5.46-56.09 22.79-57.33 57.3-.49 14.28.54 29.72-4.46 42.55-20.63 52.91-35.36 106.94-36.36 164.02-.2 11.11-3.75 15.93-11.55 17.42-21.51-.74-42.6-1.2-62.9-.9-95.48 1.41-174.78 19.12-208.88 98.57-44.21-108.65-68.63-227.47-68.63-352 0-516.14 418.42-934.56 934.57-934.56 516.14 0 934.56 418.42 934.56 934.56 0 41.22-2.69 81.8-7.87 121.61-67.94-56.83-171.6-118.36-311.6-132.12" />
      </g>
    </svg>
  );
}

export function LetterboxdLogo(props: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" version="1.1" className="opacity-100!" {...props}>
      <defs>
        <rect id="path-1" x="0" y="0" width="129.847328" height="141.389313" />
        <rect id="path-3" x="0" y="0" width="129.847328" height="141.389313" />
      </defs>
      <g id="letterboxd-decal-dots-pos-rgb" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <circle id="Circle" fill="#202830" cx="250" cy="250" r="250" />
        <g id="dots-neg" transform="translate(61.000000, 180.000000)">
          <g id="Dots">
            <ellipse id="Green" fill="#00E054" cx="189" cy="69.9732824" rx="70.0786517" ry="69.9732824" />
            <g id="Blue" transform="translate(248.152672, 0.000000)">
              <mask id="mask-2" fill="white">
                <use xlinkHref="#path-1" />
              </mask>
              <g id="Mask" />
              <ellipse fill="#40BCF4" mask="url(#mask-2)" cx="59.7686766" cy="69.9732824" rx="70.0786517" ry="69.9732824" />
            </g>
            <g id="Orange">
              <mask id="mask-4" fill="white">
                <use xlinkHref="#path-3" />
              </mask>
              <g id="Mask" />
              <ellipse fill="#FF8000" mask="url(#mask-4)" cx="70.0786517" cy="69.9732824" rx="70.0786517" ry="69.9732824" />
            </g>
            <path
              d="M129.539326,107.022244 C122.810493,96.2781677 118.921348,83.5792213 118.921348,69.9732824 C118.921348,56.3673435 122.810493,43.6683972 129.539326,32.9243209 C136.268159,43.6683972 140.157303,56.3673435 140.157303,69.9732824 C140.157303,83.5792213 136.268159,96.2781677 129.539326,107.022244 Z"
              id="Overlap"
              fill="#FFFFFF"
            />
            <path
              d="M248.460674,32.9243209 C255.189507,43.6683972 259.078652,56.3673435 259.078652,69.9732824 C259.078652,83.5792213 255.189507,96.2781677 248.460674,107.022244 C241.731841,96.2781677 237.842697,83.5792213 237.842697,69.9732824 C237.842697,56.3673435 241.731841,43.6683972 248.460674,32.9243209 Z"
              id="Overlap"
              fill="#FFFFFF"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
