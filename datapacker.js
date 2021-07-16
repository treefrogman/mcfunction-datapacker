class McFunction {
	#codeField;
	constructor(mcfunction) {
		this.name = mcfunction?.name || "";
		this.code = mcfunction?.code || "";
		this.view = document.createElement("li");
		this.view.className = "mcfunction";
		const thisMcFunction = this;

		const nameField = document.createElement("input");
		nameField.type = "text";
		nameField.value = this.name;
		nameField.placeholder = "function/file name";
		function nameChangeHandler() {
			thisMcFunction.name = nameField.value;
			autoSave();
		};
		nameField.addEventListener("change", nameChangeHandler);
		nameField.addEventListener("input", nameChangeHandler);

		this.#codeField = document.createElement("textarea");
		this.#codeField.value = this.code;
		this.#codeField.setAttribute("spellcheck", "false");
		this.#codeField.placeholder = "mcfunction code";
		function codeChangeHandler() {
			thisMcFunction.code = thisMcFunction.#codeField.value;
			autoSave();
		};
		this.#codeField.addEventListener("change", codeChangeHandler);
		this.#codeField.addEventListener("input", codeChangeHandler);

		const deleteButton = document.createElement("button");
		deleteButton.textContent = "Delete";
		deleteButton.className = "delete-button";
		deleteButton.addEventListener("click", (e) => {
			if (e.altKey || confirm("Delete this McFunction?\n\nHold ALT / OPTION to bypass this warning.")) {
				pack.mcfunctions.splice(pack.mcfunctions.indexOf(this), 1);
				autoSave();
				thisMcFunction.view.parentElement.removeChild(this.view);
			}
		});
		this.view.append(nameField, deleteButton, this.#codeField);
	}
}

function autoSave() {
	localStorage.setItem("pack", JSON.stringify(pack));
}

function packUpAndDownload(pack) {
	const zip = new JSZip();
	zip.file("pack.mcmeta", JSON.stringify({
		pack: {
			pack_format: 3,
			description: pack.description
		}
	}));

	const functionsFolder = zip.folder("data").folder(pack.name).folder("functions");
	pack.mcfunctions.forEach(function (mcfunction) {
		functionsFolder.file(mcfunction.name + ".mcfunction", mcfunction.code);
	});
	zip.generateAsync({ type: "blob" }).then(function (content) {
		saveAs(content, pack.name + ".zip");
	});
}

const pack = JSON.parse(localStorage.getItem("pack") || JSON.stringify({
	name: "",
	description: "",
	mcfunctions: [
		{
			name: "",
			code: ""
		}
	]
}));

window.addEventListener("keydown", function (e) {
	if (e.code === "Escape") {
		document.activeElement.blur();
	}
});

const editor = document.createElement("section");
const reference = document.createElement("section");
document.body.append(editor, reference);

const downloadButton = document.createElement("button");
const packNameField = document.createElement("input");
const packDescriptionField = document.createElement("textarea");
const packMcFunctionList = document.createElement("ul");
packMcFunctionList.className = "mcfunction-list";
editor.append(packNameField, downloadButton, packDescriptionField, packMcFunctionList);

downloadButton.textContent = "Download as datapack";
downloadButton.id = "download-button";
downloadButton.addEventListener("click", () => {
	packUpAndDownload(pack);
});

packNameField.type = "text";
packNameField.value = pack.name;
packNameField.placeholder = "pack name";
function packNameChangeHandler() {
	pack.name = packNameField.value;
	autoSave();
}
packNameField.addEventListener("change", packNameChangeHandler);
packNameField.addEventListener("input", packNameChangeHandler);

packDescriptionField.value = pack.description;
packDescriptionField.placeholder = "pack description";
function packDescriptionChangeHandler() {
	pack.description = packDescriptionField.value;
	autoSave();
}
packDescriptionField.addEventListener("change", packDescriptionChangeHandler);
packDescriptionField.addEventListener("input", packDescriptionChangeHandler);

const addMcFunctionButton = document.createElement("button");
addMcFunctionButton.id = "add-mcfunction-button";
addMcFunctionButton.textContent = "Add McFunction";
addMcFunctionButton.addEventListener("click", function () {
	const mcFunction = new McFunction(null);
	pack.mcfunctions.unshift(mcFunction);
	addMcFunctionButton.after(mcFunction.view);
});

{
	pack.mcfunctions = pack.mcfunctions.map((mcfunction) => {
		mcfunction = new McFunction(mcfunction);
		return mcfunction;
	});
	const mcfunctionViews = pack.mcfunctions.map((mcfunction) => mcfunction.view);

	packMcFunctionList.append(addMcFunctionButton, ...mcfunctionViews);
}
