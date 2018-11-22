module.exports = () => {
  let img = document.getElementByTagName("image")[0];
  let att = document.createAttribute("class");
  att.value = "image";
  img.onclick = () => {
    img.setAttributeNode(att);
  }
}
