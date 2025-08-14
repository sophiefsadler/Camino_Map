# process_gpx.py

import os
import gpxpy
import gpxpy.gpx
import re
import json
from math import sin, cos, sqrt, atan2, radians

# --- Configuration ---
GPX_DIRECTORY = 'assets/gpx_files' 
OUTPUT_DATA_DIR = 'data'
OUTPUT_METADATA_FILE = 'camino-metadata.js'
SIMPLIFICATION_FACTOR = 10

def haversine_distance(p1, p2):
    """Calculate the distance between two lat/lon points in kilometers."""
    R = 6371.0  # Radius of Earth in kilometers

    lat1, lon1 = radians(p1.latitude), radians(p1.longitude)
    lat2, lon2 = radians(p2.latitude), radians(p2.longitude)

    dlon = lon2 - lon1
    dlat = lat2 - lat1

    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    
    return R * c

def parse_gpx_files(directory):
    all_tracks = []
    gpx_files = [f for f in os.listdir(directory) if f.endswith('.gpx')]
    
    filename_pattern = re.compile(r'Day_(\d+)_(.*)_to_(.*)\.gpx', re.IGNORECASE)
    
    def get_day_number(filename):
        match = filename_pattern.search(filename)
        if match:
            return int(match.group(1))
        return 999 

    gpx_files.sort(key=get_day_number)
    print(f"Found and sorted {len(gpx_files)} GPX files...")

    for filename in gpx_files:
        match = filename_pattern.search(filename)
        if not match:
            print(f"  - Skipping file with unexpected name: {filename}")
            continue

        day_index = int(match.group(1))
        start_location = match.group(2).replace('_', ' ')
        end_location = match.group(3).replace('_', ' ')
        
        filepath = os.path.join(directory, filename)
        
        with open(filepath, 'r') as gpx_file:
            gpx = gpxpy.parse(gpx_file)
            
            distance_km = round(gpx.length_3d() / 1000, 1)

            points_full = []
            elevation_data = [] # New: To store [distance, elevation] pairs
            cumulative_distance = 0.0
            last_point = None

            for track in gpx.tracks:
                for segment in track.segments:
                    for point in segment.points:
                        points_full.append([round(point.longitude, 6), round(point.latitude, 6)])

                        if last_point:
                            cumulative_distance += haversine_distance(last_point, point)
                        
                        # Add data point for the elevation chart
                        if point.elevation is not None:
                            elevation_data.append([round(cumulative_distance, 3), round(point.elevation)])
                        
                        last_point = point

            points_simple = points_full[::SIMPLIFICATION_FACTOR]
            if points_full and points_full[-1] != points_simple[-1]:
                points_simple.append(points_full[-1])

            all_tracks.append({
                'day': day_index,
                'start': start_location,
                'end': end_location,
                'distance': distance_km,
                'points_full': points_full,
                'points_simple': points_simple,
                'elevation_data': elevation_data # New: Add elevation data to the track object
            })
            print(f"  - Processed Day {day_index}: {start_location} to {end_location} ({distance_km} km), found {len(elevation_data)} elevation points.")

    return all_tracks

def write_data_files(tracks):
    """
    Writes the geographic data to individual JSON files and the
    metadata to a single JavaScript file.
    """
    if not os.path.exists(OUTPUT_DATA_DIR):
        os.makedirs(OUTPUT_DATA_DIR)
        print(f"Created directory: '{OUTPUT_DATA_DIR}/'")

    metadata = []

    # Add Day 0 metadata manually
    metadata.append({
        'day': 0,
        'start': "Arrival in",
        'end': "Saint-Jean-Pied-de-Port",
        'distance': 0,
        'diaryFile': "diaries/day_00.md",
        'photo': "https://raw.githubusercontent.com/sophiefsadler/Camino_Map/main/images/day_00.jpg",
        'center_coord': [43.1636, -1.2372],
        'zoom_level': 15
    })

    for track in tracks:
        # Create metadata entry (without path data)
        metadata.append({
            'day': track['day'],
            'start': track['start'],
            'end': track['end'],
            'distance': track['distance'],
            'diaryFile': f"diaries/day_{track['day']:02d}.md",
            'photo': f"https://raw.githubusercontent.com/sophiefsadler/Camino_Map/main/images/day_{track['day']:02d}.jpg",
        })

        # Create the JSON file for the path data
        path_data = {
            'path_full': track['points_full'],
            'path_simple': track['points_simple'],
            'elevation_data': track['elevation_data'] # New: Add elevation data to the JSON file
        }
        json_filename = f"day_{track['day']:02d}.json"
        json_filepath = os.path.join(OUTPUT_DATA_DIR, json_filename)
        with open(json_filepath, 'w') as f:
            json.dump(path_data, f)

    # Write the metadata file
    js_content = "const caminoMetadata = " + json.dumps(metadata, indent=2) + ";\n"
    with open(OUTPUT_METADATA_FILE, 'w') as f:
        f.write(js_content)
    
    print(f"\nSuccessfully created metadata file: {OUTPUT_METADATA_FILE}")
    print(f"Successfully created {len(tracks)} JSON data files in '{OUTPUT_DATA_DIR}/'.")


if __name__ == '__main__':
    tracks_data = parse_gpx_files(GPX_DIRECTORY)
    if tracks_data:
        write_data_files(tracks_data)
    else:
        print("No GPX files found. Please check the 'gpx_files' directory.")
