import gsap from "gsap";

const EMAIL_VALIDATION = /\S+@\S+\.\S+/;
const PHONE_VALIDATION =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const COLOR_VALID = "#6391e8";
const COLOR_INVALID = "#fe8c99";

const containers = document.querySelectorAll(".input-container");

const animations = gsap.timeline({ defaults: { duration: 1 } });

const SVG_DRAWN_PATH_START =
  "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";
const SVG_DRAWN_PATH_END =
  "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512";

const registerInputAnimations = (
  line: HTMLElement,
  placeholder: HTMLElement
) => {
  animations.fromTo(
    line,
    { attr: { d: SVG_DRAWN_PATH_START } },
    {
      attr: { d: SVG_DRAWN_PATH_END },
      ease: "Power2.easeOut",
      duration: 0.75,
    }
  );
  animations.to(
    line,
    {
      attr: { d: SVG_DRAWN_PATH_START },
      ease: "elastic.out(3, 0.5)",
    },
    "<50%"
  );
  animations.to(
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
  line: HTMLOrSVGElement,
  placeholder: HTMLParagraphElement,
  duration: number = 0.75
) => {
  gsap.to(line, { stroke: color, duration });
  gsap.to(placeholder, { color, duration });
};

containers.forEach((container) => {
  const input = container.querySelector(".input") as HTMLInputElement;
  const line = container.querySelector(".elastic-line") as HTMLElement;
  const placeholder = container.querySelector(
    ".placeholder"
  ) as HTMLParagraphElement;

  input?.addEventListener("focus", () => {
    if (input.value) {
      return;
    }

    registerInputAnimations(line, placeholder);
  });

  input?.addEventListener("blur", () => {
    if (input.value) {
      return;
    }

    animations.to(placeholder, {
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "Power2.easeOut",
    });
  });

  let inputNameTimeout: number;

  input.addEventListener("input", () => {
    clearTimeout(inputNameTimeout);

    inputNameTimeout = setTimeout(() => {
      if (input.validity.valid) {
        colorizeInputValidation(COLOR_VALID, line, placeholder);
      } else {
        colorizeInputValidation(COLOR_INVALID, line, placeholder);
      }
    }, 400);
  });
});
