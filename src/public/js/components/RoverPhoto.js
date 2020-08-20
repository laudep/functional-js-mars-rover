export const RoverPhoto = photo =>
    `<img id="img_${photo.id}" 
      class="rover-image" 
      src="${photo.img_src}" 
      alt="${photo.img_src}">
<div id="modal_${photo.id}" class="modal">
   <span id="close_${photo.id}" class="close">&times;</span>
   <img id="modal_img_${photo.id}" class="modal-content">
   <div id="caption_${photo.id}" class="caption">taken on ${photo.earth_date}<br>(sol ${photo.sol})</div>
</div>
`;

export const photoClickHandler = (event) => {
    const sourceImg = event.srcElement;
    const photoId = sourceImg.id.replace("img_", "");
    const modal = sourceImg.nextElementSibling;
    const modalImage = document.getElementById(`modal_img_${photoId}`);
    // const captionText = document.getElementById(`caption_${photoId}`);

    if (!modal || !sourceImg) {
        return;
    }
    modal.style.display = "block";
    modalImage.src = sourceImg.src;
    // captionText.innerHtml = sourceImg.alt;
};

export const modalCloseHandler = event => {
    const photoId = event.srcElement.id.split('_')[1];
    const modal = document.getElementById(`modal_${photoId}`);
    if (modal) {
        modal.style.display = "none";
    }
}