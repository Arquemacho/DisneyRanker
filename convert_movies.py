def create_movies_js_from_txt(txt_file_path, js_file_path='movies.js'):
    with open(txt_file_path, 'r', encoding='utf-8') as file:
        movie_titles = [line.strip() for line in file if line.strip()]

    with open(js_file_path, 'w', encoding='utf-8') as js_file:
        js_file.write('const movies = [\n')
        for title in movie_titles:
            js_file.write(f'    "{title}",\n')
        js_file.write('];\n\nexport default movies;\n')

# Replace 'path_to_your_file.txt' with the path to your .txt file
create_movies_js_from_txt('movies.txt')
