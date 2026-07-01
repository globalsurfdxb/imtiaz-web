import { Dispatch, SetStateAction } from "react";

export type ProjectCardType = {
  id:string;
   image: string;
   hoverImage: string;
  status?: string;
  location?: string;
  title: string;
  subtitle?: string;
  href?: string;
  startingFrom?: string;
  units?: string;
  button360?:boolean;
  setActiveProject?:Dispatch<SetStateAction<string>>
  isCommunity?:boolean;
  enableParallax?: boolean;
  imageClassName?: string;
};