type TextHeadingType = "h1" | "h2" | "h3" | "h4" | "h5";
type TextParagraphType = "p1" | "p2" | "p3" | "p4" | "p5" | "label" | "l" | "u";
export type TextType = TextHeadingType | TextParagraphType;

export type TextFontWeightType = "light" | "medium" | "bold";

export interface IText {
  text: string;
  type: TextType;
  color?: string;
  weight: TextFontWeightType;
}
