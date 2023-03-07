export const API_URL = "http://localhost:5000/api";
export const CODE_EXEMPLE = `function generateSelector(context) {
   let index, pathSelector;
 
   if (context === "null") throw new Error("not an dom reference");
   // call getIndex function
   index = getIndex(context);
   while (context.tagName) {
     // selector path
     let classList = Array.from(context.classList)
       .map((cls) => "." + cls)
       .join("");
     //dataset = getDataSet(context);
     pathSelector =
       context.localName +
       (classList ? classList : "") +
       //(dataset ? dataset : "") +
       (pathSelector ? ">" + pathSelector : "");
     context = context.parentNode;
   }
   // selector path for nth of type
   pathSelector = pathSelector + \`:nth-of-type(\${index})\`;
   return pathSelector;
 }`;
