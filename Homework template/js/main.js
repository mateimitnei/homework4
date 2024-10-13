(function(){
    const gallery = document.querySelector('#gallery'),
        btn = document.querySelector('.add-image'),
        counter = document.querySelector('.counter'),
        modalAlert = document.querySelector('#modal-alert'),
        sortSelect = document.querySelector('#sort-select'),
        maxItems = 16;
    let dataCpy = data,
        uniqueId = data.length;

    reload();

    // Creates the gallery and updates the image counter
    function reload() {
        const savedFilter = localStorage.getItem('sortMethod') || 'a-to-z';
        sortSelect.value = savedFilter;
        dataCpy = sortImages(dataCpy, savedFilter);
        gallery.innerHTML = generateGallery(transformData(dataCpy));
        counter.textContent = `${dataCpy.length} / ${maxItems}`;
        headerStyle (dataCpy.length === maxItems);
    }

    function headerStyle(boolean) {
        if (boolean) {
            btn.id = "disabled-btn";
            counter.id = "full-counter";
        }
        else {
            btn.id = "";
            counter.id = "";
        }
    }

    function generateGallery(allImages) {
        let result = '';
        for (let index = 0; index < allImages.length; index++) {
            const item = allImages[index];
            result +=
                `<div class="image-wrapper blur" id="${item.id}">\
                    <img src="${item.url}" alt="${item.name}" class="round-border">\
                    <div class="info-wrapper">\
                        <div>${item.name}</div>\
                        <div class="top-padding">${item.description}</div>\
                        <div>${item.date}</div>\
                    </div>\
                    <button class="delete-btn round-border blur">Delete</button>\
                </div>`;
        }
        return result;
    }

    function transformData(data) {
        return data.map((item) => {
            const tmpDate = new Date(item.date);
            return {
                id: item.id,
                name : item.name[0].toUpperCase() + item.name.slice(1).toLowerCase(),
                url : "http://" + item.url,
                description : item.description.slice(0, 15) + "...",
                date : tmpDate.getFullYear() + "/" +
                    tmpDate.getMonth() + "/" +
                    tmpDate.getDate() + " " +
                    tmpDate.getHours() + ":" +
                    tmpDate.getMinutes(),
            }
        });
    }

    // If possible, adds a random image from 'data', else displays the modal pop-up
    function addImage() {
        if (dataCpy.length < maxItems) {
            const rndIndex = Math.floor(Math.random() * data.length);
            const newItem = {...data[rndIndex]};
            newItem.id = ++uniqueId;
            dataCpy = [newItem, ...dataCpy];
            reload();
        }
        else {
            const modalPopUp = new bootstrap.Modal(modalAlert);
            modalPopUp.show();
        }
    }

    // Deletes the parent image of the clicked 'Delete' button
    function deleteImage() {
        gallery.addEventListener('click', (event) => {
            // Check if the clicked element is a delete button
            if (event.target.classList.contains('delete-btn')) {
                // Remove the parent item (image-wrapper)
                const imageItem = event.target.closest('.image-wrapper');
                if (imageItem) {
                    dataCpy = dataCpy.filter(item => item.id !== Number(imageItem.id));
                    reload();
                }
            }
        });
    }

    function sortImages(dataCpy, sortMethod) {
        switch (sortMethod) {
            case 'a-to-z':
                return dataCpy.sort((a, b) => a.name.localeCompare(b.name));
            case 'z-to-a':
                return dataCpy.sort((a, b) => b.name.localeCompare(a.name));
            case 'newest':
                return dataCpy.sort((a, b) => b.date - a.date);
            case 'oldest':
                return dataCpy.sort((a, b) => a.date - b.date);
            default:
                return dataCpy;
        }
    }

    function changeSort() {
        const sortMethod = sortSelect.value;
        localStorage.setItem('sortMethod', sortMethod);
        reload();
    }

    sortSelect.addEventListener('change', changeSort);
    btn.addEventListener('click', addImage);
    document.addEventListener('DOMContentLoaded', deleteImage);
})()
