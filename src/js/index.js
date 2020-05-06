const dropbox = document.getElementById("upload_zone");
const down_arrow = document.getElementById("down_arrow");
const drop_files_here = document.getElementById("drop_files_here");
const drop_here_text = document.getElementById("drop_here_text");
const zone_close_icon = document.getElementById("zone_close_icon");
const preview = document.getElementById("preview");
let images = [];

const stopEvent = e => {
    e.stopPropagation(); //終止事件傳導
    e.preventDefault();  //終止預設行為
};

const toggleActiveStyle = (add) => {
    if (add) {

        down_arrow.classList.add("down_arrow_active");
        drop_here_text.classList.add("display_none");

    } else {

        down_arrow.classList.remove("down_arrow_active");
        drop_here_text.classList.remove("display_none");
    }
};

function handleFileSelect(e) {
    stopEvent(e);
    const fileUploader = document.getElementById("fileUploader");
    fileUploader.click();
}

const click = e => handleFileSelect(e);

// prevent the default method working
function dragenter(e) {
    // add the styling to div
    toggleActiveStyle(true);
    stopEvent(e);
}

const dragleave = () => toggleActiveStyle(false);

// prevent the default method working
const dragover = e => stopEvent(e);

function handleFiles(files) {
    for (var i = 0; i < files.length; i++) {
        const file = files[i];
        const imageType = /image.*/;

        if (!file.type.match(imageType)) {
            continue;
        }

        images.push(file);
        renderPreview();
    }
}

function drop(e) {
    stopEvent(e);

    const dt = e.dataTransfer;
    const files = dt.files;

    handleFiles(files);
    toggleActiveStyle(false);
}

const clearPreview = () => {
    images = [];
    renderPreview();
};

const renderPreview = () => {

    preview.innerHTML = ''; // Clearing innerHTML of preview.

    if (images && images.length > 0) {
        drop_files_here.classList.add("display_none");
    } else {
        drop_files_here.classList.remove("display_none");
    }

    images.forEach(file => {

        const img = document.createElement("img");
        img.classList.add("preview_image");
        img.file = file;
        preview.appendChild(img);

        const reader = new FileReader();
        reader.onload = (e => img.src = e.target.result);
        reader.readAsDataURL(file);
    });
};

dropbox.addEventListener("click", click, false);
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragleave", dragleave, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);
zone_close_icon.addEventListener("click", clearPreview, false);
