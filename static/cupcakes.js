"use strict";

const $cupcakeList = $("#cupcake-list");

/** getCupcakes request to get all cupcakes in db  */

async function getCupcakes() {

  const resp = await fetch('/api/cupcakes');
  const data = await resp.json();

  return data.cupcakes;
}

/** htmlMarkup takes obj keys and creates html markup with values */

function htmlMarkup({ flavor, rating, size, image_url }) {

  return (
    `<div>${flavor}</div>
      <div>${rating}</div>
      <div>${size}</div>
      <div>
        <img src="${image_url}" style="height: 150px"></img>
      </div>`
  );
}

/** displayCupcakes takes cupcakes array and displays on page  */
function displayCupcakes(cupcakes) {

  for (const cupcake of cupcakes) {

    const $liCupcake = $("<li>").html(htmlMarkup(cupcake));
    $cupcakeList.append($liCupcake);

  }

}

/** start gets cupcakes from API and displays on page */
async function start() {

  const cupCakeData = await getCupcakes();
  displayCupcakes(cupCakeData);

}

/** addNewCupcake makes request to add newCupCake to server  */
async function addNewCupcake(flavor, size, rating, image_url) {

  const cupcakeData = JSON.stringify(
    {
      "flavor": flavor,
      "size": size,
      "rating": rating,
      "image_url": image_url
    }
  );

  const response = await fetch("/api/cupcakes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },

    body: cupcakeData

  });

  return await response.json();

};

/** handleSubmit event handler; gets form value and displays markup on page  */

async function handleSubmit(evt) {
  evt.preventDefault();

  const flavor = $("#flavor").val();
  const size = $("#size").val();
  const rating = $("#rating").val();
  const image_url = $("#image_url").val();

  const newCupcake = await addNewCupcake(flavor, size, rating, image_url);
  const $newLI = htmlMarkup(newCupcake.cupcake);
  $cupcakeList.append($newLI);

}


$("#new-cupcake-form").on("submit", handleSubmit);

start();