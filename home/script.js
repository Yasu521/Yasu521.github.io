tsParticles.load("tsparticles", {
  background: {
    color: "#fff",
  },
  fpsLimit: 60,
  interactivity: {
    detectsOn: "window",
    events: {
      resize: true,
      onHover: {
        enable: true,
        mode: "bubble",
      },
    },
    modes: {
      bubble: {
        distance: 300,
        opacity: 0.8,
        size: 100,
      },
    },
  },
  particles: {
    color: {
      value: ["#f00", "#0f0", "#00f", "#ff0", "#0ff", "#f0f"],
      animation: {
        enable: true,
        speed: 60,
        sync: false,
      },
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 5,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 200,
    },
    opacity: {
      random: {
        enable: true,
        minimumValue: 0.2,
      },
      value: 0.8,
    },
    shape: {
      type: "circle",
    },
    stroke: {
      color: "#ff0000",
      width: 0,
    },
    size: {
      random: {
        enable: true,
        minimumValue: 25,
      },
      value: 50,
    },
  },
  detectRetina: true,
});

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");

  const MIN_SPEED = 0.5;
  const MAX_SPEED = 2;

  const objects = [
    { type: "img", src: "https://yasuhiroiwai.jp/Ciao.webp", link: "https://yasuhiroiwai.jp", color: "lightblue" },
    { type: "div", content: "", link: "./object.html", color: "lightgreen" },
    { type: "div", content: "Card 3", link: "#", color: "lightcoral" },
    { type: "div", content: "Card 4", link: "#", color: "lightpink" },
    { type: "div", content: "Card 5", link: "#", color: "lightsalmon" },
  ];

  const elements = [];
  function randomSpeed() {
    return Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED;
  }

  objects.forEach((obj) => {
    const element = document.createElement(obj.type);
    element.className = "floating-card";
    element.style.width = "100px";
    element.style.height = "100px";
    element.style.position = "absolute";
    element.style.top = `${Math.random() * 80 + 10}%`;
    element.style.left = `${Math.random() * 80 + 10}%`;
    element.style.backgroundColor = obj.color;
    element.style.cursor = "pointer";

    if (obj.type === "div") {
      element.innerText = obj.content;
    } else if (obj.type === "img") {
      element.src = obj.src;
      element.style.borderRadius = "10px";
      element.style.objectFit = "cover";
    }

    if (obj.link) {
      element.addEventListener("click", () => {
        window.open(obj.link, "_blank");
      });
    }

    container.appendChild(element);
    elements.push({
      el: element,
      x: element.offsetLeft,
      y: element.offsetTop,
      width: 150,
      height: 100,
      xSpeed: randomSpeed() * (Math.random() < 0.5 ? 1 : -1),
      ySpeed: randomSpeed() * (Math.random() < 0.5 ? 1 : -1),
    });

    element.addEventListener("mouseenter", () => {
      const el = elements.find(e => e.el === element);
      if (el) {
        el.xSpeed = 0;
        el.ySpeed = 0;
        element.style.transition = "transform 0.3s";
        element.style.transform = "rotate(0deg)";
      }
    });

    element.addEventListener("mouseleave", () => {
      const el = elements.find(e => e.el === element);
      if (el) {
        el.xSpeed = randomSpeed() * (Math.random() < 0.5 ? 1 : -1);
        el.ySpeed = randomSpeed() * (Math.random() < 0.5 ? 1 : -1);
      }
    });
  });

  function detectCollision(el1, el2) {
    return (
      el1.x < el2.x + el2.width &&
      el1.x + el1.width > el2.x &&
      el1.y < el2.y + el2.height &&
      el1.y + el1.height > el2.y
    );
  }

  function update() {
    elements.forEach((el1) => {
      el1.x += el1.xSpeed;
      el1.y += el1.ySpeed;

      if (el1.x <= 0 || el1.x + el1.width >= container.clientWidth) {
        el1.xSpeed *= -1;
      }
      if (el1.y <= 0 || el1.y + el1.height >= container.clientHeight) {
        el1.ySpeed *= -1;
      }

      elements.forEach((el2) => {
        if (el1 !== el2 && detectCollision(el1, el2)) {
          el1.xSpeed *= -1;
          el1.ySpeed *= -1;
          el2.xSpeed *= -1;
          el2.ySpeed *= -1;
        }
      });

      el1.el.style.left = `${el1.x}px`;
      el1.el.style.top = `${el1.y}px`;
    });

    requestAnimationFrame(update);
  }

  update();
});