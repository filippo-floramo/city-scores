import axios from "axios";

export default function bar() {

   async function foo() {

      const response = await axios.get('https://api.goclimate.com/v1/flight_footprint?segments[0][origin]=CTA&segments[0][destination]=FCO&segments[1][origin]=FCO&segments[1][destination]=CTA&cabin_class=economy&currencies[]=SEK&currencies[]=USD', {
         headers: {
            API_KEY: "Basic Yjc4YzQ4OWE4MGM2ZGExMjQ1ZDFjY2QzOg=="
        },
         mode: 'no-cors'
      });

      console.log(response)

   };
   foo();
}







