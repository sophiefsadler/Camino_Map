# process_gpx.py

import os
import gpxpy
import gpxpy.gpx
import re

# --- Configuration ---
GPX_DIRECTORY = 'gpx_files' 
OUTPUT_FILE = 'camino-data.js'
SIMPLIFICATION_FACTOR = 10

def parse_gpx_files(directory):
    """
    Parses all GPX files, extracts metadata from the filename,
    calculates the distance, and extracts full and simplified paths.
    """
    all_tracks = []
    gpx_files = [f for f in os.listdir(directory) if f.endswith('.gpx')]
    
    # This regex is designed to capture the day number, start, and end locations
    # from your specific filename format.
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
        # Replace underscores with spaces for clean place names
        start_location = match.group(2).replace('_', ' ')
        end_location = match.group(3).replace('_', ' ')
        
        filepath = os.path.join(directory, filename)
        
        with open(filepath, 'r') as gpx_file:
            gpx = gpxpy.parse(gpx_file)
            
            # --- NEW: Calculate distance ---
            distance_meters = gpx.length_3d() # Uses 3D length (includes elevation)
            distance_km = round(distance_meters / 1000, 1)

            points_full = []
            for track in gpx.tracks:
                for segment in track.segments:
                    for point in segment.points:
                        points_full.append([point.longitude, point.latitude])
            
            points_simple = points_full[::SIMPLIFICATION_FACTOR]
            if points_full and points_full[-1] != points_simple[-1]:
                points_simple.append(points_full[-1])

            all_tracks.append({
                'day': day_index,
                'start': start_location,
                'end': end_location,
                'distance': distance_km,
                'points_full': points_full,
                'points_simple': points_simple
            })
            print(f"  - Processed Day {day_index}: {start_location} to {end_location} ({distance_km} km)")

    return all_tracks

def write_js_file(tracks, output_file):
    """
    Writes the fully populated track data into a JavaScript file.
    """
    js_content = "const caminoData = [\n"
    
    for track in tracks:
        js_content += "  {\n"
        js_content += f"    day: {track['day']},\n"
        js_content += f"    start: '{track['start']}',\n"
        js_content += f"    end: '{track['end']}',\n"
        js_content += f"    distance: {track['distance']},\n"
        js_content += f"    description: '', // This will be loaded from the diary file\n"
        js_content += f"    diaryFile: 'diaries/day_{track['day']:02d}.md',\n" # e.g., diaries/day_01.md
        js_content += f"    photo: 'https://placehold.co/600x400/cccccc/ffffff?text=Day+{track['day']}',\n"
        
        js_content += "    path_full: [\n"
        # To keep the file size reasonable, we'll only write a few points as a sample here.
        # The script will write ALL points when you run it.
        for i, point in enumerate(track['points_full']):
            lon = round(point[0], 6)
            lat = round(point[1], 6)
            js_content += f"      [{lon}, {lat}]"
            js_content += ",\n" if i < len(track['points_full']) - 1 else "\n"
        js_content += "    ],\n"

        js_content += "    path_simple: [\n"
        for i, point in enumerate(track['points_simple']):
            lon = round(point[0], 6)
            lat = round(point[1], 6)
            js_content += f"      [{lon}, {lat}]"
            js_content += ",\n" if i < len(track['points_simple']) - 1 else "\n"
        js_content += "    ]\n"
        
        js_content += "  },\n"
        
    js_content += "];\n"
    
    with open(output_file, 'w') as f:
        f.write(js_content)
    print(f"\nSuccessfully created JavaScript data file: {output_file}")


if __name__ == '__main__':
    tracks_data = parse_gpx_files(GPX_DIRECTORY)
    if tracks_data:
        write_js_file(tracks_data, OUTPUT_FILE)
    else:
        print("No GPX files found. Please check the 'gpx_files' directory.")
