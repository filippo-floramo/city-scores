
import axios from "axios";


export default function app() {


   let input = document.querySelector(".search-bar");

   let submit = document.querySelector(".submit-btn");

   let scoreContainer = document.querySelector(".score-descr");

   let cityScore = document.querySelector(".teleport-score");

   let scoreLeft = document.querySelector(".scores-left-content");

   let scoreRight = document.querySelector(".scores-right-content");

   let description = document.querySelector(".summary");


   /*Creating functions to manage input from user and retrieve data*/

   function manageQuery(args) {

      let queries = args.toLowerCase().split(" ");

      let queriesFiltered = queries.filter((value) => value !== "");

      let apiUrl = `https://api.teleport.org/api/urban_areas/slug:${queriesFiltered[0]}`;

      queriesFiltered.forEach((item, index) => {
         if (index >= 1) { apiUrl += `-${item}`; };
      })
      apiUrl += `/scores/`;

      getData(apiUrl);
   };



   async function getData(url) {

      try {
         const response = await axios.get(url);

         const data = response.data;

         let dataCategories = data.categories;
         let dataSummary = data.summary;
         let dataCityScore = data.teleport_city_score;

         showData(dataCategories, dataSummary, dataCityScore);

      } catch (error) {

         if (error.response.status === 404) {

            scoreContainer.style.display = "none";
            alert("City not found. Try again!");
         }
      }
   };


   function showData(categories, summary, score) {

      scoreContainer.style.display = "flex";

      description.innerHTML = "";
      scoreRight.innerHTML = "";
      scoreLeft.innerHTML = "";
      cityScore.innerHTML = "";


      cityScore.innerHTML = score.toFixed(1);

      categories.forEach((item, index) => {

         let catName = item.name;
         let catScore = item.score_out_of_10.toFixed(1);

         let finalScore = `${catName}: <span style="color:#E74C3C;">${catScore}</span> <br>`;

         if (index <= 8) {
            scoreLeft.innerHTML += finalScore;
         } else {
            scoreRight.innerHTML += finalScore;
         };
      });

      description.innerHTML = summary;
   }


   /*Calling the functions on click*/

   submit.addEventListener("click", () => manageQuery(input.value));


   input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
         event.preventDefault();
         submit.click();
      }
   });
}