import gsap from "gsap";

const COLOR_VALID = "#6391e8";
const COLOR_INVALID = "#fe8c99";

const inputContainerElements = document.querySelectorAll(".input-container");

const inputAnimations = gsap.timeline({ defaults: { duration: 1 } });

const SVG_DRAWN_PATH_START =
  "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";
const SVG_DRAWN_PATH_END =
  "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512";

const registerInputAnimations = (
  line: SVGPathElement,
  placeholder: HTMLParagraphElement
) => {
  inputAnimations.fromTo(
    line,
    { attr: { d: SVG_DRAWN_PATH_START } },
    {
      attr: { d: SVG_DRAWN_PATH_END },
      ease: "Power2.easeOut",
      duration: 0.75,
    }
  );
  inputAnimations.to(
    line,
    {
      attr: { d: SVG_DRAWN_PATH_START },
      ease: "elastic.out(3, 0.5)",
    },
    "<50%"
  );
  inputAnimations.to(
    placeholder,
    {
      y: -15,
      scale: 0.7,
      duration: 0.5,
      ease: "Power2.easeOut",
    },
    "<15%"
  );
};

const colorizeInputValidation = (
  color: string,
  line: SVGPathElement,
  placeholder: HTMLParagraphElement,
  duration: number = 0.75
) => {
  gsap.to(line, { stroke: color, duration });
  gsap.to(placeholder, { color, duration });
};

inputContainerElements.forEach((inputContainerElement) => {
  const inputElement = inputContainerElement.querySelector(".input") as HTMLInputElement;
  const line = inputContainerElement.querySelector(".elastic-line") as SVGPathElement;
  const placeholder = inputContainerElement.querySelector(
    ".placeholder"
  ) as HTMLParagraphElement;
  let inputTimeoutId: number;

  inputElement.addEventListener("focus", () => {
    if (inputElement.value) {
      return;
    }

    registerInputAnimations(line, placeholder);
  });

  inputElement.addEventListener("blur", () => {
    if (inputElement.value) {
      return;
    }

    inputAnimations.to(placeholder, {
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "Power2.easeOut",
    });
  });


  inputElement.addEventListener("input", () => {
    clearTimeout(inputTimeoutId);

    inputTimeoutId = setTimeout(() => {
      if (inputElement.validity.valid) {
        colorizeInputValidation(COLOR_VALID, line, placeholder);
      } else {
        colorizeInputValidation(COLOR_INVALID, line, placeholder);
      }
    }, 400);
  });
});
