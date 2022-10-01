import bgImage1 from "../../assets/bg1.jpeg";
import bgImage2 from "../../assets/bg2.jpg";
import bgImage3 from "../../assets/bg3.jpg";
import { useState } from "react";
export class StaticImage {
  static currentBackgroundImage = bgImage1;

  static getCurrentBackgroundImage() {
    return StaticImage.currentBackgroundImage;
  }
  static setCurrentBackgroundImage(bgImage) {
    StaticImage.currentBackgroundImage = bgImage;
  }
}
/*
const [currentBackgroundImage, setbgImage] = useState(bgImage1);

export function StaticImage() {
  return currentBackgroundImage;
}
export function setCurrentBackgroundImage(bgImage) {
  setbgImage(bgImage);
}
*/
