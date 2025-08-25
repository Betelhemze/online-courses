# Subtitles Integration Detailed Guide

## 1. Folder Structure

1. Locate the folder named `subtitles/` on your local machine.  
2. Copy the entire `subtitles/` folder into the backend project directory. The backend project directory is the root directory of the web application.  
3. The folder must maintain the exact structure shown below. Do not rename any files or folders.  

```
subtitles/
├─ generator.py       # Main Python script. Performs transcription from audio to English, cleans the text, translates it to Amharic, and generates .srt subtitle files.
├─ requirements.txt   # Text file listing all Python packages required to run generator.py.
└─ any other resources # Example: sample subtitle files, configuration files, or additional scripts. These are optional, but if present, include them as is.
```

---

## 2. Installing Python Dependencies

1. Open a terminal or command prompt.  
2. Navigate to the `subtitles/` folder using the `cd` command. Example:

```bash
cd path/to/backend/subtitles
```

3. Ensure you are using **Python version 3.11 or higher**. You can check your Python version with:

```bash
python3 --version
```

4. Install all Python dependencies by executing:

```bash
pip install -r requirements.txt
```

5. Ensure the following packages are installed (these are mandatory):

- `whisper` – Automatic Speech Recognition engine for transcribing audio into English.  
- `deep-translator` – Translates English subtitles into Amharic.  
- `ffmpeg` – Command-line tool used to extract audio from video files.  
- `torch` – Backend library for running Whisper.  
- Any additional packages listed inside `requirements.txt`.

6. Confirm that all packages installed without errors. If any package failed, the script will not run.

---

## 3. How generator.py Works

`generator.py` is the main Python script and must be called from the backend. Its functions are as follows:

1. Accepts video files (MP4, MOV, etc.) as input.  
2. Extracts the audio portion from the video using `ffmpeg`.  
3. Transcribes the audio into English text using Whisper.  
4. Cleans the English text by removing unwanted placeholders, special tokens, and formatting artifacts.  
5. Translates the cleaned English subtitles into Amharic using `deep-translator`.  
6. Creates `.srt` subtitle files for each language with correct timestamps.  
7. Returns the file paths of the generated subtitles.  

**Important:** The script is modular. Each function can be imported and called separately by backend code.  

---

## 4. Database Integration

1. In your web application's database, create a table called `subtitles`. Use the exact SQL code below:

```sql
CREATE TABLE subtitles (
    id SERIAL PRIMARY KEY,
    video_id INT NOT NULL,
    language VARCHAR(10) NOT NULL,
    file_path TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE
);
```

2. Definitions of each column:

- `id` – Auto-incrementing unique identifier for each subtitle entry.  
- `video_id` – The ID of the video to which the subtitle belongs. Must match the `id` in the `videos` table.  
- `language` – Language code of the subtitle. Example: `en` for English, `am` for Amharic.  
- `file_path` – Absolute or relative server path to the `.srt` file.  
- `uploaded_at` – Timestamp recording when the subtitle was uploaded.  

3. **Recommendation:** Create database indexes on `video_id` and `language` for fast query performance.

---

## 5. Backend Integration

### Upload Endpoint

Create an API route to allow uploading subtitles:

```python
@app.route('/upload_subtitle', methods=['POST'])
def upload_subtitle():
    video_id = request.form['video_id']           # Read video ID from POST form data
    language = request.form['language']           # Read subtitle language from POST form data
    file = request.files['file']                  # Read uploaded .srt file from POST request
    path = f"uploads/subtitles/{video_id}_{language}.srt"  # Construct path to save the file
    file.save(path)                               # Save file to server

    cursor.execute(
        "INSERT INTO subtitles (video_id, language, file_path) VALUES (%s, %s, %s)",
        (video_id, language, path)               # Insert entry into the subtitles table
    )
    db.commit()                                   # Commit the transaction
    return jsonify({"status": "success"})        # Return JSON response
```

### Fetch Endpoint

Create an API route to retrieve subtitles for a given video and language:

```python
@app.route('/get_subtitle/<int:video_id>/<string:language>', methods=['GET'])
def get_subtitle(video_id, language):
    cursor.execute(
        "SELECT file_path FROM subtitles WHERE video_id=%s AND language=%s",
        (video_id, language)
    )
    result = cursor.fetchone()                    # Fetch first result
    if result:
        return send_file(result[0])               # Return .srt file
    return jsonify({"error": "Subtitle not found"}), 404
```

---

## 6. Frontend Integration

1. Update the HTML `<video>` tag to include a `<track>` element for subtitles:

```html
<video id="course-video" controls>
    <source src="path/to/video.mp4" type="video/mp4">
    <track id="subtitle-track" src="" kind="subtitles" srclang="en" label="English" default>
</video>
```

2. Use JavaScript to dynamically change the `src` of `<track>` based on the user-selected language via the `/get_subtitle` endpoint. Example:

```javascript
function changeSubtitle(videoId, language) {
    const track = document.getElementById('subtitle-track');
    track.src = `/get_subtitle/${videoId}/${language}`;
    track.load();  // Reload the track
}
```

---

## 7. Testing Instructions

1. Upload subtitles for at least one video in **English** and **Amharic**.  
2. Verify the following:

- Files are saved in the correct server folder.  
- Database entries exist in the `subtitles` table.  
- Frontend video player displays subtitles correctly.  
- Switching between languages works correctly without errors.  

3. Repeat tests with multiple videos and ensure timestamps match audio.

---

## 8. Deployment Notes

- Ensure server permissions allow reading/writing files in the subtitles folder.  
- Backup existing subtitle folders before deployment.  
- Implement error handling in case of:

  - Missing subtitle files  
  - Database connection errors  
  - Translation failures  

---

## 9. Summary

- **Folder:** `subtitles/`  
- **Database table:** `subtitles`  
- **Backend:** Upload and fetch API endpoints  
- **Frontend:** `<track>` element integration for video player  
- **Testing:** Verify file storage, database entries, frontend display, and language switching.  

**This document provides step-by-step instructions for integrating the subtitles Python code into the web application backend and frontend, including database setup, API endpoints, and frontend integration.**

**If any placeholder or name-related errors occur (e.g., ___NAM0__, __ 16__, ___NAL0__), remove the section of the script that uses spaCy to detect names and replace them with placeholders.**

```python
                    -------------------""" this section """-------------------
def preserve_names(text):
    # Detect names in English text and replace with placeholders
    # Title-case text to help SpaCy detect names
    doc = nlp(text.title())
    names = [ent.text for ent in doc.ents if ent.label_ == "PERSON"]

    # Heuristic: include any capitalized word not already in names
    words = text.split()
    for w in words:
        if w[0].isupper() and w not in names:
            names.append(w)

    text_with_placeholders = text
    for i, name in enumerate(names):
        text_with_placeholders = text_with_placeholders.replace(name, f"__NAME{i}__")
    return text_with_placeholders, names

def restore_names(text, names):
     # Replace placeholders with original names
    restored_text = text
    for i, name in enumerate(names):
        restored_text = restored_text.replace(f"__NAME{i}__", name)
    return restored_text
```
