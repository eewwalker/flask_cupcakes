import os

from flask import Flask, jsonify, request
# from flask_debugtoolbar import DebugToolbarExtension

from models import db, connect_db, Cupcake

app = Flask(__name__)
app.config['SECRET_KEY'] = "secret"

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    "DATABASE_URL", "postgresql:///cupcakes")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)

# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
# toolbar = DebugToolbarExtension(app)


@app.get("/api/cupcakes")
def get_cupcakes():
    """ Get data about all cupcakes

    Returns JSON {cupcakes: [{id, flavor, size, rating, image_url}, ...]}"""

    cupcakes = Cupcake.query.all()
    serialized = [c.serialize() for c in cupcakes]

    return jsonify(cupcakes=serialized)


@app.get("/api/cupcakes/<int:cupcake_id>")
def get_cupcake_details(cupcake_id):
    """ Get data about single cupcake

    Returns JSON {cupcake: {id, flavor, size, rating, image_url}}"""

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    serialized = cupcake.serialize()

    return jsonify(cupcake=serialized)



@app.post('/api/cupcakes')
def create_cupcake():
    """Creates a new cupcake:

    Accepts JSON {flavor, size, rating, image_url(optional)}
    Returns JSON {cupcake: {id, flavor, size, rating, image_url}}
    """

    new_cupcake = Cupcake(
        flavor=request.json['flavor'],
        size=request.json['size'],
        rating=request.json['rating'],
        image_url=request.json.get('image_url') or None
    )

    db.session.add(new_cupcake)
    db.session.commit()

    serialized = new_cupcake.serialize()

    return (jsonify(cupcake=serialized), 201)

@app.patch("/api/cupcakes/<int:cupcake_id>")
def patch_cupcake(cupcake_id):
    """ Update part of cupcake data

    Accepts JSON of data to be updated {id, flavor, size, rating, image_url}
    Returns JSON {cupcake: {id, flavor, size, rating, image_url}}

    """
    cupcake = Cupcake.query.get_or_404(cupcake_id)

    cupcake.flavor=request.json.get('flavor', cupcake.flavor),
    cupcake.size=request.json.get('size', cupcake.size),
    cupcake.rating=request.json.get('rating', cupcake.rating),
    cupcake.image_url=request.json.get('image_url', cupcake.image_url)

    db.session.commit()

    serialized = cupcake.serialize()

    return jsonify(cupcake = serialized)



