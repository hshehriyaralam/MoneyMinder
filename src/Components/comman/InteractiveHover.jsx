import { InteractiveHoverButton } from "@/Components/magicui/interactive-hover-button";

export  default function InteractiveHoverButtonDemo({Name,type}) {
  return <InteractiveHoverButton  type={type}  >{Name}</InteractiveHoverButton>;
}
