from . import bp

@bp.route("/members")
def members():
    return {"members": ["Elabed Amina", "Messikh Wissal", "Hennane Douaa"]}