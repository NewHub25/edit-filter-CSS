let valueToCss = "none";
const screen = document.querySelector(".filters__header");
const inputText = document.getElementById("colorText");
const colorPaint = document.getElementById("colorPaint");
const copy = document.getElementById("copy");
const filterToCopy = document.getElementById("filterToCopy");

document.querySelector(".filters__nav").addEventListener("change", (e) => {
  const { target } = e;
  if (target.tagName === "INPUT") {
    document.documentElement.style.setProperty("--output", target.value);
    if (target.id !== "colorText") {
      inputText.value = target.value;
    } else {
      colorPaint.value = target.value;
    }
  }
});

document.querySelector(".filters__section").addEventListener("change", (e) => {
  const { target } = e;
  if (target.tagName === "INPUT") {
    filterToCopy.value = "filter: " + buildFilter(target, screen);
    target.parentElement.querySelector(".filters__span_data").innerHTML =
      target.value + target.dataset.unit;
  }
});
function buildFilter(input, _screen) {
  if (valueToCss === "none") {
    valueToCss = "";
  }
  let filter = input.className.match(/[a-z]+$/)[0];
  filter = filter === "hue" ? "hue-rotate" : filter;
  const {
    value,
    dataset: { unit, defaultValue },
  } = input;
  if (valueToCss.indexOf(filter) < 0) {
    valueToCss += `${filter}(${value + unit}) `;
  } else {
    valueToCss = valueToCss.replace(
      RegExp(`(${filter})\\(.+?\\)`),
      value === defaultValue? '': `$1(${value + unit})`
    );
  }
  console.clear();
  console.log(valueToCss);
  _screen.style.setProperty("filter", valueToCss);
  return valueToCss;
}

copy.onclick = function (e) {
  navigator.clipboard
    .writeText(filterToCopy.value + ';')
    .then(() => {
      this.classList.add("copied");
      setTimeout(() => this.classList.remove("copied"), 1000);
      console.log("Filtro copiado");
    })
    .catch(function (error) {
      console.error("Error al copiar el texto: " + error);
    });
};
