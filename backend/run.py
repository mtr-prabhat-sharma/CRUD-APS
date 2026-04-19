from app import create_app

app = create_app()

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",   # allows external access (useful for Docker later)
        port=5000,
        debug=True        # auto reload on changes
    )