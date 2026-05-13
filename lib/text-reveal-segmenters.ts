/** Module-scoped segmenters for `TextReveal` (locale is default, static). */
export const textRevealWordSegmenter = new Intl.Segmenter(undefined, { granularity: "word" });
export const textRevealCharSegmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
