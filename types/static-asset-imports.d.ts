declare module "@/media/*" {
  const content: import("next/image").StaticImageData;
  export default content;
}

declare module "@/media/*/*" {
  const content: import("next/image").StaticImageData;
  export default content;
}

declare module "@/media/*/*/*" {
  const content: import("next/image").StaticImageData;
  export default content;
}
