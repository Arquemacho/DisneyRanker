import requests
import json
import re

def read_movie_titles(file_path):
    print(f"Reading movie titles from {file_path}")
    try:
        with open(file_path, 'r') as file:
            content = file.read()
            titles = re.findall(r'\"(.*?)\"', content)
            print(f"Found {len(titles)} movie titles")
            return titles
    except IOError as e:
        print(f"Error reading file {file_path}: {e}")
        return []

def fetch_posters(api_key, movie_titles):
    base_url = "https://api.themoviedb.org/3/search/movie"
    posters = {}
    print("Fetching posters for movies...")

    for title in movie_titles:
        try:
            print(f"Fetching poster for '{title}'")
            response = requests.get(base_url, params={"api_key": api_key, "query": title})
            response.raise_for_status()
            data = response.json()
            results = data.get("results")
            if results and len(results) > 0:
                movie = results[0]
                poster_url = f"https://image.tmdb.org/t/p/w500{movie['poster_path']}"
                posters[title] = poster_url
                print(f"Found poster: {poster_url}")
            else:
                print(f"No results found for '{title}'")
        except requests.RequestException as e:
            print(f"Error fetching poster for {title}: {e}")

    return posters

def save_to_json(file_path, data):
    print(f"Saving data to {file_path}")
    try:
        with open(file_path, 'w') as file:
            json.dump(data, file, indent=4)
            print("Data saved successfully.")
    except IOError as e:
        print(f"Error saving data to {file_path}: {e}")

def main():
    api_key = "83ec3237b21273a67ebe413154877f59"  # Replace with your TMDb API key
    movie_titles = read_movie_titles("movies.js")  # Replace with the path to your movies.js file
    posters = fetch_posters(api_key, movie_titles)
    save_to_json("movie_posters.json", posters)

if __name__ == "__main__":
    main()
