var modal = document.querySelector(".book-modal");
var modalImg = document.querySelector(".modal-img");
var captionText = document.querySelector(".book-caption");
var images = document.querySelectorAll(".book-cover-image");
console.log(images)

images.forEach(img => {
    img.addEventListener('click', function () {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;

        var closeBtn = document.querySelector(".book-modal-close");
        closeBtn.addEventListener('click', function () {
            modal.style.display = "none";
        })
    })
})

