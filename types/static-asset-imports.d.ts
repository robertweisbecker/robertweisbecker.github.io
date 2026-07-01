declare module "@/public/*" {
  const content: import("next/image").StaticImageData;
  export default content;
}

declare module "@/public/*/*" {
  const content: import("next/image").StaticImageData;
  export default content;
}

declare module "@/public/*/*/*" {
  const content: import("next/image").StaticImageData;
  export default content;
}
