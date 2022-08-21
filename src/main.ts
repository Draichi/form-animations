import gsap from "gsap";

const containers = document.querySelectorAll(".input-container");
const form = document.querySelector("form");

const animations = gsap.timeline({ defaults: { duration: 1 } });

const SVG_DRAWN_PATH_START =
  "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";
const SVG_DRAWN_PATH_END =
  "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512";

containers.forEach((container) => {
  const input = container.querySelector(".input") as HTMLInputElement;
  const line = container.querySelector(".elastic-line");
  const placeholder = container.querySelector(".placeholder");

  input?.addEventListener("focus", () => {
    if (input.value) {
      return;
    }

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
  });

  input?.addEventListener("blur", () => {
    if (input.value) {
      return
    }

    gsap.to(
      placeholder,
      {
        y:0,
        scale: 1,
        duration: 0.5,
        ease: "Power2.easeOut",
      }
    );
  })
});
