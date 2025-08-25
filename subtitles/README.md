
# Subtitle Generator (English → Amharic)

This project provides a **Python-based pipeline** to extract audio from a video, transcribe it using OpenAI's **Whisper model**, and generate subtitles in **both English and Amharic**. The resulting subtitles are clean and formatted in the **SRT** format, ready to use with any media player.

---

## Features

- **Automatic Transcription:** Uses Whisper's `large-v2` model to generate high-quality English transcripts from video or audio.
- **Translation to Amharic:** Translates English subtitles into Amharic using **GoogleTranslator** (via the `deep-translator` library).
- **Clean Output:** Automatically removes junk tokens such as `__16__`, `NAM0`, `NAL0`, `AN0`, and other placeholders.
- **Segmented SRT:** Preserves timing for each subtitle segment for smooth playback.
- **Simple CLI:** Run the script from the command line with a single argument specifying your video file.

---

## Installation

### 1. Clone the repository

```bash
git clone <repo_url>
cd <repo_folder>
```

### 2. Create and activate a Python virtual environment

```bash
python3 -m venv venv
source venv/bin/activate   # macOS/Linux
venv\Scripts\activate      # Windows
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

**Dependencies include:**

- `whisper` → For transcription  
- `torch` → Required backend for Whisper  
- `deep-translator` → For Google translation

---

## Usage

```bash
python subtitle_generator.py /path/to/video.mp4
```

### Output:

- `speech_en.srt` → English subtitles  
- `speech_am.srt` → Amharic subtitles  

The subtitles will appear in the **same directory** as the script.

---

## How It Works

1. **Audio Extraction & Transcription**
   - The script uses Whisper’s `large-v2` model to transcribe the audio from the video.
   - It returns **timed segments** with English text.

2. **Cleaning English Text**
   - Removes placeholders, junk tokens, or special characters generated during transcription.

3. **Translation to Amharic**
   - Uses Google Translator via `deep-translator` to convert the cleaned English text.
   - Splits long text into **chunks** to avoid Google Translate rate limits.

4. **Cleaning Translated Text**
   - Removes any leftover junk tokens like `__16__`, `NAM0`, `NAL0`, `AN0`, `NAMELELE`, `LE1`, or `___`.
   - Ensures subtitles are readable and professional.

5. **Generating SRT Files**
   - Writes English and Amharic subtitles into two separate `.srt` files.
   - Timing information matches the original segments from Whisper.

---

## Notes & Tips

- **Processing Time:**  
  Longer videos may take several minutes to transcribe and translate, depending on your CPU/GPU and video length.

- **Internet Connection:**  
  Translation requires an active internet connection because it uses Google Translate.

- **Large Videos:**  
  If your video is very long, the script automatically splits text into chunks for translation to prevent rate limiting.

- **Custom Cleanup:**  
  If you notice other unwanted tokens in the subtitles, you can update the `clean_translated_text` function with additional regex rules.

---

## Folder Structure (Example)

```
subtitle-generator/
│
├─ subtitle_generator.py
├─ requirements.txt
├─ README.md
└─ video_files/
   └─ your_video.mp4
```

After running the script, the folder will also contain:

```
speech_en.srt
speech_am.srt
```

---

## Troubleshooting

- **FP16 Warning on CPU:**  
  Whisper may warn that FP16 is not supported; this is normal on CPU and the script automatically falls back to FP32.

- **Translation Timeout:**  
  If Google Translate times out, the script will retry in smaller chunks. Ensure stable internet.

- **Video Formats:**  
  Whisper supports most video formats (`.mp4`, `.mov`, `.mkv`) as long as `ffmpeg` can read them.

---

## Contributing

Feel free to contribute by:

- Improving the translation pipeline
- Adding support for more languages
- Enhancing subtitle formatting
- Optimizing speed for longer videos

---

## License

This project is **MIT licensed**, free to use and modify for personal or commercial purposes.

---

## References

- [OpenAI Whisper](https://github.com/openai/whisper)  
- [Deep Translator](https://github.com/nidhaloff/deep-translator)  
- [SRT Subtitle Format](https://en.wikipedia.org/wiki/SubRip)

