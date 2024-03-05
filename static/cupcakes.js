"use strict";

const $cupcakeList = $("#cupcake-list");

async function getCupcakes() {

  const resp = await fetch('/api/cupcakes');
  const data = await resp.json();
  // console.log(data.cupcakes[0]);
  return data.cupcakes;
}

function displayCupcakes(cupcakes) {
  for (const cupcake of cupcakes) {
    console.log(cupcake);
    const $liCupcake = $("<li>").html(cupcake.flavor, cupcake.rating, cupcake.size, cupcake.image_url);
    $cupcakeList.append($liCupcake);
  }
}


function start() {
  const cupCakeData = getCupcakes();
  displayCupcakes(cupCakeData);
}

// async function addNewCupcake(evt) {
//   evt.preventDefault();

//   const flavor = $("#flavor").val();
//   const size = $("#size").val();
//   const rating = $("#rating").val();
//   const image_url = $("#image_url").val();

//   cupcake_data = JSON.stringify(
//     {
//       "flavor": flavor,
//       "size": size,
//       "rating": rating,
//       "image_url": image_url
//     }
//   );

//   await fetch(`${BASE_URL}/api/cupcakes`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: cupcake_data
//   });
// };

// $("#new-cupcake-form").on("submit", await addNewCupcake);

start();