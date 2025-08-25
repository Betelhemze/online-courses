# Subtitles Integration Guide

## 1. Folder Structure

Copy the entire `subtitles/` folder into the backend project directory. Maintain the following structure:

```
subtitles/
├─ generator.py       # Main script for transcription, translation, and subtitle file creation
├─ requirements.txt   # Lists Python dependencies needed to run generator.py
└─ any other resources # e.g., sample subtitle files or config files
```

---

## 2. Installing Dependencies

Navigate to the `subtitles/` folder and install dependencies:

```bash
pip install -r requirements.txt
```

**Key dependencies to ensure are installed:**

- `whisper` – for automatic speech recognition  
- `deep-translator` – for translating English subtitles to Amharic  
- `ffmpeg` – for extracting audio from video files  
- `torch` – backend for Whisper  
- Any additional dependencies listed in `requirements.txt`  

**Note:** Ensure the environment is Python 3.11+.

---

## 3. Audio and Subtitle Processing

`generator.py` performs the following tasks:

1. Extracts audio from video files using `ffmpeg`.  
2. Transcribes the audio into English text using Whisper.  
3. Cleans transcription text to remove unwanted tokens and placeholders.  
4. Translates English subtitles into Amharic using `deep-translator`.  
5. Creates `.srt` subtitle files with proper timestamps.  

The script is modular, so backend code can call its functions directly.

---

## 4. Database Integration

Create a new table `subtitles` in your database:

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

- `video_id` links the subtitle to a specific video.  
- `language` stores the subtitle language (e.g., `en`, `am`).  
- `file_path` stores the location of the `.srt` file on the server.  
- `uploaded_at` logs the timestamp of upload.  
- **Tip:** Index `video_id` and `language` for efficient retrieval.

---

## 5. Backend Integration

### Upload Endpoint

Add an API route to handle subtitle uploads:

```python
@app.route('/upload_subtitle', methods=['POST'])
def upload_subtitle():
    video_id = request.form['video_id']
    language = request.form['language']
    file = request.files['file']
    path = f"uploads/subtitles/{video_id}_{language}.srt"
    file.save(path)
    
    cursor.execute(
        "INSERT INTO subtitles (video_id, language, file_path) VALUES (%s, %s, %s)",
        (video_id, language, path)
    )
    db.commit()
    return jsonify({"status": "success"})
```

### Fetch Endpoint

Allow the frontend to request subtitles:

```python
@app.route('/get_subtitle/<int:video_id>/<string:language>', methods=['GET'])
def get_subtitle(video_id, language):
    cursor.execute(
        "SELECT file_path FROM subtitles WHERE video_id=%s AND language=%s",
        (video_id, language)
    )
    result = cursor.fetchone()
    if result:
        return send_file(result[0])
    return jsonify({"error": "Subtitle not found"}), 404
```

---

## 6. Frontend Integration

Update the video player to include `<track>` tags:

```html
<video id="course-video" controls>
    <source src="path/to/video.mp4" type="video/mp4">
    <track id="subtitle-track" src="" kind="subtitles" srclang="en" label="English" default>
</video>
```

- Use JavaScript to dynamically change the `src` of `<track>` based on the user-selected language via the `/get_subtitle` endpoint.

---

## 7. Testing

1. Upload subtitles for at least one video in English and Amharic.  
2. Verify:  
   - Files are saved correctly on the server.  
   - Database entries exist in the `subtitles` table.  
   - Frontend loads and displays subtitles correctly.  
   - Switching between languages for the same video works properly.

---

## 8. Deployment Notes

- Ensure server permissions allow reading/writing subtitle files.  
- Backup existing subtitle folders before deployment.  
- Implement error handling for missing files, database issues, or translation failures.

---

## 9. Summary

- **Folder:** `subtitles/`  
- **Database table:** `subtitles`  
- **Backend:** Upload and fetch endpoints  
- **Frontend:** Video player `<track>` integration  
- Test thoroughly with multiple videos and languages.
