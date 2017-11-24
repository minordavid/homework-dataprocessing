#!/usr/bin/env python
# Name: David Vesseur
# Student number: 10901272
'''
This script scrapes IMDB and outputs a CSV file with highest rated tv series.
'''
import csv


from pattern.web import URL, DOM, plaintext


TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'

# make class tvserie, use encode to where needed
class tvserie:
    def __init__(self, title, rating, genre, stars, runtime):
        self.title = title.encode("utf-8")
        self.rating = rating
        self.genre = genre
        self.stars = stars.encode("utf-8")
        self.runtime = runtime

def extract_tvseries(dom):
    '''
    Extract a list of highest rated TV series from DOM (of IMDB page).

    Each TV series entry should contain the following fields:
    - TV Title
    - Rating
    - Genres (comma separated if more than one)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    '''
#print dom.body.content
    
    tvseries = []

    # go through all movies
    for e in dom.by_tag("div.lister-item"):

        # get title of the film
        title = e.by_tag("h3")[0].by_tag("a")[0].content
        
        # get the rating
        rating = e.by_tag("span.value")[0].content

        # get genre and strip enters and space
        genre = e.by_tag("span.genre")[0].content.strip("\n").strip(" ")

        # make/set stars with ""
        stars = ""

        # get the star and put them in string stars
        for j in e.by_tag("p")[2].by_tag("a"):
            star = j.content
            stars += star
            stars += ", "
            
        # get the runtime and strip " min"
        runtime = e.by_tag("p")[0].by_tag("span.runtime")[0].content.strip(" min")
        
        # add the class to the array, use stars[:-2] to remove last ", "
        tvseries.append(tvserie(title, rating, genre, stars[:-2], runtime))

    return tvseries

def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest rated TV-series.
    '''
    writer = csv.writer(f)
    writer.writerow(['Title', 'Rating', 'Genre', 'Actors', 'Runtime'])

    # write in csv for serie in series
    for tvserie in tvseries:
        writer.writerow((tvserie.title, tvserie.rating, tvserie.genre, 
                        tvserie.stars, tvserie.runtime))
if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)