def remove_duplicates(filename):
    with open(filename, 'r') as file:
        movies = file.readlines()
        # Remove whitespace and newline characters
        movies = [movie.strip() for movie in movies]
    
    # Remove duplicates while preserving order
    unique_movies = []
    [unique_movies.append(movie) for movie in movies if movie not in unique_movies]

    with open(filename, 'w') as file:
        for movie in unique_movies:
            file.write(movie + '\n')

# Replace 'movies.txt' with your file path
remove_duplicates('movies.txt')
