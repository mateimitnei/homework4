(function(){
    const allImages = transformData();

    const btn = document.getElementById("play"),
        firstBlock = document.querySelector('#first-line'),
        secondBlock = document.querySelector('#second-line'),
        thirdBlock = document.querySelector('#third-line'),
        firstGroup = document.querySelector('.first-group'),
        secondGroup = document.querySelector('.second-group'),
        thirdGroup = document.querySelector('.third-group'),
        methodElement = document.getElementById('type-selector'),
        numberOfItemsElement = document.getElementById('line-selector')

    const methodHandler = {
        "1": generateGalleryWithReplace,
        "2": generateGalleryWithStringTemplate,
        "3": generateGalleryWithCreateElement,
    }

    function init() {
        // Values from the select boxes
        const method = methodElement.value;
        const numberOfItems = getNumberOfItems(numberOfItemsElement.value);

        hideAllBlocks();

        // Determine which method of building the gallery needs to be used
        // Replace method
        if (method === "1") {
            firstGroup.classList.replace("hide","show");

            firstBlock.innerHTML = generateGallery(method, numberOfItems);
        }
        // Strings method
        else if (method === "2") {
            secondGroup.classList.replace("hide","show");

            secondBlock.innerHTML = generateGallery(method, numberOfItems);
        }
        else if (method === "3") {
            thirdGroup.classList.replace("hide","show");

            thirdBlock.innerHTML = generateGallery(method, numberOfItems);
        }
    }

    function generateGallery(method, numberOfItems) {
        let result = '';

        for (let index = 0; index < numberOfItems; index++) {
            result += methodHandler[method](allImages[index])
        }

        return result;
    }

    function generateGalleryWithReplace(item) {
        const replaceItems =
            '<div class="col-lg-3 col-md-6">\
                <img src="$url" alt="$name" class="img-thumbnail">\
                <div class="info-wrapper">\
                    <div class="text-muted">$name</div>\
                    <div class="text-muted top-padding">$description</div>\
                    <div class="text-muted">$date</div>\
                </div>\
            </div>';

        return replaceItems
            .replace(/\$name/gi, item.name)
            .replace("$url", item.url)
            .replace("$description", item.description)
            .replace("$date", item.date);
    }

    function generateGalleryWithStringTemplate(item) {
       return `<div class="col-sm-3 col-xs-6">\
                        <img src="${item.url}" alt="${item.name}" class="img-thumbnail">\
                        <div class="info-wrapper">\
                            <div class="text-muted">${item.name}</div>\
                            <div class="text-muted top-padding">${item.description}</div>\
                            <div class="text-muted">${item.date}</div>\
                        </div>\
                    </div>`;
    }

    function generateGalleryWithCreateElement(item) {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("col-sm-3", "col-xs-6");
        const image = document.createElement("img");
        image.src = item.url;
        image.alt = item.name;
        image.classList.add("img-thumbnail");
        const infoBox = document.createElement("div");
        infoBox.classList.add("info-wrapper");
        const title = document.createElement("div");
        title.textContent = item.name;
        title.classList.add("text-muted");
        const description = document.createElement("div");
        description.textContent = item.description;
        description.classList.add("text-muted", "top-padding");
        const date = document.createElement("div");
        date.textContent = item.date;
        date.classList.add("text-muted");

        infoBox.appendChild(title);
        infoBox.appendChild(description);
        infoBox.appendChild(date);

        imageContainer.appendChild(image);
        imageContainer.appendChild(infoBox);

        return imageContainer.outerHTML;
    }

    function getNumberOfItems(value) {
        switch (value) {
            case "0": // All images
                return allImages.length;
            case "1": // 3 images
                return 3;
            case "2": // 6 images
                return 6;
        }
    }

    function hideAllBlocks() {
        firstGroup.classList.replace("show","hide");
        secondGroup.classList.replace("show","hide");
        thirdGroup.classList.replace("show","hide");
    }

    function transformData() {
        return data.map(function(item){
            const tmpDate = new Date(item.date);
            return {
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

    btn.addEventListener("click", init);
})()
