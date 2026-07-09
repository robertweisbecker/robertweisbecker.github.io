import React from "react";
import { cn } from "@/lib/utils";

export function Favicon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M14.25 0.5H1.75C1.06 0.5 0.5 1.06 0.5 1.75V2.5V12.5C0.5 14.16 1.84 15.5 3.5 15.5H10.5C13.26 15.5 15.5 13.26 15.5 10.5V2.5V1.75C15.5 1.06 14.94 0.5 14.25 0.5Z"
        fill="var(--primary)"
        stroke="var(--primary)"
        strokeLinecap="square"
      />
      <rect x={1} y={1} width={2} height={2} rx={1} fill="var(--error-400)" />
      <rect x={4} y={1} width={2} height={2} rx={1} fill="var(--warning-400)" />
      <rect x={7} y={1} width={2} height={2} rx={1} fill="var(--success-400)" />
      <path
        d="M1 5C1 4.45 1.45 4 2 4H14C14.55 4 15 4.45 15 5V10C15 12.76 12.76 15 10 15H4C2.34 15 1 13.66 1 12V5Z"
        fill="var(--secondary)"
      />
      <path d="M11 11C11 12.66 9.66 14 8 14C6.34 14 5 12.66 5 11H11Z" fill="var(--secondary-foreground)" />
      <path
        d="M8.25 5.75L8.19 5.82C7.77 6.31 7.66 7 7.92 7.6V7.6C8.13 8.09 8.09 8.65 7.83 9.11L7.75 9.25"
        stroke="var(--secondary-foreground)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12.25 5.75L12.16 5.86C11.76 6.32 11.7 6.98 12 7.5V7.5C12.3 8.02 12.24 8.68 11.84 9.14L11.75 9.25"
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
          d="M15.5 8C15.5 12.14 12.14 15.5 8 15.5C3.86 15.5 0.5 12.14 0.5 8C0.5 3.86 3.86 0.5 8 0.5C12.14 0.5 15.5 3.86 15.5 8ZM6.22 9.11C6.42 8.79 6.54 8.41 6.54 8C6.54 7.59 6.42 7.21 6.22 6.89C6.01 7.21 5.9 7.59 5.9 8C5.9 8.41 6.01 8.79 6.22 9.11C5.84 9.71 5.18 10.1 4.43 10.1C3.27 10.1 2.33 9.16 2.33 8C2.33 6.84 3.27 5.9 4.43 5.9C5.18 5.9 5.84 6.29 6.22 6.89C6.59 6.29 7.25 5.9 8 5.9C8.75 5.9 9.41 6.29 9.78 6.89C10.16 6.29 10.82 5.9 11.57 5.9C12.73 5.9 13.67 6.84 13.67 8C13.67 9.16 12.73 10.1 11.57 10.1C10.82 10.1 10.16 9.71 9.78 9.11C9.41 9.71 8.75 10.1 8 10.1C7.25 10.1 6.59 9.71 6.22 9.11ZM9.78 6.89C9.99 7.21 10.1 7.59 10.1 8C10.1 8.41 9.99 8.79 9.78 9.11C9.58 8.79 9.47 8.41 9.47 8C9.47 7.59 9.58 7.21 9.78 6.89Z"
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
      <path d="M9.38 0C4.61 0 0.75 3.86 0.75 8.63C0.75 12.44 3.22 15.67 6.65 16.81C7.08 16.88 7.24 16.62 7.24 16.4C7.24 16.19 7.23 15.51 7.23 14.79C5.06 15.19 4.5 14.26 4.33 13.78C4.23 13.53 3.81 12.77 3.44 12.56C3.14 12.4 2.71 12 3.43 11.99C4.11 11.98 4.6 12.61 4.76 12.87C5.54 14.18 6.78 13.81 7.27 13.58C7.35 13.02 7.57 12.65 7.82 12.43C5.9 12.22 3.9 11.47 3.9 8.17C3.9 7.23 4.23 6.46 4.78 5.85C4.7 5.64 4.39 4.75 4.87 3.57C4.87 3.57 5.59 3.34 7.24 4.45C7.93 4.26 8.66 4.16 9.4 4.16C10.13 4.16 10.86 4.26 11.55 4.45C13.2 3.33 13.92 3.57 13.92 3.57C14.4 4.75 14.1 5.64 14.01 5.85C14.56 6.46 14.89 7.22 14.89 8.17C14.89 11.48 12.88 12.21 10.96 12.43C11.27 12.7 11.54 13.22 11.54 14.03C11.54 15.18 11.53 16.11 11.53 16.4C11.53 16.62 11.69 16.89 12.12 16.81C15.53 15.67 18 12.43 18 8.63C18 3.86 14.14 0 9.38 0Z"></path>
    </svg>
  );
}

export function EverfiNewIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={16} height={16} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M22.46 26.68C20.28 26.68 18.72 25.3 18.44 23.01H29.7C29.7 18.95 27.17 15 22.41 15C18.22 15 15 18.29 15 22.4C15 26.77 18.17 30 22.46 30C25.85 30 28.76 27.93 29.51 24.61H26.01C25.43 25.91 23.97 26.68 22.46 26.68H22.46ZM22.43 18.18C24.25 18.18 25.49 19.17 25.93 20.8H18.66C19.18 19.17 20.61 18.18 22.43 18.18H22.43Z"
        fill="#272763"
      />
      <path
        d="M11.61 16.68C11.61 15.91 10.99 15.29 10.23 15.29H7.3L4.38 15.29C3.62 15.29 3 15.92 3 16.69V19.65L3 22.6C3 23.38 3.62 24 4.39 24H7.31L10.23 24C11 24 11.62 23.37 11.61 22.6V19.64L11.61 16.68ZM17.89 7.41C16.91 6.83 12.9 5.55 12.06 7.01C11.49 8 10.22 12.06 11.67 12.92C12.65 13.49 16.66 14.78 17.5 13.31C18.07 12.32 19.34 8.26 17.89 7.41ZM26.56 4.63C26.14 3.9 25.44 3.34 24.58 3.11C23.71 2.88 22.83 3.02 22.11 3.45C21.39 3.87 20.83 4.57 20.6 5.45C20.38 6.33 20.52 7.22 20.94 7.95C21.36 8.67 22.05 9.24 22.92 9.47C23.79 9.7 24.67 9.55 25.39 9.13C26.11 8.71 26.66 8 26.89 7.13C27.12 6.25 26.98 5.36 26.56 4.63Z"
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

export function ArrowsExpandIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={16} height={16} fill="currentColor" viewBox="0 0 256 256" {...props}>
      <path d="M220,48V96a12,12,0,0,1-24,0V77l-39.51,39.52a12,12,0,0,1-17-17L179,60H160a12,12,0,0,1,0-24h48A12,12,0,0,1,220,48ZM99.51,139.51,60,179V160a12,12,0,0,0-24,0v48a12,12,0,0,0,12,12H96a12,12,0,0,0,0-24H77l39.52-39.51a12,12,0,0,0-17-17Z" />
    </svg>
  );
}

export function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={16} height={16} fill="currentColor" viewBox="0 0 256 256" {...props}>
      <path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z" />
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
          d="M149.51 157.52L69.14 54H54V125.97H66.11V69.38L140 164.84C143.33 162.61 146.51 160.16 149.51 157.52Z"
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
          d="M13.33 80C20.69 80 26.67 74.03 26.67 66.67V53.33H13.33C5.97 53.33 0 59.31 0 66.67C0 74.03 5.97 80 13.33 80Z"
          fill="#0ACF83"
        />
        <path d="M0 40C0 32.64 5.97 26.67 13.33 26.67H26.67V53.33H13.33C5.97 53.33 0 47.36 0 40Z" fill="#A259FF" />
        <path d="M0 13.33C0 5.97 5.97 0 13.33 0H26.67V26.67H13.33C5.97 26.67 0 20.69 0 13.33Z" fill="#F24E1E" />
        <path d="M26.67 0H40C47.36 0 53.33 5.97 53.33 13.33C53.33 20.69 47.36 26.67 40 26.67H26.67V0Z" fill="#FF7262" />
        <path
          d="M53.33 40C53.33 47.36 47.36 53.33 40 53.33C32.64 53.33 26.67 47.36 26.67 40C26.67 32.64 32.64 26.67 40 26.67C47.36 26.67 53.33 32.64 53.33 40Z"
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
        opacity="0.3"
        d="M12 3.27C12.6 3.62 13 4.26 13 5V12C13 13.1 12.1 14 11 14H5C3.9 14 3 13.1 3 12V5C3 4.26 3.4 3.62 4 3.27V3.45C4 3.72 4.05 4.09 4.3 4.43C4.74 5.04 5.82 6 8 6C10.18 6 11.26 5.04 11.7 4.43C11.95 4.09 12 3.72 12 3.45V3.27Z"
        fill="currentColor"
      />
      <path
        d="M11 2.83V3.56C11 3.63 10.99 3.7 10.95 3.76C10.76 4.06 10.01 5 8 5C5.99 5 5.24 4.06 5.05 3.76C5.01 3.7 5 3.63 5 3.56V2.83C5 2.56 5.22 2.33 5.5 2.33H6.06C6.3 2.33 6.5 2.13 6.5 1.89C6.5 1.4 6.9 1 7.39 1H8.61C9.1 1 9.5 1.4 9.5 1.89C9.5 2.13 9.7 2.33 9.94 2.33H10.5C10.78 2.33 11 2.56 11 2.83Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CursorBeachballIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props} className={cn("", className)}>
      <path
        d="M7.54556 3.04445C8.31902 3.14043 9.08644 3.38963 9.80387 3.80384C12.6736 5.4607 13.6569 9.13024 12 12C10.3432 9.13024 6.67363 8.14699 3.80387 9.80384C3.08748 10.2175 2.48865 10.7565 2.0191 11.3772C2.24379 7.72055 4.43358 4.59534 7.54556 3.04445Z"
        fill="url(#paint0_linear_6313_24499)"
      />
      <path
        d="M2.01911 11.3772C2.48865 10.7565 3.08748 10.2175 3.80388 9.80384C6.67363 8.14699 10.3432 9.13024 12 12C8.68632 12 6.00003 14.6863 6.00003 18C6.00003 18.8277 6.16763 19.6162 6.47074 20.3336C3.77604 18.5421 2.00003 15.4784 2.00003 12C2.00003 11.7908 2.00645 11.5832 2.01911 11.3772Z"
        fill="url(#paint1_linear_6313_24499)"
      />
      <path
        d="M6.47074 20.3336C6.16763 19.6163 6.00003 18.8277 6.00003 18C6.00003 14.6863 8.68632 12 12 12C10.3432 14.8698 11.3264 18.5393 14.1962 20.1962C14.9136 20.6104 15.681 20.8596 16.4545 20.9555C15.1132 21.624 13.6005 22 12 22C9.95563 22 8.05451 21.3865 6.47074 20.3336Z"
        fill="url(#paint2_linear_6313_24499)"
      />
      <path
        d="M16.4545 20.9555C15.681 20.8596 14.9136 20.6104 14.1962 20.1962C11.3264 18.5393 10.3432 14.8698 12 12C13.6569 14.8698 17.3264 15.853 20.1962 14.1962C20.9126 13.7825 21.5114 13.2435 21.981 12.6228C21.7563 16.2794 19.5665 19.4047 16.4545 20.9555Z"
        fill="url(#paint3_linear_6313_24499)"
      />
      <path
        d="M21.981 12.6228C21.5114 13.2435 20.9126 13.7825 20.1962 14.1962C17.3264 15.853 13.6569 14.8698 12 12C15.3137 12 18 9.31371 18 6.00001C18 5.17231 17.8324 4.38375 17.5293 3.66643C20.224 5.45793 22 8.52156 22 12C22 12.2092 21.9936 12.4168 21.981 12.6228Z"
        fill="url(#paint4_linear_6313_24499)"
      />
      <path
        d="M17.5293 3.66642C17.8324 4.38375 18 5.1723 18 6C18 9.31371 15.3137 12 12 12C13.6569 9.13024 12.6736 5.4607 9.80388 3.80385C9.08644 3.38964 8.31902 3.14043 7.54556 3.04445C8.8869 2.37599 10.3996 2 12 2C14.0444 2 15.9455 2.61349 17.5293 3.66642Z"
        fill="url(#paint5_linear_6313_24499)"
      />
      <defs>
        <linearGradient id="paint0_linear_6313_24499" x1="541.308" y1="3.04445" x2="541.308" y2="898.599" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD305" style={{ stopColor: "color(display-p3 1.0000 0.8275 0.0196)", stopOpacity: 1 }} />
          <stop offset={1} stopColor="#FDCF01" style={{ stopColor: "color(display-p3 0.9922 0.8118 0.0039)", stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="paint1_linear_6313_24499" x1={502} y1="8.99899" x2={502} y2="1142.46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#52CF30" style={{ stopColor: "color(display-p3 0.3216 0.8118 0.1882)", stopOpacity: 1 }} />
          <stop offset={1} stopColor="#3BBD1C" style={{ stopColor: "color(display-p3 0.2314 0.7412 0.1098)", stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="paint2_linear_6313_24499" x1="528.723" y1={12} x2="528.723" y2={1012} gradientUnits="userSpaceOnUse">
          <stop stopColor="#14ADF6" style={{ stopColor: "color(display-p3 0.0784 0.6784 0.9647)", stopOpacity: 1 }} />
          <stop offset={1} stopColor="#1191F4" style={{ stopColor: "color(display-p3 0.0667 0.5686 0.9569)", stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="paint3_linear_6313_24499" x1="550.484" y1={12} x2="550.484" y2="907.555" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CA70E1" style={{ stopColor: "color(display-p3 0.7922 0.4392 0.8824)", stopOpacity: 1 }} />
          <stop offset={1} stopColor="#B452CB" style={{ stopColor: "color(display-p3 0.7059 0.3216 0.7961)", stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="paint4_linear_6313_24499" x1={512} y1="3.66643" x2={512} y2="1137.12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF645D" style={{ stopColor: "color(display-p3 1.0000 0.3922 0.3647)", stopOpacity: 1 }} />
          <stop offset={1} stopColor="#FF4332" style={{ stopColor: "color(display-p3 1.0000 0.2627 0.1961)", stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="paint5_linear_6313_24499" x1="530.269" y1={2} x2="530.269" y2={1002} gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBB114" style={{ stopColor: "color(display-p3 0.9843 0.6941 0.0784)", stopOpacity: 1 }} />
          <stop offset={1} stopColor="#FF9508" style={{ stopColor: "color(display-p3 1.0000 0.5843 0.0314)", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function CursorEwResizeIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
      className={cn("-translate-y-px drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]", className)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.4594 8C15.6844 8.001 15.9104 8.054 16.1124 8.155L21.6204 10.91C22.1184 11.159 22.4284 11.66 22.4284 12.217C22.4284 12.774 22.1184 13.275 21.6204 13.524L16.1124 16.279C15.9104 16.38 15.6844 16.434 15.4594 16.434C14.6534 16.434 13.9984 15.778 13.9984 14.972V9.462C13.9984 9.062 14.1564 8.687 14.4444 8.411C14.7184 8.146 15.0794 8 15.4594 8ZM8.53601 8.001C9.34201 8.001 9.99801 8.656 9.99801 9.463V14.972C9.99801 15.778 9.34301 16.434 8.53601 16.434C8.31101 16.434 8.08601 16.38 7.88301 16.279L2.37801 13.524C1.88001 13.275 1.57001 12.774 1.57001 12.217C1.57001 11.66 1.88001 11.159 2.37801 10.91L7.88301 8.155C8.08501 8.054 8.31101 8.001 8.53601 8.001Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.1733 11.8049L15.6653 9.04988C15.3583 8.89688 14.9983 9.11988 14.9983 9.46288V14.9719C14.9983 15.3149 15.3583 15.5379 15.6653 15.3849L21.1733 12.6299C21.5133 12.4599 21.5133 11.9749 21.1733 11.8049ZM2.82519 12.6298L8.33019 15.3848C8.63719 15.5378 8.99819 15.3148 8.99819 14.9718V9.46278C8.99819 9.11978 8.63719 8.89678 8.33019 9.04978L2.82519 11.8048C2.48519 11.9748 2.48519 12.4598 2.82519 12.6298Z"
        fill="black"
      />
    </svg>
  );
}

export function CursorArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="{24}" height="{24}" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M3.08179 5.38086C2.66391 4.01599 3.88859 2.73508 5.2478 3.04785L5.37964 3.08301L19.6599 7.45312H19.6609L19.8757 7.52832C21.3735 8.13872 21.3905 10.3278 19.8279 10.9375L14.1843 13.1396L14.1765 13.1426C13.9407 13.2358 13.7287 13.3767 13.5525 13.5527H13.5515C13.4158 13.6885 13.3031 13.8442 13.2166 14.0127L13.1394 14.1855L10.9373 19.8291H10.9363C10.3033 21.4535 7.97391 21.367 7.46362 19.6992V19.6982L3.08179 5.38086Z"
        fill="canvas"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIconStraight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentcolor" width="10" height="10" viewBox="0 0 10 10" {...props}>
      <path d="M9.16 1.12C9.51 1.35 9.6 1.81 9.38 2.16L5.14 8.66C5.02 8.84 4.82 8.97 4.6 8.99C4.39 9.02 4.17 8.95 4.01 8.81L1.25 6.31C0.94 6.03 0.92 5.56 1.19 5.25C1.47 4.94 1.95 4.92 2.25 5.2L4.36 7.1L8.12 1.34C8.35 0.99 8.81 0.9 9.16 1.12Z"></path>
    </svg>
  );
}

export function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} strokeWidth="1.5">
      <path
        d="M2 6.98L5.3 9.93C5.33 9.97 5.39 9.95 5.4 9.91C7.6 4.06 9.79 2.21 10 2"
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
        d="M3.75 8.75L7.42 12.26C7.45 12.29 7.51 12.28 7.53 12.23C8.83 8.28 10.66 5.34 12.25 3.75"
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
        d="M8 1.5C8.25 1.5 8.52 1.61 8.82 1.91C9.11 2.2 9.41 2.65 9.66 3.25C10.17 4.44 10.5 6.12 10.5 8C10.5 9.88 10.17 11.56 9.66 12.75C9.41 13.35 9.11 13.8 8.82 14.09C8.52 14.39 8.25 14.5 8 14.5C7.75 14.5 7.48 14.39 7.18 14.09C6.89 13.8 6.59 13.35 6.34 12.75C5.83 11.56 5.5 9.88 5.5 8C5.5 6.12 5.83 4.44 6.34 3.25C6.59 2.65 6.89 2.2 7.18 1.91C7.48 1.61 7.75 1.5 8 1.5Z"
        stroke="currentColor"
      />
      <path
        d="M12.67 12.52C11.43 11.89 9.79 11.5 8 11.5C6.21 11.5 4.57 11.89 3.33 12.52M12.67 12.52C13.8 11.35 14.5 9.76 14.5 8C14.5 6.56 14.03 5.23 13.24 4.15M12.67 12.52C11.49 13.74 9.83 14.5 8 14.5C6.17 14.5 4.51 13.74 3.33 12.52M3.33 12.52C2.2 11.35 1.5 9.76 1.5 8C1.5 6.56 1.97 5.23 2.76 4.15M13.24 4.15C11.96 4.98 10.09 5.5 8 5.5C5.91 5.5 4.04 4.98 2.76 4.15M13.24 4.15C12.06 2.54 10.15 1.5 8 1.5C5.85 1.5 3.94 2.54 2.76 4.15"
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
        d="M3 7.8C3 6.12 3 5.28 3.33 4.64C3.61 4.07 4.07 3.61 4.64 3.33C5.28 3 6.12 3 7.8 3H8.2C9.88 3 10.72 3 11.36 3.33C11.93 3.61 12.39 4.07 12.67 4.64C13 5.28 13 6.12 13 7.8V8.2C13 9.88 13 10.72 12.67 11.36C12.39 11.93 11.93 12.39 11.36 12.67C10.72 13 9.88 13 8.2 13H7.8C6.12 13 5.28 13 4.64 12.67C4.07 12.39 3.61 11.93 3.33 11.36C3 10.72 3 9.88 3 8.2V7.8Z"
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
        d="M3 7.8C3 6.12 3 5.28 3.33 4.64C3.61 4.07 4.07 3.61 4.64 3.33C5.28 3 6.12 3 7.8 3H8.2C9.88 3 10.72 3 11.36 3.33C11.93 3.61 12.39 4.07 12.67 4.64C13 5.28 13 6.12 13 7.8V8.2C13 9.88 13 10.72 12.67 11.36C12.39 11.93 11.93 12.39 11.36 12.67C10.72 13 9.88 13 8.2 13H7.8C6.12 13 5.28 13 4.64 12.67C4.07 12.39 3.61 11.93 3.33 11.36C3 10.72 3 9.88 3 8.2V7.8Z"
        fill="currentColor"
        fillOpacity="0.4"
      />
      <path
        d="M11 8L8.5 5.5M11 8L8.5 10.5M11 8H4.75"
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
        d="M9.66 2.6L4.81 6.97C4.07 7.63 3.12 8 2.13 8H0V10H20V8H18.53C17.55 8 16.59 7.63 15.86 6.97L11 2.6C10.62 2.26 10.04 2.26 9.66 2.6Z"
        className="fill-popover in-data-[slot=tooltip-popup]:fill-card dark:in-data-[slot=tooltip-popup]:fill-neutral-700"
      />
      <path
        d="M9 1.86C9.76 1.17 10.91 1.17 11.67 1.86L16.53 6.23C17.08 6.73 17.79 7 18.53 7L15.89 7L11 2.6C10.62 2.26 10.04 2.26 9.66 2.6L4.78 7L2.13 7C2.87 7 3.59 6.73 4.14 6.23L9 1.86Z"
        className="fill-border dark:fill-none"
      />
      {/* <path
        d="M10.33 3.35L5.48 7.72C4.56 8.54 3.37 9 2.13 9H0V8H2.13C3.12 8 4.07 7.63 4.81 6.97L9.66 2.6C10.04 2.26 10.62 2.26 11 2.6L15.86 6.97C16.59 7.63 17.55 8 18.53 8H20V9H18.53C17.3 9 16.11 8.54 15.19 7.72L10.33 3.35Z"
        className="dark:fill-black/90"
        transform="translate(0, -0.5)"
      /> */}
      <path
        d="M10.33 3.35L5.48 7.72C4.56 8.54 3.37 9 2.13 9H0V8H2.13C3.12 8 4.07 7.63 4.81 6.97L9.66 2.6C10.04 2.26 10.62 2.26 11 2.6L15.86 6.97C16.59 7.63 17.55 8 18.53 8H20V9H18.53C17.3 9 16.11 8.54 15.19 7.72L10.33 3.35Z"
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
        d="M8.07 16.14C6.96 16.14 5.91 15.93 4.94 15.51C3.96 15.09 3.11 14.51 2.37 13.77C1.63 13.04 1.05 12.18 0.63 11.21C0.21 10.23 0 9.18 0 8.07C0 6.96 0.21 5.91 0.63 4.94C1.05 3.96 1.63 3.1 2.37 2.36C3.11 1.62 3.96 1.04 4.94 0.63C5.91 0.21 6.96 0 8.07 0C9.18 0 10.23 0.21 11.2 0.63C12.18 1.04 13.04 1.62 13.78 2.36C14.52 3.1 15.1 3.96 15.52 4.94C15.94 5.91 16.15 6.96 16.15 8.07C16.15 9.18 15.94 10.23 15.52 11.21C15.1 12.18 14.52 13.04 13.78 13.77C13.04 14.51 12.18 15.09 11.2 15.51C10.23 15.93 9.18 16.14 8.07 16.14ZM8.07 14.55C8.97 14.55 9.8 14.38 10.59 14.04C11.37 13.71 12.05 13.24 12.65 12.65C13.25 12.05 13.71 11.37 14.05 10.59C14.38 9.8 14.55 8.97 14.55 8.07C14.55 7.17 14.38 6.34 14.05 5.55C13.71 4.77 13.25 4.08 12.65 3.49C12.05 2.9 11.37 2.43 10.59 2.1C9.8 1.76 8.97 1.59 8.07 1.59C7.18 1.59 6.34 1.76 5.55 2.1C4.77 2.43 4.09 2.9 3.49 3.49C2.9 4.08 2.43 4.77 2.09 5.55C1.76 6.34 1.59 7.17 1.59 8.07C1.59 8.97 1.76 9.8 2.09 10.59C2.43 11.37 2.9 12.05 3.49 12.65C4.09 13.24 4.77 13.71 5.55 14.04C6.34 14.38 7.18 14.55 8.07 14.55ZM6.7 12.36C6.53 12.36 6.38 12.3 6.26 12.2C6.14 12.08 6.09 11.94 6.09 11.77C6.09 11.59 6.14 11.45 6.26 11.34C6.38 11.23 6.53 11.17 6.7 11.17H7.63V7.91H6.84C6.67 7.91 6.52 7.85 6.4 7.74C6.28 7.63 6.22 7.48 6.22 7.31C6.22 7.15 6.28 7.01 6.4 6.89C6.52 6.78 6.67 6.72 6.84 6.72H8.31C8.53 6.72 8.7 6.79 8.8 6.93C8.92 7.07 8.98 7.25 8.98 7.48V11.17H9.84C10.02 11.17 10.17 11.23 10.28 11.34C10.4 11.45 10.46 11.59 10.46 11.77C10.46 11.94 10.4 12.08 10.28 12.2C10.17 12.3 10.02 12.36 9.84 12.36H6.7ZM8.02 5.51C7.73 5.51 7.48 5.41 7.27 5.2C7.07 4.99 6.97 4.74 6.97 4.45C6.97 4.16 7.07 3.91 7.27 3.7C7.48 3.49 7.73 3.39 8.02 3.39C8.32 3.39 8.56 3.49 8.77 3.7C8.97 3.91 9.08 4.16 9.08 4.45C9.08 4.74 8.97 4.99 8.77 5.2C8.56 5.41 8.32 5.51 8.02 5.51Z"
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
        d="M21 4C13.77 4 4 13.76 4 20V4H21Z"
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
        d="M3 5.5C3 4.67 3.67 4 4.5 4H6.75C7.22 4 7.67 4.22 7.95 4.6L8.55 5.4C8.83 5.78 9.28 6 9.75 6H15.5C16.33 6 17 6.67 17 7.5V14.5C17 15.33 16.33 16 15.5 16H4.5C3.67 16 3 15.33 3 14.5V5.5Z"
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
          d="M12.5 25C9.18 25 6.01 26.32 3.66 28.66C1.32 31.01 0 34.18 0 37.5L0 62.5C0 65.82 1.32 68.99 3.66 71.34C6.01 73.68 9.18 75 12.5 75H75C78.32 75 81.49 73.68 83.84 71.34C86.18 68.99 87.5 65.82 87.5 62.5V37.5C87.5 34.18 86.18 31.01 83.84 28.66C81.49 26.32 78.32 25 75 25H12.5ZM75 31.25C76.66 31.25 78.25 31.91 79.42 33.08C80.59 34.25 81.25 35.84 81.25 37.5V62.5C81.25 64.16 80.59 65.75 79.42 66.92C78.25 68.09 76.66 68.75 75 68.75H12.5C10.84 68.75 9.25 68.09 8.08 66.92C6.91 65.75 6.25 64.16 6.25 62.5V37.5C6.25 35.84 6.91 34.25 8.08 33.08C9.25 31.91 10.84 31.25 12.5 31.25H75ZM100 50C100 52.49 99.01 54.87 97.25 56.63C95.5 58.39 93.11 59.38 90.63 59.38V40.63C93.11 40.63 95.5 41.61 97.25 43.37C99.01 45.13 100 47.51 100 50Z"
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
    <svg width={16} height={16} viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M3 3.732a1.5 1.5 0 0 1 2.305-1.265l6.706 4.267a1.5 1.5 0 0 1 0 2.531l-6.706 4.268A1.5 1.5 0 0 1 3 12.267V3.732Z" />
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
        <rect id="path-1" x="0" y="0" width="129.85" height="141.39" />
        <rect id="path-3" x="0" y="0" width="129.85" height="141.39" />
      </defs>
      <g id="letterboxd-decal-dots-pos-rgb" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <circle id="Circle" fill="#202830" cx="250" cy="250" r="250" />
        <g id="dots-neg" transform="translate(61, 180)">
          <g id="Dots">
            <ellipse id="Green" fill="#00E054" cx="189" cy="69.97" rx="70.08" ry="69.97" />
            <g id="Blue" transform="translate(248.15, 0)">
              <mask id="mask-2" fill="white">
                <use xlinkHref="#path-1" />
              </mask>
              <g id="Mask" />
              <ellipse fill="#40BCF4" mask="url(#mask-2)" cx="59.77" cy="69.97" rx="70.08" ry="69.97" />
            </g>
            <g id="Orange">
              <mask id="mask-4" fill="white">
                <use xlinkHref="#path-3" />
              </mask>
              <g id="Mask" />
              <ellipse fill="#FF8000" mask="url(#mask-4)" cx="70.08" cy="69.97" rx="70.08" ry="69.97" />
            </g>
            <path
              d="M129.54,107.02 C122.81,96.28 118.92,83.58 118.92,69.97 C118.92,56.37 122.81,43.67 129.54,32.92 C136.27,43.67 140.16,56.37 140.16,69.97 C140.16,83.58 136.27,96.28 129.54,107.02 Z"
              id="Overlap"
              fill="#FFFFFF"
            />
            <path
              d="M248.46,32.92 C255.19,43.67 259.08,56.37 259.08,69.97 C259.08,83.58 255.19,96.28 248.46,107.02 C241.73,96.28 237.84,83.58 237.84,69.97 C237.84,56.37 241.73,43.67 248.46,32.92 Z"
              id="Overlap"
              fill="#FFFFFF"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
