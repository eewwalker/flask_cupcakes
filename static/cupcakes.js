"use strict";

const BASE_URL = "https://localhost:5001"
const $cupcakeList = $("#cupcake-list")

async function addNewCupcake(evt){
  evt.preventDefault()

  const flavor = $("#flavor").val()
  const size = $("#size").val()
  const rating = $("#rating").val()
  const image_url = $("#image_url").val()

  cupcake_data = JSON.stringify(
    {
      "flavor": flavor,
      "size": size,
      "rating": rating,
      "image_url": image_url
    }
  )

  await fetch(`${BASE_URL}/api/cupcakes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: cupcake_data
  })
};

$("#new-cupcake-form").on("submit", await addNewCupcake);
