const income = document.getElementById("income");
const addBtn = document.getElementById("addBtn");
const saveBtn = document.getElementById("saveBtn");
//
const geliriniz = document.getElementById("geliriniz");
const gideriniz = document.getElementById("gideriniz");
const kalan = document.getElementById("kalan");
//
const harcama = document.getElementById("harcama");
const harcamaMiktar = document.getElementById("harcamaMiktar");
const tarihInput = document.getElementById("tarihInput");

let spendList = [];
let gelir = [];
let totalGelir;
let gider = [];
let totalGider 
const bubling = () => {
  console.log("GELIR", gelir);
	const main = document.querySelector("main");
	main.addEventListener("click", (e) => {
		// variables
		const tb1 = document.querySelector(".tb1 tbody");
		let tr = document.createElement("tr");
		//
		if (e.target.id === "saveBtn") {
			if (!geliriniz.textContent || geliriniz.textContent == 0) {
				e.preventDefault();
				sweetSwal();
				harcama.value = "";
				harcamaMiktar.value = "";
			} else if (!harcamaMiktar.value) {
				alert("Please fill in the Expenditure Amount field");
			} else if (!harcama.value) {
				alert("Please fill in the Expenditure Field");
			} else {
				e.preventDefault();
				console.log("burasi save btn");
				harcama.value = harcama.value.replace(/e/gi, "");

				tr.innerHTML = `
        <td>${harcama.value}</td>
        <td class="amount">${harcamaMiktar.value}</td>
        <td>${tarihInput.value}</td>
        <td><i class="fa-solid fa-trash-can" id="delBtn"></i></td>
      `;
        gider.push(Number(harcamaMiktar.value))
        totalGider = gider.reduce((acc,gider)=>acc+gider,0)
				gideriniz.textContent = totalGider;
				kalan.textContent = totalGelir - gideriniz.textContent;
				tb1.appendChild(tr);
				harcama.value = "";
				harcamaMiktar.value = "";
			}
		} else if (e.target.id === "addBtn") {
			e.preventDefault();
			if (!income.value.trim()) {
				swal();
			} else {
				gelir.push(Number(income.value));
				totalGelir = gelir.reduce((sum, gelir) => sum + gelir, 0);
				geliriniz.textContent = totalGelir;
				income.value = "";
        console.log("total start:",totalGelir)
			}
		} else if (e.target.id === "delBtn") {
			let tRow = e.target.closest("tr");
      let deletedAmount = tRow.querySelector(".amount").textContent
      totalGider -= deletedAmount
			gideriniz.textContent = totalGider;
      kalan.textContent = geliriniz.textContent - gideriniz.textContent
      console.log("total gider:",totalGider)

      tRow.remove();
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

//| if !input && addBtn clicked alert
const swal = () => {
	const notyf = new Notyf();
	notyf.error({
		duration: 1000,
		position: {
			x: "center",
			y: "top",
		},
		message: "The input field cannot be empty. Enter an income",
		background: "#FFC106",
		types: [
			{
				type: "warning",
				background: "orange",
				icon: {
					className: "material-icons",
					tagName: "i",
					text: "warning",
				},
			},
		],
	});
};
//|

//? if !income || income == 0
const sweetSwal = () => {
	Swal.fire({
		position: "top",
		icon: "warning",
		title: "Please enter an income!",
		showConfirmButton: false,
		timer: 1000,
	});
};
//?
