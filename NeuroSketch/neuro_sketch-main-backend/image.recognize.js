
// async function fetchData() {
//   try {
//     const response = await fetch("http://localhost:5000/api/title");

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const data = await response.json();
//     console.log(data);

//     // Call addEventListenerLeftSideBar function once data is retrieved
//     if (data.title === "Button") {
//       addEventListenerLeftSideBar(svgObject);
//     }
//   } catch (error) {
//     console.error("There was a problem with the fetch operation:", error);
//   }
// }

