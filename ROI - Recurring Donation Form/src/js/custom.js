const changePlaceholder = (arr) => {
	[].forEach.call(arr, (e) => {
		const elId = e.id;
		const label = document.querySelector("label[for=" + elId + "]");
		let firstOption;

		if (e.nodeName === 'SELECT') {
			firstOption = e.options[0];
		}

		if (elId && label) {
			if (firstOption) {
				firstOption.text = label.textContent;
			} else {
				e.setAttribute("placeholder", label.textContent);
			}
			label.style.display = "none";
		}
	});
};

const headerHero = () => {
	const outerTable = document.querySelector('body');
	const headerDiv = document.createElement("div");
	headerDiv.innerHTML = '<div class="container"><nav class="navbar"><div class="navbar-brand"><a id="brand" class="navbar-item" href="https://www.splcenter.org"><img class="is-sr-only" src="dnresview?client=SPLCSUSSTG&resource_id=11945" width="212" height="65" alt="SPLC logo"></a></div></nav></div>';
	const heroDiv = document.createElement("div");
	heroDiv.innerHTML = '<div class="hero-body"><div class="container"><h1 class="title">Support Our Work</h1></div></div>';
	outerTable.prepend(heroDiv);
	outerTable.prepend(headerDiv);
	headerDiv.classList.add('header');
	heroDiv.classList.add('hero');
};

document.addEventListener('DOMContentLoaded', e => {
	// Input type arrays
	let inputPlaceholder = document.querySelectorAll("form input:not([type=radio]):not([type=checkbox]):not(#CONTRIBUTION_AMOUNT0other,#roibtnsubmit,#client,#page,#SOURCE_CODE,#PLEDGE_TYPE,#CONTRIBUTION_FREQUENCY,#CONTRIBUTION_DURATION,#CONTRIBUTION_DATE)");
	let selectPlaceholder = document.querySelectorAll('form select:not(#CCEXPDTmo, #CCEXPDTyr)');

	try {
		// Adding placeholder to other amount
		document.getElementById('CONTRIBUTION_AMOUNT0other').setAttribute("placeholder", "Other");
		// Updating CC expiration default text
		document.querySelector("#CCEXPDTmo").options[0].textContent = "Month";
		document.querySelector("#CCEXPDTyr").options[0].textContent = "Year";

		// Adding classes
		document.getElementById('roiinputcaptioncellemailoption').parentElement.classList.add('roicheckboxcaptioncellEMAILOPT');
	} catch (e) {}

	changePlaceholder(inputPlaceholder);
	changePlaceholder(selectPlaceholder);
	headerHero();

	document.querySelector("#CONTRIBUTION_AMOUNT0").addEventListener('click', e => {
		setTimeout(() => {
      document.querySelector("#CONTRIBUTION_AMOUNT0other").focus();
    }, 100);
	});
});
