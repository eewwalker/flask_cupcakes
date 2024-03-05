"use strict";

const $cupcakeList = $("#cupcake-list");

async function getCupcakes() {

  const resp = await fetch('/api/cupcakes');
  const data = await resp.json();
  // console.log(data.cupcakes[0]);
  return data.cupcakes;
}

function htmlMarkup({ flavor, rating, size, image_url }) {

  return (
    `<div>${flavor}</div>
      <div>${rating}</div>
      <div>${size}</div>
      <div><img src="${image_url}" style="height: 150px"></img></div>`
  );
}

function displayCupcakes(cupcakes) {
  for (const cupcake of cupcakes) {
    const $liCupcake = $("<li>").html(htmlMarkup(cupcake));
    $cupcakeList.append($liCupcake);
  }
}

async function start() {
  const cupCakeData = await getCupcakes();
  displayCupcakes(cupCakeData);
}

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