const income = document.getElementById("gelir");
const addBtn = document.getElementById("submit");
const geliriniz = document.getElementById("geliriniz");
const gideriniz = document.getElementById("gideriniz");
const kalan = document.getElementById("kalan");
const harcama = document.getElementById("harcama");
const harcamaMiktar = document.getElementById("harcamaMiktar");
const tarihInput = document.getElementById("tarihInput");
const saveBtn = document.getElementById("saveBtn");

const bubling = () => {
  const main = document.querySelector("main");
  main.addEventListener("click", (e) => {
    if (e.target.id === "saveBtn") {
      console.log("burasi save btn");
    } else if (e.target.id === "submit") {
      e.preventDefault();
      if (!income.value.trim()) {
        const notyf = new Notyf();
        notyf.error({
          duration: 1000,
          position: {
            x: "center",
            y: "top",
          },
          message: "The input field cannot be empty.",
          duration: 9000,
          icon: false,
          background: "#FFC106",
        });
      } else {
        geliriniz.textContent = income.value;
        income.value = "";
      }
    }
  });
};
bubling();

income.addEventListener("keyup", () => {
  income.value = income.value.replace(/e/gi, "");
});

window.addEventListener("load", () => {
  const tarihInput = document.getElementById("tarihInput");
  tarihInput.valueAsDate = new Date();
});