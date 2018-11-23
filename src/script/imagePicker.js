export default function imagePicker () {
  let img = document.getElementsByTagName("image")[0];
  let att = document.createAttribute("class");
  att.value = "image";
  img.onclick = () => {
    img.setAttributeNode(att);
  }
}
