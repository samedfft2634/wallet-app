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
const clearAll = document.getElementById("clearAll");
//
const tb1 = document.querySelector(".tb1 tbody");
const tb2 = document.querySelector(".tb2 tbody");

let gelir = [];
let totalGelir = [];
let gider = [];
let totalGider;

window.addEventListener("load", () => {
	const tarihInput = document.getElementById("tarihInput");
	tarihInput.valueAsDate = new Date();
	getData();
	updateRemainingValues();
	window.dispatchEvent(new Event("resize"));	
});

//
window.addEventListener("resize", function () {
	var screenWidth = window.innerWidth;
	var payLabel = document.getElementById("payLabel");
	var table2 = document.getElementById("tbl2")
	var tb2Body = this.document.querySelector(".tb2 tbody")
	if (payLabel) {
	   if (screenWidth <= 400) {
		  payLabel.textContent = "Last Payment";
		table2.setAttribute("class","table table-bordered table-hover table-striped mt-4 text-center  ms-auto tb2")
		tb2Body.setAttribute("class","text-start")
	   } else {
		  payLabel.textContent = "Last Payment Date";
		  table2.setAttribute("class","table table-bordered table-hover table-striped mt-4 text-center w-50 ms-auto tb2")
		  tb2Body.setAttribute("class","text-end")
	   }
	}
 });




const updateRemainingValues = () => {
	totalGelir = gelir.reduce((sum, gelir) => sum + gelir, 0);
	totalGider = gider.reduce((acc, g) => acc + g, 0);
	geliriniz.textContent = totalGelir;
	gideriniz.textContent = totalGider;
	kalan.textContent = totalGelir - totalGider;
	localStorage.setItem("gelir", JSON.stringify(gelir));
	localStorage.setItem("gider", JSON.stringify(gider));
};

const bubling = () => {
	const main = document.querySelector("main");
	main.addEventListener("click", (e) => {
		// variables

		let tr = document.createElement("tr");
		tr.setAttribute("id", "trow");
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
				harcama.value = harcama.value.replace(/e/gi, "");
				tr.innerHTML = `
        <td>${harcama.value}</td>
        <td class="amount">${harcamaMiktar.value}</td>
        <td>${tarihInput.value}</td>
        <td><i class="fa-solid fa-trash-can" id="delBtn"></i></td>
      `;
				gider.push(Number(harcamaMiktar.value));
				updateRemainingValues();
				// totalGider = gider.reduce((acc, gider) => acc + gider, 0);
				// gideriniz.textContent = totalGider;
				// kalan.textContent = totalGelir - gideriniz.textContent;
				tb1.appendChild(tr);
				harcama.value = "";
				harcamaMiktar.value = "";
				localStorage.setItem("tb1", tb1.innerHTML);
				localStorage.setItem("gider", JSON.stringify(gider));
			}
		} else if (e.target.id === "addBtn") {
			e.preventDefault();
			if (!income.value.trim()) {
				swal();
			} else {
				gelir.push(Number(income.value));
				updateRemainingValues();
				// totalGelir = gelir.reduce((sum, gelir) => sum + gelir, 0);
				// console.log(totalGelir);
				// geliriniz.textContent = totalGelir;
				// gideriniz.textContent = totalGider;
				// kalan.textContent = geliriniz.textContent - gideriniz.textContent;
				income.value = "";
				localStorage.setItem("gelir", JSON.stringify(gelir));
			}
		} else if (e.target.id === "delBtn") {
			let tRow = e.target.closest("tr");
			let deletedAmount = Number(
				tRow.querySelector(".amount").textContent
			);
			//
			totalGider -= deletedAmount; // burada gider dizisinden eksilmte yapilmiyor
			gider = gider.filter(
				(item, index) => index !== gider.indexOf(deletedAmount)
			);
			totalGider = gider.reduce((acc, gider) => acc + gider, 0); // dikkat 15
			updateRemainingValues();
			// gider.push(totalGider) // 5 5 5 15
			// gider = gider.filter((item)=> item == totalGider) // 15
			// gider[0] = `${gider[0] - deletedAmount}`
			// totalGider = gider
			// console.log( gider) //10
			//
			// gideriniz.textContent = totalGider;
			// kalan.textContent = geliriniz.textContent - gideriniz.textContent;
			localStorage.setItem("gelir", JSON.stringify(gelir));
			localStorage.setItem("gider", JSON.stringify(gider));
			tRow.remove();
			localStorage.setItem("tb1", tb1.innerHTML);
		} else if (e.target.id === "clearAll") {
			gelir = [];
			gider = [];
			updateRemainingValues();
			tb1.innerHTML = "";
			localStorage.setItem("tb1", tb1.innerHTML);
			localStorage.setItem("gelir", JSON.stringify(gelir));
			localStorage.setItem("gider", JSON.stringify(gider));
		}
	});
};
bubling();

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

function getData() {
	tb1.innerHTML = localStorage.getItem("tb1");
	let tb2Data = localStorage.getItem("tb2");
	if (tb2Data) {
		tb2.innerHTML = tb2Data;
	}
	const gel = localStorage.getItem("gelir");
	if (gel) {
		gelir = JSON.parse(gel);
		const total = gelir.reduce((a, b) => a + b, 0);
		geliriniz.textContent = total;
		kalan.textContent = total - gider;
	}

	const git = localStorage.getItem("gider");
	if (git) {
		gider = JSON.parse(git);
		const totalgid = gider.reduce((a, b) => a + b, 0);
		gideriniz.textContent = totalgid;
	}
}
income.addEventListener("keyup", () => {
	income.value = income.value.replace(/e/gi, "");
});

